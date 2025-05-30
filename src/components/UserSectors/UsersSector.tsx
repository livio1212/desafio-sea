import { Button, Modal } from "antd";
import { useDispatch } from "react-redux";
import { setFuncionario, removeFuncionario } from "../../store/slices/funcionarioSlice";
import { useState } from "react";
import { toggleFormVisibility } from "../../store/slices/formSlice";

interface UsersSectorProps {
    nome: string;
    cpf: string;
    ativo: boolean;
    cargo: string;
}

const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export default function UsersSector({ nome, cpf, ativo, cargo }: UsersSectorProps) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleEditEmployee = () => {
        const funcionarioData = { nome, cpf, rg: '', sexo: 1, dataNascimento: null, ativo, cargo };
        dispatch(setFuncionario(funcionarioData));
        dispatch(toggleFormVisibility());
    };

    const handleDeleteEmployee = () => {
        dispatch(removeFuncionario(cpf));
        setIsModalVisible(false);
    };

    return (
        <div className="usersSector">
            <div className="userContent" style={{ width: '714px' }}>
                <div>
                    <ul style={{ color: '#707070' }}>
                        <p style={{ fontSize: '24px' }}>{nome}</p>
                        <li>
                            <div style={{ backgroundColor: '#649FBF', borderRadius: '36px', padding: '4px 16px', color: 'white', fontSize: '13px' }}>
                                <p>{formatCPF(cpf)}</p>
                            </div>
                            <div style={{ backgroundColor: '#649FBF', borderRadius: '36px', padding: '4px 16px', color: 'white', fontSize: '13px' }}>
                                <p>{ativo ? 'Ativo' : 'Inativo'}</p>
                            </div>
                            <div style={{ backgroundColor: '#649FBF', borderRadius: '36px', padding: '4px 16px', color: 'white', fontSize: '13px' }}>
                                <p>{cargo}</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <Button onClick={showModal} className="buttonStyle">...</Button>
            </div>

            <Modal
                title="Escolha uma ação"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Button onClick={handleEditEmployee} style={{ width: '100%', marginBottom: '8px' }}>Alterar</Button>
                <Button onClick={handleDeleteEmployee} danger={true} style={{ width: '100%' }}>Excluir</Button>
            </Modal>
        </div>
    );
}
