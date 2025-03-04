import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CalendarBox from "@/components/CalenderBox";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تقویم",
  // other metadata
};

const CalendarPage = () => {
  return (
    <>
      <Breadcrumb pageName="تقویم" />

      <CalendarBox />
    </>
  );
};

export default CalendarPage;
