import { Avatar, Box, Button, Typography } from "@mui/material";
import AlimentosTrofeus from "../components/alimentosTrofeus";
import UsuarioContext from "../context/usuarioContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import emblema1 from "../imgs/emblema1.png";
import emblema2 from "../imgs/emblema2.png";
import emblema3 from "../imgs/emblema3.png";
import emblema4 from "../imgs/emblema4.png";


function Header() {
  const Usuario = useContext(UsuarioContext);
  const emblemas : any[] = [emblema1, emblema2, emblema3, emblema4];

  return (
    <Box component="header" className="flex justify-between items-center gap-2">
      <Box className="flex gap-1">
        <Box className="flex flex-col justify-center items-center gap-2 ">
          {Usuario !== null && 
          <Avatar src={emblemas[Usuario.usuario.emblema]} sx={{ width: 80, height: 80, border: 1 }} />
          }
          <Typography variant="subtitle1" color="white" className="truncate text-clip text-center w-[150px] overflow-hidden">
            {Usuario?.usuario.nick}
          </Typography>
        </Box>
        <AlimentosTrofeus alimentos={Usuario?.usuario.alimentos} trofeus={Usuario?.usuario.trofeus}></AlimentosTrofeus>
      </Box>
      <Link to="/">
        <Button variant="contained" color="error" className="h-9" onClick={() => Usuario?.deslogou()}>SAIR</Button>
      </Link>
      
    </Box>
  );
}

export default Header;