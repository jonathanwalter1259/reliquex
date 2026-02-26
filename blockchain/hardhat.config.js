import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import * as dotenv from "dotenv";

dotenv.config();

// PRIVATE_KEY must be set in .env for deployment/signing; no fallback to avoid accidental use.
const privateKey = process.env.PRIVATE_KEY;
const accounts = privateKey ? [privateKey] : [];

/** @type import('hardhat/config').HardhatUserConfig */
const config = {
    solidity: "0.8.20",
    networks: {
        bscTestnet: {
            type: "http",
            url: "https://data-seed-prebsc-1-s1.binance.org:8545",
            chainId: 97,
            accounts
        },
        bscMainnet: {
            type: "http",
            url: "https://bsc-dataseed.binance.org/",
            chainId: 56,
            accounts
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
