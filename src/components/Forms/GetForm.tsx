import { Button, DatePicker, Radio, Select } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFormVisibility } from "../../store/slices/formSlice";
import { setFuncionario, clearFuncionarioEditado } from "../../store/slices/funcionarioSlice";
import moment from "moment";

// Componentes customizados
import UlCustom from "./UlCustom";
import InputCustom from "./InputCustom";
import FuncionarioStatus from "./FuncionarioStatus";
import UsaEpi from "./UsaEpi";

// API e notificações
import api from "../../api";
import { toast } from "react-toastify";

// Lista de cargos disponíveis para seleção
const cargos = ["gerente", "desenvolvedor", "analista", "coordenador", "assistente"];

export default function GetForm() {
  // Estado local do formulário
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    rg: "",
    sexo: 1,
    dataNascimento: null as moment.Moment | null,
    cargo: "",
    ativo: false,
  });

  const dispatch = useDispatch();

  // Pega do Redux o funcionário sendo editado, se houver
  const funcionarioEditado = useSelector((state: any) => state.funcionario.funcionarioEditado);

  // Preenche os campos do formulário caso esteja editando
  useEffect(() => {
    if (funcionarioEditado) {
      setForm({
        ...funcionarioEditado,
        dataNascimento: moment(funcionarioEditado.dataNascimento),
      });
    }
  }, [funcionarioEditado]);

  // Função para atualizar um campo específico do formulário
  const handleChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  // Volta para a lista e limpa o estado de edição
  const handleBackClick = () => {
    dispatch(toggleFormVisibility());
    dispatch(clearFuncionarioEditado());
  };

  // Lida com o envio do formulário
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação simples
    const { nome, cpf, rg, cargo, dataNascimento } = form;
    if (!nome || !cpf || !rg || !cargo || !dataNascimento) {
      alert("Todos os campos são obrigatórios");
      return;
    }

    const formData = {
      ...form,
      dataNascimento: dataNascimento.toDate(), // Converte Moment para Date
    };

    try {
      if (funcionarioEditado) {
        // Atualiza funcionário existente
        await api.put(`/funcionarios/${cpf}`, formData);
        toast.success("Funcionário editado com sucesso!");
      } else {
        // Cria novo funcionário
        await api.post("/funcionarios", formData);
        toast.success("Funcionário salvo com sucesso!");
      }

      // Atualiza Redux com os dados salvos
      dispatch(setFuncionario({
        ...formData,
        dataNascimento: formData.dataNascimento ? formData.dataNascimento.toISOString() : null,
      }));

      // Limpa o formulário
      setForm({ nome: "", cpf: "", rg: "", sexo: 1, dataNascimento: null, cargo: "", ativo: false });
    } catch (error) {
      toast.error("Erro ao salvar funcionário");
    }
  };

  return (
    <form className="formContainer">
      {/* Cabeçalho azul com botão de voltar */}
      <div className="blue-bar">
        <div className="content">
          <ul style={{ display: "flex", gap: "15px", margin: 0, padding: 0 }}>
            <Button
              onClick={handleBackClick}
              style={{ backgroundColor: "#649FBF", color: "white", border: "none" }}
              icon={<ArrowLeftOutlined />}
            />
            <p style={{ color: "white", fontSize: "24px" }}>
              {funcionarioEditado ? "Editar Funcionário" : "Adicionar Funcionário"}
            </p>
          </ul>
        </div>
      </div>

      {/* Corpo do formulário */}
      <div style={{ display: "flex", flexDirection: "column", padding: "16px 24px", gap: "16px" }}>
        <FuncionarioStatus isAtivo={form.ativo} setIsAtivo={(ativo) => handleChange("ativo", ativo)} />

        {/* Bloco de campos principais */}
        <div style={{ display: "flex", gap: "24px", padding: "12px", border: "1px solid #649FBF", borderRadius: "10px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.3)" }}>
          <div style={{ width: "333px" }}>
            {/* Campos: nome, cpf, rg */}
            {["nome", "cpf", "rg"].map((field) => (
              <UlCustom key={field}>
                <span>{field.toUpperCase()}</span>
                <InputCustom
                  placeholder={field.toUpperCase()}
                  value={form[field as keyof typeof form]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  required
                />
              </UlCustom>
            ))}
          </div>

          {/* Campos: sexo, dataNascimento, cargo */}
          <div>
            <UlCustom>
              <span>Sexo</span>
              <Radio.Group
                onChange={(e) => handleChange("sexo", e.target.value)}
                value={form.sexo}
                style={{ padding: "10px 0" }}
              >
                <Radio value={1}>Masculino</Radio>
                <Radio value={2}>Feminino</Radio>
              </Radio.Group>
            </UlCustom>

            <UlCustom>
              <span>Data de Nascimento</span>
              <DatePicker
                style={{ border: "1px solid #649FBF", borderRadius: "10px", padding: "8px" }}
                format="DD/MM/YYYY"
                value={form.dataNascimento}
                onChange={(date) => handleChange("dataNascimento", date)}
              />
            </UlCustom>

            <UlCustom>
              <span>Cargo</span>
              <Select
                placeholder="Cargo"
                style={{ height: "40px" }}
                value={form.cargo}
                onChange={(value) => handleChange("cargo", value)}
              >
                {cargos.map((c) => (
                  <Select.Option key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </Select.Option>
                ))}
              </Select>
            </UlCustom>
          </div>
        </div>

        {/* Componente adicional (exemplo: EPI) */}
        <UsaEpi />

        {/* Botão de salvar */}
        <Button
          onClick={handleSave}
          type="link"
          htmlType="submit"
          style={{ color: "#649FBF", border: "1px solid #649FBF", marginBottom: "15px" }}
        >
          {funcionarioEditado ? "Salvar Alterações" : "Salvar"}
        </Button>
      </div>
    </form>
  );
}
 
