module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '고유번호 UUID',
      },
      nickname: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '닉네임',
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          isEmail: true,
        },
        comment: '이메일',
      },
      account: {
        type: DataTypes.STRING(42),
        allowNull: false,
        comment: '지갑 계정',
      },
    },
    {
      timestamps: false,
      tableName: 'User',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    },
  );
  return User;
};
