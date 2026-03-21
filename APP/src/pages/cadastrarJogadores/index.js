import { getSelecoes, putSelecao } from "../../services/selecoes.service.js"

const boxForm = document.querySelector("#mainPutJogadores")
const nomeJogador = document.querySelector('#nomeJogador')
const camisaJogador = document.querySelector('#camisaJogador')
const golsJogador = document.querySelector('#golsJogador')
const posicaoSelect = document.querySelector('#posicaoSelect')
const selecoesSelect = document.querySelector('#selecoesSelect')
const radioSim = document.querySelector('#simTitular')
const radioNao = document.querySelector('#naoTitular')
const btnCadastrar = document.querySelector('#btnCadsJogador')

function renderSelecoesSelect(lista) {
    lista.sort((a, b) => a.nome.localeCompare(b.nome));
    lista.forEach(selecao => {
        const option = document.createElement('option')
        option.value = selecao.nome
        option.textContent = selecao.nome
        selecoesSelect.appendChild(option)
    })
    btnCadastrar.addEventListener("click", async () => {
        eventCadastrar(lista)
    })
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            eventCadastrar(lista)
        }
    })
}

function verificarRadio() {
    if (!radioSim.checked && !radioNao.checked) return 'nada'
    if (radioSim.checked) return true
    if (radioNao.checked) return false
}

async function eventCadastrar(lista) {
        let selecaoConquistas = null
        let selecaoEncontrada = null
        let jogId = ""
        let jogNome = nomeJogador.value
        let jogCamisa = Number(camisaJogador.value)
        let jogPosicao = posicaoSelect.value
        let jogTitular = verificarRadio()
        let jogGols = Number(golsJogador.value)
        let jogadoresSelecao = []
        lista.forEach(selecao => {
            if (selecao.nome !== selecoesSelect.value) return
            let idLastPlayer = 0
            selecaoEncontrada = selecao
            selecao.jogadores.forEach(jogador => {
                jogadoresSelecao.push(jogador)
                idLastPlayer += 1
            })
            selecaoConquistas = selecao.conquistas
            jogId = idLastPlayer + 1
        })
        if (!selecaoEncontrada) {
            alert('Seleção não encontrada')
            return
        }
        if (jogNome.length <= 0 ||
            jogCamisa < 0 ||
            jogPosicao.length <= 0 ||
            jogTitular == 'nada' ||
            jogGols < 0
        ) {
            console.log('Erro ao cadastrar jogador')
            alert('Erro ao cadastrar jogador')
            return
        }
        const jogador = {
            id: String(jogId),
            nome: jogNome,
            camisa: jogCamisa,
            posicao: jogPosicao,
            titular: jogTitular,
            gols: jogGols,
        }
        jogadoresSelecao.push(jogador)
        const dadosAtualizados = {
            ...selecaoEncontrada,
            conquistas: selecaoConquistas,
            jogadores: jogadoresSelecao,
        }
        console.log(jogadoresSelecao)
        console.log(dadosAtualizados)
        try {
            await putSelecao(selecaoEncontrada.id, dadosAtualizados)
            alert(jogNome + " cadastrado com sucesso!")
            location.reload()
        } catch (error) {
            console.error(error)
            alert("Erro ao cadastrar jogador. Tente novamente.")
        }
        nomeJogador.value = ''
        camisaJogador.value = ''
        golsJogador.value = ''
        nomeJogador.focus()
}

const selecoes = await getSelecoes()
renderSelecoesSelect(selecoes)