import { Curriculo, Curso, DisciplinaCurriculo, DisciplinaPreRequisito } from "@/interfaces/types";
import { EURECA_COLORS } from "@/util/constants";
import {
    Box,
    Center,
    Flex,
    Grid,
    IconButton,
    Text,
    VStack,
    useBreakpointValue
} from "@chakra-ui/react";
import { For } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { LuChevronLeft, LuChevronRight, LuCoffee } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import { TituloFluxograma } from "./TituloFluxograma";
import { TituloListaOptativas } from "./TituloListaOptativas";
import { Optativas } from "./Optativas";
import { TituloOutrosComponentesObrigatorios } from "./TituloOutrosComponentesObrigatorios";

export interface FluxogramaProps {
    disciplinas?: DisciplinaCurriculo[];
    requisitos?: Curriculo;
    preRequisitos?: DisciplinaPreRequisito[];
    curso?:Curso;
    curriculo?:number;
}

export const Fluxograma = ({ disciplinas, requisitos,preRequisitos,curso,curriculo }: FluxogramaProps) => {

    const {id} = useParams();
    const [mostrarOutrosComponentes,setMostrarOutrosComponentes] = useState(false);

    const navigate = useNavigate();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [preRequisites,setPreRequisites] = useState([]);

    const disciplinasValidas = disciplinas.filter(
        (d) => (d.tipo === "OBRIGATORIO" || d.tipo === "COMPLEMENTAR") && d.status === "ATIVO" && d.semestre_ideal !== null
    );

    const outrosComponentesObg = disciplinas.filter(
        (d) => (d.tipo === "OBRIGATORIO" || d.tipo === "COMPLEMENTAR") && d.status === "ATIVO" && !d.semestre_ideal
    );

    useEffect(() => {
        if(outrosComponentesObg.length > 0){
            setMostrarOutrosComponentes(true);
        }
    }, [outrosComponentesObg.length,mostrarOutrosComponentes]);

    const disciplinasPorSemestre: Record<string, DisciplinaCurriculo[]> = {};
    let maiorSemestre = 1;

    for (const disc of disciplinasValidas) {
        const semestre = Number(disc.semestre_ideal);
        if (!disciplinasPorSemestre[semestre]) {
            disciplinasPorSemestre[semestre] = [];
        }
        disciplinasPorSemestre[semestre].push(disc);
        if (semestre > maiorSemestre) {
            maiorSemestre = semestre;
        }
    }

    const semestresOrdenados = Array.from({ length: maiorSemestre }, (_, i) => (i + 1).toString());

    const w = useBreakpointValue({ base: "70vw", md: `11.98vw` });

    const scroll = (direction: "left" | "right") => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const scrollAmount = 300;
        container.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    const changePreRequisites = (disciplina:number) =>{
        const pr = preRequisitos.filter((p)=>p.codigo_da_disciplina === disciplina);
        setPreRequisites(pr);
    }

    const mostrarDisciplina = (disciplina:number) =>{
        navigate(`/graduacao/curso/${id}/disciplina/${disciplina}`);
    }

    return (
        <>
        {<TituloFluxograma curso={curso.descricao} curriculo={curriculo}/>}
        <Box position="relative" w="full" pt={4}>
            <IconButton
                aria-label="scroll left"
                onClick={() => scroll("left")}
                position="absolute"
                left={-3}
                top="35vh"
                transform="translateY(-50%)"
                zIndex={1}
                size="sm"
                bg={"orange.500/40"}
                _hover={{ bg: "orange.500/70" }}
                display={{ base: "none", md: "flex" }}
            >
                <LuChevronLeft />
            </IconButton>
            <IconButton
                aria-label="scroll right"
                onClick={() => scroll("right")}
                position="absolute"
                right={-3}
                top="35vh"
                transform="translateY(-50%)"
                zIndex={1}
                size="sm"
                bg={"orange.500/40"}
                _hover={{ bg: "orange.500/70" }}
                display={{ base: "none", md: "flex" }}
            >
                <LuChevronRight />
            </IconButton>

            <Box ref={scrollContainerRef} overflowX={"hidden"}>
                <Flex direction="row" gap={4} align="flex-start" w="max-content">
                    <For each={semestresOrdenados}>
                        {(semestre) => (
                            <VStack
                                key={semestre}
                                align="stretch"
                                minW={w}
                                maxW={w}
                                w={w}
                                flexShrink={0}
                            >
                                <Box w="full" p={1} boxShadow={"sm"} rounded="sm" bgColor={`#225893/70`}>
                                    <Text fontSize={"sm"} color={EURECA_COLORS.BRANCO} fontWeight="normal" textAlign="center">
                                        {semestre}º período
                                    </Text>
                                </Box>
                                <For 
                                each={disciplinasPorSemestre[semestre] || []}
                                fallback={
                                    <Box 
                                        bgColor={`#8797a7/70`}
                                        px={4} 
                                        boxShadow={"sm"} 
                                        borderWidth="1px" 
                                        rounded="sm"
                                        h={"21.3vh"}
                                        >
                                            <Center h={"full"}>
                                                <VStack>
                                                <LuCoffee color="white" size={24}/>
                                                <Text color="white" textAlign={"center"} fontSize="xs" fontWeight="semibold">
                                                    Nenhuma disciplina obrigatória neste período!
                                                </Text>
                                                </VStack>
                                            </Center>
                                        </Box>
                                }
                                >
                                    {(disciplina) => (
                                        <Box 
                                        h={"10vh"} 
                                        cursor={"pointer"} 
                                        onMouseOverCapture={()=>changePreRequisites(disciplina.codigo_da_disciplina)} 
                                        onClick={()=>mostrarDisciplina(disciplina.codigo_da_disciplina)}
                                        _hover={{ bg: `#1d8bdf/70` }} 
                                        bgColor={preRequisites.find(p=>p.condicao === disciplina.codigo_da_disciplina) ? `${EURECA_COLORS.CINZA}/70`:`#8797a7/70`} 
                                        key={disciplina.codigo_da_disciplina} 
                                        px={4} 
                                        boxShadow={"sm"} 
                                        borderWidth="1px" 
                                        rounded="sm">
                                            <Center h={"full"}>
                                                <Text color={"white"} lineClamp="2" fontSize="xs" fontWeight="semibold">
                                                    {disciplina.nome}
                                                </Text>
                                            </Center>
                                        </Box>
                                    )}
                                </For>
                            </VStack>
                        )}
                    </For>
                </Flex>
            </Box>
        </Box>

        {
            mostrarOutrosComponentes ?
        <Box py={4}>
            {<TituloOutrosComponentesObrigatorios/>}
            <Box position="relative" w="full" pt={4}>
                <Grid className="grid-cols-6" gap={4}>
                    <For each={outrosComponentesObg}>
                        {
                            (disciplina)=>
                                <Box 
                                onMouseOverCapture={()=>changePreRequisites(disciplina.codigo_da_disciplina)} 
                                onClick={()=>mostrarDisciplina(disciplina.codigo_da_disciplina)}
                                h={"10vh"} 
                                cursor={"pointer"} 
                                _hover={{ bg: `#1d8bdf/70` }} 
                                bgColor={preRequisites.find(p=>p.condicao === disciplina.codigo_da_disciplina) ? `${EURECA_COLORS.CINZA}/70`:`#8797a7/70`} 
                                key={disciplina.codigo_da_disciplina} 
                                px={4} 
                                boxShadow={"sm"} 
                                borderWidth="1px" 
                                rounded="sm">
                                    <Center h={"full"}>
                                        <Text color={"white"} lineClamp="2" fontSize="xs" fontWeight="semibold">
                                            {disciplina.nome}
                                        </Text>
                                    </Center>
                                </Box>
                        }
                    </For>
                </Grid>
            </Box>
        </Box>
        :
        <></>
        }

        <Box py={4}>
            {<TituloListaOptativas cor={mostrarOutrosComponentes ? "#f97316" : "#ec4899"}/>}
            <Box position="relative" w="full" pt={4}>
                <Grid className="grid-cols-6" gap={4}>
                    <For each={disciplinas.filter(d=>d.tipo === "OPTATIVO" && d.status === "ATIVO")}>
                        {
                            (disciplina)=>
                                <Box 
                                onMouseOverCapture={()=>changePreRequisites(disciplina.codigo_da_disciplina)} 
                                onClick={()=>mostrarDisciplina(disciplina.codigo_da_disciplina)}
                                h={"10vh"} 
                                cursor={"pointer"} 
                                _hover={{ bg: `#1d8bdf/70` }} 
                                bgColor={preRequisites.find(p=>p.condicao === disciplina.codigo_da_disciplina) ? `${EURECA_COLORS.CINZA}/70`:`#8797a7/70`} 
                                key={disciplina.codigo_da_disciplina} 
                                px={4} 
                                boxShadow={"sm"} 
                                borderWidth="1px" 
                                rounded="sm">
                                    <Center h={"full"}>
                                        <Text color={"white"} lineClamp="2" fontSize="xs" fontWeight="semibold">
                                            {disciplina.nome}
                                        </Text>
                                    </Center>
                                </Box>
                        }
                    </For>
                </Grid>
            </Box>
        </Box>
        </>
    );
};
