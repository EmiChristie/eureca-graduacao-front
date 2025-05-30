import { MetricasCurso } from "@/interfaces/types"
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { formatarNome, round2 } from "@/util/utilities";
import { BarSegment, Chart, useChart } from "@chakra-ui/charts";
import { Card, Stat, HStack, Icon, Flex, Box,Text, Alert } from "@chakra-ui/react";
import { LuCalendarOff, LuMedal, LuUserRoundSearch } from "react-icons/lu";
import { PieChart, Pie, Cell,Tooltip, Legend, LabelList } from "recharts";

interface MetricasProps{
    metricas:MetricasCurso;
    curso:string;
} 

export const ComparacaoIngressantesGenero = (
  {
    metricas,
    curso
  }: MetricasProps
) => {

    const pct_mulheres = round2((metricas.quantidade_media_mulheres_ingressantes/metricas.quantidade_media_ingressantes)*100)

    const periodos = [
        {name:"Mulheres",value:metricas.quantidade_media_mulheres_ingressantes,porcentagem:pct_mulheres,color:"pink.500"},
        {name:"Homens",value:metricas.quantidade_media_homens_ingressantes,porcentagem:100-pct_mulheres,color:"teal.500"},
    ];

    const chart = useChart({
        sort: { by: "value", direction: "desc" },
        data: periodos,
    })

    const diferenca = round2((metricas.quantidade_media_mulheres_ingressantes-metricas.quantidade_media_homens_ingressantes)/metricas.quantidade_media_ingressantes*100)

    const categoria_procura=()=>{
        if(Math.abs(diferenca) < 10){
            return "bastante equilibrada"
        }else if(diferenca > -19.99){
            return "tendendo ao público masculino"
        }else if(diferenca < 0){
            return "centrada no público masculino"
        }else if(diferenca < 19.99){
            return "tendendo ao público feminino"
        }else{
            return "centrada no público feminino"
        }
    }

    return(
        <>
            <Card.Root w={"5/12"} boxShadow={"sm"} bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}>
            <Card.Body>
                <Stat.Root >
                <HStack justify="space-between">
                    <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>Média de ingressantes por gênero</Stat.Label>
                    <Icon color={`${EURECA_COLORS.CINZA}/55`}>
                    <LuUserRoundSearch strokeWidth={2.6}/>
                    </Icon>
                </HStack>

                <Flex h={"full"} flexDir={"column"} gap={6} mt={4}>
                    <Box mt={1}>
                        <Text fontSize={"sm"} fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/80`}>
                            Dos {metricas.quantidade_media_ingressantes} ingressantes por período, em média, {metricas.quantidade_media_mulheres_ingressantes} são mulheres e {metricas.quantidade_media_homens_ingressantes} são homens, podendo haver uma variação de {metricas.desvio_padrao_ingressantes}% na quantidade de ingressantes e {metricas.desvio_padrao_mulheres_ingressantes}% na diferença de gênero dos ingressantes.
                        </Text>
                    </Box>
                    <Box justifyItems={"center"} alignContent={"center"}>
                        <BarSegment.Root color={`${EURECA_COLORS.CINZA}/80`} chart={chart} minW={"full"}>
                        <BarSegment.Content>
                            <BarSegment.Bar tooltip />
                        </BarSegment.Content>
                        <BarSegment.Legend textStyle="xs" showPercent/>
                        </BarSegment.Root>
                    </Box>
                    <Box mt={1}>
                        <Text fontSize={"sm"} fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/80`}>
                            Dada a diferença de cerca de {Math.abs(diferenca)}% no gênero dos ingressantes, o curso pode ser visto como tendo uma procura {categoria_procura()}.
                        </Text>
                    </Box>
                </Flex>
                </Stat.Root>
            </Card.Body>
            </Card.Root>
        </>
    )
}