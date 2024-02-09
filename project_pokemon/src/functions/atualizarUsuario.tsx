export function atualizarUsuario(_id: any, nick: string, senha: string, emblema: number, alimentos: number, trofeus: number, sequencia: number, melhorSequencia: number){
  fetch('http://127.0.0.1:3001/usuarios', {
    method: "PUT",
    body: JSON.stringify({"_id": _id, "nick": nick, "senha": senha, "emblema": emblema, "alimentos": alimentos, "trofeus": trofeus, "sequencia": sequencia, "melhorSequencia": melhorSequencia}),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then((data) => data.json())
}