import { Box, Card, Typography } from "@mui/material";

interface CardFuncionalidadeProps {
  titulo: string;
  foto: string;
}

function CardFuncionalidade({titulo, foto}: CardFuncionalidadeProps){
  return(
    <Card className="relative cursor-pointer w-[200px] h-[320px] bg-gradient-to-b from-blue-300 via-gray-300 to-blue-300">
      <Typography variant="h5" className="text-center shadow-md bg-gradient-to-b from-blue-300 via-gray-300 to-blue-300 w-100">
        {titulo}
      </Typography>
      <Box className="flex justify-center items-center absolute top-0 w-full h-full">
        <img src={foto} alt="foto"/>
      </Box>
    </Card>
  );
}
export default CardFuncionalidade;