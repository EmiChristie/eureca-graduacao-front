import { EURECA_COLORS } from "@/util/constants";
import { Box, Button, CloseButton, defineStyle, Dialog, Field, Input, Portal, Stack, Text } from "@chakra-ui/react";
import { PasswordInput } from "../ui/password-input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toaster, Toaster } from "../ui/toaster";
import { getProfile, getToken, getUserInfo } from "@/service/eurecaService";
import { useUserStore } from "@/stores/user/user.store";

export interface LoginDialogProps{
  handleClose?: (open: boolean) => void;
}
  
export const LoginDialog = (
  {
    handleClose
  } : LoginDialogProps
) => {
    const user = useUserStore((state) => state);

    const [passwordvalue,setPasswordValue] = useState("");
    const [loginvalue,setLoginValue] = useState("");

    const mutation = useMutation({
        mutationKey: ["getToken"],
        mutationFn: getToken,
        onSuccess: (data) => {
          mutation2.mutate(data);
          //mutation3.mutate({matricula: loginvalue,token:data});
        },
        onError: (error) => {
          console.log(error);
          toaster.create({
            title: "Falha na autenticação",
            description: "Verifique suas credenciais e tente novamente",
            type: "error"
          });
        },
      });

      const mutation2 = useMutation({
        mutationKey: ["getProfile"],
        mutationFn: getProfile,
        onSuccess: (data,token) => {
          console.log(data)
          if(data.type.toLowerCase() === "aluno"){
            mutation3.mutate({matricula: data.attributes.aluno,token:token});
          }else if(data.type.toLowerCase() === "curso"){
            /* SCAO:
            user.setProfile({
              id:data.id,
              name:data.name,
              type:data.attributes.type,
              code:data.attributes.code,
            });
            */
            
            user.setProfile({
              id:data.id,
              name:data.name,
              type:data.type,
              code:data.attributes.coordenador,
            });
          toaster.create({
            title: "Login realizado com sucesso!",
            type: "success"
          });
          }else{
            /* SCAO:
            user.setProfile({
              id:data.id,
              name:data.name,
              type:data.attributes.type,
            });
            */
            user.setProfile({
              id:data.id,
              name:data.name,
              type:data.type,
            });
          toaster.create({
            title: "Login realizado com sucesso!",
            type: "success"
          });
          }
        },
        onError: (error) => {
          console.log(error);
          toaster.create({
            title: "Erro ao recuperar o perfil do usuário",
            description: "Tente novamente mais tarde",
            type: "error"
          });
        },
      });

      const mutation3 = useMutation({
        mutationKey: ["getUserInfo"],
        mutationFn: getUserInfo,
        onSuccess: (data) => {
          toaster.create({
            title: "Login realizado com sucesso!",
            type: "success"
          });

          console.log(data);
          user.setUser(data);
          user.setProfile({
              id:data.matricula_do_estudante,
              name:data.nome,
              type:"Aluno",
              code:String(data.codigo_do_curso),
              curriculum:String(data.codigo_do_curriculo)
            });
        },
        onError: (error) => {
          console.log(error);
          toaster.create({
            title: "Erro ao realizar o login",
            description: "Tente novamente mais tarde",
            type: "error"
          });
        },
      });

return (
    <>
        <Dialog.Root
            placement={"center"}
            size={"xs"}>
            <Dialog.Trigger asChild>
                <Button h={"7vh"} _hover={{ bg: `orange.500` }} boxShadow={"sm"} bgColor={`orange.400`} px={6}>
                  Entrar
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content boxShadow={"sm"} bgColor={`${EURECA_COLORS.BRANCO}/95`} className="text" color={EURECA_COLORS.CINZA} textAlign={"justify"}>
                      <Dialog.Header display={"flex"} flexDir={"column"}>
                          <Dialog.Title color={"black"}>Login</Dialog.Title>
                          <Dialog.Description>Entre com suas credenciais do SIGAA para acessar métricas particulares de desempenho acadêmico!</Dialog.Description>
                      </Dialog.Header>
                      <Dialog.Body>
                        <form>
                          <Stack gap="2" w="full">
                              <Field.Root>
                                  <Input autoComplete="" value={loginvalue} onChange={(e) => setLoginValue(e.target.value)} placeholder="Username" />
                              </Field.Root>
                              <Field.Root>
                                  <PasswordInput autoComplete="current-password" value={passwordvalue} onChange={(e) => setPasswordValue(e.target.value)} placeholder="Senha" />
                              </Field.Root>
                          </Stack>
                        </form>
                      </Dialog.Body>
                      <Dialog.Footer mb={4} placeContent={"center"}>
                          <Button _hover={{ bg: `orange.500` }} boxShadow={"sm"} bgColor={`orange.400`} onClick={()=>mutation.mutate({username: loginvalue, password: passwordvalue})} px={6}>Entrar</Button>
                      </Dialog.Footer>
                      <Dialog.CloseTrigger asChild>
                      <CloseButton m={2} size="sm" />
                      </Dialog.CloseTrigger>
                  </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
        <Toaster/>
    </>
);
};
  