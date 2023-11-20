const express = require("express");
const router = express.Router();
const attendance = require("../services/users");

/* GET programming languages. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await attendance.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const user = req.body;
    const result = await userService.createUser(user);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
