import { Box } from "@mui/material";
import CardFuncionalidade from "../components/cardFuncionalidade";
import fotoJogar from "../imgs/jogarIcone 1.png";
import fotoAlim from "../imgs/fruta 1.png";
import fotoRank from "../imgs/trofeu 1.png";
import Header from "../components/header";
import { Link } from "react-router-dom";

function Home(){
  return(
    <Box className="bg-gradient-to-b from-indigo-700 via-yellow-500 to-indigo-700 min-h-screen p-4">
      <Header></Header>
      <Box component="main" className="flex flex-col sm:flex-row justify-evenly items-center gap-4 mt-12" >
        <Link to="jogar">
          <CardFuncionalidade titulo="Jogar" foto={fotoJogar}></CardFuncionalidade>
        </Link>
        <Link to="alimentar">
          <CardFuncionalidade titulo="Alimentar" foto={fotoAlim}></CardFuncionalidade>
        </Link>
        <Link to="ranking">
          <CardFuncionalidade titulo="Ranking" foto={fotoRank}></CardFuncionalidade>
        </Link>
        
      </Box>
    </Box>
  );
}

export default Home;