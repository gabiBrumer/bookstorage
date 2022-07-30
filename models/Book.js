module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define("Book", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          title: {
            type: DataTypes.INTEGER(200),
            allowNull: false
          },
          total_pages: {
            type: DataTypes.INTEGER(),
            allowNull: false
          },
          author: {
            type: DataTypes.STRING(200),
            allowNull: false
          },
          release_year: {
            type: DataTypes.STRING(50),
            allowNull: false
          },
          stock: {
            type: DataTypes.INTEGER(),
            allowNull: false
          },
          createdAt: DataTypes.DATE,
          updatedAt: DataTypes.DATE
    }, {
        tableName: "books",
        timestamps: true
    })

    return Book;
}