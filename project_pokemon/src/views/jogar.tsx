import { Box, Button, Container, Grid, Typography } from "@mui/material";
import AlimentosTrofeus from "../components/alimentosTrofeus";
import Icon from '@mui/material/Icon';
import { Link } from "react-router-dom";
import { SetStateAction, useContext, useEffect, useState } from "react";
import UsuarioContext from "../context/usuarioContext";
import toast, { Toaster } from "react-hot-toast";

function Jogar() {
  const Usuario = useContext(UsuarioContext);
  const [proximaPergunta, setProximaPergunta] = useState<boolean>();
  const [pergunta, setPergunta] = useState<string>();
  const [alternativas, setAlternativas] = useState<string[]>([]);
  const [alternativaCorreta, setAlternativaCorreta] = useState<string>();
  const [respondeu, setRespondeu] = useState<boolean>(false);

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=1&type=multiple')
    .then((data) => data.json())
    .then((json) => {
      setProximaPergunta(false);
      setPergunta(json.results[0].question);
      setAlternativaCorreta(json.results[0].correct_answer);
      setAlternativas(json.results[0].incorrect_answers);
      setTimeout(() => setProximaPergunta(true), 5000);
    })
  }, [])

  useEffect(() => {
    completaAlternativas();
  }, [alternativaCorreta])

  function novaPergunta(): void{
    fetch('https://opentdb.com/api.php?amount=1&type=multiple')
    .then((data) => data.json())
    .then((json) => {
      setProximaPergunta(false);
      setPergunta(json.results[0].question);
      setAlternativaCorreta(json.results[0].correct_answer);
      setAlternativas(json.results[0].incorrect_answers);
      setRespondeu(false);
      setTimeout(() => setProximaPergunta(true), 5000);
    })
  }

  function completaAlternativas(): void{
    const correta = alternativaCorreta;
    let todasAlternativas: SetStateAction<string[]> | undefined = [];
    if(correta != undefined){
      todasAlternativas = [...alternativas, correta];
    }
    if(todasAlternativas != undefined){
      const alternativasEmbaralhadas = todasAlternativas.sort(() => 0.5 - Math.random());
      setAlternativas(alternativasEmbaralhadas);
    }
  }

  function verificaResposta(resposta: string): void{
    setRespondeu(true);
    if(resposta === alternativaCorreta){
      toast.success("ACERTOU!!! A resposta correta é: " + alternativaCorreta, {
        duration: 5000
      });
      Usuario?.acertouPergunta(Usuario.usuario);
      Usuario?.ganhouAlimentos(Usuario.usuario, 5 + Usuario.usuario.melhorSequencia);
    }
    else{
      toast.error("Errou! A resposta correta é: " + alternativaCorreta, {
        duration: 5000
      });
      Usuario?.errouPergunta(Usuario.usuario);
    }

  }

  return (
    <Box className="bg-gradient-to-b from-indigo-700 via-yellow-500 to-indigo-700 min-h-screen p-4">
      <Toaster position="top-center"/>
      <Box className="flex gap-6 items-center">
        {proximaPergunta === true &&
          <Link to="../">
            <Icon fontSize="large" sx={{ color: "white" }}>arrow_circle_left</Icon>
          </Link>
        }        
        <AlimentosTrofeus alimentos={Usuario?.usuario.alimentos} trofeus={Usuario?.usuario.trofeus}></AlimentosTrofeus>
      </Box>
      <Typography variant="h4" sx={{ color: "white", fontWeight: "bold"}} mt={4} className="flex justify-center items-center">
        Jogar
      </Typography>
      <Container className="p-2 bg-yellow-300 mt-10 rounded-lg border-2 border-solid border-yellow-600">
        <Typography variant="body1" className="text-justify">
          {pergunta}
        </Typography>
        <Box marginTop={4} className="flex flex-col gap-4">
          <Typography variant="body2">
            <strong>A)</strong> {alternativas[0]}
          </Typography>
          <Typography variant="body2">
            <strong>B)</strong> {alternativas[1]}
          </Typography>
          <Typography variant="body2">
            <strong>C)</strong> {alternativas[2]}
          </Typography>
          <Typography variant="body2">
            <strong>D)</strong> {alternativas[3]}
          </Typography>
        </Box>

        <Grid container spacing={2} marginTop={4}>
          <Grid item xs={6}>
            <Button variant="contained" disabled={respondeu} color="primary" className="w-full" onClick={() => verificaResposta(alternativas[0])}>A</Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" disabled={respondeu} color="primary" className="w-full" onClick={() => verificaResposta(alternativas[1])} >B</Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" disabled={respondeu} color="primary" className="w-full"  onClick={() => verificaResposta(alternativas[2])}>C</Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" disabled={respondeu} color="primary" className="w-full"  onClick={() => verificaResposta(alternativas[3])}>D</Button>
          </Grid>
        </Grid>
        <Box marginTop={4} className="flex justify-between items-center gap-4">
          <Box>
            <Typography>
              Sequência Atual: {Usuario?.usuario.sequencia}
            </Typography>
            <Typography>
              Maior Sequência: {Usuario?.usuario.melhorSequencia}
            </Typography>
          </Box>

          { (respondeu === true && proximaPergunta === true) &&
          <Button variant="contained" onClick={novaPergunta}>
            Próxima
            <Icon>arrow_right</Icon>
          </Button>
          }
        </Box>
      </Container>
    </Box>
  );
}

export default Jogar;