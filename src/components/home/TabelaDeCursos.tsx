import {
    Box,
    Button,
    Flex,
    Input,
    InputGroup,
    Table,
    Text,
    IconButton,
    Center,
  } from "@chakra-ui/react";
  import { useState, useMemo } from "react";
  import { Toaster, toaster } from "@/components/ui/toaster";
  import { EURECA_COLORS } from "@/util/constants";
  import { LuArrowUpDown, LuChevronDown, LuChevronUp, LuSearch } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import { CursoHome } from "../interfaces/types";
import { getCursos } from "@/service/eurecaService";

const cursosHome = [
    {
        "codigo_do_curso": 11104120,
        "descricao": "DESIGN - D",
        "campus": 1,
        "nome_do_campus": "Campina Grande",
        "area_de_retencao": 3,
        "area_de_retencao_descricao": "Ciências Exatas e da Terra"
      },
      {
        "codigo_do_curso": 11105110,
        "descricao": "FÍSICA (LIC) - D",
        "campus": 1,
        "nome_do_campus": "Campina Grande",
        "area_de_retencao": 3,
        "area_de_retencao_descricao": "Ciências Exatas e da Terra"
      },
      {
        "codigo_do_curso": 11105150,
        "descricao": "FÍSICA (BAC) - D",
        "campus": 1,
        "nome_do_campus": "Campina Grande",
        "area_de_retencao": 3,
        "area_de_retencao_descricao": "Ciências Exatas e da Terra"
      },
]


  export const TabelaDeCursos = () => {
    const [search, setSearch] = useState("");
    const [sortConfig, setSortConfig] = useState<{ key: keyof CursoHome; direction: "asc" | "desc" } | null>(null);

    const cursosFiltrados = useMemo(() => {
      let cursos = [...cursosHome];

      if (search.trim()) {
        try{
            cursos = cursos.filter((curso) =>
                curso.descricao.toString().toLowerCase().includes(search.toLowerCase()) ||
                curso.area_de_retencao_descricao.toString().toLowerCase().includes(search.toLowerCase()) ||
                curso.nome_do_campus.toString().toLowerCase().includes(search.toLowerCase())
            );
        }catch(e){
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
    }, [search, sortConfig]);
  
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
  
    const renderSortIcon = (key: keyof CursoHome) => {
      if (sortConfig?.key !== key) return null;
      return sortConfig.direction === "asc" ? <LuChevronUp /> : <LuChevronDown />;
    };
  
    return (
      <>
        <Box w={"full"} bgColor={EURECA_COLORS.CINZA_CLARO}>
          <Flex w={"full"} justify="space-between" alignItems={"center"} h={"15vh"} px={8}>
          <InputGroup startElement={<LuSearch />}>
                <Input 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    maxW={"30vw"} 
                    bgColor={"white"} 
                    placeholder="Buscar cursos..." />
            </InputGroup>
  
            <Flex>
              <Button bgColor={EURECA_COLORS.AZUL_CLARO} px={6}>
                Entrar
              </Button>
            </Flex>
          </Flex>
  
          <Box>
            <Table.ScrollArea h={"60vh"}>
                <Table.Root interactive stickyHeader showColumnBorder>
                    <Table.Header>
                        <Table.Row bgColor={EURECA_COLORS.AZUL_CLARO}>
                            <Table.ColumnHeader borderY={"none"} placeItems={"center"} color={"white"} onClick={() => toggleSort("descricao")} cursor="pointer"><Flex ml={3} gap={2} alignItems={"center"}>Nome <LuArrowUpDown /></Flex></Table.ColumnHeader>
                            <Table.ColumnHeader borderY={"none"} placeItems={"center"} color={"white"} onClick={() => toggleSort("area_de_retencao_descricao")} cursor="pointer"><Flex ml={3} gap={2} alignItems={"center"}>Area <LuArrowUpDown /></Flex></Table.ColumnHeader>
                            <Table.ColumnHeader borderY={"none"} placeItems={"center"} color={"white"} onClick={() => toggleSort("nome_do_campus")} cursor="pointer"><Flex ml={3} gap={2} alignItems={"center"}>Campus <LuArrowUpDown /></Flex></Table.ColumnHeader>
                            <Table.ColumnHeader borderY={"none"} placeItems={"center"} color={"white"} onClick={() => toggleSort("campus")} cursor="pointer"><Flex ml={3} gap={2} alignItems={"center"}>Curriculo <LuArrowUpDown /></Flex></Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body >
                        {cursosFiltrados.map((item,index) => (
                        <Table.Row color={"white"} bgColor={EURECA_COLORS.CINZA_CLARO} key={index} cursor={"pointer"} onClick={()=>alert(item.codigo_do_curso)}>
                            <Table.Cell textAlign={"center"} borderY={"none"}>{item.descricao}</Table.Cell>
                            <Table.Cell textAlign={"center"} borderY={"none"}>{item.area_de_retencao_descricao}</Table.Cell>
                            <Table.Cell textAlign={"center"} borderY={"none"}>{item.nome_do_campus}</Table.Cell>
                            <Table.Cell textAlign={"center"} borderY={"none"}>{item.campus}</Table.Cell>
                        </Table.Row>
                        ))}
                        {cursosFiltrados.length === 0 && (
                            <Table.Row bgColor={EURECA_COLORS.CINZA_CLARO}>
                                <Table.Cell color={"white"} border={"none"} colSpan={4}>
                                <Center w={"full"} h={"40vh"}>
                                <Text textAlign="center">Nenhum curso encontrado.</Text>
                                </Center>
                                </Table.Cell>
                            </Table.Row>
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
  