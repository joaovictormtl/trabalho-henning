const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let users = [];

app.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).json(user);
});

app.get("/users/:id", (req, res) => {
    const { id } = req.params;
    const user = users[id]; // Acesse o usuário pelo índice
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('Usuário não encontrado');
    }
});

// PATCH: Atualizar um usuário
app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users[id];
    if (user) {
        Object.assign(user, req.body);
        res.json(user);
    } else {
        res.status(404).send('Usuário não encontrado');
    }
});

// DELETE: Remover um usuário
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    if (users[id]) {
        users.splice(id, 1);
        res.status(204).send(); // Sem conteúdo
    } else {
        res.status(404).send('Usuário não encontrado');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});