// create a layout component for the dashboard
import { ReactNode } from "react";
import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }: {children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default DashboardLayout;
