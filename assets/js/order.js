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

function takeOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const selectedBurgers = getRandomBurgers(3);
            const orderlist = document.querySelector("#order-list ul");
            selectedBurgers.forEach((item) => {
                const li = document.createElement("li");
                li.classList.add("order-box");
                li.textContent = item;
                orderlist.appendChild(li);
            })
            resolve({ order: selectedBurgers });
        }, 2500);
    });
}
function getRandomBurgers(count) {
    const burgers = foodItems.burgers;
    const selected = [];
    while (selected.length < count) {
        const randomIndex = Math.floor(Math.random() * burgers.length);
        const burger = burgers[randomIndex];
        if (!selected.includes(burger)) selected.push(burger);
    }
    return selected;
}

function orderPrep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            document.getElementById("Orders").querySelector("h1").textContent = "Order is prepared";
            document.getElementById("statusmessage").style.display = "none";
            resolve({ order_status: true, paid: false });
        }, 1500);
    });
}
function payOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            document.getElementById("Orders").querySelector("h1").textContent = "Order is paid";
            resolve({ order_status: true, paid: true });
        }, 1000);
    });
}

function thankyouFnc() {
    setTimeout(() => {
        alert("Thank you for eating with us today!");
    }, 0);
}

async function startOrder() {
    try {
        document.getElementById("startorderBtn").style.display = "none";
        document.getElementById("Orders").style.display = "block";

        const order = await takeOrder();
        document.getElementById("Orders").style.display = "none";
        document.getElementById("order-list").style.display = "block";
        console.log("Order taken:", order);

        const prepStatus = await orderPrep();
        document.getElementById("Orders").style.display = "block";
        document.getElementById("order-list").style.display = "none";
        console.log("Order prepared:", prepStatus);

        const paymentStatus = await payOrder();
        console.log("Order paid:", paymentStatus);

        if (paymentStatus.paid) {
            thankyouFnc();
        }
    } catch (error) {
        console.error("Error in order process:", error);
        alert("Something went wrong. Please try again.");
    }
}

document.getElementById("startorderBtn").addEventListener('click', () => {
    startOrder();
})