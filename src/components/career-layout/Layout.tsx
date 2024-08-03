import { ReactNode } from "react";
import Navbar from "@/components/website-layout/Navbar";
import Footer from "@/components/website-layout/Footer";
import Header from "@/components/views/career/Header";
import Container from "@/components/shared/Container";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-[#F9FBFD]">
      <Container
        style={{
          backgroundImage: `url(/header-bg.png)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <Navbar />
        <Header />
      </Container>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
