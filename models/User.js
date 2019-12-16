const dbConfig = require('../config/dbConfig')

const User = dbConfig.sequelize.define(
    'user',
    {
        // attributes
        username: {
            type: dbConfig.Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: dbConfig.Sequelize.STRING,
            allowNull: false
        }
    },
    {
        // options
        // freezeTablename:true  --to set the table name as defined in the momdule.
        paranoid: true
    }
)

module.exports = User
