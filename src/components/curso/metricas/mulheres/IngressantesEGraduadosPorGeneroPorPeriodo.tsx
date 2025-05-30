import { GraduadosEvadidosEAtivosPorPeriodo, MetricasCurso } from "@/interfaces/types"
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { Chart, useChart } from "@chakra-ui/charts";
import { Card, Stat, HStack, Icon, Flex, Box, Span,Text, Badge, ColorSwatch } from "@chakra-ui/react";
import { LuCalendarFold, LuUsers, LuUsersRound } from "react-icons/lu";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { MertricasProps } from "../PerfilCalculado";

export const IngressantesEGraduadosPorGeneroPorPeriodo = (
  {
    metricas,
  }: MertricasProps
) => {

         const cores = [
         "#a3cfff", //homens ingressantes
         "#60a5fa", //homens graduados
         "#173da6", //homens evadidos
         "#f9a8d4", //mulheres ingressantes
         "#ec4899", //mulheres graduadas
         "#6d0e34", //mulheres evadidas
     ]
     

    const periodos = []

    metricas.graduados_evadidos_e_ativos_por_periodo
    .forEach((x)=>
        {
            if(x.porcentagem_ativos > 10){
                return;
            }else{
                periodos.push({mulheres_ingressantes:x.mulheres_ingressantes,homens_ingressantes:x.homens_ingressantes, total_ingressantes:x.total_alunos, total_evadidos:x.evadidos,total_graduados:x.graduados,alunos_ativos:x.ativos, mulheres_graduadas: x.mulheres_graduadas, mulheres_evadidas:(x.mulheres_ingressantes-x.mulheres_graduadas), homens_graduados:x.homens_graduados, homens_evadidos: (x.homens_ingressantes-x.homens_graduados), periodo: x.periodo })
            }
        }
    )

    const chart = useChart({
        data: periodos,
        series: [
        { name: "mulheres_evadidas", label:"Mulheres Evadidas", color: cores[5], stackId: "a" },
        { name: "mulheres_graduadas", label:"Mulheres Graduadas", color: cores[4], stackId: "a" },
        { name: "homens_evadidos", label:"Homens Evadidos", color: cores[2], stackId: "b" },
        { name: "homens_graduados", label:"Homens Graduados", color: cores[1], stackId: "b" },
        ],
    })

    return(
        <>
            <Card.Root h={"full"} w={"7/12"} boxShadow={"sm"} bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}>
                <Card.Body>
                    <Stat.Root >
                    <HStack justify="space-between">
                        <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>Distribuição de mulheres e homens graduados e evadidos por período</Stat.Label>
                        <Icon color={`${EURECA_COLORS.CINZA}/55`}>
                        <LuUsersRound strokeWidth={2.6}/>
                        </Icon>
                    </HStack>

                    <Flex mt={4} alignItems={"center"} h={"full"}>
                        <Chart.Root maxH="2xs" chart={chart}>
                        <BarChart data={chart.data}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                            axisLine={false}
                            tickLine={false}
                            dataKey={chart.key("periodo")}
                            tickFormatter={(value) => value.slice(2, 6)}
                            />
                            <YAxis tickLine={false} stroke={"none"} />
                            <Tooltip
                            cursor={false}
                            animationDuration={100}
                            content={({ payload }) => {
                                if (!payload || !payload.length) return null;
                                const data = payload[0].payload;
                                return (
                                <Box p={2} bg="white" boxShadow="sm" borderRadius="md">
                                    <Text fontSize={"xs"} fontWeight="bold">
                                    Dos ingressantes em {data.periodo}...
                                    </Text>
                                    <Text fontWeight="normal" mt={2}>
                                    Total de ingressantes:{" "}
                                    <Span fontWeight="semibold" color="black">
                                        {data.total_ingressantes}
                                    </Span>
                                    </Text>
                                        <Badge bgColor={"transparent"} mt={1}>
                                            <ColorSwatch value={cores[3]} boxSize="0.82em" />
                                            Mulheres ingressantes:
                                            <Span fontWeight="semibold" color="black">
                                            {data.mulheres_ingressantes}
                                            </Span>
                                        </Badge>
                                        <br></br>
                                        <Badge bgColor={"transparent"}>
                                            <ColorSwatch value={cores[0]} boxSize="0.82em" />
                                            Homens ingressantes:
                                            <Span fontWeight="semibold" color="black">
                                            {data.homens_ingressantes}
                                            </Span>
                                        </Badge>
                                    <Text fontWeight="normal" mt={2}>
                                    Total de graduados:{" "}
                                    <Span fontWeight="semibold" color="black">
                                        {data.total_graduados}
                                    </Span>
                                    </Text>
                                        <Badge bgColor={"transparent"} mt={1}>
                                            <ColorSwatch value={cores[4]} boxSize="0.82em" />
                                            Mulheres graduadas:
                                            <Span fontWeight="semibold" color="black">
                                            {data.mulheres_graduadas}
                                            </Span>
                                        </Badge>
                                        <br></br>
                                        <Badge bgColor={"transparent"}>
                                            <ColorSwatch value={cores[1]} boxSize="0.82em" />
                                            Homens graduados:
                                            <Span fontWeight="semibold" color="black">
                                            {data.homens_graduados}
                                            </Span>
                                        </Badge>
                                    <Text fontWeight="normal" mt={2}>
                                    Total de evadidos:{" "}
                                    <Span fontWeight="semibold" color="black">
                                        {data.total_evadidos}
                                    </Span>
                                    </Text>
                                        <Badge bgColor={"transparent"} mt={1}>
                                            <ColorSwatch value={cores[5]} boxSize="0.82em" />
                                            Mulheres evadidas:
                                            <Span fontWeight="semibold" color="black">
                                            {data.mulheres_evadidas}
                                            </Span>
                                        </Badge>
                                        <br></br>
                                        <Badge bgColor={"transparent"}>
                                            <ColorSwatch value={cores[2]} boxSize="0.82em" />
                                            Homens evadidos:
                                            <Span fontWeight="semibold" color="black">
                                            {data.homens_evadidos}
                                            </Span>
                                        </Badge>
                                    <Text fontWeight="normal" mt={2}>
                                    Alunos ainda ativos:{" "}
                                    <Span fontWeight="semibold" color="black">
                                        {data.alunos_ativos}
                                    </Span>
                                    </Text>
                                </Box>
                                );
                            }}
                            />
                            <Legend 
                            layout="vertical"
                            align="left"
                            verticalAlign="top"
                            content={<Chart.Legend orientation={"vertical"} />} 
                            />
                            {chart.series.map((item) => (
                            <Bar
                                isAnimationActive={true}
                                key={item.name}
                                dataKey={chart.key(item.name)}
                                fill={chart.color(item.color)}
                                stackId={item.stackId}
                            />
                            ))}
                        </BarChart>
                        </Chart.Root>
                    </Flex>
                    </Stat.Root>
                </Card.Body>
            </Card.Root>
        </>
    )
}