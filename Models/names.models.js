

module.exports = function (sequelize, DataTypes) {
  const names = sequelize.define(
    'names',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING
      }
    }
  )
  return names
}
