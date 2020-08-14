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

// espero a página carregar
// window é o BOM
// onload é o evento onde a página
window.onload = function () {
    // document.getElementById recupera um elemento que tem o nome "botao"
    document.getElementById("comprarMaca").addEventListener("click", () => {
        let idDoCampoPreco = "precoMaca"
        let idDoCampoQuantidade = "quantidadeMaca"
        let nomeDoProduto = "Maca"
        clicarComprarProduto("precoMaca", "quantidadeMaca", "Maçã")
    })

    document.getElementById("comprarLaranja").addEventListener("click", () => {
        let idDoCampoPreco = "precoLaranja"
        let idDoCampoQuantidade = "quantidadeLaranja"
        let nomeDoProduto = "Laranja"

        clicarComprarProduto(idDoCampoPreco, idDoCampoQuantidade, nomeDoProduto)
    })

    document.getElementById("comprarUva").addEventListener("click", () => {
        let idDoCampoPreco = "precoUva"
        let idDoCampoQuantidade = "quantidadeUva"
        let nomeDoProduto = "Uva"

        clicarComprarProduto(idDoCampoPreco, idDoCampoQuantidade, nomeDoProduto)
    })

    document.getElementById("comprarMorango").addEventListener("click", () => {
        let idDoCampoPreco = "precoMorango"
        let idDoCampoQuantidade = "quantidadeMorango"
        let nomeDoProduto = "Morango"

        clicarComprarProduto(idDoCampoPreco, idDoCampoQuantidade, nomeDoProduto)
    })
}



