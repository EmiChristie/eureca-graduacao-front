import { Curriculo, Curso, DesempenhoAlunoResponse, PontoFda, ResultadoFda, User } from "@/interfaces/types";
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { formatarNome } from "@/util/utilities";
import { Chart, useChart } from "@chakra-ui/charts";
import { Card, Stat, HStack, Icon, Flex, Box, Text, Strong, Span, List } from "@chakra-ui/react";
import { LuArrowUp10, LuClipboardList, LuPencilLine } from "react-icons/lu";
import { AreaChart, XAxis, YAxis, Area, Tooltip, ReferenceLine, Scatter } from "recharts";

interface DesempenhoAlunoProps {
    metricas: DesempenhoAlunoResponse;
    aluno: User;
    requisitos: Curriculo;
    curso: Curso;
}

export const CardDiagnosticoAluno = (
    { 
        aluno,
        metricas,
        requisitos,
        curso
    }: DesempenhoAlunoProps
) => {

  const nome = aluno.nome;
  const vMedia = aluno.velocidade_media;
  const periodoAtualDoAluno = aluno.periodos_completados+1;
  const creditosPendentes = requisitos.minimo_creditos_disciplinas_obrigatorias+requisitos.minimo_creditos_disciplinas_optativas-aluno.creditos_completados;
  const previsao = vMedia == 0 ? 0 : Math.ceil(creditosPendentes/vMedia)-1;
  const periodoPrevisao = periodoAtualDoAluno+previsao;
  const duracao_media =  Math.floor((requisitos.duracao_maxima+requisitos.duracao_minima)/2) 
  const dentroOuForaDaMedia = periodoPrevisao <= duracao_media ? true : false
  //true = dentro da faixa media: x <= duracao_media
  //false = acima da faixa media: x > duracao_media

  
  const situacao = () => {
    const encontrarMediana = (fda: PontoFda[]) => {
      const ponto = fda.find(p => p.probabilidade_acumulada >= 0.5);
      return ponto ? ponto.valor : 0;
    };

    const medianaVelocidade = encontrarMediana(metricas.velocidade_media.fda);
    const medianaTaxaSucesso = encontrarMediana(metricas.taxa_de_sucesso.fda);

    console.log(medianaVelocidade)
    console.log(medianaTaxaSucesso)

    const velocidadeAlta = aluno.velocidade_media >= medianaVelocidade;
    const taxaSucessoAlta = aluno.taxa_de_sucesso >= medianaTaxaSucesso;

    if (taxaSucessoAlta && !velocidadeAlta) return 1;
    if (!taxaSucessoAlta && velocidadeAlta) return 2;
    if (!taxaSucessoAlta && !velocidadeAlta) return 3;
    return 0;
  };
  
  
  //const situacao = () => {return 3}

  const vmReduzida = () => {
    return creditosPendentes/(requisitos.duracao_maxima-periodoAtualDoAluno);
  }

  return (
    <Card.Root
      w={"full"}
      boxShadow={"sm"}
      bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}
    >
      <Card.Body>
        <Stat.Root>
            <HStack justify="space-between">
              <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>Meu diagnóstico</Stat.Label>
              <Icon fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>
                  <LuClipboardList strokeWidth={2.6} />
              </Icon>
            </HStack>
            
          <Flex className="be-vietnam" h={"full"} mt={4} flexDir={"column"} gap={2}>
            {/*<Text fontWeight={"normal"} color={`${EURECA_COLORS.CINZA}/80`}>{formatarNome(aluno.nome.split(" ")[0])}, você está cursando {formatarNome(curso.descricao)} há {aluno.periodos_completados} períodos.</Text>
            <Text fontWeight={"normal"} color={`${EURECA_COLORS.CINZA}/80`}>
            Você está no {periodoAtualDoAluno}º período.
            Sua velocidade média é de {vMedia}.
            Você ainda precisa de {creditosPendentes} créditos para se formar.
            Considerando sua velocidade média, sua taxa de sucesso e os créditos pendentes, você consegue se formar em {previsao} períodos. 
            (1 = período atual. 
            0 = sua velocidade média é 0, você ainda não foi aprovado em nenhuma disciplina. Fazer um texto especial)
            Isso significa que você provavelmente vai se formar no seu {periodoPrevisao}º período.
            </Text>*/}
            {
              periodoAtualDoAluno == 1 ? //Você está no 1º período
                <>
                  <Text fontWeight={"normal"} color={`${EURECA_COLORS.CINZA}/80`}>
                    {formatarNome(nome.split(" ")[0])}, você ainda está cursando o 1º período de {formatarNome(curso.descricao)}. Isso significa que ainda não existem registros do seu desempenho no banco de dados da universidade e não conseguimos calcular um diagnóstico para você ainda. Porém, a partir das métricas do curso e dos alunos ativos, esperamos que você consiga se guiar e se manter no desempenho esperado.
                  </Text>
                  <Text fontWeight={"normal"} color={`${EURECA_COLORS.CINZA}/80`}>
                    Volte quando suas notas forem registradas ao fim do período para ter um panorama inicial do seu desempenho. Boa sorte nos estudos!
                  </Text>
                </>
              :
              periodoAtualDoAluno == requisitos.duracao_maxima ? //Você está no último período possível
                <>
                  <Text fontWeight={"normal"} color={`${EURECA_COLORS.CINZA}/80`}>
                    {formatarNome(nome.split(" ")[0])}, você está cursando o último período possível de {formatarNome(curso.descricao)}. Com base na sua velocidade média, taxa de sucesso e créditos pendentes, {periodoPrevisao === periodoAtualDoAluno ? `é possível que você consiga concluir o curso ainda dentro da duração máxima, neste período. Ainda assim, o risco de você precisar de mais tempo e acabar tendo que passar por um novo SISU para re-ingressar no curso é real. `:`é matematicamente provável que você precise de mais ${periodoPrevisao-periodoAtualDoAluno} períodos para se formar. Isso totalizaria ${periodoPrevisao} períodos, o que ultrapassa a duração máxima do seu curso.`}
                  </Text>
                  {
                    periodoPrevisao === periodoAtualDoAluno ?
                    <Text fontWeight={"normal"} color={`${EURECA_COLORS.CINZA}/80`}>
                      Para que isso não aconteça, recomendamos que você entre em contato com a coordenação do seu curso para se informar sobre a possibilidade de extensão do prazo de conclusão do seu curso, que é a solução mais segura para o seu caso. Você acordará um plano de conclusão e receberá mais tempo para conseguir se formar, caso necessário. Ainda assim, dê seu melhor neste período! Você ainda pode conseguir concluir seu curso sem precisar da extensão.
                    </Text>
                    :
                    <Text fontWeight={"normal"} color={`${EURECA_COLORS.CINZA}/80`}>
                      Nesse cenário, suas opções seriam re-ingressar no curso através de um novo SISU, ou prolongar a sua graduação a partir de um acordo com a universidade, que não necessita de um re-ingresso. Recomendamos que você entre em contato com a coordenação do seu curso para se informar sobre a possibilidade de extensão do prazo de conclusão do seu curso, que é a solução mais segura para o seu caso. Você acordará um plano de conclusão e receberá mais tempo para conseguir se formar. Ainda há como chegar ao fim, então continue dando seu melhor. Boa sorte!
                    </Text>

                  }
                </>
              :
              periodoAtualDoAluno > requisitos.duracao_maxima ? //Você já está realizando extensão
                <>
                  <Text fontWeight={"normal"} color={`${EURECA_COLORS.CINZA}/80`}>
                    {formatarNome(nome.split(" ")[0])}, você está cursando o {periodoAtualDoAluno}º período de {formatarNome(curso.descricao)}. Isso significa que você ultrapassou o número máximo de períodos possíveis para concluir o seu curso, e deve tomar cuidado para conseguir se graduar dentro do tempo acordado no seu plano de conclusão. Tomando como base sua velocidade média, taxa de sucesso e créditos pendentes, é provável que você consiga se graduar {previsao == 0 ? "no período atual.":previsao == 1 ? "no próximo período.":`dentro de ${previsao} períodos, ou seja, no seu ${periodoPrevisao}º período.`} Esperamos que isso esteja de acordo com seu plano de conclusão. Fique atento para os prazos e boa sorte nessa reta final! 
                  </Text>
                </>
              :
              dentroOuForaDaMedia ? 
              //Alunos entre o 2º e (duração máxima-1)º período com previsão de se formar dentro da duração média
              <>
                  <Text fontWeight={"normal"} color={`${EURECA_COLORS.CINZA}/80`}>
                    {formatarNome(nome.split(" ")[0])}, você está cursando o {periodoAtualDoAluno}º período de {formatarNome(curso.descricao)}. Tomando como base sua velocidade média, taxa de sucesso e créditos pendentes, é provável que você consiga se formar {previsao == 0 ? "neste período":previsao == 1?"no próximo período":`em ${previsao} períodos, ou seja, no seu ${periodoPrevisao}º período`}.
                  </Text>
                  <Text fontWeight={"normal"} color={`${EURECA_COLORS.CINZA}/80`}>
                     Isso significa que, caso você se mantenha neste ritmo, você conseguirá se formar dentro da duração média do seu curso, com um baixo risco de precisar solicitar extensão ou re-ingressar através de um novo SISU. Você está indo bem! Parabéns pelo bom desempenho e boa sorte na sua jornada!
                  </Text>
              </>
              : //Alunos entre o 2º e (duração máxima-1)º período com previsão de se formar acima da duração média
              <>
                  <Text fontWeight={"normal"} color={`${EURECA_COLORS.CINZA}/80`}>
                    {formatarNome(nome.split(" ")[0])}, você está cursando o {periodoAtualDoAluno}º período de {formatarNome(curso.descricao)}. Tomando como base sua velocidade média, taxa de sucesso e créditos pendentes, é provável que você consiga se formar {previsao == 0 ? "neste período":previsao == 1?"no próximo período":`em ${previsao} períodos, ou seja, no seu ${periodoPrevisao}º período`}.
                  </Text>
                  <Text fontWeight={"normal"} color={`${EURECA_COLORS.CINZA}/80`}>
                     Essa previsão está acima da duração média{periodoPrevisao > requisitos.duracao_maxima ? ", assim como acima da duração máxima":""} do seu curso. Isso significa que há um risco real de você não conseguir concluir o curso dentro do máximo de períodos, e precisar solicitar extensão ou re-ingressar através de um novo SISU. Seu sucesso acadêmico também é nosso objetivo. Portanto, a partir das suas métricas e desse risco, identificamos e recomendamos que você...
                  </Text>
                    {
                      situacao() == 1 ? //TS alta e VM baixa
                        <List.Root mx={8} fontWeight={"normal"} color={`${EURECA_COLORS.CINZA}/80`}>
                          <List.Item><Span fontWeight={"semibold"}>Considere aumentar a quantidade de disciplinas matriculadas nos próximos períodos.</Span> Sua velocidade média está abaixo do esperado, embora sua taxa de sucesso esteja adequada. Assim, recomendamos que você tente aumentar um pouco o ritmo para buscar reduzir o risco de chegar ou ultrapassar a duração máxima do curso.</List.Item>
                          {
                            previsao > 0 ?
                            <List.Item><Span fontWeight={"semibold"}>Prepare-se para os próximos períodos através do Eureca Graduação.</Span> No nosso fluxograma, você encontra informações detalhadas sobre todas as disciplinas ofertadas para {formatarNome(curso.descricao)}. Além das métricas, você tem acesso ao plano de curso completo, com referências bibligráficas, descrição do método de avaliação, entre outras informações importantes sobre a disciplina. Assim, não deixe a garantia do seu sucesso ao acaso! Faça uso deste recurso e prepare-se de forma robusta para enfrentar as futuras disciplinas.</List.Item>
                            :
                            <></>
                          }
                        </List.Root>
                      :
                      situacao() == 2 ? //TS baixa e VM alta
                        <List.Root mx={8} fontWeight={"normal"} color={`${EURECA_COLORS.CINZA}/80`}>
                          <List.Item><Span fontWeight={"semibold"}>Considere reduzir a quantidade de disciplinas matriculadas nos próximos períodos.</Span> Sua taxa de sucesso está abaixo do esperado, embora sua velocidade média esteja adequada. Assim, recomendamos que você diminua um pouco o ritmo, buscando encontrar um equilíbrio entre a quantidade de disciplinas suficientes, por período, para conseguir se formar, enquanto reduz as chances de reprovação. Você ainda tem {requisitos.duracao_maxima-periodoAtualDoAluno} períodos possíveis dentro da duração máxima do curso. Reduzindo sua velocidade média para cerca de {vmReduzida()} créditos bem-sucedidos por período, você ainda conseguiria concluir o curso sem necessidade de extensão de prazo. Esta é a velocidade mínima que você poderia assumir para ainda conseguir se formar dentro da duração máxima do curso. Tome este número como base e encontre sua própria velocidade ideal, entre a atual e a mínima, mais adequada ao seu ritmo de aprendizado.</List.Item>
                          {
                            previsao > 0 ?
                            <List.Item><Span fontWeight={"semibold"}>Prepare-se para os próximos períodos através do Eureca Graduação.</Span> No nosso fluxograma, você encontra informações detalhadas sobre todas as disciplinas ofertadas para {formatarNome(curso.descricao)}. Além das métricas, você tem acesso ao plano de curso completo, com referências bibligráficas, descrição do método de avaliação, entre outras informações importantes sobre a disciplina. Assim, não deixe a garantia do seu sucesso ao acaso! Faça uso deste recurso e prepare-se de forma robusta para enfrentar as futuras disciplinas.</List.Item>
                            :
                            <></>
                          }
                        </List.Root>
                      :
                      situacao() == 3 ? //TS baixa e VM baixa
                        <List.Root mx={8} fontWeight={"normal"} color={`${EURECA_COLORS.CINZA}/80`}>
                          <List.Item><Span fontWeight={"semibold"}>Considere reduzir a quantidade de disciplinas matriculadas nos próximos períodos.</Span> Sua velocidade média está abaixo do esperado. Contudo, sua taxa de sucesso também não está na média. Isso pode ser um indício de que você precisa não só encontrar um ritmo ideal para o seu aprendizado, como também equilibrar quais disciplinas você está cursando simultaneamente. Você ainda tem {requisitos.duracao_maxima-periodoAtualDoAluno} períodos possíveis dentro da duração máxima do curso. Reduzindo sua velocidade média para cerca de {vmReduzida()} créditos bem-sucedidos por período, você ainda conseguiria concluir o curso sem necessidade de extensão de prazo. Esta é a velocidade mínima que você poderia assumir para ainda conseguir se formar dentro da duração máxima do curso. Tome este número como base e encontre sua própria velocidade ideal, entre a atual e a mínima, mais adequada ao seu ritmo de aprendizado. Contudo, se as próprias cargas teóricas (ou práticas) estão sendo demais para você, considere as recomendações abaixo.</List.Item>
                        {
                            previsao > 0 ?
                            <List.Item><Span fontWeight={"semibold"}>Prepare-se para os próximos períodos através do Eureca Graduação.</Span> No nosso fluxograma, você encontra informações detalhadas sobre todas as disciplinas ofertadas para {formatarNome(curso.descricao)}. Além das métricas, você tem acesso ao plano de curso completo, com referências bibligráficas, descrição do método de avaliação, entre outras informações importantes sobre a disciplina. Assim, não deixe a garantia do seu sucesso ao acaso! Faça uso deste recurso e prepare-se de forma robusta para enfrentar as futuras disciplinas.</List.Item>
                            :
                            <></>
                          }
                          <List.Item><Span fontWeight={"semibold"}>Contate a coordenação do seu curso, professores e monitores para uma ajuda mais especializada.</Span> O Eureca Graduação, embora sirva como ferramenta de apoio e diagnóstico, não substitui o apoio especializado. Se você apresenta dificuldades em certa área ou disciplina, recomendamos fortemente que você busque ajuda dos professores e monitores, ou até mesmo da coordenação do seu curso para montar um plano de curso mais adequado e personalizado para o seu caso.</List.Item>
                        </List.Root>
                      : //TS alta e VM alta, não deveria ocorrer
                        <List.Root  mx={8} fontWeight={"normal"} color={`${EURECA_COLORS.CINZA}/80`}>
                          <List.Item><Span fontWeight={"semibold"}>Parece estar com velocidade média e taxa de sucesso adequadas.</Span> O período de conclusão previsto não é exato, e pode desconsiderar variações pequenas, principalmente na velocidade média. Assim, mantenha o bom ritmo! Suas taxas estão na média.</List.Item>
                          <List.Item><Span fontWeight={"semibold"}>Entre em contato com a coordenação do seu curso para investigar a causa desta previsão.</Span> Ainda que inexata, ela representa um risco à sua formação acadêmica, e é importante estar preparado e bem informado, no caso da necessidade de solicitar extensão do prazo de conclusão.</List.Item>
                          {
                            previsao > 0 ?
                            <List.Item><Span fontWeight={"semibold"}>Prepare-se para os próximos períodos através do Eureca Graduação.</Span> No nosso fluxograma, você encontra informações detalhadas sobre todas as disciplinas ofertadas para {formatarNome(curso.descricao)}. Além das métricas, você tem acesso ao plano de curso completo, com referências bibligráficas, descrição do método de avaliação, entre outras informações importantes sobre a disciplina. Assim, não deixe a garantia do seu sucesso ao acaso! Faça uso deste recurso e prepare-se de forma robusta para enfrentar as futuras disciplinas.</List.Item>
                            :
                            <></>
                          }
                        </List.Root>
                    }
              </>
            }
          </Flex>
        </Stat.Root>
      </Card.Body>
    </Card.Root>
  );
};
