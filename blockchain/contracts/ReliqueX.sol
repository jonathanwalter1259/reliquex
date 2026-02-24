// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract ReliqueX is ERC1155Supply, Ownable, ERC1155Holder {
    mapping(uint256 => uint256) public sharePrice;
    mapping(uint256 => uint256) public initialSupply;
    mapping(uint256 => bool) public isClaimed;

    uint256 public constant MINT_DELAY = 1 days;

    struct MintProposal {
        uint256 totalShares;
        uint256 pricePerShare;
        string ipfsURI;
        uint256 executeAfter;
        bool executed;
    }

    // assetId => MintProposal
    mapping(uint256 => MintProposal) public mintProposals;
    // assetId => ipfs URI
    mapping(uint256 => string) private _tokenURIs;

    event FractionsMinted(uint256 indexed assetId, uint256 totalShares, uint256 pricePerShare);
    event SharesPurchased(uint256 indexed assetId, address indexed buyer, uint256 amount);
    event PhysicalClaimed(uint256 indexed assetId, address indexed claimer);
    event MintProposed(uint256 indexed assetId, uint256 totalShares, uint256 pricePerShare, uint256 executeAfter);

    constructor() ERC1155("") Ownable(msg.sender) {}

    /**
     * @dev Override ERC1155 URI to return the IPFS hash for each specific authenticated token
     */
    function uri(uint256 tokenId) public view virtual override returns (string memory) {
        string memory tokenURI = _tokenURIs[tokenId];
        return bytes(tokenURI).length > 0 ? tokenURI : super.uri(tokenId);
    }

    /**
     * @dev Step 1 of Time-Lock: Propose the minting of fractional shares.
     * Starts the 24-hour countdown before the admin can execute the supply creation.
     */
    function proposeMint(uint256 _assetId, uint256 _totalShares, uint256 _pricePerShare, string memory _ipfsURI) external onlyOwner {
        require(initialSupply[_assetId] == 0, "Asset already minted");
        require(mintProposals[_assetId].executeAfter == 0, "Proposal already exists");
        require(_totalShares > 0, "Must mint at least 1 share");

        uint256 executeTime = block.timestamp + MINT_DELAY;

        mintProposals[_assetId] = MintProposal({
            totalShares: _totalShares,
            pricePerShare: _pricePerShare,
            ipfsURI: _ipfsURI,
            executeAfter: executeTime,
            executed: false
        });

        emit MintProposed(_assetId, _totalShares, _pricePerShare, executeTime);
    }

    /**
     * @dev Step 2 of Time-Lock: Execute the mint after the 24-hour delay has passed.
     */
    function executeMint(uint256 _assetId) external onlyOwner {
        MintProposal storage proposal = mintProposals[_assetId];
        require(proposal.executeAfter > 0, "No proposal exists");
        require(block.timestamp >= proposal.executeAfter, "Time-lock period not met (24 hours required)");
        require(!proposal.executed, "Proposal already executed");
        require(initialSupply[_assetId] == 0, "Asset already minted");

        proposal.executed = true;

        // Mint to this contract
        _mint(address(this), _assetId, proposal.totalShares, "");
        
        initialSupply[_assetId] = proposal.totalShares;
        sharePrice[_assetId] = proposal.pricePerShare;
        _tokenURIs[_assetId] = proposal.ipfsURI;

        emit FractionsMinted(_assetId, proposal.totalShares, proposal.pricePerShare);
    }

    /**
     * @dev Public function to buy shares of an asset directly from the contract.
     * Users send BNB to purchase shares.
     */
    function buyShares(uint256 _assetId, uint256 _amount) external payable {
        require(!isClaimed[_assetId], "Asset already claimed");
        require(_amount > 0, "Must buy at least 1 share");
        
        uint256 price = sharePrice[_assetId];
        require(price > 0, "Asset not for sale");
        require(msg.value >= price * _amount, "Insufficient payment");

        // Transfer from contract to buyer
        this.safeTransferFrom(address(this), msg.sender, _assetId, _amount, "");

        emit SharesPurchased(_assetId, msg.sender, _amount);
    }

    /**
     * @dev If a user accumulates 100% of the shares, they can burn them to claim the physical asset.
     */
    function claimPhysical(uint256 _assetId) external {
        require(!isClaimed[_assetId], "Asset already claimed");
        uint256 supply = initialSupply[_assetId];
        require(supply > 0, "Asset not minted");

        uint256 userBalance = balanceOf(msg.sender, _assetId);
        require(userBalance == supply, "Must own 100% of the shares to claim physical");

        // Burn the tokens
        _burn(msg.sender, _assetId, supply);
        
        isClaimed[_assetId] = true;

        emit PhysicalClaimed(_assetId, msg.sender);
    }

    // Admin function to withdraw collected funds
    function withdrawFunds() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, ERC1155Holder) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
