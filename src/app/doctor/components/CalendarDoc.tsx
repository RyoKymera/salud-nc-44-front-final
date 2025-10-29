"use client";

import { Calendar, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer } from "@/app/doctor/utils/localizer";

interface Event {
  title: string;
  start: Date;
  end: Date;
}

const events: Event[] = [
  {
    title: "Reunión de prueba",
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 5)),
  },
];

export default function MyCalendar() {
  return (
    <div className="h-screen bg-white dark:bg-gray-900 p-4 rounded-md shadow">
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={Views.MONTH}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
      />
    </div>
  );
}
