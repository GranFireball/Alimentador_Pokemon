import { Box, Typography } from "@mui/material";
import imgBulbasaur from "../imgs/bulbasaur 1.png";
import imgCharmander from "../imgs/charmander 1.png";
import imgSquirtle from "../imgs/squirtle 1.png";
import iconeAlimento from "../imgs/fruta 1.png";
import { useEffect, useState } from "react";
import { IPokemon } from "../views/alimentar";


function Podio() {
  const [podioPokemon, setPodioPokemon] = useState<IPokemon[]>([]);
  const [imgPokemon, setImgPokemon] = useState<any[]>([imgBulbasaur, imgCharmander, imgSquirtle]);

  useEffect(() => {
    fetch('http://127.0.0.1:3001/pokemon', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((data) => data.json())
    .then((json) => {
      setPodioPokemon(json.sort(function(pokemon1: {alimentos: number}, pokemon2: {alimentos: number}){
        return pokemon2.alimentos - pokemon1.alimentos;
      }));
    })

  }, []);

  useEffect(() => {
    imgPoke();
  }, [podioPokemon])

  function imgPoke(): void{
    let imgsPokemon = [];
    let pokemon;
    for(var i = 0; i < 3; i++){
      pokemon = podioPokemon[i]?.nome;
      if(pokemon == "Bulbasaur"){
        imgsPokemon[i] = imgBulbasaur;
      }
      else if(pokemon == "Charmander"){
        imgsPokemon[i] = imgCharmander;
      }
      else{
        imgsPokemon[i] = imgSquirtle;
      }
    }
    setImgPokemon(imgsPokemon);
  }

  return (
    <Box className="flex justify-center items-end mt-10">
      <Box className="flex flex-col justify-center items-center overflow-hidden">
        <Typography variant="subtitle1" className="text-white">
          {podioPokemon[1]?.nome}
        </Typography>
        <img src={imgPokemon[1]} alt="foto" className="w-[60px] h-[100px] object-cover overflow-visible " />
        <Box sx={{ width: "100px", height: "50px", backgroundColor: "gray", border: 1, borderColor: "black", borderRight: 0 }} className="flex justify-center items-center border-1 border-solid border-black-800" >
          <Typography variant="h6">
            2
          </Typography>
        </Box>
        <Box className="flex gap-1 items-center p-1">
          <img src={iconeAlimento} alt="Ícone Alimentos" className="w-[32px] h-[32px]" />
          <Typography variant="subtitle1" color="white" className="truncate text-clip w-[56px] overflow-hidden">
            {podioPokemon[1]?.alimentos}
          </Typography>
        </Box>
      </Box>
      <Box className="flex flex-col justify-center items-center overflow-hidden">
        <Typography variant="subtitle1" className="text-white">
          {podioPokemon[0]?.nome}
        </Typography>
        <img src={imgPokemon[0]} alt="foto" className="w-[60px] h-[100px] object-cover overflow-visible " />
        <Box sx={{ width: "100px", height: "70px", backgroundColor: "yellow", border: 1, borderColor: "black" }} className="flex justify-center items-center border-1 border-solid border-black-800" >
          <Typography variant="h6">
            1
          </Typography>
        </Box>
        <Box className="flex gap-1 items-center p-1">
          <img src={iconeAlimento} alt="Ícone Alimentos" className="w-[32px] h-[32px]" />
          <Typography variant="subtitle1" color="white" className="truncate text-clip w-[50px] overflow-hidden">
            {podioPokemon[0]?.alimentos}
          </Typography>
        </Box>
      </Box>
      <Box className="flex flex-col justify-center items-center overflow-hidden">
        <Typography variant="subtitle1" className="text-white">
          {podioPokemon[2]?.nome}
        </Typography>
        <img src={imgPokemon[2]} alt="foto" className="w-[60px] h-[100px] object-cover overflow-visible " />
        <Box sx={{ width: "100px", height: "35px", backgroundColor: "brown", border: 1, borderColor: "black", borderLeft: 0 }} className="flex justify-center items-center border-1 border-solid border-black-800">
          <Typography variant="h6">
            3
          </Typography>
        </Box>
        <Box className="flex gap-1 items-center p-1">
          <img src={iconeAlimento} alt="Ícone Alimentos" className="w-[32px] h-[32px]" />
          <Typography variant="subtitle1" color="white" className="truncate text-clip w-[56px] overflow-hidden">
            {podioPokemon[2]?.alimentos}
          </Typography>
        </Box>

      </Box>

    </Box>
  );
}

export default Podio;