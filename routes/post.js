const exporess = require("express");
const { Post } = require("../models");
const { isLoggedIn } = require("./middlewares");

const router = exporess.Router();

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    res.status(201).json(post);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });

    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id,
    });

    res.status(201).json(comment);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.delete("/", (req, res) => {
  res.json({ id: 1 });
});

module.exports = router;
//로그인 한번하면 passport.deserializeUser가 실행된다.
//그래서 req.user.id가 접근이 가능하다
