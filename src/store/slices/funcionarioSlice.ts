import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FuncionarioState {
    funcionarios: {
        nome: string;
        cpf: string;
        rg: string;
        sexo: number;
        dataNascimento: string | null;
        cargo: string;
        ativo: boolean;
    }[];
    funcionarioEditado: {
        nome: string;
        cpf: string;
        rg: string;
        sexo: number;
        dataNascimento: string | null;
        cargo: string;
        ativo: boolean;
    } | null;
}

const initialState: FuncionarioState = {
    funcionarios: [],
    funcionarioEditado: null,
};

const funcionarioSlice = createSlice({
    name: 'funcionario',
    initialState,
    reducers: {
        setFuncionario: (state, action: PayloadAction<typeof initialState.funcionarios[0]>) => {
            const index = state.funcionarios.findIndex(f => f.cpf === action.payload.cpf);
            if (index !== -1) {
                state.funcionarios[index] = action.payload;
            } else {
                state.funcionarios.push(action.payload);
            }
        },
        resetFuncionario: () => initialState,

        removeFuncionario: (state, action: PayloadAction<string>) => {
            state.funcionarios = state.funcionarios.filter(
                (funcionario) => funcionario.cpf !== action.payload
            );
        },

        setFuncionarioEditado: (state, action: PayloadAction<typeof initialState.funcionarios[0]>) => {
            state.funcionarioEditado = action.payload;
        },

        clearFuncionarioEditado: (state) => {
            state.funcionarioEditado = null;
        },
    },
});

export const { setFuncionario, resetFuncionario, removeFuncionario, setFuncionarioEditado, clearFuncionarioEditado } = funcionarioSlice.actions;

export default funcionarioSlice.reducer;
