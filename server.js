const express = require('express');
const client = require('./db');

const app = express();
app.use(express.json());

// Rota para buscar todos os logins
app.get('/logins', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM logins');
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar logins:', error);
        res.status(500).json({ message: 'Erro ao buscar dados' });
    }
});

// Rota para salvar login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const timestamp = new Date();

    try {
        await client.query('INSERT INTO logins (username, password, timestamp) VALUES ($1, $2, $3)', 
        [username, password, timestamp]);
        
        res.json({ message: 'Login salvo com sucesso!' });
    } catch (error) {
        console.error('Erro ao salvar login:', error);
        res.status(500).json({ message: 'Erro ao salvar login' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
