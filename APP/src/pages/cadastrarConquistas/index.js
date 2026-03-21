import { getSelecoes, putSelecao } from "../../services/selecoes.service.js";

const boxForm = document.querySelector("#mainPutConquista")
const anoConquista = document.querySelector('#anoConquista')
const paisConquista = document.querySelector('#paisConquista')
const selecoesSelect = document.querySelector('#selecoesSelect')
const btnCadastrar = document.querySelector('#btnCadsConquista')

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

async function eventCadastrar(lista) {
    let selecaoEncontrada = null
    let selecaoJogadores = null
    let conqAno = anoConquista.value
    let conqPais = paisConquista.value
    let conquistasSelecao = []
    lista.forEach(selecao => {
        if (selecao.nome !== selecoesSelect.value) return
        selecaoEncontrada = selecao
        selecao.conquistas.forEach(conquista => {
            conquistasSelecao.push(conquista)
        })
        selecaoJogadores = selecao.jogadores
    })
    if (!selecaoEncontrada) {
        alert('Seleção não encontrada')
        return
    }
    if (conqAno < 1950 || conqAno > 2022) {
        console.log('Erro, ano invalido')
        alert('Erro, ano invalido')
        return
    }
    if (conqPais.length <= 0) {
        console.log('Erro no país')
        alert('Erro no país')
        return
    }
    console.log(conquistasSelecao)
    const conquista = {
        ano: Number(conqAno),
        pais: conqPais,
    }
    conquistasSelecao.push(conquista)
    const dadosAtualizados = {
        ...selecaoEncontrada,
        conquistas: conquistasSelecao,
        jogadores: selecaoJogadores,
    }
    console.log(selecaoJogadores)
    console.log(dadosAtualizados)
    try {
        await putSelecao(selecaoEncontrada.id, dadosAtualizados)
        alert("Conquista cadastrada!")
        location.reload()
    } catch (error) {
        console.error(error)
        alert("Erro ao cadastrar conquista. Tente novamente.")
    }
    anoConquista.value = ''
    paisConquista.value = ''
    anoConquista.focus()
}

const selecoes = await getSelecoes()
renderSelecoesSelect(selecoes)