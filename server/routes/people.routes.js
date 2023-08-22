const peopleCtrl = require("../controllers/people.controller");
const express = require("express");
const router = express.Router();

router.route("/people").get(peopleCtrl.getPeople);
router.route("/createDataFile").get(peopleCtrl.createFileWithData);

module.exports = router;
