import { Box, Button, Card, Typography } from "@mui/material";
import { OutlinedInput } from '@mui/material';
import iconeAlimento from "../imgs/fruta 1.png";
import Icon from '@mui/material/Icon';
import { useRef, useContext } from "react";
import UsuarioContext from "../context/usuarioContext";
import toast, { Toaster } from "react-hot-toast";

interface ICardPokemonProps {
  _id: any;
  nome: string;
  color: string;
  foto: string;
}

function CardPokemon({_id, nome, color, foto }: ICardPokemonProps) {
  const Usuario = useContext(UsuarioContext);
  const qtdAlimentos = useRef<number>(0);

  function alimentou(){
    if(qtdAlimentos.current > 0){
      if(Usuario?.usuario.alimentos != undefined && Usuario?.usuario.alimentos >= qtdAlimentos.current){
        Usuario?.ganhouTrofeus(Usuario.usuario, qtdAlimentos.current);
        fetch('http://127.0.0.1:3001/pokemon', {
          method: "PUT",
          body: JSON.stringify({"_id": _id, "nome": nome, "alimentos": qtdAlimentos.current}),
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then((data) => data.json())
        .then((json) => {
          toast(json, {
            icon: '😋'
          });
        })
      }
      else{
        toast.error("Alimentos insuficientes!", {
          duration: 2000
        })
      }
    }
    else{
      toast.error("Insira um valor acima de 0!", {
        duration: 2000
      });
    }
  }

  return (
    <Box className="flex sm:flex-col justify-center items-center gap-4">
      <Toaster position="top-center"/>
      <Card sx={{ backgroundColor: color, border: 1, borderColor: "black" }} className="flex flex-col items-center gap-6 w-[200px] h-[280px] p-2 overflow-hidden">
        <Typography variant="h5" className="text-white">
          {nome}
        </Typography>
        <img src={foto} alt="foto" className="w-[120px] h-[120px] object-cover" />
        <Box className="flex gap-2">
          <OutlinedInput color="secondary" type="number" ref={qtdAlimentos} onChange={(e)=>qtdAlimentos.current=Number(e.target.value)} sx={{ color: "white", backgroundColor: "gray" }}/>
          <img src={iconeAlimento} alt="icone" className="w-[48px] h-[48px]" />
        </Box>
      </Card>
      <Button variant="contained" color="success" onClick={alimentou}>
        <Icon>check</Icon>
      </Button>
    </Box>

  );
}

export default CardPokemon;