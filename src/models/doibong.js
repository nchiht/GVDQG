'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doibong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doibong.hasMany(models.Cauthu, { foreignKey: 'tenDoiBong', as: 'FK_Cauthu_Doibong' });
      Doibong.hasMany(models.Lichthidau, { foreignKey: 'tenDoiBong1', as: 'FK_Lichthidau_Doibong1' });
      Doibong.hasMany(models.Lichthidau, { foreignKey: 'tenDoiBong2', as: 'FK_Lichthidau_Doibong2' });
      Doibong.hasMany(models.Dienbien, { foreignKey: 'tenDoibong', as: 'FK_Dienbien_Doibong' })
    }
  };
  Doibong.init({
    sanNha: DataTypes.TEXT,
    mauAoSanNha: DataTypes.TEXT,
    mauAoSanKhach: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Doibong',
  });
  return Doibong;
};