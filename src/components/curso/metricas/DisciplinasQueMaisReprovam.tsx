import { useChart, BarListData, BarList, Chart } from "@chakra-ui/charts";
import { MertricasProps } from "./PerfilCalculado";
import { EURECA_COLORS } from "@/util/constants";
import { mapArea } from "@/util/mapeamentos";
import { Card, Stat, HStack, Icon, Flex } from "@chakra-ui/react";
import { LuBookX, LuBriefcaseBusiness, LuCopyX, LuMedal } from "react-icons/lu";
import { Tooltip } from "recharts";

export const DisciplinasQueMaisReprovam = (
  {
    disciplinasReprovacao
  }: MertricasProps
) => {

  const disciplinas = [];
  disciplinasReprovacao.map(
    (d) => disciplinas.push({ name: d.nome_da_disciplina, value: d.porcentagem_de_reprovacoes })
  );

  const chart = useChart<BarListData>({
    sort: { by: "value", direction: "desc" },
    data: [
      disciplinas[0],
      disciplinas[1],
      disciplinas[2],
      disciplinas[3],
      disciplinas[4],
    ],
    series: [{ name: "name", color: `blue.300/70` }],
  });

  const getPercent = (value: number) =>
    chart.getValuePercent("value", value).toFixed(2);

  return (
    <>
      <Card.Root w={"5/12"} boxShadow={"sm"} bgColor={`#fff/70`}>
        <Card.Body>
          <Stat.Root >
            <HStack justify="space-between">
              <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/70`}>Top 5 disciplinas obrigatórias que mais reprovam</Stat.Label>
              <Icon color={`${EURECA_COLORS.CINZA}/70`}>
                <LuCopyX strokeWidth={2.6} />
              </Icon>
            </HStack>

            <Flex h={"full"} alignItems={"center"}>
              <BarList.Root fontWeight={"semibold"} borderRadius={"sm"} color={`${EURECA_COLORS.CINZA}/70`} w={"full"} chart={chart}>
                <BarList.Content>
                  <BarList.Label title="" flex="1">
                    <BarList.Bar />
                  </BarList.Label>
                  <BarList.Label title="" minW="16" titleAlignment="end">
                    <BarList.Value valueFormatter={(value) => `${value}%`} />
                  </BarList.Label>
                </BarList.Content>
              </BarList.Root>
            </Flex>
          </Stat.Root>
        </Card.Body>
      </Card.Root>
    </>
  );
};
