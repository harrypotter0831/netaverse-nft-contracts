import fs from 'fs';

import "@nomiclabs/hardhat-ganache";
import "@nomiclabs/hardhat-truffle5";
import "@nomiclabs/hardhat-etherscan";
import "solidity-coverage";

// import hardhat-gas-reporter hardhat-deploy hardhat-contract-sizer hardhat-tracer
import "hardhat-gas-reporter";
import "hardhat-deploy";
import "hardhat-contract-sizer";
import "hardhat-tracer";

const INFURA_KEY = process.env.INFURA_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;
const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY;
const MOONBEAM_API_KEY = process.env.MOONBEAM_API_KEY;
const MOONRIVER_API_KEY = process.env.MOONRIVER_API_KEY;

const mnemonic = (() => {
    try {
        return fs.readFileSync(".mnemonic").toString().trim();
    } catch (err) { return null }
})();

export default {
    networks: {
        rinkeby: {
            url: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
            accounts: {
                mnemonic,
            },
        },
        mainnet: {
            url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
            accounts: {
                mnemonic,
            },
        },
        polygon: {
            url: `https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`,
            accounts: {
                mnemonic,
            },
        },
    },
    solidity: {
        version: "0.8.9",
        settings: {
            optimizer: {
                enabled: true,
                runs: 10000,
                // runs: 4_294_967_295, // 2**32 - 1
            },
        },
    },

    // Set default mocha options here, use special reporters etc.
    mocha: {
        timeout: 100000,
        ...(process.env.CIRCLE_BRANCH && {
            reporter: "mocha-junit-reporter",
            reporterOptions: {
                mochaFile: "./test_results/mocha/results.xml",
            },
        }),
    },

    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },

    // wrong format?
    api_keys: {
        etherscan: ETHERSCAN_API_KEY,
        polygonscan: POLYGONSCAN_API_KEY,
        bscscan: BSCSCAN_API_KEY,
        moonbeam: MOONBEAM_API_KEY,
        moonriver: MOONRIVER_API_KEY,
        moonscan: MOONRIVER_API_KEY,
    }

};


