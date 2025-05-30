import { Button, DatePicker, Radio, Select } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFormVisibility } from "../../store/slices/formSlice";
import { setFuncionario, clearFuncionarioEditado } from "../../store/slices/funcionarioSlice";
import moment from "moment";
import UlCustom from "./UlCustom";
import InputCustom from "./InputCustom";
import FuncionarioStatus from "./FuncionarioStatus";
import UsaEpi from "./UsaEpi";
import api from "../../api";
import { toast } from "react-toastify";


const cargos = ["gerente", "desenvolvedor", "analista", "coordenador", "assistente"];

export default function GetForm() {
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
  const funcionarioEditado = useSelector((state: any) => state.funcionario.funcionarioEditado);

  useEffect(() => {
    if (funcionarioEditado) {
      setForm({
        ...funcionarioEditado,
        dataNascimento: moment(funcionarioEditado.dataNascimento),
      });
    }
  }, [funcionarioEditado]);

  const handleChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleBackClick = () => {
    dispatch(toggleFormVisibility());
    dispatch(clearFuncionarioEditado());
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const { nome, cpf, rg, cargo, dataNascimento } = form;
    if (!nome || !cpf || !rg || !cargo || !dataNascimento) {
      alert("Todos os campos são obrigatórios");
      return;
    }

    const formData = {
      ...form,
      dataNascimento: dataNascimento.toDate(),
    };

    try {
      if (funcionarioEditado) {
        await api.put(`/funcionarios/${cpf}`, formData);
        toast.success("Funcionário editado com sucesso!");
      } else {
        await api.post("/funcionarios", formData);
        toast.success("Funcionário salvo com sucesso!");
        
      }
      dispatch(setFuncionario({
        ...formData,
        dataNascimento: formData.dataNascimento
        ? formData.dataNascimento.toISOString() : null,
      }));
      setForm({ nome: "", cpf: "", rg: "", sexo: 1, dataNascimento: null, cargo: "", ativo: false });
    } catch (error) {
      toast.error("Erro ao salvar funcionário");
    }
  };

  return (
    <form className="formContainer">
      <div className="blue-bar">
        <div className="content">
          <ul style={{ display: "flex", gap: "15px", margin: 0, padding: 0 }}>
            <Button onClick={handleBackClick} style={{ backgroundColor: "#649FBF", color: "white", border: "none" }} icon={<ArrowLeftOutlined />} />
            <p style={{ color: "white", fontSize: "24px" }}>{funcionarioEditado ? "Editar Funcionário" : "Adicionar Funcionário"}</p>
          </ul>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", padding: "16px 24px", gap: "16px" }}>
        <FuncionarioStatus isAtivo={form.ativo} setIsAtivo={(ativo) => handleChange("ativo", ativo)} />

        <div style={{ display: "flex", gap: "24px", padding: "12px", border: "1px solid #649FBF", borderRadius: "10px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.3)" }}>
          <div style={{ width: "333px" }}>
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

          <div>
            <UlCustom>
              <span>Sexo</span>
              <Radio.Group onChange={(e) => handleChange("sexo", e.target.value)} value={form.sexo} style={{ padding: "10px 0" }}>
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
              <Select placeholder="Cargo" style={{ height: "40px" }} value={form.cargo} onChange={(value) => handleChange("cargo", value)}>
                {cargos.map((c) => (
                  <Select.Option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</Select.Option>
                ))}
              </Select>
            </UlCustom>
          </div>
        </div>

        <UsaEpi />
        
        <Button onClick={handleSave} type="link" htmlType="submit" style={{ color: "#649FBF", border: "1px solid #649FBF", marginBottom: "15px" }}>
          {funcionarioEditado ? "Salvar Alterações" : "Salvar"}
        </Button>
      </div>
    </form>
  );
}

