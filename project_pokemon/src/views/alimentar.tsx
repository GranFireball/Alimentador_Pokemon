import { Box, Icon, Typography } from "@mui/material";
import AlimentosTrofeus from "../components/alimentosTrofeus";
import CardPokemon from "../components/cardPokemon";
import charmander from "../imgs/charmander 1.png";
import bulbasaur from "../imgs/bulbasaur 1.png";
import squirtle from "../imgs/squirtle 1.png";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UsuarioContext from "../context/usuarioContext";

export interface IPokemon{
  _id: any;
  nome: string;
  alimentos: number;
}

function Alimentar(){
  const Usuario = useContext(UsuarioContext);
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  
  useEffect(() => {
    fetch('http://127.0.0.1:3001/pokemon', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((data) => data.json())
    .then((json) => {
      setPokemons(json);
    })
  }, [])

  return(
    <Box className="bg-gradient-to-b from-indigo-700 via-yellow-500 to-indigo-700 min-h-screen p-4">
      <Box className="flex gap-6 items-center">
        <Link to="../">
          <Icon fontSize="large" sx={{ color: "white" }}>arrow_circle_left</Icon>
        </Link>
        
        <AlimentosTrofeus alimentos={Usuario?.usuario.alimentos} trofeus={Usuario?.usuario.trofeus}></AlimentosTrofeus>
      </Box>
      <Typography variant="h4" sx={{ color: "white", fontWeight: "bold"}} mt={4} className="flex justify-center items-center">
        Alimentar
      </Typography>
      <Box className="flex flex-col sm:flex-row justify-evenly items-center gap-4 mt-10">
        <CardPokemon _id={pokemons[0]?._id} nome={pokemons[0]?.nome} color="green" foto={bulbasaur}></CardPokemon>
        <CardPokemon _id={pokemons[1]?._id} nome={pokemons[1]?.nome} color="red" foto={charmander}></CardPokemon>
        <CardPokemon _id={pokemons[2]?._id} nome={pokemons[2]?.nome} color="blue" foto={squirtle}></CardPokemon>
      </Box>
    </Box>
  );
}

export default Alimentar;