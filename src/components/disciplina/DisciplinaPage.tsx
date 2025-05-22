import {
    Box,
    Breadcrumb,
    Button,
    Card,
    Center,
    Flex,
    Icon,
    Link,
    Spinner,
    Tabs,
    Text,
    VStack,
  } from "@chakra-ui/react";
  import { Toaster } from "@/components/ui/toaster";
  import { LuBlocks, LuBookCopy, LuBookText, LuChartLine, LuChevronRight, LuFrown, LuCombine, LuFolder, LuLayoutDashboard, LuLightbulb, LuSquareCheck, LuUndo, LuUndo2, LuUser, LuWorkflow, LuNotebook, LuNotebookPen, LuNotebookTabs, LuNotebookText, } from "react-icons/lu";
  import { useQuery } from "@tanstack/react-query";
  import { Curriculo, Curso, Disciplina, DisciplinaCurriculo } from "../../interfaces/types";
import { getCurso } from "@/service/metricasService";
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurriculoAtivoMaisRecente, getCurriculo, getDisciplinaCurriculo, getDisciplina } from "@/service/eurecaService";
import { CursoDiagnostico } from "../curso/CursoDiagnostico";
import { CursoFluxograma } from "../curso/CursoFluxograma";
import { CursoPerfil } from "../curso/CursoPerfil";
import { MeuDesempenho } from "../curso/MeuDesempenho";
import { PerfilDisciplina } from "./PerfilDisciplina";
  
