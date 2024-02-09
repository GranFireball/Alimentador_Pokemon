import { Avatar, Box, Container, Divider, Typography } from "@mui/material";
import iconeTrofeu from "../imgs/trofeu 1.png";
import { IUsuario } from "../context/usuarioContext";
import { useEffect, useState } from "react";
import emblema1 from "../imgs/emblema1.png";
import emblema2 from "../imgs/emblema2.png";
import emblema3 from "../imgs/emblema3.png";
import emblema4 from "../imgs/emblema4.png";

function Contribuidores() {
  const [topUsuarios, setTopUsuarios] = useState<IUsuario[]>([{_id: "", nick: "", senha: "", emblema: 0, alimentos: -1, trofeus: -1, sequencia: -1, melhorSequencia: -1 }]);
  const emblemas : any[] = [emblema1, emblema2, emblema3, emblema4];

  useEffect(() => {
    fetch('http://127.0.0.1:3001/usuarios', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((data) => data.json())
    .then((json) => {
      setTopUsuarios(json.sort(function(usuario1: { trofeus: number; }, usuario2: { trofeus: number; }){
        return usuario2.trofeus - usuario1.trofeus;
      }));
    })
  }, [])

  

  return (
    <Container className="w-full mt-10">
      <Typography variant="h5" className="text-white">
        Maiores Contribuidores
      </Typography>
      <Box sx={{ backgroundColor: "yellow" }} className="flex justify-between items-center gap-4 p-2 w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-700 ">
        <Box className="flex gap-1 items-center overflow-hidden w-100">
          <Typography variant="h5" >
            1-
          </Typography>
          <Avatar src={emblemas[topUsuarios[0]?.emblema]} sx={{ width: 60, height: 60, border: 1 }} />
          <Typography className="truncate">
            {topUsuarios[0]?.nick}
          </Typography>
        </Box>

        <Box className="flex gap-1 items-center right-0 min-w-[100px] w-[100px]">
          <img src={iconeTrofeu} alt="Ícone Troféus" className="w-[48px] h-[48px]" />
          <Typography variant="subtitle1" className="truncate text-clip w-[60px] overflow-hidden text-white">
            {topUsuarios[0]?.trofeus}
          </Typography>
        </Box>
      </Box>
      <Divider></Divider>
      <Box sx={{ backgroundColor: "gray" }} className="flex justify-between items-center gap-4 p-2 w-full bg-gradient-to-r from-gray-400 via-gray-500 to-gray-700 ">
        <Box className="flex gap-1 items-center overflow-hidden w-100">
          <Typography variant="h5">
            2-
          </Typography>
          <Avatar src={emblemas[topUsuarios[1]?.emblema]} sx={{ width: 60, height: 60, border: 1 }} />
          <Typography className="truncate">
            {topUsuarios[1]?.nick}
          </Typography>
        </Box>

        <Box className="flex gap-1 items-center right-0 min-w-[100px] w-[100px]">
          <img src={iconeTrofeu} alt="Ícone Troféus" className="w-[48px] h-[48px]" />
          <Typography variant="subtitle1" className="truncate text-clip w-[60px] overflow-hidden text-white">
            {topUsuarios[1]?.trofeus}
          </Typography>
        </Box>
      </Box>
      <Divider></Divider>
      <Box sx={{ backgroundColor: "gray" }} className="flex justify-between items-center gap-4 p-2 w-full bg-gradient-to-r from-red-500 via-red-600 to-red-800 ">
        <Box className="flex gap-1 items-center overflow-hidden w-100">
          <Typography variant="h5">
            3-
          </Typography>
          <Avatar src={emblemas[topUsuarios[2]?.emblema]} sx={{ width: 60, height: 60, border: 1 }} />
          <Typography className="truncate">
            {topUsuarios[2]?.nick}
          </Typography>
        </Box>

        <Box className="flex gap-1 items-center right-0 min-w-[100px] w-[100px]">
          <img src={iconeTrofeu} alt="Ícone Troféus" className="w-[48px] h-[48px]" />
          <Typography variant="subtitle1" className="truncate text-clip w-[60px] overflow-hidden text-white">
            {topUsuarios[2]?.trofeus}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Contribuidores;