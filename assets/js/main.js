var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

let toBasketbtns = document.querySelectorAll(".social-info");

toBasketbtns.forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        addBasketItem(this);
        fillBasket();
    })
});

function addBasketItem(elem) {
    checkBasket();
    let basket = JSON.parse(localStorage.getItem("basket"));
    let basketItem = getBasketItem(elem);
    if (basket.find(b => b.id == basketItem.id) == undefined) {
        basket.push(basketItem);
    }
    else {
        basket.find(b => b.id == basketItem.id).count += 1;
    }
    localStorage.setItem("basket", JSON.stringify(basket))
}

function getBasketItem(elem) {
    return {
        id: elem.dataset.id,
        price: elem.parentElement.previousElementSibling.children[0].innerText,
        brand: elem.parentElement.previousElementSibling.previousElementSibling.children[1].innerText.toUpperCase(),
        img: elem.parentElement.previousElementSibling.previousElementSibling.children[0].src,
        count: 1
    }
}
function fillBasket() {
    checkBasket();
    let basketItems = JSON.parse(localStorage.getItem("basket"));
    let tablebody = document.getElementById("tablebody");
    tablebody.innerHTML = "";
    let itemCount = 0;
    basketItems.forEach(item => {
        itemCount += item.count;
        tablebody.innerHTML +=
            `<tr data-id = ${item.id}>
        <td>
            <img src="${item.img}" class = "img-size" alt="Sheep">
            </td>
            <td>${item.brand}</td>
            <td>${parseInt(item.price)}</td>
            <td><input type = "number" value = "${item.count}"/></td>
            <td class="total">${parseInt(item.price) * item.count} Azn</td>
            <td>
            <span class = "removebtn">X</span>
          </td>
        </tr>`;
        let pr = document.querySelectorAll(".total");
        document.querySelectorAll(".removebtn").forEach(x => {
            x.addEventListener("click", function () {
                this.parentElement.parentElement.remove();
                let basket = JSON.parse(localStorage.getItem("basket"));
                for (let i = 1; i < basket.length; i++) {
                    basket.splice(i, 1);
                }
                localStorage.setItem('basket', JSON.stringify(basket));
            })
        })
        sumPrice(pr);
    })

    document.querySelector(".badge").innerText = itemCount;

}



checkBasket();
fillBasket()

function sumPrice(elm) {

    let pric = document.querySelector(".pric");

    let t = 0;
    elm.forEach(x => {
        t += parseInt(x.innerHTML);
    })
    pric.innerText = `Total: ${t} Azn`;
}


function checkBasket() {
    if (!localStorage.getItem("basket")) {
        localStorage.setItem("basket", JSON.stringify([]))
    }
}


