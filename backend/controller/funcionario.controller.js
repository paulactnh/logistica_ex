const Funcionario = require('../models/Funcionario')
const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.nome || !valores.email || !valores.senha){
        return res.status(400).json({message: 'Todos os campos são obrigatórios!!'})
    }
    try {
        const senhaCripto = cryptoJS.AES.encrypt(valores.senha,CHAVE_SECRETA).toString()
        await Funcionario.create({
            nome: valores.nome,
            email: valores.email,
            senha: senhaCripto
        })
        res.status(201).json({message: 'Funcionario cadastrado com sucesso!!'})
    } catch (err) {
        res.status(500).json({message: 'Erro ao tentar cadastrar funcionario'})
        console.error('Erro ao tentar cadastrar funcionario',err)
    }
}

module.exports = { cadastrar }