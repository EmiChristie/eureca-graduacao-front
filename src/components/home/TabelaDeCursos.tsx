import {
    Box,
    Button,
    Flex,
    Input,
    InputGroup,
    Table,
    Text,
    Center,
    Separator,
    IconButton,
    Span,
    Spinner,
    VStack,
  } from "@chakra-ui/react";
  import { useState, useMemo, useReducer, useEffect } from "react";
  import { Toaster } from "@/components/ui/toaster";
  import { EURECA_COLORS } from "@/util/constants";
  import { LuArrowUpDown, LuLightbulb, LuLogOut, LuSearch } from "react-icons/lu";
  import { useQuery } from "@tanstack/react-query";
  import { CursoHome } from "../../interfaces/types";
  import { getCursos } from "@/service/eurecaService";
import { LoginDialog } from "./LoginDialog";
import { useUserStore } from "@/stores/user/user.store";
import { useNavigate } from "react-router-dom";
import { Header } from "../geral/Header";
  
  export const TabelaDeCursos = () => {
    const navigate = useNavigate();
    const user = useUserStore((state) => state);

    const [search, setSearch] = useState("");
    const [indice, setIndice] = useState(-1);
    const [sortConfig, setSortConfig] = useState<{ key: keyof CursoHome; direction: "asc" | "desc" } | null>(null);
    const [,forceUpdate] = useReducer(x=>x+1,0);
  
    const { data: cursosHome = [], isLoading, isError } = useQuery<CursoHome[], Error>({
      queryKey: ["cursos"],
      queryFn: getCursos,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    });
  
    const cursosFiltrados = useMemo(() => {
      let cursos = [...cursosHome];
  
      if (search.trim()) {
        try {
          cursos = cursos.filter((curso) =>
            curso.descricao.toLowerCase().includes(search.toLowerCase()) ||
            curso.area_de_retencao_descricao.toLowerCase().includes(search.toLowerCase()) ||
            curso.nome_do_campus.toLowerCase().includes(search.toLowerCase()) ||
            String(curso.codigo_do_curriculo).includes(search)
          );
        } catch (e) {
          cursos = [];
        }
      }
  
      if (sortConfig) {
        cursos.sort((a, b) => {
          const aVal = a[sortConfig.key];
          const bVal = b[sortConfig.key];
  
          if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
          if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
          return 0;
        });
      }
  
      return cursos;
    }, [cursosHome, search, sortConfig]);

    const cursoDoUsuario = useMemo(() => {
      let cursos = [...cursosHome];
  
        try {
          cursos = cursos.filter((curso) => curso.codigo_do_curso === user.user.codigo_do_curso);
        } catch (e) {
          cursos = [];
        }
  
      return cursos;
    }, [cursosHome, user.user?.codigo_do_curso]);
  
    const toggleSort = (key: keyof CursoHome) => {
      setSortConfig((prev) => {
        if (prev?.key === key) {
          return {
            key,
            direction: prev.direction === "asc" ? "desc" : "asc",
          };
        }
        return { key, direction: "asc" };
      });
    };

    function formatarNome(texto: string): string {
      return texto
        .toLowerCase()
        .split(' ')
        .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
        .join(' ');
    }

    function logout(){
      user.setUser(undefined);
    }

    function verCurso(curso:number){
      navigate(`/${curso}`);
    }

    const tamanhoTabela = "60vh";
    const tabelaBg = `#52627a/70`;
    const tabelaAccent = `#52627a/60`;
  
    return (
      <>
        <Box w={"full"} color={EURECA_COLORS.CINZA}>
          <Flex
            w={"full"}
            justify="space-between"
            alignItems={"center"}
            my={4}
            gap={4}
          >
            <Box minW={"20vw"} w={"20vw"} h={"8vh"} bg={`${EURECA_COLORS.AZUL_ESCURO}/70`} boxShadow={"sm"} rounded={"sm"}>
                <Center h={"8vh"} px={4} gapX={2}>
                    <LuLightbulb size={"4vh"} color={EURECA_COLORS.BRANCO}/>
                    <Text fontSize={"xl"} lineHeight={"shorter"} color={EURECA_COLORS.BRANCO}>Eureca Graduação</Text>
                </Center>
            </Box>

            <Box minW={"20vw"} w={"full"}>
              <InputGroup startElement={
                <LuSearch/>}>
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  bgColor={"white/70"}
                  placeholder="Buscar cursos..."
                  h={"8vh"}
                  
                />
              </InputGroup>
            </Box>
  
            <Flex>
              {
                user.user ?
                <>
                  <Box maxW={"full"} minW={"30vw"} bgColor={`${EURECA_COLORS.AZUL_CLARO}/70`} boxShadow={"sm"} rounded={"sm"}>
                    <Flex px={4} gapX={4} h={"8vh"} alignItems={"center"} justify={"center"}>
                      <Text  color={EURECA_COLORS.BRANCO}>Olá, <Span>{formatarNome(user.user.nome)}</Span>!</Text>
                      <IconButton onClick={()=>logout()} color={EURECA_COLORS.BRANCO} size={"sm"} variant={"ghost"}>
                        <LuLogOut strokeWidth={2.5}/>
                      </IconButton>
                    </Flex>
                </Box>
                </>
                :
                <>
                  <LoginDialog handleClose={forceUpdate}/>
                </>
              }
            </Flex>
          </Flex>

          <Box w={"full"} h={"8vh"} bg={`#f97316/70`} rounded={"sm"}>
            <Flex h={"full"} >
              <Box w={"full"} 
                cursor={"pointer"}
                onClick={() => toggleSort("descricao")} 
                >
                  <Center h={"full"} >
                    <Button color={EURECA_COLORS.BRANCO}
                      colorPalette={"orange"}
                      variant={"ghost"}>
                      Curso <LuArrowUpDown strokeWidth={"1.75"} />
                    </Button>
                  </Center>
              </Box>
              <Box w={"full"} 
                cursor={"pointer"}
                onClick={() => toggleSort("area_de_retencao_descricao")}
                >
                  <Center h={"full"} >
                    <Button color={EURECA_COLORS.BRANCO}
                      colorPalette={"orange"}
                      variant={"ghost"}>
                      Área <LuArrowUpDown strokeWidth={"1.75"} />
                    </Button>
                  </Center>
              </Box>
              <Box w={"full"} 
                cursor={"pointer"}
                onClick={() => toggleSort("nome_do_campus")}
                >
                  <Center h={"full"} >
                    <Button color={EURECA_COLORS.BRANCO}
                      colorPalette={"orange"}
                      variant={"ghost"}>
                      Campus <LuArrowUpDown strokeWidth={"1.75"} />
                    </Button>
                  </Center>
              </Box>
              <Box w={"full"} 
                cursor={"pointer"}
                onClick={() => toggleSort("codigo_do_curriculo")}
                >
                  <Center h={"full"} >
                    <Button color={EURECA_COLORS.BRANCO}
                      colorPalette={"orange"}
                      variant={"ghost"}>
                      Currículo <LuArrowUpDown strokeWidth={"1.75"} />
                    </Button>
                  </Center>
              </Box>
            </Flex>
          </Box>

          <Box h={"65vh"} bgColor={tabelaBg} overflow={"auto"} mt={4} rounded={"sm"}>
            <Table.ScrollArea>
              <Table.Root>
          <Table.Body>
                  {isLoading ? (
                    <Table.Row border={"none"} bg={"transparent"}>
                      <Table.Cell colSpan={4}
                        bg={"transparent"} border={"none"}
                        color={"white"}>
                        <Center bg={"transparent"} border={"none"} w="full" h={tamanhoTabela}>
                          <VStack>
                            <Spinner size={"lg"} borderWidth={3}/>
                          </VStack>
                        </Center>
                      </Table.Cell>
                    </Table.Row>
                  ) : isError ? (
                    <Table.Row border={"none"} bg={"transparent"}>
                      <Table.Cell colSpan={4} border={"none"} bg={"transparent"}
                        color={"white"}>
                        <Center w="full" h={tamanhoTabela}>
                          <Text>Erro ao carregar cursos.</Text>
                        </Center>
                      </Table.Cell>
                    </Table.Row>
                  ) : cursosFiltrados.length === 0 ? (
                    <Table.Row border={"none"} bg={"transparent"}>
                      <Table.Cell border={"none"} colSpan={4} bg={"transparent"}
                        color={"white"}
                        >
                        <Center w={"full"} h={tamanhoTabela}>
                          <Text textAlign="center">Nenhum curso encontrado.</Text>
                        </Center>
                      </Table.Cell>
                    </Table.Row>
                  ) : user.user ?
                  (
                    cursoDoUsuario.map((item, index) => (
                      <Table.Row
                        key={index}
                        cursor={"pointer"}
                        onClick={() => verCurso(item.codigo_do_curso)}
                        bgColor={tabelaAccent}
                        color={"white"}
                      >
                        <Table.Cell
                          textAlign={"center"}
                          border={"none"}
                          w="25%"
                          maxW="25%"
                          whiteSpace="normal"
                          wordBreak="break-word"
                          >
                          {item.descricao}
                        </Table.Cell>
                        <Table.Cell
                          textAlign={"center"}
                          border={"none"}
                          w="25%"
                          maxW="25%"
                          whiteSpace="normal"
                          wordBreak="break-word"
                          >
                          {item.area_de_retencao_descricao}
                        </Table.Cell>
                        <Table.Cell
                          textAlign={"center"}
                          border={"none"}
                          w="25%"
                          maxW="25%"
                          whiteSpace="normal"
                          wordBreak="break-word"
                          >
                          {item.nome_do_campus}
                        </Table.Cell>
                        <Table.Cell
                          textAlign={"center"}
                          border={"none"}
                          w="25%"
                          maxW="25%"
                          whiteSpace="normal"
                          wordBreak="break-word"
                          >
                          {user.user.codigo_do_curriculo}
                        </Table.Cell>
                      </Table.Row>
                    ))
                  ) : (
                    cursosFiltrados.map((item, index) => (
                      <Table.Row
                        key={index}
                        cursor={"pointer"}
                        onClick={() => verCurso(item.codigo_do_curso)} 
                        bgColor={"transparent" }
                        _hover={{ bg: tabelaAccent }}
                        color={"white"}
                        onMouseOver={()=>setIndice(index)}
                      >
                        <Table.Cell
                          textAlign={"center"}
                          border={"none"}
                          w="25%"
                          maxW="25%"
                          whiteSpace="normal"
                          wordBreak="break-word"
                          >
                          {item.descricao}
                        </Table.Cell>
                        <Table.Cell
                          textAlign={"center"}
                          border={"none"}
                          w="25%"
                          maxW="25%"
                          whiteSpace="normal"
                          wordBreak="break-word"
                          >
                          {item.area_de_retencao_descricao}
                        </Table.Cell>
                        <Table.Cell
                          textAlign={"center"}
                          border={"none"}
                          w="25%"
                          maxW="25%"
                          whiteSpace="normal"
                          wordBreak="break-word"
                          >
                          {item.nome_do_campus}
                        </Table.Cell>
                        <Table.Cell
                          textAlign={"center"}
                          border={"none"}
                          w="25%"
                          maxW="25%"
                          whiteSpace="normal"
                          wordBreak="break-word"
                          >
                          {item.codigo_do_curriculo}
                        </Table.Cell>
                      </Table.Row>
                    ))
                  )}
                </Table.Body>
              </Table.Root>
            </Table.ScrollArea>
          </Box>
          
        </Box>
        <Toaster />
      </>
    );
  };
  