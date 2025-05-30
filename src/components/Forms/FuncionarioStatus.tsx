import { Switch } from "antd"

interface FuncionarioStatusProps {
    isAtivo: boolean;
    setIsAtivo: (ativo: boolean) => void
}

export default function FuncionarioStatus({ isAtivo, setIsAtivo }: FuncionarioStatusProps) {
    const handleChange = (checked: boolean) => {
        setIsAtivo(checked);
      };
    return (
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px', justifyContent: 'space-between', border: '1px solid #649FBF', borderRadius: '10px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.3)' }}>
            <span>O trabalhador está ativo ou inativo?</span>
            <Switch checked={isAtivo} onChange={handleChange} checkedChildren='Ativo' unCheckedChildren='Inativo' />
        </div>
    )
}
