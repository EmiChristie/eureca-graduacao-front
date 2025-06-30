import { MetricasCurso } from "@/interfaces/types"
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { formatarNome } from "@/util/utilities";
import { BarSegment, Chart, useChart } from "@chakra-ui/charts";
import { Card, Stat, HStack, Icon, Flex, Box,Text, Alert } from "@chakra-ui/react";
import { LuCalendarOff, LuMedal, LuUserRoundSearch } from "react-icons/lu";
import { PieChart, Pie, Cell,Tooltip, Legend, LabelList } from "recharts";

interface MetricasProps{
    metricas:MetricasCurso;
    curso:string;
} 

export const ComparacaoGeralGenero = (
  {
    metricas,
    curso
  }: MetricasProps
) => {

    const periodos = [
        {name:"Mulheres",porcentagem:metricas.porcentagem_media_mulheres_entre_graduados,color:"pink.500"},
        {name:"Homens",porcentagem:metricas.porcentagem_media_homens_entre_graduados,color:"blue.500"},
    ];

    const chart = useChart({
        data: periodos,
    })

    const graduadas_media = Math.round(metricas.porcentagem_media_mulheres_entre_graduados);
    const apenas = graduadas_media < 30;
    const qtd_mulheres = Math.round(metricas.quantidade_media_graduados * (metricas.porcentagem_media_mulheres_entre_graduados/100));
    const qtd_homens = metricas.quantidade_media_graduados - qtd_mulheres;

    const categoria_variacao = () => {
        if(metricas.desvio_padrao_percentual_medio_de_genero > 34.99){
            return "extremamente oscilante"
        }else if(metricas.desvio_padrao_percentual_medio_de_genero > 19.99){
            return "bastante oscilante"
        }else if(metricas.desvio_padrao_percentual_medio_de_genero > 9.99){
            return "normal"
        }else{
            return "bastante estável"
        }
    };
    const porem = () => {
        if(metricas.desvio_padrao_percentual_medio_de_genero > 19.99){
            return true
        }else{
            return false
        }
    };
    const categoria_sucesso_feminino = () => {
        if(metricas.porcentagem_media_mulheres_entre_graduados > 49.99){
            return "alta"
        }else if(metricas.porcentagem_media_mulheres_entre_graduados > 39.99){
            return "boa"
        }else if(metricas.porcentagem_media_mulheres_entre_graduados > 29.99){
            return "razoável"
        }else if(metricas.porcentagem_media_mulheres_entre_graduados > 14.99){
            return "baixa"
        }else{
            return "preocupante"
        }
    };
    const categoria_sucesso_masculino = () => {
        if(metricas.porcentagem_media_homens_entre_graduados > 49.99){
            return "alta"
        }else if(metricas.porcentagem_media_homens_entre_graduados > 39.99){
            return "boa"
        }else if(metricas.porcentagem_media_homens_entre_graduados > 29.99){
            return "razoável"
        }else if(metricas.porcentagem_media_homens_entre_graduados > 14.99){
            return "baixa"
        }else{
            return "preocupante"
        }
    };


    return(
        <>
            <Card.Root w={"7/12"} boxShadow={"sm"} bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}>
            <Card.Body>
                <Stat.Root >
                <HStack justify="space-between">
                    <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>Taxa de sucesso entre gêneros</Stat.Label>
                    <Icon color={`${EURECA_COLORS.CINZA}/55`}>
                    <LuUserRoundSearch strokeWidth={2.6}/>
                    </Icon>
                </HStack>

                <Flex h={"full"} gap={8} mt={4}>
                    <Box w={"2/6"} justifyItems={"center"} h={"full"} alignContent={"center"}>
                    <Chart.Root boxSize={"220px"} border={"none"} chart={chart} mr={8} ml={10}>
                     <PieChart>
                         <Pie
                         innerRadius={50}
                         outerRadius={90}
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
                        <Text fontSize={"sm"} fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/80`}>
                            Dentre 100 graduados do curso de {formatarNome(curso)}, em média, {apenas ? "apenas ":" "}{graduadas_media} são mulheres, com um desvio padrão de gênero de {metricas.desvio_padrao_percentual_medio_de_genero}% entre os graduados analisados. Em números concretos, dos 16 graduados entre os 40 ingressantes do mesmo período, {apenas ? "apenas":""} {qtd_mulheres} serão mulheres, enquanto os outros {qtd_homens} serão homens.
                        </Text>
                        <Text fontSize={"sm"} mt={4} fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/80`}>
                            Dada a variação de cerca de {Math.round(metricas.desvio_padrao_percentual_medio_de_genero)}% nessa análise, a taxa de sucesso feminina entre os graduados é considerada {categoria_sucesso_feminino()} {porem()? "porém":"e"} com uma variação {categoria_variacao()}. Enquanto isso, a taxa de sucesso masculina é considerada {categoria_sucesso_masculino()}, com a mesma variação.
                        </Text>
                    </Box>
                </Flex>
                </Stat.Root>
            </Card.Body>
            </Card.Root>
        </>
    )
}