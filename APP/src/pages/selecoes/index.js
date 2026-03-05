import { getSelecoes } from '../../services/selecoes.service.js'

let selecoesContainer = document.querySelector('.selecoesContainer')

function renderJogadores(lista) {
    let divJogadores = document.querySelector('.divJogadores')
    lista.forEach(jogador => {
        const p = document.createElement('p')
        p.textContent = jogador.nome
        divJogadores.appendChild(p)
    })
}

function renderSelecoes(lista) {
    lista.forEach(selecao => {
        selecoesContainer.innerHTML = `
            <div>
                <img src="${ selecao.logo }" alt="">
                <h1>${ selecao.nome }</h1>
                <h2>${ selecao.grupo }</h2>
                <div class="divJogadores">
                    ${ renderJogadores(selecao.jogadores) }
                </div>
            </div>
        `
    });
}


async function init() {
    const selecoes = await getSelecoes()
    renderSelecoes(selecoes)
}

init()