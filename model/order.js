module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders", {
      userId: {
        type: Sequelize.INTEGER,
        foreignKey: true
      },
      bookId: {
        type: Sequelize.INTEGER,
        foreignKey: true
      }
    });
    return Order;
  };
  