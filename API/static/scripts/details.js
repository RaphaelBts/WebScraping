'use strict'

const button_detail = document.querySelector("#button_details");
const inner_div = document.querySelector(".inner_div_result");
const inner_div_details = document.querySelector("#div_details");

if (button_detail !== null) {
    button_detail.addEventListener('click', (event) => {
        let predictions = event.target.value;

        predictions = JSON.parse(predictions);

        if (button_detail.innerHTML == "Details") {

            for (let [nb,detail] of Object.entries(predictions["details"]) ) {

                let template = document.createElement("p");
                template.innerHTML = '';
                for (let [nb_bis,detail_bis] of Object.entries(detail)) {
                    template.innerHTML += detail_bis + ' ';
                }

                let corresponding = document.querySelector('.main_'+nb).offsetHeight;

                template.style.height = corresponding + "px";

                inner_div_details.appendChild(template);
            }

            button_detail.innerHTML = "Hide details";
        } else {
            div_details.innerHTML="";
            button_detail.innerHTML = "Details";
        };
    });
};