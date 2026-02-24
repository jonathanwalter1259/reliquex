// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract ReliqueX is ERC1155Supply, Ownable, ERC1155Holder {
    mapping(uint256 => uint256) public sharePrice;
    mapping(uint256 => uint256) public initialSupply;
    mapping(uint256 => bool) public isClaimed;

    event FractionsMinted(uint256 indexed assetId, uint256 totalShares, uint256 pricePerShare);
    event SharesPurchased(uint256 indexed assetId, address indexed buyer, uint256 amount);
    event PhysicalClaimed(uint256 indexed assetId, address indexed claimer);

    constructor() ERC1155("https://reliquex.com/api/metadata/{id}.json") Ownable(msg.sender) {}

    /**
     * @dev Mint fractional shares for a newly authenticated physical asset.
     * Only the admin (owner) can call this after validating the real-world item.
     */
    function mintFractions(uint256 _assetId, uint256 _totalShares, uint256 _pricePerShare) external onlyOwner {
        require(initialSupply[_assetId] == 0, "Asset already minted");
        require(_totalShares > 0, "Must mint at least 1 share");
        
        // Mint to this contract
        _mint(address(this), _assetId, _totalShares, "");
        
        initialSupply[_assetId] = _totalShares;
        sharePrice[_assetId] = _pricePerShare;

        emit FractionsMinted(_assetId, _totalShares, _pricePerShare);
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
