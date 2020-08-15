let carrinho = [];
class ProdutoNoCarrinho {
    constructor(nome, preco, quantidade) {
        this.nome = nome
        this.preco = preco
        this.quantidade = quantidade
    }
}

function colocarProdutoNoCarrinho(nomeProduto, valorDoProduto, quantidadeDoProduto) {
    if (quantidadeDoProduto !== "") {
        let produtoNoCarrinho = new ProdutoNoCarrinho(nomeProduto, valorDoProduto, quantidadeDoProduto)
        carrinho.push(produtoNoCarrinho)

        console.log("Coloquei " + produtoNoCarrinho.quantidade + " " + produtoNoCarrinho.nome + "(s) no carrinho!")

        calcularValorTotalDoCarrinho()
    } else {
        alert("Mas não queria o produto?")
    }
}

function calcularValorTotalDoCarrinho() {
    let soma = 0

    for (let i = 0; i < carrinho.length; i++) {
        let produtoNoEspacoAtualNoCarrinho = carrinho[i]
        // a gente só tá calculando o preço X quantidade daquele produto no carrinho
        let valorTotalDoProdutoAtual = produtoNoEspacoAtualNoCarrinho.preco * produtoNoEspacoAtualNoCarrinho.quantidade

        soma = soma + valorTotalDoProdutoAtual
    }

    console.log("O valor total do carrinho é de R$ " + soma)
    // let inputOndeFicaValorTotalDoCarrinho = document.getElementById("valorTotalDoCarrinho")
    let h3Valor = document.getElementById("h3Valor")

    // inputOndeFicaValorTotalDoCarrinho.value = soma
    // toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }); serve pra formatar o número em dinheiro
    h3Valor.innerHTML = soma.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function clicarComprarProduto(idDoCampoPreco, idDoCampoQuantidade, nomeDoProduto) {
    let inputComPreco = document.getElementById(idDoCampoPreco)
    let valorDoProduto = inputComPreco.value // onde fica que a maçã custa R$ 2,30
    let quantidadeDoProduto = document.getElementById(idDoCampoQuantidade).value // aqui é onde o usuário diz quantas quer

    colocarProdutoNoCarrinho(nomeDoProduto, valorDoProduto, quantidadeDoProduto)
}

window.onload = function () {

    axios.get("http://localhost:3000/produtos")
        .then(({ data }) => {

            let cards = document.getElementById("cards")
            data.forEach(produto => {
                cards.innerHTML += `<div class="col-lg-3 col-md-6 mb-4">
                <div class="card h-100" id="produto${produto.id}">
                <img class="card-img-top" src="${produto.img}" alt="">
                <div class="card-body">
                    <h4 class="card-title">${produto.nome}</h4>
                    <p class="card-text">A melhor maça da região</p>
                </div>
                <div class="card">
                    <div class="card-body">
                    <input class="precoProduto" type=number  style='width:50px' value='${produto.preco}' disabled>
                    </div>
                </div>
                <div class="card-footer">
                    <input class="quantidadeProduto" type="number">
                    <a href="#" data-id="${produto.id}" class="btn btn-primary">Comprar</a>
                </div>
                </div>
                </div>`

            })

            let botoes = document.querySelectorAll(".card .btn")

            botoes.forEach(botao => {
                botao.addEventListener("click", (event) => {
                    event.preventDefault()
                    let id = botao.getAttribute("data-id")
                    let produto = document.getElementById(`produto${id}`)
                    let nomedoProduto = produto.querySelector(".card-title").textContent
                    let valordoProduto = produto.querySelector(".precoProduto").value
                    let quantidadedeProduto = produto.querySelector(".quantidadeProduto").value
                    
                    colocarProdutoNoCarrinho(nomedoProduto, valordoProduto, quantidadedeProduto)                  

                })
            })

        })
}








