import { EURECA_COLORS } from "@/util/constants";
import { Box, Button, CloseButton, defineStyle, Dialog, Field, Input, Portal, Stack, Text } from "@chakra-ui/react";
import { PasswordInput } from "../ui/password-input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toaster, Toaster } from "../ui/toaster";
import { getToken, getUserInfo } from "@/service/eurecaService";
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
          mutation2.mutate({matricula: loginvalue,token:data});
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
        mutationKey: ["getUserInfo"],
        mutationFn: getUserInfo,
        onSuccess: (data) => {
          toaster.create({
            title: "Login realizado com sucesso!",
            type: "success"
          });

          console.log(data);
          user.setUser(data);
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
                <Button h={"8vh"} bgColor={`${EURECA_COLORS.AZUL_CLARO}/70`} px={6}>
                  Entrar
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content bgColor={`${EURECA_COLORS.BRANCO}/95`} className="text" color={EURECA_COLORS.CINZA} textAlign={"justify"}>
                      <Dialog.Header display={"flex"} flexDir={"column"}>
                          <Dialog.Title color={"black"}>Login</Dialog.Title>
                          <Dialog.Description>Já é estudante da UFCG? Entre com suas credenciais do SCAO e acesse métricas particulares sobre o seu desempenho acadêmico!</Dialog.Description>
                      </Dialog.Header>
                      <Dialog.Body>
                        <form>
                          <Stack gap="2" w="full">
                              <Field.Root>
                                  <Input autoComplete="" value={loginvalue} onChange={(e) => setLoginValue(e.target.value)} placeholder="Matrícula" />
                              </Field.Root>
                              <Field.Root>
                                  <PasswordInput autoComplete="current-password" value={passwordvalue} onChange={(e) => setPasswordValue(e.target.value)} placeholder="Senha" />
                              </Field.Root>
                          </Stack>
                        </form>
                      </Dialog.Body>
                      <Dialog.Footer mb={4} placeContent={"center"}>
                          <Button bgColor={`${EURECA_COLORS.AZUL_CLARO}/70`} onClick={()=>mutation.mutate({username: loginvalue, password: passwordvalue})} px={6}>Entrar</Button>
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
  