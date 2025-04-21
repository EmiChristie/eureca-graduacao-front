import { Footer } from "@/components/geral/Footer";
import { Header } from "@/components/geral/Header";
import { TabelaDeCursos } from "@/components/home/TabelaDeCursos";
import { Box } from "@chakra-ui/react";

const Home = () => {

  return (
    <>
      <Box h={"100vh"} overflow={"hidden"}>
        <Header/>
        <TabelaDeCursos/>
        <Footer/>
      </Box>
    </>
  );
};

export default Home;
