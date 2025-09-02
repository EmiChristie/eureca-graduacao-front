import { MetricasCurso } from "@/interfaces/types"
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { BarSegment, Chart, useChart } from "@chakra-ui/charts";
import { Card, Stat, HStack, Icon, Flex, Box } from "@chakra-ui/react";
import { LuCalendarOff } from "react-icons/lu";
import { PieChart, Pie, Cell,Tooltip, Legend, LabelList } from "recharts";

interface MetricasProps{
    metricas:MetricasCurso;
} 

export const MetricaSkeleton = (
  {
    metricas
  }: MetricasProps
) => {

    return(
        <>
            <Card.Root w={"6/12"} boxShadow={"sm"} bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}>
            <Card.Body>
                <Stat.Root >
                <HStack justify="space-between">
                    <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}></Stat.Label>
                    <Icon color={`${EURECA_COLORS.CINZA}/55`}>
                    <LuCalendarOff  strokeWidth={2.6}/>
                    </Icon>
                </HStack>

                <Flex h={"full"} alignItems={"center"} justify={"center"} gap={0}>

                </Flex>
                </Stat.Root>
            </Card.Body>
            </Card.Root>
        </>
    )
}