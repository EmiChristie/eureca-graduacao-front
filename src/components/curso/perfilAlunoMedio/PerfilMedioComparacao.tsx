import { EURECA_GRADUACAO_COLORS, EURECA_COLORS } from "@/util/constants"
import { Card, Stat, HStack, Icon, Flex, List, Span,Text } from "@chakra-ui/react"
import { LuArrowUp10, LuPencilLine } from "react-icons/lu"
import { PerfilAlunoMedioProps } from "../PerfilAlunoMedio"

export const PerfilMedioComparacao = (
    {
        perfil,
        requisitos
    }:PerfilAlunoMedioProps
  ) => {

    return(
        <>
        <Card.Root w={"full"} boxShadow={"sm"} bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}>
            <Card.Body>
                <Stat.Root>
                  <HStack justify="space-between">
                    <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>
                      Aluno médio
                    </Stat.Label>
                    <Icon color={`${EURECA_COLORS.CINZA}/55`}>
                      <LuPencilLine strokeWidth={2.6} />
                    </Icon>
                  </HStack>


                <Flex px={5} py={4} direction={"column"} gap={2} fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/80`}>
                    <List.Root gap={2}>
                        {
                          perfil.quantidade_de_periodos_media.length == 1 ?
                            <List.Item>Se forma em <Span fontWeight={"normal"} color={EURECA_COLORS.AZUL_MEDIO} bg={`${EURECA_COLORS.AZUL_CLARO}/25`} p={1} rounded={"xs"}>{perfil.quantidade_de_periodos_media[0]} períodos</Span></List.Item>
                        :
                          <List.Item>Se forma entre <Span fontWeight={"normal"} color={EURECA_COLORS.AZUL_MEDIO} bg={`${EURECA_COLORS.AZUL_CLARO}/25`} p={1} rounded={"xs"}>{perfil.quantidade_de_periodos_media[0]} e {perfil.quantidade_de_periodos_media[1]} períodos</Span></List.Item>
                        }
                        <List.Item>
                        Mantém um CRA próximo de  <Span fontWeight={"normal"} color={EURECA_COLORS.AZUL_MEDIO} bg={`${EURECA_COLORS.AZUL_CLARO}/25`} p={1} rounded={"xs"}>{perfil.cra_medio}</Span>
                        </List.Item>
                        <List.Item>
                        Possui taxa de sucesso próxima a <Span fontWeight={"normal"} color={EURECA_COLORS.AZUL_MEDIO} bg={`${EURECA_COLORS.AZUL_CLARO}/25`} p={1} rounded={"xs"}>{perfil.taxa_de_sucesso_media*100}%</Span>
                        </List.Item>
                        <List.Item>
                        Mantém velocidade média de <Span fontWeight={"normal"} color={EURECA_COLORS.AZUL_MEDIO} bg={`${EURECA_COLORS.AZUL_CLARO}/25`} p={1} rounded={"xs"}>{perfil.velocidade_media} créditos</Span> bem-sucedidos por período
                        </List.Item>
                        <List.Item>
                        Matricula-se em <Span fontWeight={"normal"} color={EURECA_COLORS.AZUL_MEDIO} bg={`${EURECA_COLORS.AZUL_CLARO}/25`} p={1} rounded={"xs"}>{perfil.creditos_matriculados_media} créditos</Span> ao longo do curso
                        </List.Item>
                        <List.Item>
                        Reprova cerca de <Span fontWeight={"normal"} color={EURECA_COLORS.AZUL_MEDIO} bg={`${EURECA_COLORS.AZUL_CLARO}/25`} p={1} rounded={"xs"}>{perfil.creditos_reprovados_media} créditos</Span> no total
                        </List.Item>
                    </List.Root>
                </Flex>


                </Stat.Root>

            </Card.Body>
        </Card.Root>
        </>
    )
  }