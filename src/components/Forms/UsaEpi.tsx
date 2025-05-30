import { Checkbox, Button } from 'antd'
import EPIForm from './EPIForm'
import UlCustom from './UlCustom'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { toggleUsaEPI } from '../../store/slices/epiSlice';
import AtestadoSaúde from './AtestadoSaúde';
import { useState } from 'react';

export default function UsaEpi() {

    const usaEPI = useSelector((state: RootState) => state.epi.usaEPI);
    const dispatch = useDispatch();
    const [activityList, setActivityList] = useState([1]);

    const handleCheckboxChange = () => {
        dispatch(toggleUsaEPI());
    }
    const handleAddActivity = () => {
        setActivityList([...activityList, activityList.length + 1]);
    };

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #649FBF', padding: '0px 12px', gap: '15px', borderRadius: '10px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.3)' }}>
                <div>
                    <UlCustom>
                        <span>Quais EPIs o trabalhador usa na atividade?</span>
                        <li>
                            <Checkbox checked={!usaEPI} onChange={handleCheckboxChange}>O trabalhador não usa EPI</Checkbox>
                        </li>
                    </UlCustom>
                </div>

                {usaEPI && activityList.map((index) => (
                    <EPIForm key={index} />
                ))}

                {usaEPI && (
                    <Button type="link" style={{ marginBottom: '12px', color: '#649FBF', border: '1px solid #649FBF' }} onClick={handleAddActivity}>Adicionar Outra Atividade</Button>
                )}

            </div>
            {usaEPI && <AtestadoSaúde />}
        </>
    )
}
