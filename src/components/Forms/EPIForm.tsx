import { useState } from 'react';
import { Select, Input, Button } from 'antd';

export default function EPIForm() {
    const [epiList, setEpiList] = useState([{ id: 1 }]);

    const handleAddEpi = () => {
        setEpiList([...epiList, { id: epiList.length + 1 }]);
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', border: '1px solid #649FBF', padding: '0px 12px', gap: '6px', borderRadius: '10px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.3)', marginBottom: '10px' }}>
                <ul style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '0px', gap: '10px', justifyContent: 'left' }}>
                    <span>Selecione a atividade:</span>
                    <Select size="large" placeholder='Atividade'>
                        <Select.Option value="atividade1">Atividade 1</Select.Option>
                        <Select.Option value="atividade2">Atividade 2</Select.Option>
                        <Select.Option value="atividade3">Atividade 3</Select.Option>
                    </Select>
                </ul>

                {epiList.map((epi) => (
                    <ul key={epi.id} style={{ display: 'flex', width: '100%', padding: '0px', gap: '8px', justifyContent: 'left' }}>
                        <li style={{ display: 'flex', flexDirection: 'column', width: '227px', gap: '8px' }}>
                            <span>Selecione o EPI</span>
                            <Select placeholder="Calçado de segurança">
                                <Select.Option value="calçado">Calçado de segurança</Select.Option>
                                <Select.Option value="capacete">Capacete</Select.Option>
                                <Select.Option value="luvas">Luvas</Select.Option>
                            </Select>
                        </li>

                        <li style={{ display: 'flex', flexDirection: 'column', width: '227px', gap: '8px' }}>
                            <span>Informe o número do CA:</span>
                            <Input placeholder="Número" />
                        </li>

                        <li style={{ display: 'flex', flexDirection: 'column', width: '227px', gap: '8px', paddingTop: '26px' }}>
                            <Button type='link' style={{ color: '#649FBF', border: '1px solid #649FBF' }} onClick={handleAddEpi}>Adicionar EPI</Button>
                        </li>
                    </ul>
                ))}
            </div>
        </div>
    );
}