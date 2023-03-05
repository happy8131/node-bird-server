const exporess = require("express");
const { Post, Image, User, Comment } = require("../models");

const router = exporess.Router();

router.get("/", async (req, res, next) => {
  //GET/ posts

  try {
    const posts = await Post.findAll({
      limit: 10,
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],
      include: [
        { model: User, attributes: ["id", "nickname"] },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [{ model: User, attributes: ["id", "nickname"] }],
        },
        {
          model: User, // 좋아요 누른사람
          as: "Likers",
          attributes: ["id"],
        },
      ],
    }); // 모든 게시글을 가져온다
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
