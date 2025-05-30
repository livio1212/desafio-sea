import express from "express";
import cors from "cors";
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json());

let funcionarios = [];

app.get('/funcionarios', (req, res) => {
  res.json(funcionarios);
});

app.post('/funcionarios', (req, res) => {
  const newFuncionario = req.body;
  funcionarios.push(newFuncionario);
  res.status(201).json(newFuncionario);
});

app.put('/funcionarios/:id', (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  funcionarios = funcionarios.map(func =>
  String(func.id) === String(id) ? { ...func, ...updatedData } : func);;
  res.json(updatedData);
});

app.delete('/funcionarios/:id', (req, res) => {
  const { id } = req.params;
  funcionarios = funcionarios.filter(func => func.id !== id);
  res.status(204).send();
});

app.listen(5000, () => {
  console.log('Servidor rodando em http://localhost:5000');
});
