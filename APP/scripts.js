const title = document.getElementsByTagName('title')[0]
const boxIpt = document.querySelector('.boxIpt')
const ipt = document.querySelector('.ipt')
const btn = document.querySelector('.btn')
const iconFut1 = document.getElementsByTagName('i')[0]
const iconFut2 = document.getElementsByTagName('i')[1]
const txtNome = document.querySelector('.nome')
const logo = document.querySelector('.logo')
const txtGrupo = document.querySelector('.grupo')
const txtTecnico = document.querySelector('.tecnico')
const tableConquistas = document.querySelector('.tbConquistas');
const tableJogadores = document.querySelector('.tbJogadores');
const txtNumTitulos = document.querySelector('.numTitulos');
const txtNumJogadores = document.querySelector('.numJogadores');
const card = document.querySelector('.card')

const alertar = (status) => {
    if(status === 'invalido') {
        inv()
    }
    else {
        vl()
    }
    ipt.value = ''
}

function inv() {
    card.textContent = "Inválido, digite certo seu burro!!!"
    addClassOnCard('invalido')
}
function vl() {
    card.textContent = "Requisitado com sucesso!!!"
    addClassOnCard('valido')
}

let base_url = "http://localhost:3000"
let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        requisitar();
    }
});

btn.addEventListener('click', requisitar)

function requisitar() {
    fetch(`${base_url}/selecoes?nome=${ipt.value}`, requestOptions)
    .then(response => response.text())
    .then(result => {
        let selecoes = JSON.parse(result)
        let conquistas = selecoes[0].conquistas
        let jogadores = selecoes[0].jogadores
        txtNumTitulos.textContent = selecoes[0].conquistas.length + " Títulos"
        txtNumJogadores.textContent = selecoes[0].jogadores.length + " Jogadores"
        txtNome.textContent = selecoes[0].nome
        logo.src = selecoes[0].logo
        txtGrupo.textContent = "Grupo " + selecoes[0].grupo
        txtTecnico.textContent = "Técnico: " + selecoes[0].tecnico
        let pCor = selecoes[0].cores.principal
        let sCor = selecoes[0].cores.secundaria
        
        document.body.style.background = "linear-gradient(to bottom, rgb(0, 0, 0), " + pCor + ")"
        tableConquistas.style.boxShadow = "0 0 25px " + sCor
        tableJogadores.style.boxShadow = "0 0 25px " + sCor
        boxIpt.style.background = "conic-gradient(from var(--angle), " + pCor + ", " + sCor + ", " + pCor + ", " + sCor + ")"
        boxIpt.style.borderColor = sCor
        iconFut1.style.color = pCor
        iconFut2.style.color = sCor
        
        title.textContent = ipt.value
        tableConquistas.innerHTML = "<tr><th>ANO</th><th>PAÍS</th></tr>"
        tableJogadores.innerHTML = "<tr><th>NOME</th><th>POSIÇÃO</th><th>CAMISA</th></tr>"
        
        conquistas.forEach(conquista => {
            let row = document.createElement('tr')
            let ano = document.createElement('td')
            let pais = document.createElement('td')
            ano.textContent = conquista.ano
            pais.textContent = conquista.pais
            row.appendChild(ano)
            row.appendChild(pais)
            tableConquistas.appendChild(row)
        })
        
        jogadores.forEach(jogador => {
            let row = document.createElement('tr')
            let nome = document.createElement('td')
            let pos = document.createElement('td')
            let numero = document.createElement('td')
            nome.textContent = jogador.nome
            pos.textContent = jogador.posicao
            numero.textContent = jogador.camisa
            row.appendChild(nome)
            row.appendChild(pos)
            row.appendChild(numero)
            tableJogadores.appendChild(row)
        })
        
        alertar('valido')
        ipt.value = ""
        ipt.focus()
    })
    .catch(error => alertar('invalido'))
}

function addClassOnCard(status) {
    card.classList.add(status)
    setTimeout(() => {
        card.classList.remove(status)
        card.textContent = ''
    },2000)
}