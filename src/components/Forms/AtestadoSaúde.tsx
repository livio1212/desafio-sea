import UploadButton from './UploadButton'


export default function AtestadoSaúde() {
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #649FBF', padding: '12px', gap: '15px', borderRadius: '10px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.3)' }}>
                <span>Adicione outro Atestado de Saúde(Opcional):</span>
                <UploadButton />
            </div>
        </>
    )
}
