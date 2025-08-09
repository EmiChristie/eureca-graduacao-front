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
    Image
  } from "@chakra-ui/react";
  import { Toaster } from "@/components/ui/toaster";
  import { LuBlocks, LuBookCopy, LuBookText, LuChartLine, LuChevronRight, LuFrown, LuCombine, LuFolder, LuLayoutDashboard, LuLightbulb, LuSquareCheck, LuUndo, LuUndo2, LuUser, LuWorkflow, LuUserRound, } from "react-icons/lu";
  import { useQuery } from "@tanstack/react-query";
  import { Curriculo, Curso } from "../../interfaces/types";
import { getCurso } from "@/service/metricasService";
import { CursoPerfil } from "./CursoPerfil";
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { CursoDiagnostico } from "./CursoDiagnostico";
import { CursoFluxograma } from "./CursoFluxograma";
import { MeuDesempenho } from "./MeuDesempenho";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { getCurriculoAtivoMaisRecente, getCurriculo, getAreaRetencao, getCurriculoAtivoMaisRecenteScao, getCurriculoScao, getExisteEstudanteScao, getExisteEstudanteSig } from "@/service/eurecaService";
import { mapearCurso } from "@/util/mapeamentos";
import img from "../../assets/eureca_graduacao_logo.png"
  
