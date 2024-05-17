import { ReactNode } from "react";
import Navbar from "@/components/website-layout/Navbar";
import Footer from "@/components/website-layout/Footer";
import Header from "@/components/views/website/Header";
import Container from "@/components/shared/Container";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Container
        style={{
          backgroundImage: `url(/header-bg.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
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
