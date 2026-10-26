const conn = require('./db/conn')
const { Funcionario, Motorista, Carga, Entrega } = require('./models/rel')

async function syncDataBase() {
    try {
        await conn.sync({force: true})
        console.log('Tabelas Sincronizadas!!')
    } catch (err) {
        console.error('Erro ao tentar sincronizar tabelas',err)
    }
    finally{
        await conn.close()
        console.log('Fechando conexão com o banco de dados...')
    }
}

syncDataBase()