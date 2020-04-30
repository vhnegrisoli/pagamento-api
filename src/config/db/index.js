import Sequelize from 'sequelize';

const sequelize = new Sequelize('iluovlen', 'iluovlen', '0x8-CKqR5DhzGZSBIB-xjxmGWIMVoScj', {
  host: 'drona.db.elephantsql.com',
  dialect: 'postgres',
  quoteIdentifiers: false,
  define: {
    timestamps: false,
    underscored: true,
    underscoredAll: true,
    freezeTableName: true,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
