import { DistribuicaoDePeriodos, PeriodoMaisComumDeEvadir } from "@/interfaces/types"
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { BarSegment, Chart, useChart } from "@chakra-ui/charts";
import { Card, Stat, HStack, Icon, Flex, Box } from "@chakra-ui/react";
import { LuCalendarOff, LuCalendarSearch, LuMedal, LuUserRoundCheck } from "react-icons/lu";
import { PieChart, Pie, Cell,Tooltip, Legend, LabelList } from "recharts";

interface MediaDeAprovacaoProps{
    media:number;
}

export const MediaDeAprovacao = (
  {
    media
  }: MediaDeAprovacaoProps
) => {

    const mapear = (media:number) => {
        if(media == 10){
            return "perfeita"
        }else if(media >= 9){
            return "ótima"
        }else if(media >= 8){
            return "boa"
        }else if(media >= 7){
            return "razoável"
        }else{
            return "preocupante"
        }
    }

    return(
        <>
            <Card.Root w={"6/12"} boxShadow={"sm"} bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}>
            <Card.Body>
                <Stat.Root >
                <HStack justify="space-between">
                    <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>Média de aprovação</Stat.Label>
                    <Icon color={`${EURECA_COLORS.CINZA}/55`}>
                    <LuUserRoundCheck  strokeWidth={2.6}/>
                    </Icon>
                </HStack>

                <Flex h={"full"} alignItems={"center"} gap={0}>
                    <Stat.ValueText color={`${EURECA_COLORS.CINZA}/80`}>A nota média dos aprovados é de {media}, que é considerada uma média {mapear(media)}.</Stat.ValueText>
                </Flex>
                </Stat.Root>
            </Card.Body>
            </Card.Root>
        </>
    )
}