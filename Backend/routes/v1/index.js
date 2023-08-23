const express = require('express');
const walletRoute = require('./wallet.route');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/wallet',
        route: walletRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;