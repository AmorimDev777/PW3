import {
  getSelecoes,
  deleteSelecao,
  putSelecao,
} from "../../services/selecoes.service.js";

const title = document.querySelector("title");
const selecoesContainer = document.querySelector(".selecoesContainer");
const inputFilter = document.querySelector(".inputFilter");

const removeSelecao = async (id) => {
  try {
    const result = await deleteSelecao(id);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

function renderSelecoes(lista) {
  selecoesContainer.innerHTML = "";
  const inputTxt = tirarAcentos(inputFilter.value.toLowerCase());
  lista.sort((a, b) => a.grupo.localeCompare(b.grupo));
  lista.forEach((selecao) => {
    if (!tirarAcentos(selecao.nome.toLowerCase()).includes(inputTxt)) return;

    selecoesContainer.innerHTML += `
        <div class="cardSelecoes"
            data-nome="${selecao.nome}"
            data-color1="${selecao.cores.principal}"
            data-color2="${selecao.cores.secundaria}"
        >
            <img src="${selecao.logo}" alt="">
            <h1 style="
                background: linear-gradient(to bottom, ${selecao.cores.principal}, ${selecao.cores.secundaria});
                background-clip: text;
                color: transparent">${selecao.nome}</h1>
            <h2>Téc: ${selecao.tecnico}</h2>
            <h3>Grupo: ${selecao.grupo}</h3>
            <div class="containerBtns">
                <button class="btnEditSelecao"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="btnVerDetalhesSelecao"><i class="fa-solid fa-eye"></i></button>
                <button class="btnDelSelecao" data-id="${selecao.id}" data-nome="${selecao.nome}" id="btnDel"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
        `;
  });

  const allCards = document.querySelectorAll(".cardSelecoes");
  const containerDetalhes = document.querySelector(".containerDetalhes");

  allCards.forEach((card) => {
    const btnDetalhes = card.querySelector(".btnVerDetalhesSelecao");
    const btnEdit = card.querySelector(".btnEditSelecao");
    let nome = card.getAttribute("data-nome");
    let color1 = card.getAttribute("data-color1");
    let color2 = card.getAttribute("data-color2");

    btnDetalhes.addEventListener("click", () => {
      lista.forEach((selecao) => {
        if (selecao.nome != nome) return;
        containerDetalhes.innerHTML = `
                    <i class="fa-solid fa-arrow-left voltarDetalhes"></i>
                    <img src="${selecao.logo}" alt="">
                    <h1 style="
                        background: linear-gradient(to bottom, ${selecao.cores.principal}, ${selecao.cores.secundaria});
                        background-clip: text;
                        color: transparent">${selecao.nome}</h1>
                    <h2>Téc: ${selecao.tecnico}</h2>
                    <h3>Grupo: ${selecao.grupo}</h3>
                    <div class="boxInfos">
                        <div class="boxConquistas">
                            ${renderConquistas(selecao.conquistas)}    
                        </div>
                        <div class="boxJogadores">
                            ${renderJogadores(selecao.jogadores)}
                        </div>
                    </div>
                `;
        title.textContent = selecao.nome;
      });
      const voltarDetalhes = document.querySelector(".voltarDetalhes");
      voltarDetalhes.addEventListener("click", () => {
        fecharModal(containerDetalhes);
      });
      document.body.style.overflow = "hidden";
      containerDetalhes.classList.remove("hidden");
    });

    btnEdit.addEventListener("click", () => {
      lista.forEach((selecao) => {
        if (selecao.nome != nome) return;
        containerDetalhes.innerHTML = `
                    <i class="fa-solid fa-arrow-left voltarDetalhes"></i>
                    <div class="containerEdit">
                        <div class="formEdit">
                            <input id="nomeSelecaoEdit" type="text" placeholder="Nome" required>
                            <input id="logoSelecaoEdit" type="text" placeholder="Logo Url" required>
                            <input id="tecnicoSelecaoEdit" type="text" placeholder="Técnico" required>
                            <div class="divSelectEdit">
                                <select id="grupoSelect">
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                    <option value="E">E</option>
                                    <option value="F">F</option>
                                    <option value="G">G</option>
                                    <option value="H">H</option>
                                    <option value="I">I</option>
                                    <option value="J">J</option>
                                    <option value="K">K</option>
                                    <option value="L">L</option>
                                </select>
                            </div>
            
                            <div class="divColorsEdit">
                                <input type="color" id="color1Edit" required>
                                <input type="color" id="color2Edit" required>
                            </div>
                            <button id="btnEditar">Editar</button>
                        </div>
                        <img src="${selecao.logo}" alt="" id="imgPreviewEdit">
                    </div>
                `;
        title.textContent = selecao.nome;
        const iptNome = document.querySelector("#nomeSelecaoEdit");
        const iptLogo = document.querySelector("#logoSelecaoEdit");
        const iptTec = document.querySelector("#tecnicoSelecaoEdit");
        const slctGrp = document.querySelector("#grupoSelect");
        const iptCor1 = document.querySelector("#color1Edit");
        const iptCor2 = document.querySelector("#color2Edit");
        const imgPreviewEdit = document.querySelector('#imgPreviewEdit')
        iptNome.value = selecao.nome;
        iptLogo.value = selecao.logo;
        iptTec.value = selecao.tecnico;
        slctGrp.value = selecao.grupo;
        iptCor1.value = normalizeColorForInput(selecao.cores.principal);
        iptCor2.value = normalizeColorForInput(selecao.cores.secundaria);
        iptLogo.addEventListener("input", ()=>{
            imgPreviewEdit.src = iptLogo.value;
        })
        const btnSalvarEdicao = document.querySelector("#btnEditar");
        btnSalvarEdicao.addEventListener("click", async () => {
          const dadosAtualizados = {
            id: selecao.id,
            nome: iptNome.value.trim(),
            logo: iptLogo.value.trim(),
            tecnico: iptTec.value.trim(),
            grupo: slctGrp.value,
            cores: {
              principal: iptCor1.value,
              secundaria: iptCor2.value,
            },
            jogadores: selecao.jogadores || [],
            conquistas: selecao.conquistas || [],
          };
          try {
            await putSelecao(selecao.id, dadosAtualizados);
            alert(selecao.nome + " atualizada com sucesso!");
            fecharModal(containerDetalhes);
            location.reload();
          } catch (error) {
            console.error(error);
            alert("Erro ao atualizar a seleção. Tente novamente.");
          }
        });
      });
      const voltarDetalhes = document.querySelector(".voltarDetalhes");
      voltarDetalhes.addEventListener("click", () => {
        fecharModal(containerDetalhes);
      });
      document.body.style.overflow = "hidden";
      containerDetalhes.classList.remove("hidden");
    });
  });
}

function renderJogadores(lista) {
  let ps = "";
  if (lista.length <= 0)
    return "<h1 class='semJogadores'>Seleção Sem Jogadores</h1>";
  lista.sort((a, b) => a.nome.localeCompare(b.nome));
  lista.forEach((jogador) => {
    ps += `
        <div class="boxJogador">
        <p id="nome">${jogador.nome}</p>
        <p id="camisa">Camisa ${jogador.camisa}</p>
        <p id="posicao">${jogador.posicao}</p>
        <p id="gols">${jogador.gols} Gols Pela Seleção</p>
        <p id="titular">${jogador.titular ? "É Titular" : "Não é Titular"}</p>
        </div>`;
  });
  return ps;
}
function renderConquistas(lista) {
  let ps = "";
  if (lista.length <= 0)
    return "<h1 class='semConquistas'>Seleção Sem Conquistas</h1>";
  lista.sort((a, b) => a.ano - b.ano);
  lista.forEach((conquista) => {
    ps += `
        <div class="boxConquista">
        <p id="trofeu">🏆</p>
        <p id="pais">${conquista.pais}</p>
        <p id="ano">${conquista.ano}</p>
        </div>`;
  });
  return ps;
}

function fecharModal(box) {
  title.textContent = "Selecao";
  document.body.style.overflow = "auto";
  box.classList.add("hidden");
  box.innerHTML = "";
}

function rgbToHex(rgb) {
  const m = rgb.match(
    /^rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i,
  );
  if (!m) return "#000000";
  const toHex = (n) => {
    const v = Math.max(0, Math.min(255, Number(n)));
    return v.toString(16).padStart(2, "0");
  };
  return `#${toHex(m[1])}${toHex(m[2])}${toHex(m[3])}`;
}

function normalizeColorForInput(color) {
  if (!color) return "#000000";
  const trimmed = color.trim();
  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(trimmed)) return trimmed;
  if (/^rgb\s*\(/i.test(trimmed)) return rgbToHex(trimmed);
  return "#000000";
}

function tirarAcentos(palavra) {
  return palavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

selecoesContainer.addEventListener("click", async (e) => {
  e.preventDefault();

  const button = e.target.closest("#btnDel");

  if (!button) return;

  const id = button.dataset.id;
  const nome = button.dataset.nome;

  const confirmar = confirm("Você realmente quer excluir " + nome + "?");

  if (!confirmar) return;

  await removeSelecao(id);

  location.reload();
});

const selecoes = await getSelecoes();
inputFilter.addEventListener("input", () => {
  renderSelecoes(selecoes);
});
renderSelecoes(selecoes);