export interface DisciplinaPageProps{
    codigo_curso:number,
    codigo_disciplina:number,
  }
    
  export const DisciplinaPage = (
    {
        codigo_curso,
        codigo_disciplina
    }:DisciplinaPageProps
  ) => {

    console.log(codigo_curso)

    const navigate = useNavigate();
    const [aba, setAba] = useState(1)

    const { data: curso, isLoading, isError } = useQuery<Curso, Error>({
        queryKey: ["curso", codigo_curso],
        queryFn: () => getCurso(codigo_curso),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        enabled: !!codigo_curso,
    });

    const { data: curriculo, isLoading:isLoading2, isError:isError2 } = useQuery<number, Error>({
      queryKey: ["curriculoAtivoMaisRecente", codigo_curso],
      queryFn: () => getCurriculoAtivoMaisRecente(codigo_curso),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      enabled: !!codigo_curso,
    });

    const { data: disciplinaCurriculo, isLoading:isLoading3, isError:isError3 } = useQuery<DisciplinaCurriculo[], Error>({
      queryKey: ["pegarDisciplinaCurriculo", codigo_curso],
      queryFn: () => getDisciplinaCurriculo(codigo_curso, curriculo,codigo_disciplina),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      enabled: !!curriculo && !!codigo_curso && !!codigo_disciplina,
    });

    const { data: disciplina, isLoading:isLoading4, isError:isError4 } = useQuery<Disciplina[], Error>({
      queryKey: ["pegarDisciplina", codigo_curso],
      queryFn: () => getDisciplina(codigo_disciplina),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      enabled: !!curriculo && !!codigo_curso,
    });

    console.log(disciplina);

    const requisitosDisciplina = {
        pre_requisitos: [
            {
                nome:"Disciplina 1",
                codigo:123456,
            },
            {
                nome:"Disciplina 1",
                codigo:123456,
            },
        ],
        co_requisitos: [
            {
                nome:"Disciplina 1",
                codigo:123456,
            },
        ],
        disciplinas_equivalentes:[
            
        ],
    }
  
    return (
      <>
        <Box color={EURECA_COLORS.CINZA}>
            <Center placeItems={"stretch"}>
            <Box my={4} ml={4} w={"20vw"}>
                <Box w={"full"}>
                    <Box h={"8vh"} bg={`${EURECA_COLORS.AZUL_ESCURO}/70`} boxShadow={"sm"} rounded={"sm"}>
                        <Center h={"8vh"} px={4} gapX={2}>
                            <LuLightbulb size={"4vh"} color={EURECA_COLORS.BRANCO}/>
                            <Text fontSize={"xl"} lineHeight={"shorter"} color={EURECA_COLORS.BRANCO}>Eureca Graduação</Text>
                        </Center>
                    </Box>
                    <Card.Root bg={"#7c95b9/70"} boxShadow={"sm"} h={"86vh"} mt={4}>
                        <Card.Body>
                            <Flex flexDir={"column"} gap={2}>
                                <Button justifyContent={"left"} variant={"ghost"} onClick={()=>setAba(1)}>
                                    <Link href="#" color={EURECA_COLORS.BRANCO} className="text">
                                        <LuNotebookText/> Perfil da disciplina
                                    </Link>
                                </Button>
                                {
                                    /*
                                        <Button justifyContent={"left"} variant={"ghost"} onClick={()=>setAba(2)}>
                                            <Link href="#" color={EURECA_COLORS.BRANCO} className="text">
                                                <LuBookCopy/> Perfil geral
                                            </Link>
                                        </Button>
                                    */
                                }
                                <Button justifyContent={"left"} variant={"ghost"} onClick={()=>navigate(`/curso/${codigo_curso}`)}>
                                    <Link href="#" color={EURECA_COLORS.BRANCO} className="text">
                                        <LuUndo2/> Voltar ao curso
                                    </Link>
                                </Button>
                            </Flex>
                        </Card.Body>
                    </Card.Root>
                </Box>
            </Box>

            <Box maxW={"80vw"} minW={"80vw"} w={"80vw"}>
                {
                    isLoading || isLoading2||isLoading3||isLoading4 ?
                    <>
                        <Box m={4} h={"8vh"} bgColor={`${EURECA_COLORS.AZUL_CLARO}/70`} boxShadow={"sm"} rounded={"sm"}>
                                <Flex alignItems={"center"} h={"8vh"} px={4} gap={2}>
                                <Text fontSize={"xl"} color={EURECA_COLORS.BRANCO}>Carregando curso...</Text>
                                </Flex>
                        </Box>
                        <Box>
                            <Center h={"80vh"}>
                                <VStack>
                                <Spinner color={`${EURECA_COLORS.AZUL_MEDIO}/70`} size={"lg"} borderWidth={3}/>
                                <Text fontWeight={"normal"} color={`${EURECA_COLORS.AZUL_MEDIO}/70`} mt={2}>Carregando Disciplina...</Text>
                                </VStack>
                            </Center>
                        </Box>
                    </>
                    :
                    isError||isError2||isError3||isError4 ?
                    <>
                        <Box m={4} h={"8vh"} bg={`${EURECA_COLORS.AZUL_CLARO}/70`} boxShadow={"sm"} rounded={"sm"}>

                        </Box>
                        <Box>
                            <Center h={"80vh"}>
                                <VStack>
                                <Icon color={`${EURECA_COLORS.AZUL_MEDIO}/70`}>
                                    <LuFrown size={36} strokeWidth={1.8} />
                                </Icon>
                                <Text fontWeight={"normal"} color={`${EURECA_COLORS.AZUL_MEDIO}/70`}>Não foi possível carregar a disciplina</Text>
                                </VStack>
                            </Center>
                        </Box>
                    </>
                    :
                    <Box overflowY={"auto"}>
                        <Box m={4} h={"8vh"} bg={`${EURECA_COLORS.AZUL_CLARO}/70`} boxShadow={"sm"} rounded={"sm"}>
                                <Flex alignItems={"center"} h={"8vh"} px={4} gap={2}>
                                {/* <LuBookText size={"4vh"} color={EURECA_COLORS.BRANCO}/> */}
                                <Text fontSize={"xl"} color={EURECA_COLORS.BRANCO}>{curso.descricao}</Text>
                                <LuChevronRight color={EURECA_COLORS.BRANCO}/>
                                <Text fontSize={"xl"} color={EURECA_COLORS.BRANCO}>{disciplina[0].nome}</Text>
                                </Flex>
                        </Box>
                        <Box mx={4} h={"86vh"}>
                            {
                                aba == 1 ?
                                <PerfilDisciplina 
                                    curso={curso} 
                                    disciplina={disciplina[0]} 
                                    disciplinaCurriculo={disciplinaCurriculo[0]}
                                    requisitosDisciplina={requisitosDisciplina}
                                    />
                                :
                                <></>
                            }
                        </Box>
                    </Box>
                    
                }
            </Box>
            </Center>
                
        </Box>
        <Toaster />
      </>
    );
  };
  