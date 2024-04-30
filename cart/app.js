let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];
let modal = document.querySelector("dialog");
let buttonClose = document.querySelector("dialog button");
let newProducts = []; // Adicione um array para armazenar os novos produtos

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

const addDataToHTML = () => {
    // remove datas default from HTML

    // add new datas
    if (products.length > 0) // if has data
    {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item1');
            newProduct.innerHTML =
                `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="color">
                    <p><span>Cor: ${product.cor}</p>
                    <div class="cor-selector" style="background-color: ${product.corHexa}"></div>
                    
                </div>`
                
                if (product.variant) {
                    newProduct.innerHTML += `
                        <div class="variente">
                            <div class="selected">7 KG</div>
                            <p>8 KG</p>
                        </div>
                    `;
                }
                
                newProduct.innerHTML += `
                    <div class="price">$${product.price}</div>
                    <button class="addCart">Comprar</button>
                `;
            listProductHTML.appendChild(newProduct);
        });
    }
};
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
        modal.showModal(); // Exibir o modal ao adicionar um produto
        alert("Produto adicionado ao carrinho");
    }
});
const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if (cart.length <= 0) {
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    } else if (positionThisProductInCart < 0) {
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML(newProducts); // Passa newProducts como argumento
    addCartToMemory();
};
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};
const addCartToHTML = (newProducts) => { // Recebe newProducts como parâmetro
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if (cart.length > 0) {
        cart.forEach(item => {
            totalQuantity += item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item1');
            newItem.dataset.id = item.product_id;

            let info = products.find((value) => value.id == item.product_id);
            if (!info) {
                // Se o produto não for encontrado em products, procuramos nos novos produtos
                info = newProducts.find((value) => value.id == item.product_id);
            }

            if (info) {
                listCartHTML.appendChild(newItem);
                newItem.innerHTML = `
                    <div class="image">
                        <img src="${info.image}">
                    </div>
                    <div class="name">
                        ${info.name}
                    </div>
                    <div class="totalPrice">$${info.price * item.quantity}</div>
                    <div class="quantity">
                        <span class="minus"><</span>
                        <span>${item.quantity}</span>
                        <span class="plus">></span>
                    </div>
                `;
            } else {
                console.error('Produto não encontrado:', item.product_id);
            }
        });
    }
    iconCartSpan.innerText = totalQuantity;
};


listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if (positionClick.classList.contains('plus')) {
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
});
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;

            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                } else {
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML(newProducts); // Passa newProducts como argumento
    addCartToMemory();
};

const initApp = () => {
    // get data product
    fetch('../cart/products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            addDataToHTML();

            // get data cart from memory
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML(newProducts); // Passa newProducts como argumento
            }
        });

    // Chame a função para renderizar os novos produtos e passe newProducts como argumento
    fetch('../cart/new_products.json')
        .then(response => response.json())
        .then(data => {
            newProducts = data;
            renderNewProducts(newProducts);
        })
        .catch(error => {
            console.error('Erro ao carregar os novos produtos:', error);
        });
};

buttonClose.onclick = function () {
    modal.close();
};

// Adicione uma nova variável para o contêiner dos novos produtos
let newProductContainer = document.querySelector('.newProductContainer');

// Função para renderizar os novos produtos
const renderNewProducts = (newProducts) => { // Recebe newProducts como parâmetro
    let html = ''; // String HTML para armazenar a marcação dos novos produtos
            
    // Iterar sobre os novos produtos e criar a marcação HTML para cada um
    if (product.selected) {
        newProduct.innerHTML += `<div class="selected">256 GB</div>`;
    }
    newProducts.forEach(product => {
        console.log(product); // Adicione esta linha para verificar o objeto product
        html += `
            <div class="item1" data-id="${product.id}">
                <img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Adicionar</button>
            </div>
        `;
    });

    // Inserir a string HTML com os novos produtos no contêiner dos novos produtos
    newProductContainer.innerHTML = html;

    // Adicionar event listener para os botões "Comprar" dos novos produtos
    const newAddCartButtons = document.querySelectorAll('.newProductContainer .addCart');
    newAddCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id_product = button.parentElement.dataset.id;
            addToCart(id_product);
            modal.showModal(); // Exibir o modal ao adicionar um produto
            alert("Produto adicionado ao carrinho");
        });
    });
};

// Chame a função para inicializar a aplicação
initApp();
