module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comments", {
    id: {
      primaryKey: true,
      allowNull: false,
      type: Sequelize.INTEGER,
      autoIncrement: true
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false
    },
    status: {
      type: Sequelize.BOOLEAN
    }
  });
  return Comment;
};
