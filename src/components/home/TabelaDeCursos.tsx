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
    Icon,
    FieldHelperText,
    Link,
    Image,
  } from "@chakra-ui/react";
  import { useState, useMemo, useReducer, useEffect } from "react";
  import { Toaster } from "@/components/ui/toaster";
  import { EURECA_COLORS, linkTCC } from "@/util/constants";
  import { LuArrowUpDown, LuCloudy, LuExternalLink, LuFrown, LuLightbulb, LuLogOut, LuSearch } from "react-icons/lu";
  import { useQuery } from "@tanstack/react-query";
  import { CursoHome } from "../../interfaces/types";
  import { getCursos } from "@/service/eurecaService";
import { LoginDialog } from "./LoginDialog";
import { useUserStore } from "@/stores/user/user.store";
import { useNavigate } from "react-router-dom";
import { Header } from "../geral/Header";
import { formatarNome } from "@/util/utilities";
  
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
          cursos = cursos.filter((curso) => String(curso.codigo_do_curso) === user.profile.code);
        } catch (e) {
          cursos = [];
        }
  
      return cursos;
    }, [cursosHome, user.profile?.code]);
  
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

    function logout(){
      user.setUser(undefined);
      user.setProfile(undefined);
    }

    function verCurso(curso: number) {
      const url = `/graduacao/curso/${curso}`;
      //window.open(url, '_blank');
      navigate(url)
    }

    const tamanhoTabela = "72vh";
    const tamanhoTabelaFull = "86vh";
    const tamanhoTabelaFull2 = "76vh";
    const tabelaBg = `#8797a7/70`;
    const tabelaAccent = `#8797a7/60`;
  
    return (
      <>
        <Box w={"full"} color={EURECA_COLORS.CINZA}>
          <Flex
            w={"full"}
            my={4}
            gap={4}
          >
            <Box minW={"20vw"} w={"20vw"}>

              <Box w={"20vw"} h={"8vh"}>
                <Image src="src/assets/eureca_graduacao_logo.png"></Image>
              </Box>

              <Box my={4} w={"full"} boxShadow={"sm"}>
                <InputGroup startElement={
                  <LuSearch/>}>
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    bgColor={"white/85"}
                    placeholder="Buscar cursos..."
                    h={"8vh"}
                    
                  />
                </InputGroup>
              </Box>

              <Flex h={tamanhoTabelaFull2} flexDir={"column"} gap={4}>
                  <Box h={"full"} textAlign={"center"} bg={"#7c95b9/70"} boxShadow={"sm"} rounded={"sm"} p={4} >
                    <Center h={"full"}>
                        {
                          user.profile ?
                          <>
                          <Flex
                          flexDir={"column"}
                          textAlign={"left"} 
                          placeItems={"center"}
                          justifyContent={"center"}
                          color={EURECA_COLORS.BRANCO}
                          h={"full"}
                          gap={4}
                          >
                            <Flex flexDir={"column"} gap={2}>
                              <Text 
                                fontWeight={"medium"}
                                placeSelf={"start"}
                                lineHeight={"short"}
                                >
                                  Olá, {formatarNome(user.profile.name)}!
                              </Text>
                              <Text 
                                fontWeight={"normal"}
                                fontSize={"sm"}>
                                  Você está logado como <Span fontWeight={"medium"}>{user.profile.type.toLowerCase()}</Span>.
                              </Text>
                              <Text 
                                fontWeight={"normal"}
                                fontSize={"sm"}>
                                  Aqui você pode acessar informações de planejamento e execução curricular sobre os cursos de graduação oferecidos pela UFCG.
                              </Text>
                              {
                                user.profile.type.toLowerCase() === "aluno" ?
                                
                              <Text 
                                fontWeight={"normal"}
                                fontSize={"sm"}>
                                  Acesse seu curso para visualizar métricas particulares sobre o seu desempenho acadêmico!
                              </Text>
                              :
                              <></>
                              }
                              <Center>
                                <IconButton rounded={"full"} onClick={()=>logout()} color={EURECA_COLORS.BRANCO} size={"sm"} variant={"ghost"}>
                                  <LuLogOut strokeWidth={2.5}/>
                                </IconButton>
                              </Center>
                            </Flex>

                          </Flex>
                          </>
                          :
                          <>
                          <Flex
                          flexDir={"column"}
                          textAlign={"left"} 
                          placeItems={"center"}
                          justifyContent={"center"}
                          color={EURECA_COLORS.BRANCO}
                          h={"full"}
                          gap={4}
                          >
                            <Flex flexDir={"column"} gap={2}>
                              <Text 
                                fontWeight={"medium"}
                                placeSelf={"start"}
                                lineHeight={"short"}
                                >
                                  Bem vindo ao Eureca Graduação!
                              </Text>
                              <Text 
                                fontWeight={"normal"}
                                fontSize={"sm"}>
                                  Aqui você pode acessar informações de planejamento e execução curricular sobre os cursos de graduação oferecidos pela UFCG.
                              </Text>
                            </Flex>
                            <Flex flexDir={"column"} gap={2}>
                              <Text 
                                fontWeight={"medium"}
                                placeSelf={"start"}
                                lineHeight={"short"}>
                                  Já faz parte da UFCG?
                              </Text>
                              <Text 
                                fontWeight={"normal"}
                                fontSize={"sm"}>
                                  Faça login para acessar métricas particulares de desempenho!
                              </Text>
                              <Center mt={2}>
                                <LoginDialog handleClose={forceUpdate}/>
                              </Center>
                            </Flex>

                          </Flex>
                          </>
                        }
                    </Center>
                  </Box>
                  <Flex
                  flexDir={"column"}
                  w={"full"} 
                  gap={2}
                  textAlign={"justify"}
                  p={4} 
                  alignContent={"end"} 
                  bgColor={`orange.500/70`} 
                  boxShadow={"sm"} 
                  borderWidth={"1px"}
                  rounded={"sm"}
                  color={"white"}
                  >
                      <Text 
                        fontWeight={"normal"}
                        fontSize={"xs"}>
                          Construído a partir do <Link fontWeight={"semibold"} color={"white"} target="blank" href="https://eureca.sti.ufcg.edu.br/">Eureca<LuExternalLink strokeWidth={"3"} /></Link>
                      </Text>
                      <Text fontSize={"xs"}>
                        Quer saber como as métricas do Eureca Graduação são calculadas? Acesse a <Link fontWeight={"semibold"} color={"white"} target="blank" href={linkTCC}>documentação<LuExternalLink strokeWidth={"3"} /></Link> do site.
                        </Text>
                  </Flex>
              </Flex>
            </Box>
              

          <Box w={"full"}>
            <Box w={"full"} boxShadow={"sm"} h={"8vh"} bg={`${EURECA_COLORS.AZUL_CLARO}/70`} rounded={"sm"}>
              <Flex h={"full"} >
                <Box w={"full"} 
                  cursor={"pointer"}
                  onClick={() => toggleSort("descricao")} 
                  >
                    <Center h={"full"} >
                      <Button color={EURECA_COLORS.BRANCO}
                        _hover={{ bg: `${EURECA_COLORS.AZUL_CLARO}/80` }}  
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
                        _hover={{ bg: `${EURECA_COLORS.AZUL_CLARO}/80` }}  
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
                        _hover={{ bg: `${EURECA_COLORS.AZUL_CLARO}/80` }}  
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
                        _hover={{ bg: `${EURECA_COLORS.AZUL_CLARO}/80` }}  
                        variant={"ghost"}>
                        Currículo <LuArrowUpDown strokeWidth={"1.75"} />
                      </Button>
                    </Center>
                </Box>
              </Flex>
            </Box>

            <Box h={tamanhoTabelaFull} bgColor={tabelaBg} boxShadow={"sm"} overflow={"auto"} mt={4} rounded={"sm"}>
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
                            <VStack>
                                <Icon color={"white"}>
                                  <LuFrown size={36} strokeWidth={1.8} />
                                </Icon>
                                <Text fontWeight={"normal"}>Erro ao carregar cursos</Text>
                            </VStack>
                          </Center>
                        </Table.Cell>
                      </Table.Row>
                    ) : cursosFiltrados.length === 0 ? (
                      <Table.Row border={"none"} bg={"transparent"}>
                        <Table.Cell border={"none"} colSpan={4} bg={"transparent"}
                          color={"white"}
                          >
                          <Center w={"full"} h={tamanhoTabela}>
                            <VStack>
                                <Icon color={"white"}>
                                  <LuCloudy size={36} strokeWidth={1.8} />
                                </Icon>
                                <Text fontWeight={"normal"}>Nenhum curso encontrado</Text>
                            </VStack>
                          </Center>
                        </Table.Cell>
                      </Table.Row>
                    ) : user.profile && (user.profile.type.toLowerCase() === "aluno" ||user.profile.type.toLowerCase() === "curso") ?
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
                            {user.profile.type.toLowerCase() === "aluno" ? user.profile.curriculum : item.codigo_do_curriculo}
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
          </Flex>
          
        </Box>
        <Toaster />
      </>
    );
  };
  