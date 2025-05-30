// Importa componentes visuais e hooks do Redux
import { Button, Switch } from "antd";
import UsersSector from "../UserSectors/UsersSector";
import "./headerForm.css";

import { useDispatch, useSelector } from "react-redux";
import { toggleFormVisibility } from "../../store/slices/formSlice";
import { toggleStepCompletion } from "../../store/slices/stepSlice";
import { RootState } from "../../store/index";

import { useState } from "react";

export default function HeaderForm() {
  const dispatch = useDispatch();

  // Pega lista de funcionários do Redux
  const funcionarios = useSelector((state: RootState) => state.funcionario.funcionarios);

  // Verifica se a etapa foi concluída (estado global)
  const isStepCompleted = useSelector((state: RootState) => state.step.isCompleted);

  // Estado local para controlar se filtro de ativos está ligado
  const [filterActive, setFilterActive] = useState(false);

  // Abre o formulário para adicionar funcionário
  const handleAddEmployeeClick = () => {
    dispatch(toggleFormVisibility());
  };

  // Alterna o estado da etapa concluída
  const handleSwitchChange = (checked: boolean) => {
    dispatch(toggleStepCompletion(checked));
  };

  // Ativa o filtro de funcionários ativos
  const handleFilterActive = () => {
    setFilterActive(true);
  };

  // Remove o filtro de ativos
  const handleClearFilter = () => {
    setFilterActive(false);
  };

  // Aplica o filtro de ativos (caso esteja ativado)
  const filteredFuncionarios = filterActive
    ? funcionarios.filter((funcionario) => funcionario.ativo)
    : funcionarios;

  return (
    <div className="formContainer">
      {/* Barra azul superior */}
      <div className="blue-bar">
        <div className="content">
          <p style={{ color: "white", fontSize: "24px" }}>Funcionário(s)</p>
        </div>
      </div>

      {/* Container principal */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%" }}>

        {/* Botões de ação */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px 18px" }}>
          <Button
            variant="outlined"
            style={{ color: "#649FBF", width: "714px", height: "64px", border: "0.5px solid #649FBF" }}
            onClick={handleAddEmployeeClick}
          >
            + Adicionar Funcionário
          </Button>

          {/* Filtro de ativos */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: "30px" }}>
              <Button
                style={{ border: "0.5px solid #649FBF", color: "#649FBF" }}
                onClick={handleFilterActive}
                disabled={filterActive} // Evita clicar de novo com o filtro já ativado
              >
                Ver apenas ativos
              </Button>
              <Button
                variant="outlined"
                style={{ border: "0.5px solid #959595", color: "#959595" }}
                onClick={handleClearFilter}
              >
                Limpar filtros
              </Button>
            </div>

            {/* Contador de ativos */}
            <div>
              <p style={{ fontSize: "14px" }}>
                Ativos {filterActive ? filteredFuncionarios.length : funcionarios.length} / {funcionarios.length}
              </p>
            </div>
          </div>
        </div>

        {/* Lista de funcionários */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {filteredFuncionarios.map((funcionario, index) => (
            <UsersSector
              key={index}
              nome={funcionario.nome}
              cpf={funcionario.cpf}
              ativo={funcionario.ativo}
              cargo={funcionario.cargo}
            />
          ))}
        </div>

        {/* Switch de etapa concluída */}
        <div style={{ display: "flex", padding: "24px 16px", width: "100%", justifyContent: "right" }}>
          <div style={{ display: "flex", fontSize: "14px", justifyContent: "space-between", width: "199px" }}>
            A etapa está concluída?
            <Switch
              unCheckedChildren="Não"
              checkedChildren="Sim"
              size="small"
              checked={isStepCompleted}
              onChange={handleSwitchChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
