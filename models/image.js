module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      // id가 기본적으로 들어있다
      src: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 이모티콘 저장 저장
    }
  );
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post); // 이미지는 소유한 게시글이 정해져 있다 게시글 1: 이미지 다(여러개)
  };

  return Image;
};
