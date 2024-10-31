// server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors'); // Importando o cors
const app = express();
const PORT = 3000;

const caminhoArquivo = __dirname + '/data/feedback.json'; // Caminho do arquivo JSON

app.use(cors()); // Habilitando CORS para todas as rotas
app.use(express.json()); // Middleware para interpretar JSON

// Rota POST para salvar um novo feedback
app.post('/feedback', (req, res) => {
  const novoFeedback = req.body;

  // Lê o arquivo existente
  fs.readFile(caminhoArquivo, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao ler o arquivo de feedback.' });
    }
    
    // Converte para JSON e adiciona o novo feedback
    const feedbacks = JSON.parse(data);
    feedbacks.push(novoFeedback);

    // Salva o novo array de feedbacks no arquivo
    fs.writeFile(caminhoArquivo, JSON.stringify(feedbacks, null, 2), 'utf8', (err) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao salvar o feedback.' });
      }
      res.status(201).json(novoFeedback); // Retorna o feedback salvo
    });
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}. Acesse http://localhost:${PORT}`);
});
