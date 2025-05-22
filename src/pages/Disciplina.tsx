import { CursoPage } from "@/components/curso/CursoPage";
import { DisciplinaPage } from "@/components/disciplina/DisciplinaPage";
import { Footer } from "@/components/geral/Footer";
import { Header } from "@/components/geral/Header";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const Disciplina = () => {
  
  let { idc,idd } = useParams();

  return (
    <>
      <Box h={"100vh"} overflow={"hidden"}>
        <DisciplinaPage codigo_curso={parseInt(idc)} codigo_disciplina={parseInt(idd)}/>
      </Box>
    </>
  );
};

export default Disciplina;