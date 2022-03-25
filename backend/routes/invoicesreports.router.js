const {getInovoicesReport} = require("../Controllers/invoicesreports.controller")
const express = require("express");
const router = express.Router();

router.get("", getInovoicesReport);
module.exports = router;
