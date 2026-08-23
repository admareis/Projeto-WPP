import { usuarios, listarUser, receberIndice, listMsg } from "./contatos.js";
//listarUser()
//receberIndice()
//listMsg(2,3)

// função de alternancia entre tela perfil e lista contatos //
const btnPerfil = document.querySelector("#btnPerfil");
const telaPerfil = document.querySelector(".telaPerfil");
const telaConversas = document.querySelector(".container-stick");
const colunaContatos = document.querySelector(".lista-contatos"); // era ".card mudei pra dar certo"

function alternarPerfil() {
  const perfilAberto = !telaPerfil.classList.contains("oculta");

  if (perfilAberto) {
    telaPerfil.classList.add("oculta");
    telaConversas.classList.remove("oculta");
    colunaContatos.classList.remove("oculta");
  } else {
    telaConversas.classList.add("oculta");
    colunaContatos.classList.add("oculta");
    telaPerfil.classList.remove("oculta");
  }

  
  elemento.main.classList.add("oculta"); // quanod voltar pro perfil do dono, oculta as mensagens mantendo a lista de contatos //
}

btnPerfil.addEventListener("click", alternarPerfil);

//////////////////////////////////////////////

const elemento = {
  grid_container: document.querySelector(".troca-mensagens"),
  form_send_message: document.querySelector("#form_send_message"),
  input_send_message: document.querySelector("#input_send_msg"),
  lista_contatos: document.querySelector(".card"),
  topo_main: document.querySelector(".identificador"), // topo com foto/nome do contato//
  main: document.querySelector("main"),
};

const listaUsuarios = usuarios["whats-users"][0].contacts;

function renderizarContatos() { // para cada contato do array, monta 1 card reaproveitando a função criarContatos //
  elemento.lista_contatos.innerHTML = ""; // apaga os cards antigos antes de montar novamente //

  listaUsuarios.forEach((contato, indice) => {
    const ultimaMsg = contato.messages[contato.messages.length - 1];
    criarContatos(
      contato.image,
      contato.name,
      ultimaMsg.time,
      ultimaMsg.content,
      "",
      indice, // índice do contato vira o ID do card //
    );
  });
}

elemento.lista_contatos.addEventListener("click", (e) => { // evento que captura o click no card (busca pelo ID) e abre a conversa //
  const card = e.target.closest(".chat");
  if (!card) 
  return;

  abrirConversa(Number(card.id));
});

function abrirConversa(idContato) { // carrega o histórico de mensagens do contato clicado no grid //
  const contato = listaUsuarios[idContato];

  // atualiza o topo com foto (regra id+1 do pravatar) + nome// 
  elemento.topo_main.innerHTML = `
        <img src="https://i.pravatar.cc/150?img=${idContato + 1}" alt="" class="foto-contato">
        <div>
            <p class="name">${contato.name}</p>
              <p class="name">${contato.description}</p>
                <p class="name">${contato.number}</p>
            
        </div>`;

  elemento.main.classList.remove("oculta"); // para garantir que as mensagens apareçam ao clicar num card x //

  elemento.grid_container.innerHTML = ""; // apaga as mensagens antigas antes de carregar //

  contato.messages.forEach((msg) => {
    const paragrafo = document.createElement("p");
    const span = document.createElement("span");
    paragrafo.classList.add(msg.sender === "me" ? "enviadas" : "recebidas");
    paragrafo.innerText = msg.content;
    span.innerText = msg.time;
    paragrafo.append(span);

    elemento.grid_container.append(paragrafo);
  });

  elemento.grid_container.scrollTop = elemento.grid_container.scrollHeight;
}

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

function criarContatos(foto, nome, hora, ultima, naoLidas, idContato) {
  // criação dos elementos do card dos contatos //
  const cardContainer = document.createElement("article");
  const fotoContato = document.createElement("img");
  const nomeContato = document.createElement("h3");
  const horaMsg = document.createElement("p");
  const msgUltima = document.createElement("p");
  const msgNaoLidas = document.createElement("p");

  cardContainer.className = "chat";
  fotoContato.className = "foto";
  nomeContato.className = "nome";
  horaMsg.className = "hora";
  msgUltima.className = "texto";
  msgNaoLidas.className = "";

  cardContainer.id = idContato; // adiciona o id do contato no container para servir de parametro da função que carrega das mensagens no grid //
  fotoContato.src = `https://i.pravatar.cc/150?img=${idContato + 1}`;
  nomeContato.innerText = nome;
  horaMsg.innerText = hora;
  msgUltima.innerText = ultima;
  msgNaoLidas.innerText = naoLidas;

  cardContainer.append(
    fotoContato,
    nomeContato,
    horaMsg,
    msgUltima,
    msgNaoLidas,
  );
  elemento.lista_contatos.append(cardContainer);
}

renderizarContatos(); // monta os cards assim que a página carrega //
