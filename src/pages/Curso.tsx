import { CursoPage } from "@/components/curso/CursoPage";
import { Footer } from "@/components/geral/Footer";
import { Header } from "@/components/geral/Header";
import { useUserStore } from "@/stores/user/user.store";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const Curso = () => {
  
  let { id } = useParams();
  const user = useUserStore((state) => state);

  return (
    <>
      <Box h={"100vh"} overflow={"hidden"}>
        {
          user.user && parseInt(id) === user.user.codigo_do_curso ?
        <CursoPage codigo_curso={parseInt(id)} codigo_curriculo={user.user.codigo_do_curriculo}/>
        :
        <CursoPage codigo_curso={parseInt(id)}/>
        }
      </Box>
    </>
  );
};

export default Curso;