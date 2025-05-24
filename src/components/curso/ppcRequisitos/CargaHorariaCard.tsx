import { Card, Center, HStack, Icon, Stat } from "@chakra-ui/react"
import { EURECA_COLORS } from "@/util/constants"
import { LuBriefcaseBusiness, LuClock, LuNotebookPen} from "react-icons/lu"
import { mapArea } from "@/util/mapeamentos";
import { CardProps } from "./DuracaoCard";
import { BarSegment, Chart, useChart } from "@chakra-ui/charts"
import { Cell, Label, Pie, PieChart, Tooltip } from "recharts"

  export const CargaHorariaCard = (
    {
        curso,
        requisitos,
        w
    }:CardProps
  ) => {

    const obg = requisitos.carga_horaria_disciplinas_obrigatorias_minima;
    const opt = requisitos.carga_horaria_disciplinas_optativas_minima;
    const comp = requisitos.carga_horaria_atividades_complementares_minima;
    

    const chart = useChart({
        data: [
        { name: "Disciplinas Obrigatórias", value: obg, color: "orange.500" },
        { name: "Atividades complementares", value: comp, color: "teal.500" },
        { name: "Disciplinas Optativas", value: opt, color: "pink.500" },
        ],
    })
        
    return(
        <>
            <Card.Root minW={"20vw"} maxW={"full"} boxShadow={"sm"} bgColor={`${EURECA_COLORS.AZUL_MEDIO}/70`}>
              <Card.Body>
                  <Stat.Root>
                    <HStack justify="space-between">
                        <Stat.Label color={"gray.muted"}>Carga Horária</Stat.Label>
                        <Icon color={"gray.muted"}>
                        <LuClock/>
                        </Icon>
                    </HStack>
                    
                    <Stat.ValueText mt={2} color={EURECA_COLORS.BRANCO}>{requisitos.carga_horaria_minima_total} horas totais</Stat.ValueText>

                    <Chart.Root border={"none"} chart={chart} mx="auto">
                    <PieChart>
                        <Tooltip
                        cursor={false}
                        animationDuration={100}
                        content={<Chart.Tooltip hideLabel />}
                        />
                        <Pie
                        innerRadius={40}
                        outerRadius={70}
                        isAnimationActive={true}
                        data={chart.data}
                        dataKey={chart.key("value")}
                        paddingAngle={8}
                        cornerRadius={4}
                        stroke="none"
                        > 
                        
                        {chart.data.map((item) => (
                            <Cell key={item.name} fill={chart.color(item.color)} />
                        ))}
                        </Pie>
                        <Chart.Legend color={EURECA_COLORS.BRANCO}/>
                    </PieChart>
                    </Chart.Root>
                  </Stat.Root>
              </Card.Body>
            </Card.Root>
        </>
    )
  }