import {
    Alert,
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
  import { LuBlocks, LuBookCopy, LuBookText, LuChartLine, LuChevronRight, LuFrown, LuCombine, LuFolder, LuLayoutDashboard, LuLightbulb, LuSquareCheck, LuUndo, LuUndo2, LuUser, LuWorkflow, LuNotebook, LuNotebookPen, LuNotebookTabs, LuNotebookText, LuChartPie, } from "react-icons/lu";
  import { useQuery } from "@tanstack/react-query";
  import { Curriculo, Curso, Disciplina, DisciplinaCurriculo, MetricasDisciplina, PlanoDeCurso, RelacionamentosDisciplina } from "../../interfaces/types";
import { getCurso, getMetricasDisciplina } from "@/service/metricasService";
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurriculoAtivoMaisRecente, getDisciplinaCurriculo, getDisciplina, getPlanoDeCurso, getRequisitosDisciplina, getCurriculoAtivoMaisRecenteScao, getDisciplinasPorCurriculo } from "@/service/eurecaService";
import { PerfilDisciplina } from "./PerfilDisciplina";
import { DiagnosticoDisciplina } from "./DiagnosticoDisciplina";
import { mapearCurso } from "@/util/mapeamentos";
import img from "../../assets/eureca_graduacao_logo.png"
  
