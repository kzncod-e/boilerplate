export type EventColor = "red" | "blue" | "green" | "purple" | "orange";

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: string; // ISO yyyy-MM-dd
  color: EventColor;
}

export interface CalendarProps {
  initialEvents?: CalendarEvent[];
  showSidebar?: boolean;
}
