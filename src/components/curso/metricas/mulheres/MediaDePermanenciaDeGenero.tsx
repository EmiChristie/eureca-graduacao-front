import { GraduadosEvadidosEAtivosPorPeriodo, MetricasCurso } from "@/interfaces/types"
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { Chart, useChart } from "@chakra-ui/charts";
import { Card, Stat, HStack, Icon, Flex, Box, Span,Text, Badge, ColorSwatch } from "@chakra-ui/react";
import { LuCalendarFold, LuUsers, LuUsersRound } from "react-icons/lu";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { MertricasProps } from "../PerfilCalculado";

export const MediaDePermanenciaDeGenero = (
  {
    metricas,
    curso
  }: MertricasProps
) => {

         const cores = [
         "#a3cfff", //homens ingressantes
         "#1a3478", //homens graduados
         "#60a5fa", //homens evadidos
         "#f9a8d4", //mulheres ingressantes
         "#6d0e34", //mulheres graduadas
         "#f472b6", //mulheres evadidas
     ]

    const chart = useChart({
        data: [
            {mulheres_graduadas: metricas.porcentagem_media_mulheres_graduadas_em_relacao_as_mulheres_ingressantes, mulheres_evadidas:100-metricas.porcentagem_media_mulheres_graduadas_em_relacao_as_mulheres_ingressantes, homens_graduados:metricas.porcentagem_media_homens_graduados_em_relacao_aos_homens_ingressantes, homens_evadidos: 100-metricas.porcentagem_media_homens_graduados_em_relacao_aos_homens_ingressantes,periodo:"Permanência média" }
        ],
        series: [
        { name: "mulheres_graduadas", label:"Mulheres Graduadas", color: cores[4], stackId: "a" },
        { name: "mulheres_evadidas", label:"Mulheres Evadidas", color: cores[5], stackId: "a" },
        { name: "homens_graduados", label:"Homens Graduados", color: cores[1], stackId: "b" },
        { name: "homens_evadidos", label:"Homens Evadidos", color: cores[2], stackId: "b" },
        ],
    })

    const categoria_taxa = () => {
        if(Math.abs(metricas.porcentagem_media_mulheres_graduadas_em_relacao_as_mulheres_ingressantes - metricas.porcentagem_media_homens_graduados_em_relacao_aos_homens_ingressantes)<10){
            return "de ambos os grupos é bastante similar"
        }else if(metricas.porcentagem_media_mulheres_graduadas_em_relacao_as_mulheres_ingressantes > metricas.porcentagem_media_homens_graduados_em_relacao_aos_homens_ingressantes){
            return "feminina no curso é maior e os homens tendem mais a evadir"
        }else{
            return "masculina no curso é maior e as mulheres tendem mais a evadir"
        }
    }

    return(
        <>
            <Card.Root h={"full"} w={"5/12"} boxShadow={"sm"} bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}>
                <Card.Body>
                    <Stat.Root >
                    <HStack justify="space-between">
                        <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>Média de permanência por gênero</Stat.Label>
                        <Icon color={`${EURECA_COLORS.CINZA}/55`}>
                        <LuUsersRound strokeWidth={2.6}/>
                        </Icon>
                    </HStack>

                    <Flex mt={4} h={"full"}>
                        <Box>
                            <Text fontSize={"sm"} fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/80`}>
                                De 100 mulheres ingressantes neste curso, em média, {Math.round(metricas.porcentagem_media_mulheres_graduadas_em_relacao_as_mulheres_ingressantes)} conseguem se formar. Já entre 100 homens ingressantes, é provável que {Math.round(metricas.porcentagem_media_homens_graduados_em_relacao_aos_homens_ingressantes)} consigam se formar.
                            </Text>
                            <Text mt={4} fontSize={"sm"} fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/80`}>
                                Em geral, a taxa de permanência {categoria_taxa()}.
                            </Text>
                        </Box>
                        <Chart.Root w={"3/6"} chart={chart}>
                        <BarChart data={chart.data} barSize={30}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                            axisLine={false}
                            tickLine={false}
                            dataKey={chart.key("periodo")}
                            />
                            <YAxis 
                            tickLine={false} 
                            stroke={"none"}
                            tickFormatter={(value) => `${value}%`}
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