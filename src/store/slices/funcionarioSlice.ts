// Importa ferramentas do Redux Toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define o formato do estado relacionado aos funcionários
interface Funcionario {
  nome: string;
  cpf: string;
  rg: string;
  sexo: number;
  dataNascimento: string | null;
  cargo: string;
  ativo: boolean;
}

// Estado inicial: lista de funcionários e funcionário em edição
interface FuncionarioState {
  funcionarios: Funcionario[];
  funcionarioEditado: Funcionario | null;
}

const initialState: FuncionarioState = {
  funcionarios: [],
  funcionarioEditado: null,
};

// Cria o slice do Redux para o domínio "funcionario"
const funcionarioSlice = createSlice({
  name: 'funcionario',
  initialState,
  reducers: {
    // Adiciona ou atualiza um funcionário com base no CPF
    setFuncionario: (state, action: PayloadAction<Funcionario>) => {
      const index = state.funcionarios.findIndex(f => f.cpf === action.payload.cpf);
      if (index !== -1) {
        // Atualiza funcionário existente
        state.funcionarios[index] = action.payload;
      } else {
        // Adiciona novo funcionário
        state.funcionarios.push(action.payload);
      }
    },

    // Reseta o estado ao valor inicial
    resetFuncionario: () => initialState,

    // Remove um funcionário com base no CPF
    removeFuncionario: (state, action: PayloadAction<string>) => {
      state.funcionarios = state.funcionarios.filter(f => f.cpf !== action.payload);
    },

    // Define qual funcionário está sendo editado
    setFuncionarioEditado: (state, action: PayloadAction<Funcionario>) => {
      state.funcionarioEditado = action.payload;
    },

    // Limpa o funcionário que está sendo editado
    clearFuncionarioEditado: (state) => {
      state.funcionarioEditado = null;
    },
  },
});

// Exporta as actions 
export const {
  setFuncionario,
  resetFuncionario,
  removeFuncionario,
  setFuncionarioEditado,
  clearFuncionarioEditado
} = funcionarioSlice.actions;

// Exporta o reducer 
export default funcionarioSlice.reducer;
