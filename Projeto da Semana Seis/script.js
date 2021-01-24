function requisicao() {
    const user = document.getElementById("busca").value
    fetch(`https://api.github.com/users/${user}/repos`).then((response) => {
        if (response.status == 200) {
            return response.json()
        }
        throw new Error('Usuário não Localizado.')
    }).then(response => {
        limpaTela()
        inforREPO(response)

        const content = document.querySelector('.usuario')
        const fotoP = response[0].owner.avatar_url
        const nameUser = response[0].owner.login
      
        content.innerHTML = `
        <img class='fperfil' src="${fotoP}">
        <h1>${nameUser}</h1>
        <div >
        <a class="linkS" target="_blank" href="https://github.com/${nameUser}?tab=followers">Seguidores &nbsp;&nbsp;</a>
        <a class="linkS" target="_blank" href="https://github.com/${nameUser}?tab=following">Devs que Segue</a>
        </div>
        `
    })
}

document.getElementById("btn").addEventListener('click', function () {
    requisicao()
})

function inforREPO (a) {
    for (let i in a) {

        const nameUser = a[0].owner.login
        const nameRepo = a[i].name
        const imgUrl = a[i].language
        const linkRepo = a[i].html_url
        const idPro = a[i].id
        const repos = document.querySelector('.repositorios')
        const descri = a[i].description
        const MasterMain = a[i].default_branch
        const garfo = a[i].forks
        const estrelas = a[i].stargazers_count

        const repo = `

        <div class="div1">
            <h2 class="titulo">${nameRepo}</h2>
            <table >
                       <tr>
                       <td><img width="15" src="img/star.svg"> </td>
                           <td class="titulo2"> : ${estrelas}  &nbsp; </td>


                           <td><img width="10" src="img/forks.png"> </td>
                           <td class="titulo2"> : ${garfo}</td>
                           
                           </tr>
                           </table>
                <div class="div2">
                     <img src="img/${imgUrl}.svg" title="Descrição do Repositório: ${descri}" class="imgs">
                     <div>
                     <br>   
                     <h4> Id do Repositório: ${idPro}</h4>
                        <p> Linguagem Predominante: ${imgUrl} </P>
                        <br>
                        <div id="links">
                        <a class="linkRepo" target="_blank" href="https://github.com/${nameUser}/${nameRepo}/commits/${MasterMain}" title="Acesse os Commits feitos nesse Repositório" >Commits</a>
                        <a class="linkRepo" target="_blank" href="https://github.com/${nameUser}/${nameRepo}/branches" title="Acesse os Branches feitos nesse Repositório" >Branches</a>
                        <br>
                        <a class="linkRepo" target="_blank" href="${linkRepo}" title="Acesse esse Repositório no GitHub" >Link</a>
                        <a class="linkRepo" target="_blank" href="https://github.com/${nameUser}/${nameRepo}/archive/${MasterMain}.zip"  title="Faça dowloand desse Repositório">Download</a>
                        <a class="linkRepo" title="Git clone desse Repositório" onclick="clone('git clone https://github.com/${nameUser}/${nameRepo}')" >Clone</a>
                        </div>
                      </div>
                </div>
        </div>
        `
        repos.innerHTML += repo
        
        VanillaTilt.init(document.querySelectorAll(".div2"), {
            max: 25,
            speed: 400,
            glare: true,
            "max-glare": 1,
          
        });
        
        VanillaTilt.init(document.querySelectorAll(".usuario"), {
            max: 25,
            speed: 400,
            glare: true,
            "max-glare": 1,
        });
    }
}

function limpaTela() {
    const repos = document.querySelector('.repositorios')
    repos.innerHTML = ""
}

function clone(url) {
    const input = document.createElement("input");
    input.value = url;
    input.id = "input";
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();

}     
