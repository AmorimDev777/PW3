const ipt = document.querySelector('.ipt')
const btn = document.querySelector('.btn')
const txtNome = document.querySelector('.nome')
const logo = document.querySelector('.logo')
const txtGrupo = document.querySelector('.grupo')
const txtTecnico = document.querySelector('.tecnico')
const tableConquistas = document.querySelector('.tbConquistas');
const tableJogadores = document.querySelector('.tbJogadores');
const txtNumTitulos = document.querySelector('.numTitulos');
const txtNumJogadores = document.querySelector('.numJogadores');

let base_url = "http://localhost:3000";
let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

btn.addEventListener('click', () => {
    fetch(`${base_url}/selecoes/${ipt.value}`, requestOptions)
    .then(response => response.text())
    .then(result => {
        let selecoes = JSON.parse(result);
        let conquistas = selecoes.conquistas;
        let jogadores = selecoes.jogadores;
        txtNumTitulos.textContent = selecoes.conquistas.length + " Títulos"
        txtNumJogadores.textContent = selecoes.jogadores.length + " Jogadores"
        txtNome.textContent = selecoes.nome;
        logo.src = selecoes.logo;
        txtGrupo.textContent = "Grupo " + selecoes.grupo;
        txtTecnico.textContent = "Técnico: " + selecoes.tecnico;
        let cor = selecoes.cor

        document.body.style.background = "linear-gradient(to bottom, rgb(0, 0, 0), " + cor + ")"
        tableConquistas.style.boxShadow = "0 0 25px " + cor
        tableJogadores.style.boxShadow = "0 0 25px " + cor
        
        conquistas.forEach(conquista => {
            let row = document.createElement('tr');
            let anoCell = document.createElement('td');
            let paisCell = document.createElement('td');
            anoCell.textContent = conquista.ano;
            paisCell.textContent = conquista.pais;
            row.appendChild(anoCell);
            row.appendChild(paisCell);
            tableConquistas.appendChild(row);
        });
        
        jogadores.forEach(jogador => {
            let row = document.createElement('tr');
            let nomeCell = document.createElement('td');
            let posCell = document.createElement('td');
            let numeroCell = document.createElement('td');
            nomeCell.textContent = jogador.nome;
            posCell.textContent = jogador.posicao;
            numeroCell.textContent = jogador.camisa;
            row.appendChild(nomeCell);
            row.appendChild(posCell);
            row.appendChild(numeroCell);
            tableJogadores.appendChild(row);
        });
    })
    .catch(error => console.log('error', error));

})