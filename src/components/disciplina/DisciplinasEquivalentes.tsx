import { Box, Button, Card, Center, Flex, For, HStack, Icon, Link, Span, Stat, Text, VStack } from "@chakra-ui/react"
import { LuCalendarClock, LuCoffee, LuCopyX, LuDot, LuFileCheck2, LuFileClock, LuNotebookText } from "react-icons/lu"
import { PerfilDisciplinaProps } from "./PerfilDisciplina"
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants"
import { formatarNome } from "@/util/utilities"

  export const DisciplinasEquivalentes = (
    {
        curso,
        requisitosDisciplina,
    }:PerfilDisciplinaProps
  ) => {

    const {disciplinas_equivalentes} = requisitosDisciplina;
    

    return(
        <>
            <Card.Root w={"full"} boxShadow={"sm"} bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}>
                <Card.Body>
                    <Stat.Root >
                    <HStack justify="space-between">
                        <Stat.Label  color={`${EURECA_COLORS.CINZA}/55`}>Disciplinas Equivalentes</Stat.Label>
                        <Icon  color={`${EURECA_COLORS.CINZA}/55`}>
                        <LuFileClock />
                        </Icon>
                    </HStack>
                    
                    {
                        disciplinas_equivalentes.length > 0 ?

                        <Flex mt={4} alignContent={"center"} flexDir={"column"} h={"full"}>
                            <For each={disciplinas_equivalentes}>
                                {(p)=><Link mb={1} className="text" href={`/curso/${curso.codigo_do_curso}/disciplina/${p.codigo}`} color={`${EURECA_COLORS.CINZA}/80`} fontWeight={"medium"}><LuDot/>{p.nome}</Link>}
                            </For>
                        </Flex>
                        :
                        <Center h={"full"}>
                            <VStack>
                            <Icon mt={6} color={`${EURECA_COLORS.CINZA}/80`}>
                                <LuCoffee size={24}/>
                            </Icon>
                            <Text mb={4} color={`${EURECA_COLORS.CINZA}/80`} textAlign={"center"} fontSize="sm" fontWeight="medium">
                                Nenhuma disciplina equivale a esta.
                            </Text>
                            </VStack>
                        </Center>
                    }
                    </Stat.Root>
                </Card.Body>
            </Card.Root>
        </>
    )
  }