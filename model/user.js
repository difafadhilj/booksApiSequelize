module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      primaryKey: true,
      allowNull: false,
      type: Sequelize.INTEGER,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  });
  return User;
};
