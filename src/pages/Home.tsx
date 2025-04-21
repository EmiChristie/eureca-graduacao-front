import { Toaster, toaster } from "@/components/ui/toaster";
import { Button, Center } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { testarConexao } from "@/service/eurecaService";

const Home = () => {
  const mutation = useMutation({
    mutationFn: testarConexao,
    onSuccess: () => {
      toaster.create({
        title: "Conexão com o back-end funcionando!",
        type: "success",
      });
    },
    onError: () => {
      toaster.create({
        title: "Conexão deu erro",
        type: "error",
      });
    },
  });

  return (
    <>
      <Center bg="bg.emphasized" h="100vh" w="full">
        <Button onClick={() => mutation.mutate()}>Testar backend</Button>
      </Center>
      <Toaster />
    </>
  );
};

export default Home;
