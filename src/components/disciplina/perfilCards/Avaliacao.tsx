import { Card, CloseButton, Dialog, Flex, HStack, Icon, Portal, Stat,Text } from "@chakra-ui/react"
import { EURECA_COLORS } from "@/util/constants"
import { LuSchool } from "react-icons/lu"
import { DisciplinaCardProps } from "./Tipo"

  export const Avaliacao = (
    {
        valor
    }:DisciplinaCardProps
  ) => {

    console.log(valor)

    return(
        <>

            <Dialog.Root placement={"center"} size={"lg"}>
            <Dialog.Trigger asChild>
                <Card.Root cursor={"pointer"} maxW={"full"} minW={"18vw"} boxShadow={"sm"} _hover={{ bg: `${EURECA_COLORS.AZUL_MEDIO}/90` }} bgColor={`${EURECA_COLORS.AZUL_MEDIO}/70`}>
                <Card.Body>
                    <Stat.Root >
                        <HStack justify="space-between">
                            <Stat.Label color={"gray.muted"}>Avaliação</Stat.Label>
                            <Icon color={"gray.muted"}>
                            <LuSchool />
                            </Icon>
                        </HStack>
                        <Flex h={"full"} alignItems={"center"}>
                        <Text lineClamp={6} mt={2} color={EURECA_COLORS.BRANCO}>{valor}</Text>
                        </Flex>
                    </Stat.Root>
                </Card.Body>
                </Card.Root>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.Header>
                    <Dialog.Title>Avaliação</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body mb={4}>
                        <Text color={`${EURECA_COLORS.CINZA}`}>{valor}</Text>
                    </Dialog.Body>
                    <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
            </Dialog.Root>
        </>
    )
  }