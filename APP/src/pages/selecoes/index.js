import { getSelecoes } from '../../services/selecoes.service.js'

let selecoesContainer = document.querySelector('.selecoesContainer')

function renderSelecoes(lista) {
    lista.forEach(selecao => {
        selecoesContainer.innerHTML += `
            <div class="cardSelecoes" data-color1="${ selecao.cores.principal }" data-color2="${ selecao.cores.secundaria }" style="border:solid 3px ${ selecao.cores.principal }">
                <div class="insetCardSelecoes">
                    <img src="${ selecao.logo }" alt="">
                    <h1 style="
                        background: linear-gradient(to bottom, ${ selecao.cores.principal }, ${ selecao.cores.secundaria });
                        background-clip: text;
                        color: transparent">${ selecao.nome }</h1>
                    <h2>Téc: ${ selecao.tecnico }</h2>
                    <h3>Grupo: ${ selecao.grupo }</h3>
                    <div class="boxBtnVerJogadores">
                        <button class="btnVerJogadores">Ver jogadores</button>
                    </div>
                    <div class="divJogadores">
                        ${renderJogadores(selecao.jogadores)}
                    </div>
                </div>
            </div>
        `
        let nomeSelecao = selecao.nome
        let jogadores = []
        selecao.jogadores.forEach(jogador => {
            jogadores.push(jogador.nome)
        })

        let selecaoJogadores = {
            [nomeSelecao]: jogadores
        }
        // console.log(selecaoJogadores)
        // console.log(selecaoJogadores.Brasil.length)
    });
    
    const allCards = document.querySelectorAll('.cardSelecoes')
    const containerJogadores = document.querySelector('.jogadoresContainer')
    
    allCards.forEach(card => {
        const box = card.querySelector('.boxBtnVerJogadores')
        const btn = card.querySelector('.btnVerJogadores')
        const boxJogadores = card.querySelectorAll('.boxJogador')
        // const allJogadoresNome = boxJogadores.querySelectorAll('p#nome')
        // const allJogadoresCamisa = boxJogadores.querySelectorAll('p#camisa')
        // const allJogadoresPosicao = boxJogadores.querySelectorAll('p#Posicao')
        let color1 = card.getAttribute('data-color1')
        let color2 = card.getAttribute('data-color2')
        console.log(boxJogadores)
    
        card.addEventListener('mouseover', () => {
            const color = card.getAttribute('data-color1')
            card.style.boxShadow = `0 0 20px ${color}, 0 0 15px black inset`
        })
        card.addEventListener('mouseout', () => {
            card.style.boxShadow = '0 0 35px black, 0 0 15px black inset'
        })
        btn.addEventListener('click', () => {
            boxJogadores.forEach(pJogador => {
                const div = document.createElement('div')
                div.style.background = 'linear-gradient(to bottom, ' + color2 + ', ' + color1 +')'
                div.style.border = 'solid 3px ' + color1
                addJogador(div, 'nome', pJogador)
                addJogador(div, 'camisa', pJogador)
                addJogador(div, 'posicao', pJogador)
                containerJogadores.appendChild(div)
            })
            document.body.style.overflow = 'hidden'
            containerJogadores.classList.remove('hidden')
        })
        btn.addEventListener('mouseover', () => {
            box.style.background = color1
        })
        btn.addEventListener('mouseout', () => {
            box.style.background = 'black'
        }) 
    })
    
    containerJogadores.addEventListener('click', () => {
        document.body.style.overflow = 'auto'
        containerJogadores.classList.add('hidden')
        containerJogadores.innerHTML = ''
    })
}

function renderJogadores(lista) {
    let ps = '';
    lista.forEach(jogador => {        
        ps += `
        <div class="boxJogador">
            <p id="nome">${jogador.nome}</p>
            <p id="camisa">${jogador.camisa}</p>
            <p id="posicao">${jogador.posicao}</p>
        </div>`;
    })
    return ps;
}

// function renderJogadores(lista) {
//     let ps = '';
//     lista.forEach(jogador => {        
//         ps += `<p>${jogador.nome}</p>`;
//     })
//     return ps;
// }

function addJogador(box, atributo, attJogador) {
    const pAtributo = attJogador.querySelector('#' + atributo + '')
    const atributoElem = document.createElement('p')
    atributoElem.textContent = pAtributo.textContent
    box.appendChild(atributoElem)
}

function putJogadores(lista) {
    const containerJogadores = document.querySelector('.jogadoresContainer')
    lista.forEach(jogador => {        
        const p = document.createElement('p')
        p.textContent = jogador.nome
        containerJogadores.appendChild(p)
    })
}

const selecoes = await getSelecoes()
renderSelecoes(selecoes)