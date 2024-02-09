import { createContext } from "react";

export interface IUsuario{
  _id: string;
  nick: string;
  senha: string;
  emblema: number;
  alimentos: number;
  trofeus: number;
  foto?: string;  
  sequencia: number;
  melhorSequencia: number;
}

export type UsuarioContextType = {
  usuario: IUsuario;
  logou: (usuario: IUsuario) => void;
  deslogou: () => void;
  ganhouAlimentos: (usuario: IUsuario, qtdAlimentos: number) => void;
  ganhouTrofeus: (usuario: IUsuario, qtdTrofeus: number) => void;
  acertouPergunta: (usuario: IUsuario) => void;
  errouPergunta: (usuario: IUsuario) => void;
}

const UsuarioContext = createContext<UsuarioContextType | null>(null);

export default UsuarioContext;