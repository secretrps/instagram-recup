require('dotenv').config(); // Carregar variáveis do .env
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Necessário para o Neon DB
    }
});

client.connect()
    .then(() => console.log('✅ Conectado ao Neon DB!'))
    .catch(err => console.error('❌ Erro ao conectar ao Neon DB:', err));

module.exports = client;
