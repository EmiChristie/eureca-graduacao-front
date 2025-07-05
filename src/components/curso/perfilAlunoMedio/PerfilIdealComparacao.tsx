import { EURECA_GRADUACAO_COLORS, EURECA_COLORS } from "@/util/constants"
import { Card, Stat, HStack, Icon, Flex, List } from "@chakra-ui/react"
import { LuArrowUp10, LuLightbulb } from "react-icons/lu"
import { PerfilAlunoMedioProps } from "../PerfilAlunoMedio"

export const PerfilIdealComparacao = (
    {
        perfil,
        requisitos
    }:PerfilAlunoMedioProps
  ) => {

    const periodos = requisitos.duracao_minima;
    const creditosMatriculadosIdeal = (requisitos.minimo_creditos_disciplinas_obrigatorias+requisitos.minimo_creditos_disciplinas_optativas)
    const vIdeal = parseFloat((creditosMatriculadosIdeal / requisitos.duracao_minima).toFixed(2));


    return(
        <>
        <Card.Root w={"full"} boxShadow={"sm"} bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}>
            <Card.Body>
                <Stat.Root>
                  <HStack justify="space-between">
                    <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>
                      Aluno ideal
                    </Stat.Label>
                    <Icon color={`${EURECA_COLORS.CINZA}/55`}>
                      <LuLightbulb strokeWidth={2.6} />
                    </Icon>
                  </HStack>


                <Flex px={5} py={4} direction={"column"} gap={2} fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/80`}>
                    <List.Root gap={2}>
                        <List.Item>
                        Se forma em {periodos} períodos
                        </List.Item>
                        <List.Item>
                        Possui CRA maior ou igual a 7
                        </List.Item>
                        <List.Item>
                        Possui taxa de sucesso de 100%
                        </List.Item>
                        <List.Item>
                        Mantém velocidade média de {vIdeal} créditos bem-sucedidos por período
                        </List.Item>
                        <List.Item>
                        Matricula-se em {creditosMatriculadosIdeal} créditos ao longo do curso
                        </List.Item>
                        <List.Item>
                        Não possui reprovações
                        </List.Item>
                    </List.Root>
                </Flex>


                </Stat.Root>

            </Card.Body>
        </Card.Root>
        </>
    )
  }