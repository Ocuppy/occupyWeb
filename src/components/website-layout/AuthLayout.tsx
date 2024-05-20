import { ReactNode } from "react";
import Navbar from "@/components/website-layout/Navbar";
import Container from "@/components/shared/Container";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Container
        style={{
          backgroundImage: `url(/header-bg.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <Navbar />
      </Container>
      <main>{children}</main>
    </div>
  );
};

export default AuthLayout;
