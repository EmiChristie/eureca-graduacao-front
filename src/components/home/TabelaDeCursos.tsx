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
  } from "@chakra-ui/react";
  import { useState, useMemo, useReducer, useEffect } from "react";
  import { Toaster } from "@/components/ui/toaster";
  import { EURECA_COLORS } from "@/util/constants";
  import { LuArrowUpDown, LuLogOut, LuSearch } from "react-icons/lu";
  import { useQuery } from "@tanstack/react-query";
  import { CursoHome } from "../../interfaces/types";
  import { getCursos } from "@/service/eurecaService";
import { LoginDialog } from "./LoginDialog";
import { useUserStore } from "@/stores/user/user.store";
import { useNavigate } from "react-router-dom";
  
  export const TabelaDeCursos = () => {
    const navigate = useNavigate();
    const user = useUserStore((state) => state);

    const [search, setSearch] = useState("");
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
  
    return (
      <>
        <Box w={"full"} color={EURECA_COLORS.CINZA}>
          <Flex
            w={"full"}
            justify="space-between"
            alignItems={"center"}
            h={"15vh"}
            px={8}
          >
            <Box w={"30vw"}>
              <InputGroup startElement={
                <LuSearch/>}>
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  bgColor={"white"}
                  placeholder="Buscar cursos..."
                />
              </InputGroup>
            </Box>
  
            <Flex>
              {
                user.user ?
                <>
                  <Flex w={"full"} alignItems={"center"} gap={2}>
                    <Text>Olá, <Span color={EURECA_COLORS.AZUL_CLARO}>{formatarNome(user.user.nome)}</Span>!</Text>
                    <IconButton onClick={()=>logout()} color={EURECA_COLORS.CINZA} variant={"ghost"}>
                      <LuLogOut strokeWidth={1.75}/>
                    </IconButton>
                  </Flex>
                </>
                :
                <>
                  <LoginDialog handleClose={forceUpdate}/>
                </>
              }
            </Flex>
          </Flex>
  
          <Box>
          <Separator size={"sm"} placeSelf={"center"} w={"full"}/>
            <Table.ScrollArea h={"60vh"}>
              <Table.Root stickyHeader interactive>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader
                      p={0}
                      border={"none"}
                      textAlign={"center"}
                      onClick={() => toggleSort("descricao")}
                      cursor="pointer"
                      w={"25vw"}
                      maxW={"25vw"}
                      whiteSpace="normal"
                      wordBreak="break-word"
                    >
                      <Button 
                        my={2}
                        variant={"ghost"}>
                        Curso <LuArrowUpDown strokeWidth={"1.75"} />
                      </Button>
                      <Separator/>
                    </Table.ColumnHeader>
                    <Table.ColumnHeader
                      p={0}
                      border={"none"}
                      textAlign={"center"}
                      onClick={() => toggleSort("area_de_retencao_descricao")}
                      cursor="pointer"
                      w={"25vw"}
                      maxW={"25vw"}
                      whiteSpace="normal"
                      wordBreak="break-word"
                    >
                      <Button
                        my={2}
                        variant={"ghost"}>
                        Área <LuArrowUpDown strokeWidth={"1.75"} />
                      </Button>
                      <Separator/>
                    </Table.ColumnHeader>
                    <Table.ColumnHeader
                      p={0}
                      border={"none"}
                      textAlign={"center"}
                      onClick={() => toggleSort("nome_do_campus")}
                      cursor="pointer"
                      w={"25vw"}
                      maxW={"25vw"}
                      whiteSpace="normal"
                      wordBreak="break-word"
                    >
                      <Button 
                        my={2}
                        variant={"ghost"}>
                        Campus <LuArrowUpDown strokeWidth={"1.75"} />
                      </Button>
                      <Separator/>
                    </Table.ColumnHeader>
                    <Table.ColumnHeader
                      p={0}
                      border={"none"}
                      textAlign={"center"}
                      onClick={() => toggleSort("codigo_do_curriculo")}
                      cursor="pointer"
                      w={"25vw"}
                      maxW={"25vw"}
                      whiteSpace="normal"
                      wordBreak="break-word"
                    >
                      <Button
                        my={2}
                        variant={"ghost"}>
                        Currículo <LuArrowUpDown strokeWidth={"1.75"} />
                      </Button>
                      <Separator/>
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                
                <Table.Body>
                  {isLoading ? (
                    <Table.Row>
                      <Table.Cell colSpan={4}>
                        <Center w="full" h="40vh">
                          <Text>Carregando cursos...</Text>
                        </Center>
                      </Table.Cell>
                    </Table.Row>
                  ) : isError ? (
                    <Table.Row>
                      <Table.Cell colSpan={4}>
                        <Center w="full" h="40vh">
                          <Text>Erro ao carregar cursos.</Text>
                        </Center>
                      </Table.Cell>
                    </Table.Row>
                  ) : cursosFiltrados.length === 0 ? (
                    <Table.Row>
                      <Table.Cell border={"none"} colSpan={4}>
                        <Center w={"full"} h={"40vh"}>
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
  