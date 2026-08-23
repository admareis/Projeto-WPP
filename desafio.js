import { usuarios, listarUser, receberIndice, listMsg } from "./contatos.js";
//listarUser()
//receberIndice()
//listMsg(2,3)

// função de alternancia entre tela perfil e lista contatos // 
const btnPerfil = document.querySelector("#btnPerfil");
const telaPerfil = document.querySelector(".telaPerfil");
const telaConversas = document.querySelector(".container-stick");
const listaContatos = document.querySelector(".lista-contatos"); // era ".card"

function alternarPerfil() {
  const perfilAberto = !telaPerfil.classList.contains("oculta");

  if (perfilAberto) {
    telaPerfil.classList.add("oculta");
    telaConversas.classList.remove("oculta");
    listaContatos.classList.remove("oculta");
  } 
  else {
    telaConversas.classList.add("oculta");
    listaContatos.classList.add("oculta");
    telaPerfil.classList.remove("oculta");
  }
}

btnPerfil.addEventListener("click", alternarPerfil);

 //////////////////////////////////////////////



const elemento = {
    grid_container: document.querySelector(".troca-mensagens"),
    form_send_message: document.querySelector("#form_send_message"),
    input_send_message: document.querySelector("#input_send_msg"),
    lista_contatos: document.querySelector(".card"),
};

console.log(elemento.lista_contatos);

elemento.form_send_message.addEventListener("submit", (e) => {
  e.preventDefault();
  insertMessage(elemento.input_send_message.value);
});

function getHour() {
  const data = new Date().toLocaleString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return data;
}

function insertMessage(message) {
  const article = document.createElement("article");
  const paragrafo = document.createElement("p");
  const span = document.createElement("span");

  article.classList.add("enviadas");

  paragrafo.innerText = message;
  span.classList.add("hour");
  span.innerText = `${getHour()}`;

  article.append(paragrafo, span);

  elemento.grid_container.append(article);
  elemento.grid_container.scrollTop = elemento.grid_container.scrollHeight;
  elemento.input_send_message.value = "";
}

function criarContatos(foto, nome, hora, ultima, naoLidas, idContato){
    // criação dos elementos do card dos contatos // 
    const cardContainer = document.createElement('article');
    const fotoContato = document.createElement('img');
    const nomeContato = document.createElement('h3');
    const horaMsg = document.createElement('p');
    const msgUltima = document.createElement('p');
    const msgNaoLidas = document.createElement('p');

    cardContainer.className = "chat";
    fotoContato.className = "foto";
    nomeContato.className = "nome";
    horaMsg.className= "hora";
    msgUltima.className = "texto";
    msgNaoLidas.className = "";

    cardContainer.id = idContato; // adiciona o id do contato no container para servir de parametro da função que carrega das mensagens no grid // 
    fotoContato.src = `https://i.pravatar.cc/150?img=${idContato+1}`;
    nomeContato.innerText = nome;
    horaMsg.innerText = hora;
    msgUltima.innerText = ultima;
    msgNaoLidas.innerText = naoLidas;

    cardContainer.append(fotoContato, nomeContato, horaMsg, msgUltima, msgNaoLidas)
    elemento.lista_contatos.append(cardContainer)
}

