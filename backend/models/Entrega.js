const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Entrega = db.define('entrega',{
    codEntrega:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    destino:{
        type: DataTypes.STRING(40),
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM('TRANSITO','ENTREGUE'),
        allowNull: false
    },
    data:{
        type: DataTypes.DATE,
        allowNull: false
    },
    idCarga:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'cargas',
            'key': 'codCarga'
        }
    }
},{
    timestamps: false,
    tableName: 'entregas'
})

module.exports = Entrega