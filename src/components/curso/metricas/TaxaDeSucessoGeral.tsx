import { MetricasCurso } from "@/interfaces/types"
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { formatarNome } from "@/util/utilities";
import { BarSegment, Chart, useChart } from "@chakra-ui/charts";
import { Card, Stat, HStack, Icon, Flex, Box,Text, Alert } from "@chakra-ui/react";
import { LuCalendarOff, LuMedal } from "react-icons/lu";
import { PieChart, Pie, Cell,Tooltip, Legend, LabelList } from "recharts";

interface MetricasProps{
    metricas:MetricasCurso;
    curso:string;
} 

export const TaxaDeSucessoGeral = (
  {
    metricas,
    curso
  }: MetricasProps
) => {

    const periodos = [
        {name:"Graduados",porcentagem:metricas.taxa_de_sucesso_media,color:"blue.400"},
        {name:"Evadidos",porcentagem:100-(metricas.taxa_de_sucesso_media),color:"orange.400"},
    ];
    const cores = [
        "orange.500",
        "pink.500",
        "purple.500",
        "blue.400",
        "teal.500",
        "yellow.500",
    ]

    const chart = useChart({
        data: periodos,
    })

    const graduados_media = Math.round(metricas.taxa_de_sucesso_media);
    const apenas = graduados_media < 40;

    return(
        <>
            <Card.Root w={"full"} boxShadow={"sm"} bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}>
            <Card.Body>
                <Stat.Root >
                <HStack justify="space-between">
                    <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>Taxa de sucesso percentual do curso</Stat.Label>
                    <Icon color={`${EURECA_COLORS.CINZA}/55`}>
                    <LuMedal strokeWidth={2.6}/>
                    </Icon>
                </HStack>

                <Flex h={"full"} gap={4} mt={4}>
                    <Box w={"2/6"} justifyItems={"center"}>
                    <Chart.Root boxSize={"220px"} border={"none"} chart={chart} mr={8} ml={10}>
                     <PieChart>
                         <Pie
                         innerRadius={60}
                         outerRadius={100}
                         isAnimationActive={true}
                         data={chart.data}
                         dataKey={chart.key("porcentagem")}
                         paddingAngle={8}
                         cornerRadius={4}
                         stroke="none"
                         >
                         <LabelList dataKey={"porcentagem"} formatter={(v)=>v+"%"} position="outside" />
                             {chart.data.map((item) => (
                                 <Cell key={item.name} fill={chart.color(item.color)} stroke={chart.color(item.color)} />
                             ))}
                         {chart.data.map((item) => (
                             <Cell key={item.name} fill={chart.color(item.color)} />
                         ))}
                         </Pie>
                         <Chart.Legend color={EURECA_COLORS.BRANCO}/>
                     </PieChart>
                     </Chart.Root>
                    <BarSegment.Root mt={4} justifySelf={"center"} chart={chart}>
                        <BarSegment.Legend display={"flex"} align={"left"} color={`${EURECA_COLORS.CINZA}/80`}/>
                    </BarSegment.Root>
                    </Box>
                    <Box w={"4/6"} mt={1}>
                        <Text fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/80`}>
                            Dentre 100 ingressantes do curso de {formatarNome(curso)}, em média, {apenas ? "apenas ":" "}{graduados_media} se graduam, com um desvio padrão de cerca de {metricas.desvio_padrao_percentual}% por período. Em números concretos, a cada novo semestre, o curso recebe cerca de {metricas.quantidade_media_ingressantes} ingressantes. Destes {metricas.quantidade_media_ingressantes}, em média, {metricas.quantidade_media_graduados} conseguirão se graduar, ao passo em que {metricas.quantidade_media_evadidos} acabarão evadindo do curso.
                        </Text>
                        <Text mt={4} fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/80`}>
                            Abaixo, você encontrará detalhes sobre as taxas de sucesso, ingresso e evasão do curso de {formatarNome(curso)}, bem como sobre possíveis disciplinas e períodos desafiadores ao longo da sua jornada acadêmica, identificados a partir do desempenho dos atuais e ex alunos do curso. Explore os detalhes da graduação e informe-se!
                        </Text>
                    </Box>
                </Flex>
                </Stat.Root>
            </Card.Body>
            </Card.Root>
        </>
    )
}