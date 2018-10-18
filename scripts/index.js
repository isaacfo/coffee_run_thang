// ======================================================
// DOM Selection
// ======================================================
const orderForm = document.querySelector('[data-form]');

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
    const url = event.target.action;
    const method = event.target.method;
    const elements = event.target.elements;
    const data = { strength: elements.strength.value,
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
    .then(console.log)
    }


// ======================================================
// Main Event Listeners
// ======================================================
orderForm.addEventListener('submit', handleSubmit);
