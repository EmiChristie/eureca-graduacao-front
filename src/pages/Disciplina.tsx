import { CursoPage } from "@/components/curso/CursoPage";
import { DisciplinaPage } from "@/components/disciplina/DisciplinaPage";
import { Footer } from "@/components/geral/Footer";
import { Header } from "@/components/geral/Header";
import { useUserStore } from "@/stores/user/user.store";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const Disciplina = () => {
  
  let { idc,idd } = useParams();
  const user = useUserStore((state) => state);

  return (
    <>
      <Box h={"100vh"} overflow={"hidden"}>
        {
          user.profile && user.profile.type.toLowerCase() === "aluno" && idc === user.profile.code ?
        <DisciplinaPage flag_aluno_do_curso={true} codigo_curso={parseInt(idc)} codigo_disciplina={parseInt(idd)} codigo_curriculo={user.user.codigo_do_curriculo}/>
        :
        <DisciplinaPage flag_aluno_do_curso={false} codigo_curso={parseInt(idc)} codigo_disciplina={parseInt(idd)}/>
        }
      </Box>
    </>
  );
};

export default Disciplina;