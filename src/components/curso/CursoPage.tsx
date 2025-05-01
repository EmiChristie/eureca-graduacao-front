import {
    Box,
    Breadcrumb,
    Tabs,
    Text,
  } from "@chakra-ui/react";
  import { Toaster } from "@/components/ui/toaster";
  import { LuBlocks, LuBookCopy, LuBookText, LuChartLine, LuFolder, LuLayoutDashboard, LuSquareCheck, LuUser, } from "react-icons/lu";
  import { useQuery } from "@tanstack/react-query";
  import { Curso } from "../../interfaces/types";
import { getCurso } from "@/service/metricasService";
import { CursoPerfil } from "./CursoPerfil";
import { EURECA_COLORS } from "@/util/constants";
import { CursoDiagnostico } from "./CursoDiagnostico";
import { EntreCursos } from "./EntreCursos";
import { MeuDesempenho } from "./MeuDesempenho";
  
export interface CursoPageProps{
    codigo_curso:number,
  }
    
  export const CursoPage = (
    {
        codigo_curso
    }:CursoPageProps
  ) => {

    const { data: curso, isLoading, isError } = useQuery<Curso, Error>({
        queryKey: ["curso", codigo_curso],
        queryFn: () => getCurso(codigo_curso),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        enabled: !!codigo_curso,
      });
  
    return (
      <>
        <Box h={"75vh"} p={8} color={EURECA_COLORS.CINZA}>
            <Box>
                <Breadcrumb.Root size={"lg"}>
                    <Breadcrumb.List>
                        <Breadcrumb.Item>
                        <Breadcrumb.Link href="/">
                            <LuLayoutDashboard />
                            Cursos
                        </Breadcrumb.Link>
                        </Breadcrumb.Item>

                        <Breadcrumb.Separator />

                        <Breadcrumb.Item>
                        <Breadcrumb.Link href="#">
                            {isLoading ? 
                                <Text>Carregando Curso...</Text>
                            :
                            isError ?
                                <Text>O curso não pôde ser carregado.</Text>
                            :
                                <Text>{curso.descricao}</Text>
                            }
                        </Breadcrumb.Link>
                        </Breadcrumb.Item>
                    </Breadcrumb.List>
                </Breadcrumb.Root>
            </Box>

            <Box mt={6}>
                <Tabs.Root defaultValue="1" variant={"outline"}>
                    <Tabs.List>
                    <Tabs.Trigger value="1">
                        <LuBookText/>
                        Perfil
                    </Tabs.Trigger>
                    <Tabs.Trigger value="2">
                        <LuChartLine />
                        Diagnóstico
                    </Tabs.Trigger>
                    <Tabs.Trigger disabled value="3">
                        <LuBookCopy />
                        Entre Cursos
                    </Tabs.Trigger>
                    <Tabs.Trigger disabled value="4">
                        <LuUser />
                        Meu Desempenho
                    </Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content 
                    _open={{
                    animationName: "fade-in, scale-in",
                    animationDuration: "300ms",
                    }}
                    _closed={{
                    animationName: "fade-out, scale-out",
                    animationDuration: "120ms",
                    }}
                    value="1">
                            {isLoading ? 
                                <Text>Carregando perfil do curso...</Text>
                            :
                            isError ?
                                <Text>O curso não pôde ser carregado.</Text>
                            :
                                <CursoPerfil curso={curso}/>
                            }
                    </Tabs.Content>
                    <Tabs.Content 
                    _open={{
                    animationName: "fade-in, scale-in",
                    animationDuration: "300ms",
                    }}
                    _closed={{
                    animationName: "fade-out, scale-out",
                    animationDuration: "120ms",
                    }}
                    value="2">
                            {isLoading ? 
                                <Text>Carregando métricas do curso...</Text>
                            :
                            isError ?
                                <Text>As métricas não puderam ser carregadas.</Text>
                            :
                                <CursoDiagnostico curso={curso}/>
                            }
                    </Tabs.Content>
                    <Tabs.Content 
                    _open={{
                    animationName: "fade-in, scale-in",
                    animationDuration: "300ms",
                    }}
                    _closed={{
                    animationName: "fade-out, scale-out",
                    animationDuration: "120ms",
                    }}
                    value="3">
                            {isLoading ? 
                                <Text>Carregando métricas entre cursos...</Text>
                            :
                            isError ?
                                <Text>As métricas não puderam ser carregadas.</Text>
                            :
                                <EntreCursos curso={curso}/>
                            }
                    </Tabs.Content>
                    <Tabs.Content 
                    _open={{
                    animationName: "fade-in, scale-in",
                    animationDuration: "300ms",
                    }}
                    _closed={{
                    animationName: "fade-out, scale-out",
                    animationDuration: "120ms",
                    }}
                    value="4">
                            {isLoading ? 
                                <Text>Carregando meu desempenho...</Text>
                            :
                            isError ?
                                <Text>Meu desempenho não pôde ser carregado.</Text>
                            :
                                <MeuDesempenho curso={curso}/>
                            }
                    </Tabs.Content>
                </Tabs.Root>
            </Box>
        </Box>
        <Toaster />
      </>
    );
  };
  