export interface CursoPageProps{
    codigo_curso:number,
    codigo_curriculo?:number|undefined,
    flag_aluno_do_curso:boolean,
  }
    
  export const CursoPage = (
    {
        codigo_curso,
        codigo_curriculo,
        flag_aluno_do_curso
    }:CursoPageProps
  ) => {

    console.log("é aluno do curso?"+flag_aluno_do_curso)
    console.log(codigo_curriculo)

    const navigate = useNavigate();
    const [aba, setAba] = useState(sessionStorage.getItem("irDiretoAoFluxograma") === "sim" ? 2 : 1)

    if(sessionStorage.getItem("irDiretoAoFluxograma") === "sim"){
        sessionStorage.setItem("irDiretoAoFluxograma","nao");
    }

    const { data: curso, isLoading, isError } = useQuery<Curso, Error>({
        queryKey: ["curso", codigo_curso],
        queryFn: () => getCurso(codigo_curso),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        enabled: !!codigo_curso,
    });

    const { data: curriculo, isLoading:isLoading2, isError:isError2 } = useQuery<string, Error>({
      queryKey: ["curriculoAtivoMaisRecente", codigo_curso],
      queryFn: () => getCurriculoAtivoMaisRecente(codigo_curso),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      enabled: !!codigo_curso,
    });

    const { data: curriculoScao, isLoading:isLoading5, isError:isError5 } = useQuery<number, Error>({
      queryKey: ["curriculoAtivoMaisRecenteScao", codigo_curso],
      queryFn: () => getCurriculoAtivoMaisRecenteScao(codigo_curso),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      enabled: !!codigo_curso,
    });
    
    const { data: requisitos, isLoading:isLoading3, isError:isError3 } = useQuery<Curriculo, Error>({
      queryKey: ["curriculo", codigo_curso],
      queryFn: () => getCurriculo(codigo_curso, flag_aluno_do_curso ? String(codigo_curriculo) : curriculo ? String(curriculo) : curriculoScao ? String(curriculoScao) : "0"),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      enabled: flag_aluno_do_curso ? (!!codigo_curriculo && !!codigo_curso) : ((!!curriculo||!!curriculoScao) && !!codigo_curso),
    });

    const { data: area, isLoading:isLoading4, isError:isError4 } = useQuery<string, Error>({
      queryKey: ["getAreaRetencao", codigo_curso],
      queryFn: () => getAreaRetencao(codigo_curso),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      enabled: !!codigo_curso,
    });

    const { data: requisitosScao, isLoading:isLoading6, isError:isError6 } = useQuery<Curriculo, Error>({
      queryKey: ["curriculoScao", codigo_curso],
      queryFn: () => getCurriculoScao(codigo_curso, flag_aluno_do_curso ? String(codigo_curriculo) : curriculoScao ? String(curriculoScao) : curriculo ? String(curriculo) : "0"),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      enabled: flag_aluno_do_curso ? (!!codigo_curriculo && !!codigo_curso) : ((!!curriculo||!!curriculoScao) && !!codigo_curso),
    });

    const { data: existeEstudanteScao, isLoading:isLoading7, isError:isError7 } = useQuery<any, Error>({
      queryKey: ["getExisteEstudanteScao", codigo_curso],
      queryFn: () => getExisteEstudanteScao(mapearCurso[codigo_curso]),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      enabled: !!codigo_curso,
    });

    const { data: existeEstudanteSig, isLoading:isLoading8, isError:isError8 } = useQuery<any, Error>({
      queryKey: ["getExisteEstudanteSig", codigo_curso],
      queryFn: () => getExisteEstudanteSig(codigo_curso),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      enabled: !!codigo_curso,
    });

    console.log("erro buscando estudantes no scao? "+isError7)
    console.log("erro buscando estudantes no sig? "+isError8)
    
    console.log("o que faz dar erro?");
    console.log(isError||isError4||isError5||!requisitos||!curso||!area)
    console.log(isError)
    console.log(isError4)
    console.log(isError5)
    console.log(requisitos)
    console.log(curso)
    console.log(area)
  
    return (
      <>
        <Box color={EURECA_COLORS.CINZA}>
            <Center placeItems={"stretch"}>
            <Box my={4} ml={4} w={"20vw"}>
                <Box w={"full"}>
                    {
                        /*
                    <Box h={"8vh"} bg={`${EURECA_COLORS.AZUL_ESCURO}/70`} boxShadow={"sm"} rounded={"sm"}>
                        <Center h={"8vh"} px={4} gapX={2}>
                            <LuLightbulb size={"4vh"} color={EURECA_COLORS.BRANCO}/>
                            <Text fontSize={"xl"} lineHeight={"shorter"} color={EURECA_COLORS.BRANCO}>Eureca Graduação</Text>
                        </Center>
                    </Box>
                        */
                    }
                    <Box w={"20vw"} h={"8vh"}>
                        <Image src={img}></Image>
                    </Box>
                    <Card.Root bg={"#7c95b9/70"} boxShadow={"sm"} h={"86vh"} mt={4}>
                        <Card.Body>
                            <Flex flexDir={"column"} gap={2}>
                                <Button justifyContent={"left"} variant={"ghost"} onClick={()=>setAba(1)}>
                                    <Link color={EURECA_COLORS.BRANCO} className="text">
                                        <LuBookText/> Perfil do curso
                                    </Link>
                                </Button>
                                <Button disabled={isLoading || isLoading2||isLoading3||isLoading4||isLoading5||isLoading6||isLoading7||isLoading8} justifyContent={"left"} variant={"ghost"} onClick={()=>setAba(2)}>
                                    <Link  color={EURECA_COLORS.BRANCO} className="text">
                                        <LuCombine /> Fluxograma
                                    </Link>
                                </Button>
                                <Button disabled={isLoading || isLoading2||isLoading3||isLoading4||isLoading5||isLoading6||isLoading7||isLoading8 || (isError7 && isError8)} justifyContent={"left"} variant={"ghost"} onClick={()=>setAba(3)}>
                                    <Link color={EURECA_COLORS.BRANCO} className="text">
                                        <LuChartLine /> Diagnóstico
                                    </Link>
                                </Button>
                                <Button disabled={!codigo_curriculo || (isLoading || isLoading2||isLoading3||isLoading4||isLoading5||isLoading6||isLoading7||isLoading8 || (isError7 && isError8)) } justifyContent={"left"} variant={"ghost"} onClick={()=>setAba(4)}>
                                    <Link color={EURECA_COLORS.BRANCO} className="text">
                                        <LuUserRound/> Meu Desempenho
                                    </Link>
                                </Button>
                                <Button justifyContent={"left"} variant={"ghost"} onClick={()=>navigate("/graduacao/")}>
                                    <Link href="#" color={EURECA_COLORS.BRANCO} className="text">
                                        <LuUndo2/> Voltar
                                    </Link>
                                </Button>
                            </Flex>
                        </Card.Body>
                    </Card.Root>
                </Box>
            </Box>

            <Box maxW={"80vw"} minW={"80vw"} w={"80vw"}>
                {
                    isLoading || isLoading2||isLoading3||isLoading4||isLoading5||isLoading6||isLoading7||isLoading8 ?
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
                                <Text fontWeight={"normal"} color={`${EURECA_COLORS.AZUL_MEDIO}/70`} mt={2}>Carregando Curso...</Text>
                                </VStack>
                            </Center>
                        </Box>
                    </>
                    :
                    isError||isError4||isError5||!requisitos||!curso||!area ?
                    <>
                        <Box m={4} h={"8vh"} bg={`${EURECA_COLORS.AZUL_CLARO}/70`} boxShadow={"sm"} rounded={"sm"}>

                        </Box>
                        <Box>
                            <Center h={"80vh"}>
                                <VStack>
                                <Icon color={`${EURECA_COLORS.AZUL_MEDIO}/70`}>
                                    <LuFrown size={36} strokeWidth={1.8} />
                                </Icon>
                                <Text fontWeight={"normal"} color={`${EURECA_COLORS.AZUL_MEDIO}/70`}>Não foi possível carregar o curso</Text>
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
                                {/*<LuChevronRight color={EURECA_COLORS.BRANCO}/>
                                <Text fontSize={"xl"} color={EURECA_COLORS.BRANCO}>{getAba()}</Text> */}
                                </Flex>
                        </Box>
                        <Box mx={4} h={"86vh"}>
                            {
                                aba == 1 ?
                                <CursoPerfil diagnosticoPossivel={(!isError7||!isError8)} area={area} curso={curso} requisitos={requisitos} requisitosScao={requisitosScao}/>
                                :
                                aba == 2 ?
                                <CursoFluxograma curso={curso} curriculo={codigo_curriculo ? codigo_curriculo : curriculo ? curriculo : curriculoScao ? curriculoScao : 0} requisitos={requisitos}/>
                                :
                                aba == 3 ?
                                <CursoDiagnostico requisitos={requisitos ? requisitos : requisitosScao} curso={curso} curriculo={codigo_curriculo ? codigo_curriculo : curriculo ? curriculo : curriculoScao ? curriculoScao : 0}/>
                                :
                                aba == 4 ?
                                <MeuDesempenho curso={curso} requisitos={requisitos ? requisitos : requisitosScao}/>
                                :
                                <CursoPerfil curso={curso}/>
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
  