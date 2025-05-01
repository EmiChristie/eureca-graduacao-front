import { CursoPage } from "@/components/curso/CursoPage";
import { Footer } from "@/components/geral/Footer";
import { Header } from "@/components/geral/Header";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const Curso = () => {
  
  let { id } = useParams();

  return (
    <>
      <Box h={"100vh"} overflow={"hidden"}>
        <Header/>
        <CursoPage codigo_curso={parseInt(id)}/>
        <Footer/>
      </Box>
    </>
  );
};

export default Curso;