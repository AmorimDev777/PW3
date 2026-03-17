import { postSelecao } from "../../services/selecoes.service.js";

const form = document.getElementById("formPostSelecao");

const inputNome = document.getElementById("nomeSelecao");
const inputTecnico = document.getElementById("tecnicoSelecao");
const inputLogo = document.getElementById("logoSelecao");
const selectGrupo = document.getElementById("grupoSelect");

const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");

const flagPreview = document.getElementById("flagPreview");

inputLogo.addEventListener("change", ()=>{
    flagPreview.src = inputLogo.value;
})

const createSelecao = async(data) =>{
    try{
        const result = await postSelecao(data);
        return result;
    }catch(error){
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
        }
    }

    const result = await createSelecao(data);
    alert(data.nome + " foi criado(a) com sucesso!!!")
    console.log("Seleção criada:", result);
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