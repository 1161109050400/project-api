const express = require("express");
const router = express.Router();
router.use(express.static("public"));
router.use("/auth",require("./auth"));
router.use('/user',require('./user'));
router.use('/hospital',require('./hospital'));
router.use('/insurance',require('./insurance'));



module.exports = router;
