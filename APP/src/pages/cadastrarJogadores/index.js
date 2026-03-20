import { postSelecao } from "../../services/selecoes.service.js";

const form = document.querySelector("#formPostSelecao");

const inputNome = document.querySelector("#nomeSelecao");
const inputTecnico = document.querySelector("#tecnicoSelecao");
const inputLogo = document.querySelector("#logoSelecao");
const selectGrupo = document.querySelector("#grupoSelect");

const color1 = document.querySelector("#color1");
const color2 = document.querySelector("#color2");

const boxFlagPreview = document.querySelector(".boxFlagPreview")
const flagPreview = document.querySelector("#flagPreview");

inputLogo.addEventListener("input", ()=>{
    flagPreview.src = inputLogo.value;
})

const createSelecao = async(data) =>{
    try{
        const result = await postSelecao(data);
        return result;
    } catch(error){
        console.log(error.message);
    }
}

form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const data = {
        nome: inputNome.value,
        tecnico: inputTecnico.value,
        logo: inputLogo.value,
        grupo: selectGrupo.value,
        cores: {
            principal: color1.value,
            secundaria: color2.value
        },
        conquistas: [],
        jogadores: []
    }

    const result = await createSelecao(data);
    alert(data.nome + " foi criado(a) com sucesso!!!")
    console.log("Seleção criada:", result);
    window.location.href = '/src/pages/listarSelecoes'
    const ipts = form.querySelectorAll('input')
    flagPreview.src = '';
    ipts.forEach(ipt => {
        if (ipt.type !== 'color') {
            ipt.value = ''
            return
        }
        ipt.value = "#000000"
    })
})