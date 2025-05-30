import React from "react"

interface StyleListProps {
    children: React.ReactNode;
}

const ulCustom: React.FC<StyleListProps> = ({ children }) => {

    const ulStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        padding: '0',
        gap: '8px',
    }

    return (
        <ul style={ulStyle}>
            {children}
        </ul>
    )
}

export default ulCustom;