'use strict'

const button_detail = document.querySelector("#button_details");
const inner_div = document.querySelector(".inner_div_result");
const inner_div_details = document.querySelector("#div_details");

if (button_detail !== null) {
    button_detail.addEventListener('click', (event) => {
        let predictions = event.target.value;

        predictions = JSON.parse(predictions);

        console.log(predictions);
        console.log(typeof(predictions));

        if (button_detail.innerHTML == "Details") {

            for (let [nb,detail] of Object.entries(predictions["details"]) ) {

                console.log(typeof(detail));

                let template = document.createElement("p");
                template.innerHTML = detail;
    
                inner_div_details.appendChild(template);
            }

            button_detail.innerHTML = "Hide details";
        } else {
            div_details.innerHTML="";
            button_detail.innerHTML = "Details";
        };
    });
};