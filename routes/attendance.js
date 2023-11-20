const express = require("express");
const router = express.Router();
const attendance = require("../services/attendance");

/* GET programming languages. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await attendance.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    res.json(await attendance.create(req.body));
  } catch (err) {
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});

module.exports = router;
