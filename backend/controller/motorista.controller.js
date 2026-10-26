const Motorista = require('../models/Motorista')
const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.nome || !valores.cnh || !valores.cpf ||!valores.telefone){
        return res.status(400).json({message: 'Todos os campos são obrigatórios!!'})
    }
    try {
        const cnhCripto = cryptoJS.AES.encrypt(valores.cnh,CHAVE_SECRETA).toString()
        const cpfCripto = cryptoJS.AES.encrypt(valores.cpf,CHAVE_SECRETA).toString()
        await Motorista.create({
            nome: valores.nome,
            cnh: cnhCripto,
            cpf: cpfCripto,
            telefone: valores.telefone
        })
        res.status(201).json({message: 'Motorista cadastrado com sucesso!!'})
    } catch (err) {
        res.status(500).json({message: 'Erro ao tentar cadastrar Motorista'})
        console.error('Erro ao tentar cadastrar Motorista',err)
    }
}

module.exports = { cadastrar }