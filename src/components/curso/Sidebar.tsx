import { Box,Button,ButtonGroup,Card,Center,Flex,Icon,Link,Text, VStack } from "@chakra-ui/react"
import { CursoProps } from "./CursoPerfil"
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants"
import { LuBookText, LuChartLine, LuCombine, LuLayoutDashboard, LuLightbulb, LuUser, LuUserRound } from "react-icons/lu"

  export const Sidebar = (
    {
        curso
    }:CursoProps
  ) => {
    return(
        <>
            <Box w={"full"} h={"full"}>
                <Box bg={EURECA_COLORS.AZUL_ESCURO} boxShadow={"sm"} rounded={"sm"}>
                    <Center h={"8vh"} px={4} gap={2}>
                        <LuLightbulb size={"4vh"} color={EURECA_COLORS.BRANCO}/>
                        <Text fontSize={"xl"} lineHeight={"shorter"} color={EURECA_COLORS.BRANCO}>Eureca Graduação</Text>
                    </Center>
                </Box>
                <Card.Root mt={4} bg={"blue.800/70"} boxShadow={"sm"} h={"full"}>
                    <Card.Body>
                        <Flex flexDir={"column"} gap={2}>
                            <Button justifyContent={"left"} variant={"ghost"}>
                                <Link href="#" color={EURECA_COLORS.BRANCO} className="text">
                                    <LuLayoutDashboard/> Cursos
                                </Link>
                            </Button>
                            <Button justifyContent={"left"} variant={"ghost"}>
                                <Link href="#" color={EURECA_COLORS.BRANCO} className="text">
                                    <LuBookText/> Perfil
                                </Link>
                            </Button>
                            <Button justifyContent={"left"} variant={"ghost"}>
                                <Link href="#" color={EURECA_COLORS.BRANCO} className="text">
                                    <LuCombine /> Fluxograma
                                </Link>
                            </Button>
                            <Button justifyContent={"left"} variant={"ghost"}>
                                <Link href="#" color={EURECA_COLORS.BRANCO} className="text">
                                    <LuChartLine /> Diagnóstico
                                </Link>
                            </Button>
                            <Button justifyContent={"left"} variant={"ghost"}>
                                <Link href="#" color={EURECA_COLORS.BRANCO} className="text">
                                    <LuUserRound/> Meu Desempenho
                                </Link>
                            </Button></Flex>
                    </Card.Body>
                </Card.Root>
            </Box>
        </>
    )
  }