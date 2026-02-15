const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

// IMPORTANTE para funcionar no Render
const PORT = process.env.PORT || 3000

// Base de dados fake (em memória)
let compromissos = [
    {
        id: 1,
        titulo: "Aula DAM",
        descricao: "Android Studio",
        data: "10/02/2026",
        localizacao: ""
    },
    {
        id: 2,
        titulo: "Reunião",
        descricao: "Projeto Final",
        data: "12/02/2026",
        localizacao: ""
    }
]

// GET todos
app.get("/compromissos", (req, res) => {
    res.json(compromissos)
})

// POST adicionar
app.post("/compromissos", (req, res) => {
    const novo = {
        id: compromissos.length > 0
            ? compromissos[compromissos.length - 1].id + 1
            : 1,
        ...req.body
    }

    compromissos.push(novo)
    res.status(201).json(novo)
})

// PUT editar
app.put("/compromissos/:id", (req, res) => {
    const id = parseInt(req.params.id)

    const index = compromissos.findIndex(c => c.id === id)

    if (index === -1) {
        return res.status(404).json({ erro: "Não encontrado" })
    }

    compromissos[index] = {
        id,
        ...req.body
    }

    res.json(compromissos[index])
})

// DELETE apagar
app.delete("/compromissos/:id", (req, res) => {
    const id = parseInt(req.params.id)

    compromissos = compromissos.filter(c => c.id !== id)

    res.json({ mensagem: "Apagado com sucesso" })
})

app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`)
})
