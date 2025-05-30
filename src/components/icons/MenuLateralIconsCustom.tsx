import { ReactNode } from "react";

interface MenuLateralIconsCustomProps {
    icon: ReactNode;
}

export default function MenuLateralIconsCustom({ icon }: MenuLateralIconsCustomProps) {
  return (
    <div style={{ padding: '9px', backgroundColor: 'white', borderRadius: '10px' }}>
        { icon }
    </div>
  )
}
