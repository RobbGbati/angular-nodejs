// congigure MySQL database and Sequelize
module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD:  'zkwurtFk92CeH8p',
    DB: 'nodejs_db',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
