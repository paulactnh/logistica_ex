const Entrega = require('../models/Entrega')
const Carga = require('../models/Carga')

const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.destino || !valores.status || !valores.data ||!valores.idCarga){
        return res.status(400).json({message: 'Todos os campos são obrigatórios!!'})
    }
    try {
        const carga = await Carga.findByPk(valores.idCarga)
        if(!carga){
            return res.status(404).json({message: "Carga inexistente!!"})
        }
        await Entrega.create(valores)
        res.status(201).json({message: 'Entrega cadastrada com sucesso!!'})
    } catch (err) {
        res.status(500).json({message: 'Erro ao tentar cadastrar Entrega'})
        console.error('Erro ao tentar cadastrar Entrega',err)
    }
}

module.exports = { cadastrar }