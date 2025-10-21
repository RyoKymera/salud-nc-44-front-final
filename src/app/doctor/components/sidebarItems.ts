// sidebarItems.ts
import {
  HiMiniCalendarDays,
  HiMiniVideoCamera,
  HiMiniUserGroup,
  HiMiniClipboardDocumentList,
  HiArrowLeftEndOnRectangle,
} from "react-icons/hi2";

export interface SidebarItemType {
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  // href?: string  // lo dejamos comentado para después
}

export const sidebarItems: SidebarItemType[] = [
  {
    label: "Schedule", // Mi Agenda
    icon: HiMiniCalendarDays,
  },
  {
    label: "Teleconsult",
    icon: HiMiniVideoCamera,
  },
  {
    label: "Patients",
    icon: HiMiniUserGroup,
  },
  {
    label: "Records", // Historiales
    icon: HiMiniClipboardDocumentList,
  },
  {
    label: "Logout",
    icon: HiArrowLeftEndOnRectangle,
  },
];
