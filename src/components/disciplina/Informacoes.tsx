import { Box, Button, Card, CloseButton, Dialog, Flex, Grid, HStack, Icon, Portal, Span, Stat, Text } from "@chakra-ui/react"
import { LuCopyX, LuNotebookText } from "react-icons/lu"
import { PerfilDisciplinaProps } from "./PerfilDisciplina"
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants"
import { formatarNome } from "@/util/utilities"
import { useState } from "react"
import { Ementa } from "./perfilCards/Ementa"
import { Metodologia } from "./perfilCards/Metodologia"
import { Objetivos } from "./perfilCards/Objetivos"
import { Referencias } from "./perfilCards/Referencias"
import { Avaliacao } from "./perfilCards/Avaliacao"
import { Conteudo } from "./perfilCards/Conteudo"

  export const Informacoes = (
    {
        informacoes
    }:PerfilDisciplinaProps
  ) => {

    const [selected,setSelected] = useState(1);

    const mapearTitulo = (s:number)=>{
        switch(s){
            case 1: return "Ementa";
            case 2: return "Metodologia";
            case 3: return "Objetivos";
            case 4: return "Avaliação";
            case 5: return "Conteúdo";
            case 6: return "Referências";
            default: return "Ementa";
        }
    }

    const mapearConteudo = (s:number)=>{
        switch(s){
            case 1: return informacoes.ementa;
            case 2: return informacoes.metodologia;
            case 3: return informacoes.objetivos;
            case 4: return informacoes.avaliacao;
            case 5: return informacoes.conteudo;
            case 6: return informacoes.referencias;
            default: return informacoes.ementa;
        }
    }

    return(
        <>
        {
            /*
        <Flex gap={4}>
            <Grid className="grid-cols-2" gap={2}>
                <Button h={"full"} onClick={()=>setSelected(1)} bgColor={selected == 1 ? `${EURECA_COLORS.AZUL_CLARO}/70`:`${EURECA_COLORS.CINZA}/70`} _hover={{bg:`${EURECA_COLORS.AZUL_CLARO}/90`}} w={"full"}>Ementa</Button>
                <Button h={"full"} onClick={()=>setSelected(2)} bgColor={selected == 2 ? `${EURECA_COLORS.AZUL_CLARO}/70`:`${EURECA_COLORS.CINZA}/70`} _hover={{bg:`${EURECA_COLORS.AZUL_CLARO}/90`}} px={16} >Metodologia</Button>
                <Button h={"full"} onClick={()=>setSelected(3)} bgColor={selected == 3 ? `${EURECA_COLORS.AZUL_CLARO}/70`:`${EURECA_COLORS.CINZA}/70`} _hover={{bg:`${EURECA_COLORS.AZUL_CLARO}/90`}} w={"full"}>Objetivos</Button>
                <Button h={"full"} onClick={()=>setSelected(4)} bgColor={selected == 4 ? `${EURECA_COLORS.AZUL_CLARO}/70`:`${EURECA_COLORS.CINZA}/70`} _hover={{bg:`${EURECA_COLORS.AZUL_CLARO}/90`}} w={"full"}>Avaliação</Button>
                <Button h={"full"} onClick={()=>setSelected(5)} bgColor={selected == 5 ? `${EURECA_COLORS.AZUL_CLARO}/70`:`${EURECA_COLORS.CINZA}/70`} _hover={{bg:`${EURECA_COLORS.AZUL_CLARO}/90`}} w={"full"}>Conteúdo</Button>
                <Button h={"full"} onClick={()=>setSelected(6)} bgColor={selected == 6 ? `${EURECA_COLORS.AZUL_CLARO}/70`:`${EURECA_COLORS.CINZA}/70`} _hover={{bg:`${EURECA_COLORS.AZUL_CLARO}/90`}} w={"full"}>Referências</Button>
            </Grid>
            <Card.Root w={"full"} boxShadow={"sm"} bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`} color={EURECA_COLORS.CINZA}>
            <Card.Body>
                <Stat.Root >
                <HStack justify="space-between">
                    <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>{mapearTitulo(selected)}</Stat.Label>
                </HStack>
    
                <Flex mt={2} flexDir={"column"} gap={2}>
                    <Text fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/80`} lineClamp={2}>
                        {mapearConteudo(selected)}
                    </Text>
                    <Dialog.Root placement={"center"} size={"lg"}>
                    <Dialog.Trigger asChild>
                        <Button alignSelf={"end"} w={"max"} fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`} _hover={{bg:`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/90`}} variant={"ghost"}>Ver mais</Button>
                    </Dialog.Trigger>
                    <Portal>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                            <Dialog.Title>{mapearTitulo(selected)} da disciplina</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body mb={4}>
                                <Text color={`${EURECA_COLORS.CINZA}`}>{mapearConteudo(selected)}</Text>
                            </Dialog.Body>
                            <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                        </Dialog.Positioner>
                    </Portal>
                    </Dialog.Root>
                    </Flex>
                </Stat.Root>
            </Card.Body>
            </Card.Root>
        </Flex>
            */
        }

        <Grid templateColumns={"repeat(3,1fr)"} gap={4} w={"full"}  placeContent={"space-between"} placeItems={"stretch"}>
            {informacoes.ementa && informacoes.ementa !== null ? 
                <Ementa valor={informacoes.ementa}/>
                :
                <></>
            }
            {informacoes.metodologia && informacoes.metodologia !== null ? 
                <Metodologia valor={informacoes.metodologia}/>
                :
                <></>
            }
            {informacoes.objetivos && informacoes.objetivos !== null ? 
                <Objetivos valor={informacoes.objetivos}/>
                :
                <></>
            }
            {informacoes.avaliacao && informacoes.avaliacao !== null ? 
                <Avaliacao valor={informacoes.avaliacao}/>
                :
                <></>
            }
            {informacoes.conteudo && informacoes.conteudo !== null ? 
                <Conteudo valor={informacoes.conteudo}/>
                :
                <></>
            }
            {informacoes.referencias && informacoes.referencias !== null ? 
                <Referencias valor={informacoes.referencias}/>
                :
                <></>
            }
        </Grid>
        </>
    )
  }