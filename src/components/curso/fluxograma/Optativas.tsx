import { Curriculo, DisciplinaCurriculo, DisciplinaPreRequisito } from "@/interfaces/types";
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
import { useRef, useState } from "react";
import { LuChevronLeft, LuChevronRight, LuCoffee } from "react-icons/lu";
import { FluxogramaProps } from "./Fluxograma";
import { useNavigate, useParams } from "react-router-dom";

export const Optativas = (
    { 
        disciplinas 
    }: FluxogramaProps
) => {
    const navigate = useNavigate();
    const {id} = useParams();

    const mostrarDisciplina = (disciplina:number) =>{
        navigate(`/graduacao/curso/${id}/disciplina/${disciplina}`);
    }

    return (
        <Box position="relative" w="full" pt={4}>
            <Grid className="grid-cols-6" gap={4}>
                <For each={disciplinas}>
                    {
                        (disciplina)=>
                            <Box 
                            onClick={()=>mostrarDisciplina(disciplina.codigo_da_disciplina)}
                            h={"10vh"} 
                            cursor={"pointer"} 
                            _hover={{ bg: `#1d8bdf/70` }} 
                            bgColor={`#8797a7/70`} 
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
    );
};
