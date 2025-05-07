import {
    Box,
    Breadcrumb,
    Button,
    Card,
    Center,
    Flex,
    Link,
    Spinner,
    Tabs,
    Text,
    VStack,
  } from "@chakra-ui/react";
  import { Toaster } from "@/components/ui/toaster";
  import { LuBlocks, LuBookCopy, LuBookText, LuChartLine, LuChevronRight, LuCombine, LuFolder, LuLayoutDashboard, LuLightbulb, LuSquareCheck, LuUndo, LuUndo2, LuUser, LuWorkflow, } from "react-icons/lu";
  import { useQuery } from "@tanstack/react-query";
  import { Curso } from "../../interfaces/types";
import { getCurso } from "@/service/metricasService";
import { CursoPerfil } from "./CursoPerfil";
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { CursoDiagnostico } from "./CursoDiagnostico";
import { CursoFluxograma } from "./CursoFluxograma";
import { MeuDesempenho } from "./MeuDesempenho";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { useNavigate } from "react-router-dom";
  
export interface CursoPageProps{
    codigo_curso:number,
  }
    
  export const CursoPage = (
    {
        codigo_curso
    }:CursoPageProps
  ) => {

    const navigate = useNavigate();
    const [aba, setAba] = useState(1)

    const { data: curso, isLoading, isError } = useQuery<Curso, Error>({
        queryKey: ["curso", codigo_curso],
        queryFn: () => getCurso(codigo_curso),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        enabled: !!codigo_curso,
    });

    console.log(curso);

    const getAba = () => {
        switch(aba){
            case 1: return "Perfil do curso";
            case 2: return "Fluxograma";
            case 3: return "Diagnóstico";
            case 4: return "Meu Desempenho";
            default: return "Perfil do curso";
        }
    }
  
    return (
      <>
        <Box color={EURECA_COLORS.CINZA}>
            <Center placeItems={"stretch"}>
            <Box my={4} ml={4} w={"20vw"}>
                <Box w={"full"}>
                    <Box h={"8vh"} bg={`${EURECA_COLORS.AZUL_ESCURO}/70`} boxShadow={"sm"} rounded={"xs"}>
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
                                        <LuBookText/> Perfil do curso
                                    </Link>
                                </Button>
                                <Button justifyContent={"left"} variant={"ghost"} onClick={()=>setAba(2)}>
                                    <Link href="#" color={EURECA_COLORS.BRANCO} className="text">
                                        <LuCombine /> Fluxograma
                                    </Link>
                                </Button>
                                <Button justifyContent={"left"} variant={"ghost"} onClick={()=>setAba(3)}>
                                    <Link href="#" color={EURECA_COLORS.BRANCO} className="text">
                                        <LuChartLine /> Diagnóstico
                                    </Link>
                                </Button>
                                <Button justifyContent={"left"} variant={"ghost"} onClick={()=>setAba(4)}>
                                    <Link href="#" color={EURECA_COLORS.BRANCO} className="text">
                                        <LuUser/> Meu Desempenho
                                    </Link>
                                </Button>
                                <Button justifyContent={"left"} variant={"ghost"} onClick={()=>navigate("/")}>
                                    <Link href="#" color={EURECA_COLORS.BRANCO} className="text">
                                        <LuUndo2/> Voltar
                                    </Link>
                                </Button>
                            </Flex>
                        </Card.Body>
                    </Card.Root>
                </Box>
            </Box>

            <Box  w={"80vw"}>
                {
                    isLoading ?
                    <>
                        <Box h={"8vh"} bg={EURECA_COLORS.AZUL_CLARO} boxShadow={"sm"} rounded={"xs"}>
                                <Flex alignItems={"center"} h={"8vh"} px={4} gap={2}>
                                <LuBookText size={"4vh"} color={EURECA_COLORS.BRANCO}/>
                                <Text fontSize={"xl"} color={EURECA_COLORS.BRANCO}>Carregando curso...</Text>
                                </Flex>
                        </Box>
                        <Box h={"92vh"}>
                            <Center>
                                <VStack>
                                <Spinner size={"lg"} borderWidth={3}/>
                                <Text mt={2}>Carregando Curso...</Text>
                                </VStack>
                            </Center>
                        </Box>
                    </>
                    :
                    isError ?
                    <>
                        <Box h={"8vh"} bg={EURECA_COLORS.AZUL_CLARO} boxShadow={"sm"} rounded={"xs"}>
                                <Flex alignItems={"center"} h={"8vh"} px={4} gap={2}>
                                <LuBookText size={"4vh"} color={EURECA_COLORS.BRANCO}/>
                                <Text fontSize={"xl"} color={EURECA_COLORS.BRANCO}></Text>
                                </Flex>
                        </Box>
                        <Box h={"92vh"}>
                            <Center>
                                <VStack>
                                <Text mt={2}>Erro ao tentar carregar o curso.</Text>
                                </VStack>
                            </Center>
                        </Box>
                    </>
                    :
                    <>
                        <Box m={4} h={"8vh"} bg={`${EURECA_COLORS.AZUL_CLARO}/70`} boxShadow={"sm"} rounded={"xs"}>
                                <Flex alignItems={"center"} h={"8vh"} px={4} gap={2}>
                                {/* <LuBookText size={"4vh"} color={EURECA_COLORS.BRANCO}/> */}
                                <Text fontSize={"xl"} color={EURECA_COLORS.BRANCO}>{curso.descricao}</Text>
                                <LuChevronRight color={EURECA_COLORS.BRANCO}/>
                                <Text fontSize={"xl"} color={EURECA_COLORS.BRANCO}>{getAba()}</Text>
                                </Flex>
                        </Box>
                        <Box mx={4} h={"86vh"}>
                            {
                                aba == 1 ?
                                <CursoPerfil curso={curso}/>
                                :
                                aba == 2 ?
                                <CursoFluxograma curso={curso}/>
                                :
                                aba == 3 ?
                                <CursoDiagnostico curso={curso}/>
                                :
                                aba == 4 ?
                                <MeuDesempenho curso={curso}/>
                                :
                                <CursoPerfil curso={curso}/>
                            }
                        </Box>
                    </>
                    
                }
            </Box>
            </Center>
                
        </Box>
        <Toaster />
      </>
    );
  };
  