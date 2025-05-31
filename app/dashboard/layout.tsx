// create a layout component for the dashboard
import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "../components/Navbar";
import { GlobalProvider } from "../context/GlobalContext";

const DashboardLayout = ({ children, pageProps }: {children: ReactNode; pageProps: any }) => {
  return (
    <ClerkProvider>
      <GlobalProvider>
        <Navbar />
        <main>{children  }</main>
      </GlobalProvider>
    </ClerkProvider>
  );
};

export default DashboardLayout;
