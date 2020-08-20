
class Carrinho {
    constructor() {
        this.itensDoCarrinho = []
    }
    adicionarProdutoCarrinho(produto) {
        axios.post("http://localhost:3000/carrinho",produto)
        this.itensDoCarrinho.push(produto)
        return produto
    }
    atualizarProdutoCarrinho(produto){
        axios.patch(`http://localhost:3000/carrinho/${produto.id}`, {
            quantidade: produto.quantidade, 
            total: produto.total
        })
    }

    excluirProdutoCarrinho(id) {
        let chave = 0;
        this.itensDoCarrinho.find((produto, index) => {
            chave = index;
            return produto.id === id;
        });

        this.itensDoCarrinho.splice(chave, 1);
        atualizarValorTotal();

        axios.delete(`http://localhost:3000/carrinho/${id}`);
    }

    get listaProdutosdoCarrinho() {
        return this.itensDoCarrinho
    }
    get calculaValorTotal() {
        return this.itensDoCarrinho.length > 0 ? this.itensDoCarrinho.map(item => item.total).reduce((total, valor) => total + valor) : 0;
    }

}
let carrinho = new Carrinho()

function atualizarValorTotal() {
    let h3Valor = document.getElementById("h3Valor")
    h3Valor.textContent = carrinho.calculaValorTotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

//Criando Cards
function criarCard(produtos) {
    let cards = document.getElementById("cards")
    produtos.forEach(produto => {
        cards.innerHTML += `<div class="col-lg-3 col-md-6 mb-4">
        <div class="card h-100" id="produto${produto.id}">
        <img class="card-img-top" src="${produto.img}" alt="">
        <div class="card-body">
            <h4 class="card-title">${produto.nome}</h4>                    
        </div>
        <div class="card">
            <div class="card-body">
            <input class="precoProduto" type="text"  value='${produto.preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}' disabled>
            </div>
        </div>
        <div class="card-footer">
            <input class="quantidadeProduto" type="number" min="1">
            <a href="#" data-id="${produto.id}" class="btn btn-primary">Adicionar ao Carrinho</a>
        </div>
        </div>
        </div>`
    })
}

//Criando Linhas de Produtos no Carrinho
function criarLinhaNoCarrinho(produto) {
    let listaProdutosCarrinho = document.querySelector("#listaProdutoNoCarrinho")
    listaProdutosCarrinho.innerHTML +=
        `<tr id="produtoCarrinho${produto.id}">
            <td><img src="${produto.img}" class="imgTabela"></td>
            <td>${produto.nome}</td>
            <td class="produtoQuantidade">${produto.quantidade}</td>
            <td>${produto.preco}</td>
            <td class="produtoValorTotal">${produto.total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
            <td><button onclick="adicionaEventoBotao(${produto.id})" class="btn-Remover">Excluir</buttton></td>
        </tr> `
}

function adicionaEventoBotao(id) {
        document.getElementById(`produtoCarrinho${id}`).remove();
        carrinho.excluirProdutoCarrinho(id);
    
}

function carregaProdutosCarrinho() {
    // 1 - Fazer solicitação no axios do carrinho.

    // 2 - Verificar se há itens no carrinho (.length do resultado do axios [res.data]).

    // 2.1 - Se tiver itens no carrinho, chamar função criarLinhaNoCarrinho(produto), para cada produto no carrinho, ou seja, um forEach do res.data do axios.

    // 2.2 - Se não  tiver itens, vida que segue, não precisa de else.

}

function atualizarLinhaNoCarrinho(produto) {
    let produtoNoCarrinhoEl = document.getElementById(`produtoCarrinho${produto.id}`)
    let quantidadeEl = produtoNoCarrinhoEl.querySelector(".produtoQuantidade")
    let valorTotalEl = produtoNoCarrinhoEl.querySelector(".produtoValorTotal")
    //textContent (serve para mudar apenas o texto no html)
    quantidadeEl.textContent = produto.quantidade
    valorTotalEl.textContent = produto.total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    carrinho.atualizarProdutoCarrinho(produto)
}

// tentando fazer com que remova o item usando o SPLICE
// function excluirProdutoCarrinho(produtos) {
//     let botoes = document.querySelector(".btn-Remover")

//     botoes.forEach(botao => {
//         botao.addEventListener("click", (event) => {
//             event.preventDefault()
//             let id = botao.getAttribute("data-id")
//             let produto = buscaProduto(id, produtos)
//             if (produto.id === id) {
//                 console.log("Foi")
//             }
//         })
//     })
// }
// excluirProdutoCarrinho()

    //Adicionando Eventos nos Botões dos Cards
    function adicionarEventoNosBotoesDosCards(produtos) {
        let botoes = document.querySelectorAll(".card .btn")

        botoes.forEach(botao => {
            botao.addEventListener("click", (event) => {
                event.preventDefault()
                let id = parseInt(botao.getAttribute("data-id"))
                let produto = buscaProduto(id, produtos)

                let quantidadedeProduto = parseInt(document.querySelector(`#produto${id} .quantidadeProduto`).value)
                if (quantidadedeProduto > 0) {
                    if (carrinho.itensDoCarrinho.length > 0) {
                        let produtoComMesmoId = carrinho.itensDoCarrinho.find(itemDoCarrinho => itemDoCarrinho.id === produto.id)

                        if (produtoComMesmoId) {
                            produtoComMesmoId.quantidade += quantidadedeProduto
                            produtoComMesmoId.total = produtoComMesmoId.preco * produtoComMesmoId.quantidade
                            atualizarLinhaNoCarrinho(produtoComMesmoId)
                        } else {
                            produto = carrinho.adicionarProdutoCarrinho({ ...produto, quantidade: quantidadedeProduto, total: quantidadedeProduto * produto.preco })
                            criarLinhaNoCarrinho(produto)
                        }
                    } else {
                        produto = carrinho.adicionarProdutoCarrinho({ ...produto, quantidade: quantidadedeProduto, total: quantidadedeProduto * produto.preco })
                        criarLinhaNoCarrinho(produto)
                    }
                    atualizarValorTotal()
                } else {
                    alert(`Por favor preencha uma quantidade valida do produto ${produto.nome}`)
                }

            })
        })
    }

    function buscaProduto(id, produtos) {
        return produtos.find(produto => {
            return produto.id === id
        })
    }

    //Chamando a API
    window.onload = function () {

        axios.get("http://localhost:3000/produtos")
            .then(({ data }) => {

                criarCard(data)
                adicionarEventoNosBotoesDosCards(data)
                // Aqui ele deverá carregar os produtos no carrinho se tiver itens (carregaProdutosCarrinho())

            })
    }
