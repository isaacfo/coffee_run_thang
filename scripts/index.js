
// =====================================================
// Constants
// =====================================================

const API_URL = 'https://dc-coffeerun.herokuapp.com/api/coffeeOrders';



// ======================================================
// DOM Selection
// ======================================================
const orderForm = document.querySelector('[data-form]');
const notificationArea = document.querySelector('[data-notification]')
const resetButton = document.querySelector('[data-reset-button');

const orderListingArea = document.querySelector('[data-order-area');
const orderListingButton = document.querySelector('[data-load-orders]');

// ======================================================
// Helper Functions
// ======================================================
function handleSubmit(event) {
    event.preventDefault();
    console.log('You get a coffee thang');

    console.log(event.target);
    // debugger;

    // we're gonna Ajax that mofo
    // call fetch()
    // pass it the URL
    // and an object with a method and a body
    // const url = event.target.action
    const url = API_URL;
    const method = event.target.method;
    const elements = event.target.elements;
    const data = { 
            strength: elements.strength.value,
            flavor: elements.strength.value,
            size: elements.strength.value,
            coffee: elements.strength.value, 
            emailAddress: elements.strength.value


    };
    fetch(url, {
        method: method,
        headers: {
            
                "Content-Type": "application/json; charset=utf-8",
                // "Content-Type": "application/x-www-form-urlencoded",
            
        },
        body: JSON.stringify(data)
    })
    .then(r => r.json())
    .then((orderInfo) => {

        // check the orderInfo for errors
        // && is a "falsey hunter"
        // It moves from left to rught, and will stop moving
        // when it finds the first falsey expression.
        if(orderInfo.name && (orderInfo.name === "ValidationError")) {
            notifyUser("I'm sorry. Please fill out the coffe field and the email address field.")
        }  else {
            notifyUser("The coffee is totaly (not) on its way!");
        }

    }) // gotta wrap it in an anonymous function

    
    }

function notifyUser(notificationText) {
    // creat a div
    const notificationBox = document.createElement('div');
    // add some text content
    notificationBox.textContent = notificationText;

    // Must check for the existence of a .firstChild
    // otherwise, the removeChild fucntion call will fail.
    // if (notificationArea.firstChild) {
    //      notificationArea.removeChild(notificationArea.firstChild);
    // }




    // notificationArea.removeChild(notificationArea.children[0]);
    notificationArea.innerHTML = "";

    // append to something, somewhere
    notificationArea.appendChild(notificationBox);
}

function confirmReset(e) {
    let doesWantToReset = confirm('Really?');
    if(!doesWantToReset) {
            e.preventDefault();
    }
}


// working with once coffee order
function convertOrderToElement(orderInfo) {
    // debugger;
    const orderElement = document.createElement('p')
    const orderText = `
    ${orderInfo.size} ${orderInfo.flavor} ${ orderInfo.coffee} for ${orderInfo.emailAddress}
    <br>
    (${orderInfo.strength})
    `;
    orderElement.innerHTML = orderText; 
    return orderElement;
}




// working with an array of coffee orders
function convertArrayOfOrdersToElements(giantOrderObject) {
    let orderArray = Object.values(giantOrderObject);
    let elementsArray = orderArray.map(convertOrderToElement);  
    return elementsArray;
}

function getAndShowOrders(event) {
    console.log('hey! a click!');
        // console.log(event);
        fetch(API_URL)
        .then(response => response.json())
        .then(convertArrayOfOrdersToElements)
        .then(elementsArray => {
                elementsArray.forEach(e => orderListingArea.appendChild(e))
        });
}



// ======================================================
// Main Event Listeners
// ======================================================
console.log('about to add event listener');
orderForm.addEventListener('submit', handleSubmit);
resetButton.addEventListener('click', confirmReset);
orderListingButton.addEventListener('click', getAndShowOrders);

