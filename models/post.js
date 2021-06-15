const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      title : {
        type : Sequelize.STRING(70),
        allowNull : false
      },
      content:{
        type : Sequelize.STRING(140),
        allowNull : true,
      },
      img : {
        type: Sequelize.STRING(200),
        allowNull : true,
      },
    }, {
      sequelize,
      timestamps : true, 
      underscored: false,
      modelName : 'Post',
      tableName: 'posts',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    });
  }

  static associate(db){
    db.Post.belongsTo(db.User); // user : post = 1 : N
    db.Post.hasMany(db.Comment); // post: comment = 1 : N
  }
}