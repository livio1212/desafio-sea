import MenuLateralIconsCustom from "../icons/MenuLateralIconsCustom";
import "./menuLateral.css";
import { FormOutlined, ApartmentOutlined, BellOutlined, ClockCircleOutlined, UserOutlined } from "@ant-design/icons";

interface MenuLateralProps {
    activePage: string;
    setActivePage: (page: string) => void;
}

export default function MenuLateral({ activePage, setActivePage }: MenuLateralProps) {

    const menuItems = [
        { id: "form", icon: <FormOutlined /> },
        { id: "apartment", icon: <ApartmentOutlined /> },
        { id: "bell", icon: <BellOutlined /> },
        { id: "clock", icon: <ClockCircleOutlined /> },
        { id: "user", icon: <UserOutlined /> },
    ];

    return (
        <>
            <div className="outplay"></div>
            <div className="menuConteiner">
                <div className="iconsMenuLateral" style={{ display: "flex", flexDirection: "column", height: "312px", alignItems: "center", justifyContent: "center", gap: "24px" }}>
                    {menuItems.map((item) => (
                        <button key={item.id} onClick={() => setActivePage(item.id)} className={`menuButton ${activePage === item.id ? "active" : ""}`}>
                            <MenuLateralIconsCustom icon={item.icon} />
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
