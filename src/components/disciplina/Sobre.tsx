import { Box, Card, Flex, HStack, Icon, Span, Stat, Text } from "@chakra-ui/react"
import { LuCopyX, LuNotebookText } from "react-icons/lu"
import { PerfilDisciplinaProps } from "./PerfilDisciplina"
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants"
import { formatarNome } from "@/util/utilities"

  export const Sobre = (
    {
        curso,
        disciplinaCurriculo
    }:PerfilDisciplinaProps
  ) => {

    const {nome,codigo_do_curriculo,tipo,semestre_ideal,horas_totais,status,quantidade_de_creditos} = disciplinaCurriculo;

    const mapearTipo = (tipo:string) => {
        switch(tipo){
            case "OBRIGATORIO": return "obrigatório";
            case "OPCIONAL": return "opcional";
            case "COMPLEMENTAR": return "complementar";
            default: return "desconhecido";
        }
    }

    return(
        <>
            <Card.Root boxShadow={"sm"} bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`} color={EURECA_COLORS.CINZA}>
            <Card.Body>
                <Stat.Root >
                <HStack justify="space-between">
                    <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>Sobre a disciplina</Stat.Label>
                </HStack>
    
                <Flex mt={2} h={"full"} alignItems={"center"}>
                    {
                        semestre_ideal ?
                        <Text color={`${EURECA_COLORS.CINZA}/80`} fontWeight={"medium"}>
                            No currículo de {codigo_do_curriculo} do curso de {formatarNome(curso.descricao)}, a disciplina de {nome} é ofertada como <Span fontWeight={"normal"} color={EURECA_COLORS.AZUL_MEDIO} bg={`${EURECA_COLORS.AZUL_CLARO}/20`} p={1} rounded={"xs"}>componente {mapearTipo(tipo)}</Span>. Idealmente, a disciplina é cursada no <Span fontWeight={"normal"} color={EURECA_COLORS.AZUL_MEDIO} bg={`${EURECA_COLORS.AZUL_CLARO}/20`} p={1} rounded={"xs"}>{semestre_ideal}º período</Span> com uma carga horária de <Span fontWeight={"normal"} color={EURECA_COLORS.AZUL_MEDIO} bg={`${EURECA_COLORS.AZUL_CLARO}/20`} p={1} rounded={"xs"}>{horas_totais} horas</Span>{quantidade_de_creditos == 0 ? ", as quais não contam créditos" : ` (equivalentes a ${quantidade_de_creditos} créditos)`}.
                        </Text>
                        :
                        <Text color={`${EURECA_COLORS.CINZA}/80`} fontWeight={"medium"}>
                            No currículo de {codigo_do_curriculo} do curso de {formatarNome(curso.descricao)}, a disciplina de {nome} é ofertada como <Span fontWeight={"normal"} color={EURECA_COLORS.AZUL_MEDIO} bg={`${EURECA_COLORS.AZUL_CLARO}/20`} p={1} rounded={"xs"}>componente {mapearTipo(tipo)}</Span>. A disciplina não está associada a um período ideal dentro do fluxograma e possui carga horária de <Span fontWeight={"normal"} color={EURECA_COLORS.AZUL_MEDIO} bg={`${EURECA_COLORS.AZUL_CLARO}/20`} p={1} rounded={"xs"}>{horas_totais} horas</Span>{quantidade_de_creditos == 0 ? ", as quais não contam créditos" : ` (equivalentes a ${quantidade_de_creditos} créditos)`}.
                        </Text>
                    }
                </Flex>
                </Stat.Root>
            </Card.Body>
            </Card.Root>
        </>
    )
  }