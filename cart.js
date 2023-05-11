let labell = document.getElementById("label");
let Shoppingcart = document.getElementById("shopping-cart");
let basket = JSON.parse(localStorage.getItem("data"))|| [] ;
let calculation = () => {
    let carticon = document.getElementById("cartamount");
    carticon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}
calculation();


let generatecartitems = () => {
    if(basket.length !== 0){
        return Shoppingcart.innerHTML = basket.map((x) => {
            let {id, item} = x;
            let search =  shopItemsData.find((c)=> c.id === id) || [];
            let {img,name,price} = search
            return `
            <div class="homecartitems">
              <img width="150" src=${img} alt="">
              <div class="detail">
                 <div class="titile-price-x"><h4 class="title-price"><p class="manes">${name}</p><p class="pricecart">&#8377 ${search.price}</p></h4><i onclick="removeitem(${id})" class="bi bi-trash3"></i></div>
                 <div class="nono"><div class="buttons">
                   <i onclick="increment(${id})" class="bi bi-plus-square"></i>
                   <div id=${id} class="quantity">${item}</div>
                   <i onclick="decrement(${id})" class="bi bi-dash-square"></i>
                </div></div>
                <h3 class="total">&#8377 ${item * search.price}</h3>
              </div>
              
            </div>`
        }).join("");
    }
    else{
        Shoppingcart.innerHTML = ``;
        labell.innerHTML = `
        <h2>Cart Is Empty</h2>
        <a href="index.html"><button class="home">Back to Home</button></a>`;
    }
};
generatecartitems();
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
    generatecartitems();
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
    generatecartitems();
    localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item
    calculation();
    totalamount();
};

let removeitem = (id)=>{
   let selecteditem = id;
   basket = basket.filter((x)=> x.id !== selecteditem.id);
   generatecartitems();
   totalamount();
   calculation();
   localStorage.setItem("data", JSON.stringify(basket));
};
let clearcart =(id) =>{
    basket = []
    generatecartitems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}

let totalamount =()=>{
    if(basket.length !==0){
        let amount =basket.map((x)=>{
            let {item, id} = x;
            let search =  shopItemsData.find((c)=> c.id === id) || [];
            return item * search.price;
        }).reduce((x,y)=> x+y, 0);
        labell.innerHTML = `<h2>Total Bill : &#8377 ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearcart()" class="remove">Clear Cart</button>`
    }
    else return;
}
totalamount();

