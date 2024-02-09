import { Box, Icon, Typography } from "@mui/material";
import AlimentosTrofeus from "../components/alimentosTrofeus";
import Podio from "../components/podio";
import Contribuidores from "../components/contribuidores";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UsuarioContext from "../context/usuarioContext";

function Ranking() {
  const Usuario = useContext(UsuarioContext);

  return (
    <Box className="bg-gradient-to-b from-indigo-700 via-yellow-500 to-indigo-700 min-h-screen p-4">
      <Box className="flex gap-6 items-center">
        <Link to="../">
          <Icon fontSize="large" sx={{ color: "white" }}>arrow_circle_left</Icon>
        </Link>
        
        <AlimentosTrofeus alimentos={Usuario?.usuario.alimentos} trofeus={Usuario?.usuario.trofeus}></AlimentosTrofeus>
      </Box>
      <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }} mt={4} className="flex justify-center items-center">
        Ranking
      </Typography>
      <Contribuidores></Contribuidores>
      <Podio></Podio>
      
    </Box>
  );
}

export default Ranking;