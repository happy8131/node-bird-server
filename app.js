const express = require("express");
const cors = require("cors");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");
const passportConfig = require("./passport");

const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공!!");
  })
  .catch(console.error);
passportConfig();
app.use(
  cors({
    origin: "*",
  })
); // cors 설정해준다
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 프론트에서 넘어온 데이터를 req.body넣어주는 역할을 해준다

app.get("/", (req, res) => {
  res.send("hello express");
});

app.get("/", (req, res) => {
  res.send("hello api");
});

app.get("/api/posts", (req, res) => {
  res.json([
    { id: 1, content: "hello" },
    { id: 2, content: "hello2" },
    { id: 3, content: "hello3" },
  ]);
});

app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(3065, () => {
  console.log("실행");
});
