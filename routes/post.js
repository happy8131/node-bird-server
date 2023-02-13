const exporess = require("express");

const router = exporess.Router();

router.post("/", (req, res) => {
  res.json({ id: 1, content: "hello" });
});

router.delete("/", (req, res) => {
  res.json({ id: 1 });
});

module.exports = router;
