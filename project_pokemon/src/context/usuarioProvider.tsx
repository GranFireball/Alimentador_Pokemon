import { useState } from "react";
import UsuarioContext, { IUsuario } from "./usuarioContext";
import { atualizarUsuario } from "../functions/atualizarUsuario";

function UsuarioProvider({children}: any){
  const [usuario, setUsuario] = useState<IUsuario>({_id: "", nick: "", senha: "", emblema: 0,  alimentos: -1, trofeus: -1, sequencia: -1, melhorSequencia: -1});

  function logou(Usuario: IUsuario){
    setUsuario({_id: Usuario._id, nick: Usuario.nick, senha: Usuario.senha, emblema: Usuario.emblema, alimentos: Usuario.alimentos, trofeus: Usuario.trofeus, sequencia: Usuario.sequencia, melhorSequencia: Usuario.melhorSequencia});
  }

  function deslogou(){
    setUsuario({_id: "", nick: "", senha: "", emblema: 0, alimentos: -1, trofeus: -1, sequencia: -1, melhorSequencia: -1});
  }

  function ganhouAlimentos(Usuario: IUsuario, qtd: number){
      Usuario.alimentos += qtd;
      setUsuario({_id: Usuario._id, nick: Usuario.nick, senha: Usuario.senha, emblema: Usuario.emblema, alimentos: Usuario.alimentos, trofeus: Usuario.trofeus, sequencia: Usuario.sequencia, melhorSequencia: Usuario.melhorSequencia});
      atualizarUsuario(Usuario._id, Usuario.nick, Usuario.senha, Usuario.emblema, Usuario.alimentos, Usuario.trofeus, Usuario.sequencia, Usuario.melhorSequencia);
  }

  function ganhouTrofeus(Usuario: IUsuario, qtd: number){
    Usuario.trofeus += qtd;
    Usuario.alimentos -= qtd;
    setUsuario({_id: Usuario._id, nick: Usuario.nick, senha: Usuario.senha, emblema: Usuario.emblema, alimentos: Usuario.alimentos, trofeus: Usuario.trofeus, sequencia: Usuario.sequencia, melhorSequencia: Usuario.melhorSequencia});
    atualizarUsuario(Usuario._id, Usuario.nick, Usuario.senha, Usuario.emblema, Usuario.alimentos, Usuario.trofeus, Usuario.sequencia, Usuario.melhorSequencia);

  }

  function acertouPergunta(Usuario: IUsuario){
    Usuario.sequencia += 1;
    if(Usuario.sequencia > Usuario.melhorSequencia){
      Usuario.melhorSequencia = Usuario.sequencia;
    }
    setUsuario({_id: Usuario._id, nick: Usuario.nick, senha: Usuario.senha, emblema: Usuario.emblema, alimentos: Usuario.alimentos, trofeus: Usuario.trofeus, sequencia: Usuario.sequencia, melhorSequencia: Usuario.melhorSequencia});
    atualizarUsuario(Usuario._id, Usuario.nick, Usuario.senha, Usuario.emblema, Usuario.alimentos, Usuario.trofeus, Usuario.sequencia, Usuario.melhorSequencia);
  }

  function errouPergunta(Usuario: IUsuario){
    Usuario.sequencia = 0;
    setUsuario({_id: Usuario._id, nick: Usuario.nick, senha: Usuario.senha, emblema: Usuario.emblema, alimentos: Usuario.alimentos, trofeus: Usuario.trofeus, sequencia: Usuario.sequencia, melhorSequencia: Usuario.melhorSequencia});
    atualizarUsuario(Usuario._id, Usuario.nick, Usuario.senha, Usuario.emblema, Usuario.alimentos, Usuario.trofeus, Usuario.sequencia, Usuario.melhorSequencia);
  }

  return(
    <UsuarioContext.Provider value={{usuario, logou, deslogou, ganhouTrofeus, ganhouAlimentos, acertouPergunta, errouPergunta}}>
      {children}
    </UsuarioContext.Provider>
  );
}

export default UsuarioProvider;