import { getSelecoes, deleteSelecao } from '../../services/selecoes.service.js'

const selecoesContainer = document.querySelector('.selecoesContainer')
const inputFilter = document.querySelector('.inputFilter')

const removeSelecao = async(id)=>{
    try{
        const result = await deleteSelecao(id)
        return result;
    }catch(error){
        console.log(error.message)
    }
}

function renderSelecoes(lista) {
    selecoesContainer.innerHTML = ''
    const inputTxt = tirarAcentos(inputFilter.value.toLowerCase())
    lista.sort((a, b) => a.grupo.localeCompare(b.grupo))
    lista.forEach(selecao => {
        if (!tirarAcentos(selecao.nome.toLowerCase()).includes(inputTxt)) return

        selecoesContainer.innerHTML += `
        <div class="cardSelecoes"
            data-nome="${ selecao.nome }"
            data-color1="${ selecao.cores.principal }"
            data-color2="${ selecao.cores.secundaria }"
        >
            <img src="${ selecao.logo }" alt="">
            <h1 style="
                background: linear-gradient(to bottom, ${ selecao.cores.principal }, ${ selecao.cores.secundaria });
                background-clip: text;
                color: transparent">${ selecao.nome }</h1>
            <h2>Téc: ${ selecao.tecnico }</h2>
            <h3>Grupo: ${ selecao.grupo }</h3>
            <div class="containerBtns">
                <button class="btnVerJogadores">Ver Mais</button>
                <button class="btnDelSelecao" data-id="${selecao.id}" data-nome="${selecao.nome}" id="btnDel">Deletar</button>
            </div>
            <div class="divJogadores">
            ${renderJogadores(selecao.jogadores)}
            </div>
            </div>
            `
    })
    
    const allCards = document.querySelectorAll('.cardSelecoes')
    const containerDetalhes = document.querySelector('.containerDetalhes')
    
    allCards.forEach(card => {
        const btn = card.querySelector('.btnVerJogadores')
        let nome = card.getAttribute('data-nome')
        let color1 = card.getAttribute('data-color1')
        let color2 = card.getAttribute('data-color2')

        btn.addEventListener('click', () => {
            lista.forEach(selecao => {
                if (selecao.nome != nome) return
                containerDetalhes.innerHTML = `
                    <img src="${ selecao.logo }" alt="">
                    <h1 style="
                        background: linear-gradient(to bottom, ${ selecao.cores.principal }, ${ selecao.cores.secundaria });
                        background-clip: text;
                        color: transparent">${ selecao.nome }</h1>
                    <h2>Téc: ${ selecao.tecnico }</h2>
                    <h3>Grupo: ${ selecao.grupo }</h3>
                    <div class="boxInfos">
                        <div class="boxConquistas">
                            ${ renderConquistas(selecao.conquistas) }    
                        </div>
                        <div class="boxJogadores">
                            ${ renderJogadores(selecao.jogadores) }
                        </div>
                    </div>
                `
            })
            document.body.style.overflow = 'hidden'
            containerDetalhes.classList.remove('hidden')
        })
    })
    
    containerDetalhes.addEventListener('click', () => {
        document.body.style.overflow = 'auto'
        containerDetalhes.classList.add('hidden')
        containerDetalhes.innerHTML = ''
    })
}

function renderJogadores(lista) {
    let ps = '';
    if (lista.length <= 0) return "<h1 class='semJogadores'>Seleção Sem Jogadores</h1>"
    lista.sort((a, b) => a.nome.localeCompare(b.nome))
    lista.forEach(jogador => {        
        ps += `
        <div class="boxJogador">
        <p id="nome">${jogador.nome}</p>
        <p id="camisa">Camisa ${jogador.camisa}</p>
        <p id="posicao">${jogador.posicao}</p>
        <p id="gols">${jogador.gols} Gols Pela Seleção</p>
        <p id="titular">${jogador.titular ? 'É Titular' : 'Não é Titular'}</p>
        </div>`;
    })
    return ps;
}
function renderConquistas(lista) {
    let ps = '';
    if (lista.length <= 0) return "<h1 class='semConquistas'>Seleção Sem Conquistas</h1>"
    lista.sort((a, b) => a.ano - b.ano)
    lista.forEach(conquista => {        
        ps += `
        <div class="boxConquista">
            <p id="trofeu">🏆</p>
            <p id="pais">${conquista.pais}</p>
            <p id="ano">${conquista.ano}</p>
        </div>`;
    })
    return ps;
}

function tirarAcentos(palavra) {
    return palavra.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
}

selecoesContainer.addEventListener("click", async(e) =>{
    e.preventDefault()
    
    const button = e.target.closest("#btnDel")
    
    if(!button) return
    
    const id = button.dataset.id
    const nome = button.dataset.nome
    
    const confirmar = confirm("Você realmente quer excluir " + nome + "?")
    
    if(!confirmar) return
    
    await removeSelecao(id)
    
    location.reload()
})

const selecoes = await getSelecoes()
inputFilter.addEventListener('input', () => {
    renderSelecoes(selecoes)
})
renderSelecoes(selecoes)