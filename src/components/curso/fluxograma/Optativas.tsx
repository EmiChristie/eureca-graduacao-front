import { Curriculo, DisciplinaCurriculo, DisciplinaPreRequisito } from "@/interfaces/types";
import { EURECA_COLORS } from "@/util/constants";
import {
    Box,
    Center,
    Flex,
    IconButton,
    Text,
    VStack,
    useBreakpointValue
} from "@chakra-ui/react";
import { For } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { LuChevronLeft, LuChevronRight, LuCoffee } from "react-icons/lu";
import { FluxogramaProps } from "./Fluxograma";

export const Optativas = ({ disciplinas }: FluxogramaProps) => {

    return (
        <Box position="relative" w="full" pt={4}>
            <For each={disciplinas}>
                {
                    (disciplina)=>
                        <Text>{disciplina.nome}</Text>
                }
            </For>
        </Box>
    );
};
