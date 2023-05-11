let shop = document.getElementById('shop');
let basket = JSON.parse(localStorage.getItem("data"))|| [] ;


let generateshop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let { id, name, price, desc, img } = x;
        let search = basket.find((x) => x.id === id) || [];
        return `
    <div class="item">
    <img width="200" class="image" src="${img}">
    <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-quantity">
            <h2>&#8377 ${price}</h2>
            <div class="buttons">
                <i onclick="increment(${id})" class="bi bi-plus-square"></i>
                <div id=${id} class="quantity">${search.item === undefined? 0: search.item}</div>
                <i onclick="decrement(${id})" class="bi bi-dash-square"></i>
            </div>
        </div>
    </div>
   </div>`
    }).join(""));
};
generateshop();

let increment = (id) => {
    let selectitem = id;
    let search = basket.find((x) => x.id === selectitem.id);
    if (search === undefined) {
        basket.push({
            id: selectitem.id,
            item: 1,
        });
    }
    else {
        search.item += 1;
    }
    //console.log(basket);
    update(selectitem.id);
    localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
    let selectitem = id;
    let search = basket.find((x) => x.id === selectitem.id);
    if(search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    update(selectitem.id);
    basket = basket.filter((x) => x.item !== 0);
    localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item
    calculation();
};

let calculation = () => {
    let carticon = document.getElementById("cartamount");
    carticon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}
calculation();
