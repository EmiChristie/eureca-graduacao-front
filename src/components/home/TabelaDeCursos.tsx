import {
    Box,
    Button,
    Flex,
    Input,
    InputGroup,
    Table,
    Text,
    Center,
  } from "@chakra-ui/react";
  import { useState, useMemo } from "react";
  import { Toaster } from "@/components/ui/toaster";
  import { EURECA_COLORS } from "@/util/constants";
  import { LuArrowUpDown, LuSearch } from "react-icons/lu";
  import { useQuery } from "@tanstack/react-query";
  import { CursoHome } from "../interfaces/types";
  import { getCursos } from "@/service/eurecaService";
  
  export const TabelaDeCursos = () => {
    const [search, setSearch] = useState("");
    const [sortConfig, setSortConfig] = useState<{ key: keyof CursoHome; direction: "asc" | "desc" } | null>(null);
  
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
            curso.nome_do_campus.toLowerCase().includes(search.toLowerCase())
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
  
    return (
      <>
        <Box w={"full"} bgColor={EURECA_COLORS.CINZA_CLARO}>
          <Flex
            w={"full"}
            justify="space-between"
            alignItems={"center"}
            h={"15vh"}
            px={8}
          >
            <InputGroup startElement={
              <LuSearch/>}>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                maxW={"30vw"}
                bgColor={"white"}
                placeholder="Buscar cursos..."
              />
            </InputGroup>
  
            <Flex>
              <Button bgColor={EURECA_COLORS.AZUL_CLARO} px={6}>
                Entrar
              </Button>
            </Flex>
          </Flex>
  
          <Box>
            <Table.ScrollArea h={"60vh"}>
              <Table.Root stickyHeader showColumnBorder>
                <Table.Header>
                  <Table.Row bgColor={EURECA_COLORS.AZUL_CLARO}>
                    <Table.ColumnHeader
                      p={2}
                      border={"none"}
                      textAlign={"center"}
                      color={"white"}
                      onClick={() => toggleSort("descricao")}
                      cursor="pointer"
                    >
                      <Button color={"white"} variant={"plain"}>
                        Curso <LuArrowUpDown />
                      </Button>
                    </Table.ColumnHeader>
                    <Table.ColumnHeader
                      p={0}
                      border={"none"}
                      textAlign={"center"}
                      color={"white"}
                      onClick={() => toggleSort("area_de_retencao_descricao")}
                      cursor="pointer"
                    >
                      <Button color={"white"} variant={"plain"}>
                        Área <LuArrowUpDown />
                      </Button>
                    </Table.ColumnHeader>
                    <Table.ColumnHeader
                      p={0}
                      border={"none"}
                      textAlign={"center"}
                      color={"white"}
                      onClick={() => toggleSort("nome_do_campus")}
                      cursor="pointer"
                    >
                      <Button color={"white"} variant={"plain"}>
                        Campus <LuArrowUpDown />
                      </Button>
                    </Table.ColumnHeader>
                    <Table.ColumnHeader
                      p={0}
                      border={"none"}
                      textAlign={"center"}
                      color={"white"}
                      onClick={() => toggleSort("campus")}
                      cursor="pointer"
                    >
                      <Button color={"white"} variant={"plain"}>
                        Currículo <LuArrowUpDown />
                      </Button>
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
                    <Table.Row bgColor={EURECA_COLORS.CINZA_CLARO}>
                      <Table.Cell color={"white"} border={"none"} colSpan={4}>
                        <Center w={"full"} h={"40vh"}>
                          <Text textAlign="center">Nenhum curso encontrado.</Text>
                        </Center>
                      </Table.Cell>
                    </Table.Row>
                  ) : (
                    cursosFiltrados.map((item, index) => (
                      <Table.Row
                        key={index}
                        cursor={"pointer"}
                        onClick={() => alert(item.codigo_do_curso)}
                        bgColor={EURECA_COLORS.CINZA_CLARO}
                      >
                        <Table.Cell color={"white"} textAlign={"center"} border={"none"}>
                          {item.descricao}
                        </Table.Cell>
                        <Table.Cell color={"white"} textAlign={"center"} border={"none"}>
                          {item.area_de_retencao_descricao}
                        </Table.Cell>
                        <Table.Cell color={"white"} textAlign={"center"} border={"none"}>
                          {item.nome_do_campus}
                        </Table.Cell>
                        <Table.Cell color={"white"} textAlign={"center"} border={"none"}>
                          {item.campus}
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
  