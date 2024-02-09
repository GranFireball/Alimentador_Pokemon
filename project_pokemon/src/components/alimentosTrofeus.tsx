import { Box, Typography } from "@mui/material";
import iconeAlimento from "../imgs/fruta 1.png";
import iconeTrofeu from "../imgs/trofeu 1.png";
import UsuarioContext from "../context/usuarioContext";
import { useContext } from "react";

function AlimentosTrofeus({alimentos, trofeus}: any){
  const Usuario = useContext(UsuarioContext);
  return(
    <Box className="flex gap-2">
      <Box className="flex gap-1 items-center">
        <img src={iconeAlimento} alt="Ícone Alimentos" className="w-[48px] h-[48px]"/>
        <Typography variant="subtitle1" color="white" className="truncate text-clip w-[60px] overflow-hidden">
          {Usuario?.usuario.alimentos}
        </Typography>
      </Box>
      <Box className="flex gap-1 items-center">
        <img src={iconeTrofeu} alt="Ícone Troféus" className="w-[48px] h-[48px]"/>
        <Typography variant="subtitle1" color="white" className="truncate text-clip w-[60px] overflow-hidden">
          {Usuario?.usuario.trofeus}
        </Typography>
      </Box>
    </Box>
  );
}

export default AlimentosTrofeus;