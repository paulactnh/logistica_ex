const Carga = require('../models/Carga')
const Motorista = require('../models/Motorista')

const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.descricao || !valores.peso || !valores.volume ||!valores.codRastreio ||!valores.idMotorista){
        return res.status(400).json({message: 'Todos os campos são obrigatórios!!'})
    }
    try {
        const motorista = await Motorista.findByPk(valores.idMotorista)
        if(!motorista){
            return res.status(404).json({message: "Motorista inexistente!!"})
        }

        await Carga.create(valores)
        res.status(201).json({message: 'Carga cadastrada com sucesso!!'})
    } catch (err) {
        res.status(500).json({message: 'Erro ao tentar cadastrar Carga'})
        console.error('Erro ao tentar cadastrar Carga',err)
    }
}

module.exports = { cadastrar }