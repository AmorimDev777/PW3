import { getSelecoes, deleteSelecao } from '../../services/selecoes.service.js'

let selecoesContainer = document.querySelector('.selecoesContainer')

const removeSelecao = async(id)=>{
    try{
        const result = await deleteSelecao(id)
        return result;
    }catch(error){
        console.log(error.message)
    }
}

function renderSelecoes(lista) {
    lista.forEach(selecao => {
        selecoesContainer.innerHTML += `
            <div class="cardSelecoes" data-color1="${ selecao.cores.principal }" data-color2="${ selecao.cores.secundaria }">
                <div class="insetCardSelecoes">
                    <img src="${ selecao.logo }" alt="">
                    <h1 style="
                        background: linear-gradient(to bottom, ${ selecao.cores.principal }, ${ selecao.cores.secundaria });
                        background-clip: text;
                        color: transparent">${ selecao.nome }</h1>
                    <h2>Téc: ${ selecao.tecnico }</h2>
                    <h3>Grupo: ${ selecao.grupo }</h3>
                    <div class="containerBtns">
                        <button class="btnVerJogadores">Jogadores</button>
                        <button class="btnDelSelecao" data-id="${selecao.id}" data-nome="${selecao.nome}" id="btnDel">Deletar</button>
                    </div>
                    <div class="divJogadores">
                        ${renderJogadores(selecao.jogadores)}
                    </div>
                </div>
            </div>
        `
    })
    
    const allCards = document.querySelectorAll('.cardSelecoes')
    const containerJogadores = document.querySelector('.jogadoresContainer')
    
    allCards.forEach(card => {
        const btn = card.querySelector('.btnVerJogadores')
        const boxJogadores = card.querySelectorAll('.boxJogador')
        let color1 = card.getAttribute('data-color1')
        let color2 = card.getAttribute('data-color2')
    
        card.addEventListener('mouseover', () => {
            card.style.borderColor = color1
        })
        card.addEventListener('mouseout', () => {
            card.style.borderColor = 'RGB(24,24,24)'
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
            btn.style.borderColor = color1
        })
        btn.addEventListener('mouseout', () => {
            btn.style.borderColor = 'black'
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
renderSelecoes(selecoes)