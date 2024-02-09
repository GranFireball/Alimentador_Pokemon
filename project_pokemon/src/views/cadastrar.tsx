import { Avatar, Box, Button, Icon, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import emblema1 from "../imgs/emblema1.png";
import emblema2 from "../imgs/emblema2.png";
import emblema3 from "../imgs/emblema3.png";
import emblema4 from "../imgs/emblema4.png";


function Cadastrar(){
  const [nick, setNick] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const emblemas : any[] = [emblema1, emblema2, emblema3, emblema4];
  const navigate = useNavigate();
  const [emblemaEscolhido, setEmblemaEscolhido] = useState<number>(0);

  function verificaCadastro(): void{
    if(nick.trim() !== "" && senha !== ""){
      fetch('http://127.0.0.1:3001/usuarios/cadastro',{
        method: "POST",
        body: JSON.stringify({"nick": nick.trim(), "senha": senha, "emblema": emblemaEscolhido}),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((data) => data.json())
      .then((json) => {
        if(json !== "ERRO"){
          toast.success(json);
          setTimeout(() => navigate("/"), 2000);
        }
        else{
          toast.error("Erro! Esse nome de usuário já existe!", {
            duration: 2000
          });
        }
      })
    }
    else{
      toast.error("Preencha os dados!", {
        duration: 2000
      });
    }
    
  }

  return(
    <Box className="bg-gradient-to-b from-indigo-400 via-yellow-300 to-indigo-400 min-h-screen p-4">
      <Toaster position="top-center"/>
      <Link to="../">
        <Icon fontSize="large" sx={{ color: "white" }}>arrow_circle_left</Icon>
      </Link>
      <Box className="flex flex-col justify-center items-center gap-6">
        <Typography variant="h4" sx={{color: "white", fontWeight: "bold"}}>
          Faça seu Cadastro!
        </Typography>
        <Box component="form" mt={4} className="flex flex-col gap-6">
          <TextField
            value={nick}
            required
            label="Usuário"
            type="text"
            variant="filled"
            placeholder="Digite seu Usuário"
            onChange={(e) => setNick(e.target.value)}
          />
          <TextField
            value={senha}
            required
            label="Senha"
            type="password"
            variant="filled"
            placeholder="Digite sua Senha"
            onChange={(e) => setSenha(e.target.value)}
          />
          <Typography variant="body1">
            Escolha seu Emblema:
          </Typography>
          <Box className="flex items-center gap-2">

          {emblemas.map((emblema, index) => {
            return(
              <Box className="flex items-center gap-1">
                <Typography variant="body2" color={emblemaEscolhido === index? "white" : "black"}>
                  {index + 1}- 
                </Typography>
                <Avatar src={emblema} sx={{ width: 80, height: 80, border: 1 }} onClick={() => setEmblemaEscolhido(index)} className="hover:cursor-pointer"/>
              </Box>
            )
          })}
          </Box>
 
          <Button variant="contained" onClick={verificaCadastro}>CADASTRAR</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Cadastrar;