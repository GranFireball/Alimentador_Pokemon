import { Box, Button, Icon, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UsuarioContext from "../context/usuarioContext";
import toast, { Toaster } from "react-hot-toast";

function Login(){
  const [nick, setNick] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const navigate = useNavigate();
  const Usuario = useContext(UsuarioContext);

  function verificaLogin(): void{
    if(nick.trim() !== "" && senha !== ""){
      fetch('http://127.0.0.1:3001/usuarios',{
        method: "POST",
        body: JSON.stringify({"nick": nick.trim(), "senha": senha}),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((data) => data.json())
      .then((json) => {
        if(json !== "ERRO"){
          Usuario?.logou(json);
          toast.success("Sucesso! Usuário logado!");
          setTimeout(() => navigate("/inicio"), 2000);
        }
        else{
          toast.error("Erro! Login incorreto!", {
            duration: 2000
          });
        }
      })
    }
    else{
      toast.error("Preencha os dados!");
    }
  }

  return(
    <Box className="bg-gradient-to-b from-indigo-400 via-yellow-300 to-indigo-400 min-h-screen p-4">
      <Toaster position="top-center"/>
      <Icon fontSize="large" sx={{ color: "yellow" }}>star</Icon>
      <Box className="flex flex-col justify-center items-center gap-6 ">
        <Typography variant="h4" sx={{color: "white", fontWeight: "bold"}}>
          Faça seu Login!
        </Typography>
        <Box component="form" mt={4} className="flex flex-col gap-6">
          <TextField
            value={nick}
            required
            label="Usuário"
            type="text"
            variant="filled"
            placeholder="Digite seu Usuário"
            onChange={(e) => {setNick(e.target.value); console.log(nick)}}
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
          <Button variant="contained" onClick={verificaLogin}>ENTRAR</Button>

         
        </Box>
        <Link to="cadastrar">
          <Typography variant="body2" sx={{textDecoration: "underline"}}>
            Não possui conta? Cadastrar
          </Typography>
        </Link>
        
        
      </Box>
    </Box>
  );
}

export default Login;