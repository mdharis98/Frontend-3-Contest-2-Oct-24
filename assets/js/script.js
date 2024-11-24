const foodItems = {
    burgers: [
        "Classic Burger",
        "Cheese Burger",
        "Bacon Burger",
        "Veggie Burger",
        "Chicken Burger",
        "Mushroom Burger"
    ]
};

const getMenu = async () => {
    try {
        const res = await fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json");
        const data = await res.json();
        const newHTML = data.map((menu, index) => {
            return `
                <div class="col-4" key='${index}'>
                    <div class="product-box">
                        <div class="product-image">
                            <img src="${menu.imgSrc}" alt="food"/>
                        </div>
                        <div class="product-details">
                            <div class="product-content">
                                <h4 class="product-name">${menu.name}</h4>
                                <span class="price">$${menu.price}/-</span>
                            </div>
                            <button class="product-btn">
                                <img src="assets/images/plus.png" alt="plus">
                            </button>
                        </div>
                    </div>
                </div>
            `
        }).join("");
        document.getElementById("products-section").innerHTML = newHTML;
    } catch (error) {
        console.log(error);
        alert("Failed to load menu. Please try again later.");
    }
}

const getRandomBurgers = (count) =>  {
    const burgers = foodItems.burgers;
    const selected = [];
    while (selected.length < count) {
        const randomIndex = Math.floor(Math.random() * burgers.length);
        const burger = burgers[randomIndex];
        if (!selected.includes(burger)) selected.push(burger);
    }
    return selected;
}

function takeOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const selectedBurgers = getRandomBurgers(3);
            resolve({ order: selectedBurgers });
        }, 2500);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    getMenu();
})