import "./Header.css";
import HeaderItem from "../icons/HeaderItem";

interface HeaderProps {
  activeHeaderItem: number;
  setActiveHeaderItem: (index: number) => void;
  isStepCompleted: boolean;
}

export default function Header({ activeHeaderItem, setActiveHeaderItem, isStepCompleted }: HeaderProps) {
  return (
    <div className='containerHeader'>
      <ul className="headerList">
        {Array.from({ length: 9 }, (_, index) => (
          <HeaderItem
            key={index}
            isActive={activeHeaderItem === index}
            isDisabled={!isStepCompleted}
            index={index}
            isStepCompleted={isStepCompleted}
            isCompleted={index < activeHeaderItem}
            onClick={() => {
              if (!isStepCompleted) return;
              setActiveHeaderItem(index);
            }}
          />
        ))}
      </ul>
    </div>
  );
}