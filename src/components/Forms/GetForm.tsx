import { Button, RadioChangeEvent, DatePicker, Select } from "antd";
import { useEffect, useState } from "react";
import { Radio } from "antd";
import UlCustom from "./UlCustom";
import InputCustom from "./InputCustom";
import FuncionarioStatus from "./FuncionarioStatus";
import UsaEpi from "./UsaEpi";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleFormVisibility } from "../../store/slices/formSlice";
import api from "../../api";
import { setFuncionario, clearFuncionarioEditado } from "../../store/slices/funcionarioSlice";
import moment from "moment";

interface FuncionariosProps {
  nome: string;
  cpf: string;
  rg: string;
  sexo: number;
  dataNascimento: Date | null;
  cargo: string;
  ativo: boolean;
}

export default function GetForm() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [sexo, setSexo] = useState(1);
  const [dataNascimento, setDataNascimento] = useState<moment.Moment | null>(null);
  const [cargo, setCargo] = useState("");
  const [isAtivo, setIsAtivo] = useState(false);

  const dispatch = useDispatch();
  const funcionarioEditado = useSelector((state: any) => state.funcionario.funcionarioEditado);

  useEffect(() => {
    if (funcionarioEditado) {
      setNome(funcionarioEditado.nome);
      setCpf(funcionarioEditado.cpf);
      setRg(funcionarioEditado.rg);
      setSexo(funcionarioEditado.sexo);
      setDataNascimento(moment(funcionarioEditado.dataNascimento));
      setCargo(funcionarioEditado.cargo);
      setIsAtivo(funcionarioEditado.ativo);
    }
  }, [funcionarioEditado]);

  const onChange = (e: RadioChangeEvent) => {
    setSexo(e.target.value);
  };

  const handleBackClick = () => {
    dispatch(toggleFormVisibility());
    dispatch(clearFuncionarioEditado());
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !cpf || !rg || !cargo || !dataNascimento) {
      alert('Todos os campos são obrigatórios');
      return;
    }

    const formData: FuncionariosProps = {
      nome,
      cpf,
      rg,
      sexo,
      dataNascimento: dataNascimento ? dataNascimento.toDate() : null,
      cargo,
      ativo: isAtivo,
    };

    try {
      if (funcionarioEditado) {
        await api.put(`/funcionarios/${cpf}`, formData);
      } else {
        await api.post('/funcionarios', formData);
      }
      dispatch(setFuncionario(formData));
      setNome('');
      setCpf('');
      setRg('');
      setSexo(1);
      setDataNascimento(null);
      setCargo('');
      setIsAtivo(false);
    } catch (error) {
      console.error('Erro ao salvar ou editar o funcionário', error);
    }
  };

  return (
    <form className="formContainer">
      <div className="blue-bar">
        <div className="content">
          <ul style={{ display: 'flex', padding: '0px', margin: '0px', gap: '15px' }}>
            <Button onClick={handleBackClick} style={{ backgroundColor: '#649FBF', color: 'white', border: 'none' }} icon={<ArrowLeftOutlined style={{ color: 'white' }} />} />
            <p style={{ color: 'white', fontSize: '24px' }}>{funcionarioEditado ? 'Editar Funcionário' : 'Adicionar Funcionário'}</p>
          </ul>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', padding: '16px 24px', gap: '16px' }}>
        <FuncionarioStatus isAtivo={isAtivo} setIsAtivo={setIsAtivo} />
        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #649FBF', padding: '0px 12px', gap: '24px', borderRadius: '10px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.3)' }}>
          <div style={{ width: '333px' }}>
            <UlCustom>
              <span>Nome</span>
              <InputCustom placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </UlCustom>

            <UlCustom>
              <span>CPF</span>
              <InputCustom placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} maxLenght={11} required />
            </UlCustom>

            <UlCustom>
              <span>RG</span>
              <InputCustom placeholder="RG" value={rg} onChange={(e) => setRg(e.target.value)} maxLenght={7} required />
            </UlCustom>
          </div>

          <div>
            <UlCustom>
              <span>Sexo</span>
              <Radio.Group onChange={onChange} value={sexo} style={{ padding: '10px 0px' }}>
                <Radio value={1}>Masculino</Radio>
                <Radio value={2}>Feminino</Radio>
              </Radio.Group>
            </UlCustom>

            <UlCustom>
              <span>Data de Nascimento</span>
              <DatePicker
                style={{ border: '1px solid #649FBF', borderRadius: '10px', padding: '8px' }}
                format={'DD/MM/YYYY'}
                value={dataNascimento}
                onChange={(date) => setDataNascimento(date)}
              />
            </UlCustom>

            <UlCustom>
              <span>Cargo</span>
              <Select
                placeholder="Cargo"
                style={{ height: '40px' }}
                value={cargo}
                onChange={setCargo}
              >
                <Select.Option value="gerente">Gerente</Select.Option>
                <Select.Option value="desenvolvedor">Desenvolvedor</Select.Option>
                <Select.Option value="analista">Analista</Select.Option>
                <Select.Option value="coordenador">Coordenador</Select.Option>
                <Select.Option value="assistente">Assistente</Select.Option>
              </Select>
            </UlCustom>
          </div>
        </div>

        <UsaEpi />

        <Button onClick={handleSave} type="link" htmlType="submit" style={{ color: '#649FBF', border: '1px solid #649FBF', marginBottom: '15px' }}>
          {funcionarioEditado ? 'Salvar Alterações' : 'Salvar'}
        </Button>
      </div>
    </form>
  );
}

