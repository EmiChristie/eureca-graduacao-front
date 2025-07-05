import { Card, Center, HStack, Icon, Stat } from "@chakra-ui/react"
import { EURECA_COLORS } from "@/util/constants"
import { LuBriefcaseBusiness, LuClock, LuNotebookPen, LuPencilLine, LuSquarePen} from "react-icons/lu"
import { mapArea } from "@/util/mapeamentos";
import { CardProps } from "./DuracaoCard";
import { BarSegment, Chart, useChart } from "@chakra-ui/charts"
import { Cell, Pie, PieChart, Tooltip } from "recharts"

  export const DisciplinasCard = (
    {
        curso,
        requisitos,
        requisitosScao,
        w
    }:CardProps
  ) => {

    const numeroDisciplinasObg = requisitos && requisitos.numero_disciplinas_obrigatorias_minimo ? requisitos.numero_disciplinas_obrigatorias_minimo : requisitosScao && requisitosScao.numero_disciplinas_obrigatorias_minimo ? requisitosScao.numero_disciplinas_obrigatorias_minimo : 0;
    const numeroDisciplinasOpt = requisitos && requisitos.numero_disciplinas_optativas_minimo ? requisitos.numero_disciplinas_optativas_minimo : requisitosScao && requisitosScao.numero_disciplinas_optativas_minimo ? requisitosScao.numero_disciplinas_optativas_minimo : 0;

    const chart = useChart({
        sort: { by: "value", direction: "desc" },
        data: [
          { name: "Obrigatórias", value: numeroDisciplinasObg, color: "orange.500" },
          { name: "Optativas", value: numeroDisciplinasOpt, color: "pink.500" },
        ],
      })

    return(
        <>
            <Card.Root minW={"24vw"} maxW={"full"} boxShadow={"sm"} bgColor={`${EURECA_COLORS.AZUL_MEDIO}/70`}>
              <Card.Body>
                  <Stat.Root >
                    <HStack justify="space-between">
                        <Stat.Label color={"gray.muted"}>Quantidade de Disciplinas</Stat.Label>
                        <Icon color={"gray.muted"}>
                        <LuPencilLine />
                        </Icon>
                    </HStack>


                    <Center h={"full"}>
                    <BarSegment.Root chart={chart} minW={"20vw"}>
                    <BarSegment.Content>
                        <BarSegment.Value  color={EURECA_COLORS.BRANCO}/>
                        <BarSegment.Bar tooltip />
                    </BarSegment.Content>
                    <BarSegment.Legend color={EURECA_COLORS.BRANCO}/>
                    </BarSegment.Root>
                    </Center>
                    
                  </Stat.Root>
              </Card.Body>
            </Card.Root>
        </>
    )
  }