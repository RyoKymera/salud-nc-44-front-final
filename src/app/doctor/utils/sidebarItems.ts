// sidebarItems.ts
import {
  HiMiniCalendarDays,
  HiMiniVideoCamera,
  HiMiniUserGroup,
  HiMiniClipboardDocumentList,
  HiArrowLeftEndOnRectangle,
  HiOutlineBars3
} from "react-icons/hi2";

export interface SidebarItemType {
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  // href?: string  // lo dejamos comentado para después
}

export const sidebarItems: SidebarItemType[] = [
  {
    label: "", //Menú Hamburguesa
    icon: HiOutlineBars3,
  },
  {
    label: "Mi Agenda", 
    icon: HiMiniCalendarDays,
  },
  {
    label: "Teleconsulta", 
    icon: HiMiniVideoCamera,
  },
  {
    label: "Pacientes", 
    icon: HiMiniUserGroup,
  },
  {
    label: "Historiales", 
    icon: HiMiniClipboardDocumentList,
  },
  {
    label: "Cerrar Sesión", //Este label y si se agrega configuración, se deben ajustar en el span de SidebarDoc
    icon: HiArrowLeftEndOnRectangle,
  },
];
