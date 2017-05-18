/* dependencies */
// import { Logger } from 'lionsoft-common-bin';
// import { Mixins } from 'lionsoft-node-bin';
const express = require(`express`);
const jwt = require(`express-jwt`);
const bodyParser = require(`body-parser`);

/* local dependencies */
/* create router */
const router = express.Router();
/* routes */
// const item = require(`./item`);
// const cart = require(`./cart`);
// const order = require(`./order`);
// const admin = require(`./admin`);

/////////////
// ROUTING //
/////////////

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//Item requests
// router.use(`/login`, Mixins.AuthMixin);
// router.use(`/item`, item);
// router.use(`/cart`, cart);
// router.use(`/order`, order);
// router.use(`/admin`, admin);

module.exports = router;
