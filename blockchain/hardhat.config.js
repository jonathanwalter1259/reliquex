import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import * as dotenv from "dotenv";

dotenv.config();

const privateKey = process.env.PRIVATE_KEY || "0000000000000000000000000000000000000000000000000000000000000000";

/** @type import('hardhat/config').HardhatUserConfig */
const config = {
    solidity: "0.8.20",
    networks: {
        bscTestnet: {
            type: "http",
            url: "https://data-seed-prebsc-1-s1.binance.org:8545",
            chainId: 97,
            accounts: [privateKey]
        },
        bscMainnet: {
            type: "http",
            url: "https://bsc-dataseed.binance.org/",
            chainId: 56,
            accounts: [privateKey]
        }
    },
    etherscan: {
        apiKey: {
            bsc: process.env.BSCSCAN_API_KEY || "",
            bscTestnet: process.env.BSCSCAN_API_KEY || ""
        }
    },
    sourcify: {
        enabled: false
    }
};

export default config;
