interface EmBreveProps {
  marginStyle: string
}


export default function EmBreve({marginStyle}: EmBreveProps) {
  return (
    <div style={{ backgroundColor: '#4FA1C1', width: '100%', justifyContent: 'center', display: 'flex', borderRadius: '20px', marginBottom: marginStyle, color: 'white' }}>
        <h1>Em Breve</h1>
    </div>
  )
}
