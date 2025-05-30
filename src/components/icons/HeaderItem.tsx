import BankOutLineCustom from "../icons/BankOutLineCustom";

interface HeaderItemProps {
    isActive: boolean;
    onClick: () => void;
    isDisabled: boolean;
    index: number;
    isStepCompleted: boolean;
    isCompleted: boolean;
}

export default function HeaderItem({ isActive, onClick, isDisabled, index, isStepCompleted, isCompleted }: HeaderItemProps) {
    return (
        <div className={`headerItem ${isActive ? 'active' : ''}`}>
            <button onClick={onClick} disabled={isDisabled}>
                <li className="headerIcon" style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.3)', filter: isStepCompleted ? 'none' : isActive ? 'none' : 'grayscale(100%)' }}>
                    <BankOutLineCustom />
                </li>
            </button>
            <span className="headerText" style={{ fontSize: '13px', color: isStepCompleted ? '#649FBF' : isActive ? '#649FBF' : '#808080', cursor: 'default' }}>
                Item {index + 1}
            </span>
            {isCompleted && <span className="completedText" style={{ fontSize: '12px', color: '#649FBF' }}>Concluído</span>}
        </div>
    );
}