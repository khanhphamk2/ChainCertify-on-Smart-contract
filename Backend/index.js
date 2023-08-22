const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const near = require('near-api-js');

const app = express();
const port = 3000;

// API endpoint to revoke a certificate
app.post('/test-connect', async (req, res) => {
    const { accountId } = req.body;

    if (!accountId) {
        return res.status(400).json({ success: false, message: 'Missing accountId.' });
    }

    try {
        const account = await near.account(accountId);
        return res.json({ success: true, message: 'Connected to Near Wallet successfully.' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to connect to Near Wallet.' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
