import { connect, keyStores, WalletConnection } from 'near-api-js';

const config = {
    networkId: 'testnet',
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    explorerUrl: 'https://explorer.testnet.near.org'
};

// connect to NEAR
const near = await connect(config);

// create wallet connection
// const walletConnection = new WalletConnection(nearConnection);

// Function to connect to Near Wallet
async function connectToWallet() {
    const walletConnection = new WalletConnection(near, 'your-app-name');
    if (!walletConnection.isSignedIn()) {
        await walletConnection.requestSignIn('your-app-name');
    }

    const accountId = walletConnection.getAccountId();
    console.log('Connected to Near Wallet as:', accountId);
}


module.exports = { connectToWallet };