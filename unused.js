







// ***************************** reveal filter form  *****************************


// const reveal = document.getElementById("buttonFilter");
// reveal.addEventListener("click", function() {
//     if (revealForm.style.display === "grid") {
//         revealForm.style.display = "none";
//     } else {
//         revealForm.style.display = "grid";
//         testFilter(); //!!
//     }  
// });









// ***************************** filter test  *****************************

const filterTest = document.getElementById("buttonFilterForm");
let htmlFormMain = []
function testFilter() {
    // const filterTest = document.getElementById("buttonFilterForm");
    let y = []
    fetch('https://getpantry.cloud/apiv1/pantry/6d0c08f2-b3ab-4481-a0ea-67ec5871db18/basket/setsNew')
            .then(function(response) {
                if (!response.ok) {
                    // throw Error(response.statusText);
                    throw alert("Error with API. Please refresh page and try again.");
                }
                return response.json()
                })                         
            .then(data => {
                for (const i of data.sets) {                    
                    y.push(i.theme)                                                       
                };
                const iterable = new Set(y)
                console.log(y)
                console.log(iterable)
                var fragment = new DocumentFragment();
                iterable.forEach((tag) => {
                    var input = document.createElement("input")
                    input.type = "checkbox";
                    // input.id = tag;
                    input.setAttribute("id", tag)
                    input.classList.add('btn')
                    fragment.appendChild(input);
                    var label = document.createElement("label")
                    label.for = tag;
                    label.textContent = tag;
                    fragment.appendChild(label);
                    
                })
                var button = document.createElement("input")
                button.type = "button";
                button.setAttribute("onclick", "submitFilter();")
                button.value = "Submit";
                fragment.appendChild(button);
                filterTest.appendChild(fragment)
            });    
};    




// ***************** submit filter form button / create sets ********************************


const revealForm = document.getElementById("buttonFilterForm")
function submitFilter() {
    document.getElementById("divSets").innerHTML = "";
    var listSelect = document.getElementsByTagName("input");
    console.log(listSelect);
    for (const z of listSelect) {        
        console.log(z.checked);
        if (z.checked === true) {
            console.log(z.id)            
            fetch('https://getpantry.cloud/apiv1/pantry/6d0c08f2-b3ab-4481-a0ea-67ec5871db18/basket/setsNew')
                .then(function(response) {
                    if (!response.ok) {                        
                        throw alert("Error with API. Please refresh page and try again.");
                    }
                    return response.json()
                    })                        
                .then(data => {
                    for (const i of data.sets) {
                        if (i.theme === z.id) {                                    
                            setTest(i)
                        }
                    }
                })
        }    
    }                                                                  
    revealForm.style.display = "none";                    
};