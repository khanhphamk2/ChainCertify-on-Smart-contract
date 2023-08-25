const { Web3 } = require('web3');

// Path: Backend\services\issuer.service.js
async function issueCertificate(req, res, next) {
    try {
        const certificate = await certificateService.issueCertificate(req.body);
        res.json(certificate);
    } catch (error) {
        next(error);
    }
}

