import { Button } from "antd";
import UsersSector from "../UserSectors/UsersSector";
import "./headerForm.css"
import { Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleFormVisibility } from "../../store/slices/formSlice";
import { RootState } from "../../store/index";
import { toggleStepCompletion } from "../../store/slices/stepSlice";
import { useState } from "react";


export default function HeaderForm() {

    const dispatch = useDispatch();
    const funcionarios = useSelector((state: RootState) => state.funcionario.funcionarios);
    const isStepCompleted = useSelector((state: RootState) => state.step.isCompleted);
    const [filterActive, setFilterActive] = useState(false);

    const handleAddEmployeeClick = () => {
        dispatch(toggleFormVisibility());
    };

    const handleSwitchChange = (checked: boolean) => {
        dispatch(toggleStepCompletion(checked));
    };

    const handleFilterActive = () => {
        setFilterActive(!filterActive);
    };

    const handleClearFilter = () => {
        setFilterActive(false);
    };

    const filteredFuncionarios = filterActive
        ? funcionarios.filter((funcionario) => funcionario.ativo)
        : funcionarios;

    return (
        <div className="formContainer">
            <div className="blue-bar">
                <div className="content">
                    <p style={{ color: 'white', fontSize: '24px' }}>Funcionário(s)</p>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px 18px' }}>
                    <Button variant="outlined" style={{ color: '#649FBF', width: '714px', height: '64px', border: '0.5px solid #649FBF' }} onClick={handleAddEmployeeClick}>+ Adicionar Funcionário</Button>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: '30px' }}>
                            <Button style={{ border: '0.5px solid #649FBF', color: "#649FBF" }} onClick={handleFilterActive} disabled={filterActive}>{filterActive ? "Ver apenas ativos" : "Ver apenas ativos"}</Button>
                            <Button variant="outlined" style={{ border: '0.5px solid #959595', color: '#959595' }} onClick={handleClearFilter}>Limpar filtros</Button>
                        </div>
                        <div><p style={{ fontSize: '14px' }}>Ativos {filterActive ? funcionarios.filter((f) => f.ativo).length : funcionarios.length} / {funcionarios.length}</p></div>
                    </div>

                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {filteredFuncionarios.map((funcionario, index) => (<UsersSector key={index} nome={funcionario.nome} cpf={funcionario.cpf} ativo={funcionario.ativo} cargo={funcionario.cargo} />))}
                </div>

                <div style={{ display: 'flex', padding: '24px 16px', width: '100%', justifyContent: 'right' }}>
                    <div style={{ display: 'flex', fontSize: '14px', justifyContent: 'space-between', width: '199px' }}>
                        A etapa está concluída?
                        <Switch unCheckedChildren='Não' checkedChildren='Sim' size="small" checked={isStepCompleted} onChange={handleSwitchChange}></Switch>

                    </div>
                </div>

            </div >
        </div>

    )
}