export interface DisciplinaPageProps{
    codigo_curso:number,
    codigo_disciplina:number,
    codigo_curriculo?:number|undefined,
  }
    
  export const DisciplinaPage = (
    {
        codigo_curso,
        codigo_disciplina,
        codigo_curriculo
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

    const { data: curriculo, isLoading:isLoading2, isError:isError2 } = useQuery<string, Error>({
      queryKey: ["curriculoAtivoMaisRecente", codigo_curso],
      queryFn: () => getCurriculoAtivoMaisRecente(codigo_curso),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      enabled: !!codigo_curso,
    });
    
    const { data: curriculoScao, isLoading:isLoading8, isError:isError8 } = useQuery<number, Error>({
        queryKey: ["curriculoAtivoMaisRecenteScao", codigo_curso],
        queryFn: () => getCurriculoAtivoMaisRecenteScao(codigo_curso),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        enabled: !!codigo_curso,
    });
    

    const { data: disciplinaCurriculo, isLoading:isLoading3, isError:isError3 } = useQuery<DisciplinaCurriculo[], Error>({
      queryKey: ["pegarDisciplinaCurriculo", codigo_curso, codigo_curriculo ? codigo_curriculo : curriculo,codigo_disciplina],
      queryFn: () => getDisciplinaCurriculo(codigo_curso, codigo_curriculo ? codigo_curriculo : curriculo ? curriculo : curriculoScao ? curriculoScao :0,codigo_disciplina),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      enabled: (!!codigo_curriculo||!!curriculo||!!curriculoScao) && !!codigo_curso && !!codigo_disciplina,
    });

    const { data: disciplina, isLoading:isLoading4, isError:isError4 } = useQuery<Disciplina[], Error>({
      queryKey: ["pegarDisciplina",codigo_disciplina],
      queryFn: () => getDisciplina(codigo_disciplina),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      enabled: !!codigo_disciplina,
    });

    //usando o SCAO já que no SIG não tem planos de curso
    const { data: informacoes, isLoading:isLoading5, isError:isError5 } = useQuery<PlanoDeCurso, Error>({
      queryKey: ["pegarPlanoDeCurso",codigo_disciplina,mapearCurso[codigo_curso]],
      queryFn: () => getPlanoDeCurso(codigo_disciplina,mapearCurso[codigo_curso]),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      enabled: !!codigo_disciplina && !!codigo_curso,
    });

    //estou usando o SCAO já que no sig não tem os co-requisitos nem disciplinas equivalentes
    const { data: requisitosDisciplina, isLoading:isLoading6, isError:isError6 } = useQuery<RelacionamentosDisciplina, Error>({
      queryKey: ["pegarRequisitosDaDisciplina",codigo_disciplina,codigo_curso,codigo_curriculo ? codigo_curriculo : curriculo],
      queryFn: () => getRequisitosDisciplina(codigo_disciplina,mapearCurso[codigo_curso],codigo_curriculo ? codigo_curriculo : curriculoScao),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      enabled: (!!codigo_curriculo||!!curriculoScao) && !!codigo_curso && !!codigo_disciplina,
    });

    //usando SCAO + SIG
    const { data: metricas, isLoading:isLoading7, isError:isError7 } = useQuery<MetricasDisciplina, Error>({
      queryKey: ["pegarMetricasDaDisciplina",codigo_disciplina,codigo_curso],
      queryFn: () => getMetricasDisciplina(codigo_disciplina,codigo_curso),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      enabled: !!codigo_disciplina && !!codigo_curso,
    });
    
    const { data: disciplinas, isLoading:isLoading9, isError:isError9 } = useQuery<DisciplinaCurriculo[], Error>({
        queryKey: ["disciplinasPorCurriculo", codigo_curso,(!!codigo_curriculo||!!curriculo||!!curriculoScao)],
        queryFn: () => getDisciplinasPorCurriculo(codigo_curso,String(codigo_curriculo ? codigo_curriculo : curriculo ? curriculo : curriculoScao ? curriculoScao :0)),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        enabled: (!!codigo_curriculo||!!curriculo||!!curriculoScao) &&!!codigo_curso,
    });

    console.log("disciplinas validas???")
    console.log(disciplinas)

    const voltar = () => {
        sessionStorage.setItem("irDiretoAoFluxograma","sim");
        navigate(`/graduacao/curso/${codigo_curso}`)
    }
    
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
                                        <LuNotebookText/> Perfil da disciplina
                                    </Link>
                                </Button>
                                <Button disabled={isLoading || isLoading2||isLoading3||isLoading4||isLoading5||isLoading6||isLoading7 || isError7} justifyContent={"left"} variant={"ghost"} onClick={()=>setAba(2)}>
                                    <Link color={EURECA_COLORS.BRANCO} className="text">
                                        <LuChartPie/> Diagnóstico
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
                                <Button justifyContent={"left"} variant={"ghost"} onClick={()=>voltar()}>
                                    <Link color={EURECA_COLORS.BRANCO} className="text">
                                        <LuUndo2/> Voltar ao fluxograma
                                    </Link>
                                </Button>
                            </Flex>
                        </Card.Body>
                    </Card.Root>
                </Box>
            </Box>

            <Box maxW={"80vw"} minW={"80vw"} w={"80vw"}>
                {
                    isLoading || isLoading2||isLoading3||isLoading4||isLoading5||isLoading6||isLoading7||isLoading8 ||isLoading9?
                    <>
                        <Box m={4} h={"8vh"} bgColor={`${EURECA_COLORS.AZUL_CLARO}/70`} boxShadow={"sm"} rounded={"sm"}>
                                <Flex alignItems={"center"} h={"8vh"} px={4} gap={2}>
                                <Text fontSize={"xl"} color={EURECA_COLORS.BRANCO}>Carregando disciplina...</Text>
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
                    isError||isError2||isError3||isError4||isError8||isError9 ?
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
                                aba == 2 ?
                                <DiagnosticoDisciplina 
                                    disciplina={disciplinaCurriculo[0]}
                                    metricas={metricas}
                                    />
                                :
                                <>
                                    <PerfilDisciplina 
                                        curso={curso} 
                                        disciplina={disciplina[0]} 
                                        disciplinaCurriculo={disciplinaCurriculo[0]}
                                        requisitosDisciplina={requisitosDisciplina}
                                        informacoes={informacoes}
                                        disciplinas_validas={disciplinas.map(d=>String(d.codigo_da_disciplina))}
                                        />
                                    {isError7 ? 
                                        <>
                                            <Alert.Root status="warning" mt={4} bg={"orange.muted/70"} variant={"surface"} boxShadow={"sm"} title="Diagnóstico indisponível">
                                                <Alert.Indicator />
                                                <Alert.Content>
                                                    <Alert.Title>Diagnóstico indisponível</Alert.Title>
                                                    <Alert.Description>Não há registros de matrículas nesta disciplina nos últimos 5 anos.</Alert.Description>
                                                </Alert.Content>
                                            </Alert.Root>
                                        </>
                                        :
                                        <></>
                                    }
                                </>
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
  