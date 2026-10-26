const express = require('express')
const app = express()
const cors = require('cors')

const funcionarioController = require('./controller/funcionario.controller')
const motoristaController = require('./controller/motorista.controller')
const cargaController = require('./controller/carga.controller')
const entregaController = require('./controller/entrega.controller')

const conn = require('./db/conn')
const hostname = 'localhost'
const PORT = 3000
//-------- Middlware -----------
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
//---------- Public Routes --------------
app.post('/funcionario', funcionarioController.cadastrar)

app.get('/',(req,res)=>{
    res.status(200).json({message: "Aplicação rodando!!"})
})
//------------- Private Routes ------------------
app.post('/motorista', motoristaController.cadastrar)

app.post('/carga', cargaController.cadastrar)

app.post('/entrega', entregaController.cadastrar)
//------------- Server ---------------
conn.sync()
.then(()=>{
    app.listen(PORT,hostname,()=>{
        console.log(`Servidor rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('Erro ao tentar conectar com o banco de dados',err)
})