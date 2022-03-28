'use strict';

/***************************************************************************************************************************************
 * A CHANGER
 * 
 * - Gérer la partie du div_input_criteres ;
 * - Tout mettre en select (sauf critères) ;
 * - Le css (wrap, main/detail) ;
 * - Les colonnes ;
 * - Plus de result avec des pages ;
 * - Serverless launching ;
 * - Renomer les champs ;
 * 
 * FAIT
 * 
 * - L'appel du lien dans fetch(xxxx) n'est pas bon. Il faut le rendre dynamique avec les autres queryselector pour CHAQUE onchange ;
 * - Changer la déclaration de variable à CHAQUE début de onchange.
 * - Les champs s'affichent comme il faut et se reset sur "Tout"
 * 
 ***************************************************************************************************************************************/

const select_famille =  document.querySelector(".famille");
const select_type_marche = document.querySelector(".type_marche");
const select_nature_categorise_libelle = document.querySelector(".nature_categorise_libelle");
const select_etat = document.querySelector(".etat");
const select_descripteur_libelle = document.querySelector("#descripteur_libelle");
const select_famille_libelle = document.querySelector("#famille_libelle");
const select_perimetre = document.querySelector("#perimetre");
const select_procedure_categorise = document.querySelector("#procedure_categorise");

const div_input_criteres = document.querySelector(".div_input_criteres");

const input_code_departement = document.querySelector(".code_departement");

// fetch order : famille criteres type_marche descripteur_libelle code_departement nature_categorise_libelle famille_libelle perimetre procedure_categorise etat
let to_fetch = ['None','None','None','None','None','None','None','None','None','None'];

const create_options = function (data,selector,selected) {

    let optionHTML = '';
    let selected_value = 'None';

    if (selector.value != 'Tout' && selector.value in data[selected]) {
        selected_value = selector.value;
        optionHTML += '<option value="' + selected_value + '">' + selected_value + '</option>';
    }
    
    optionHTML += '<option value="None">Tout</option>';
            
    for (const [sel,nb] of Object.entries(data[selected])) {
        if (sel !== selected_value) {
            optionHTML += '<option value="' + sel + '">' + sel + '</option>';
        }
    }

    selector.innerHTML = optionHTML;
}

select_famille.onchange = function () {
    let famille = select_famille.value;
    to_fetch[0] = famille;

    fetch('/search/' + to_fetch.join('/')).then(function (response) {
        response.json().then(function (data) {

            if (famille=='None') {
                create_options(data,select_famille,"famille");
            }

            create_options(data,select_type_marche,"type_marche");
            create_options(data,select_descripteur_libelle,"descripteur_libelle");
            create_options(data,select_nature_categorise_libelle,"nature_categorise_libelle");
            create_options(data,select_famille_libelle,"famille_libelle");
            create_options(data,select_perimetre,"perimetre");
            create_options(data,select_procedure_categorise,"procedure_categorise");
            create_options(data,select_etat,"etat");
        });
    });
}

select_descripteur_libelle.onchange = function () {
    let descripteur_libelle = select_descripteur_libelle.value;
    to_fetch[3] = descripteur_libelle;

    fetch('/search/' + famille + "/None/None/None/None/None/None/None/None/None").then(function (response) {
        response.json().then(function (data) {
            
            if (descripteur_libelle=='None') {
                create_options(data,select_descripteur_libelle,"descripteur_libelle");
            }

            create_options(data,select_famille,"famille");
            create_options(data,select_type_marche,"type_marche");
            create_options(data,select_nature_categorise_libelle,"nature_categorise_libelle");
            create_options(data,select_famille_libelle,"famille_libelle");
            create_options(data,select_perimetre,"perimetre");
            create_options(data,select_procedure_categorise,"procedure_categorise");
            create_options(data,select_etat,"etat");
        });
    });
}

select_etat.onchange = function () {
    let etat = select_etat.value;
    to_fetch[9] = etat;

    fetch('/search/' + famille + "/None/None/None/None/None/None/None/None/None").then(function (response) {
        response.json().then(function (data) {
            
            if (etat=='None') {
                create_options(data,select_etat,"etat");
            }

            create_options(data,select_famille,"famille");
            create_options(data,select_type_marche,"type_marche");
            create_options(data,select_descripteur_libelle,"descripteur_libelle");
            create_options(data,select_nature_categorise_libelle,"nature_categorise_libelle");
            create_options(data,select_famille_libelle,"famille_libelle");
            create_options(data,select_perimetre,"perimetre");
            create_options(data,select_procedure_categorise,"procedure_categorise");
        });
    });
}

select_famille_libelle.onchange = function () {
    let famille_libelle = select_famille_libelle.value;
    to_fetch[6] = famille_libelle;

    fetch('/search/' + famille + "/None/None/None/None/None/None/None/None/None").then(function (response) {
        response.json().then(function (data) {
            
            if (famille_libelle=='None') {
                create_options(data,select_famille_libelle,"famille_libelle");
            }

            create_options(data,select_famille,"famille");
            create_options(data,select_type_marche,"type_marche");
            create_options(data,select_descripteur_libelle,"descripteur_libelle");
            create_options(data,select_nature_categorise_libelle,"nature_categorise_libelle");
            create_options(data,select_perimetre,"perimetre");
            create_options(data,select_procedure_categorise,"procedure_categorise");
            create_options(data,select_etat,"etat");
        });
    });
}

select_nature_categorise_libelle.onchange = function () {
    let nature_categorise_libelle = select_nature_categorise_libelle.value;
    to_fetch[5] = nature_categorise_libelle;

    fetch("/search/" + to_fetch.join('/')).then(function (response) {
        response.json().then(function (data) {
            
            if (nature_categorise_libelle=='None') {
                create_options(data,select_nature_categorise_libelle,"nature_categorise_libelle");
            }

            create_options(data,select_famille,"famille");
            create_options(data,select_type_marche,"type_marche");
            create_options(data,select_descripteur_libelle,"descripteur_libelle");
            create_options(data,select_famille_libelle,"famille_libelle");
            create_options(data,select_perimetre,"perimetre");
            create_options(data,select_procedure_categorise,"procedure_categorise");
            create_options(data,select_etat,"etat");
        });
    });
}

select_perimetre.onchange = function () {
    let perimetre = select_perimetre.value;
    to_fetch[7] = perimetre;

    fetch("/search/" + to_fetch.join('/')).then(function (response) {
        response.json().then(function (data) {
            
            if (perimetre=='None') {
                create_options(data,select_perimetre,"perimetre");
            }

            create_options(data,select_famille,"famille");
            create_options(data,select_type_marche,"type_marche");
            create_options(data,select_descripteur_libelle,"descripteur_libelle");
            create_options(data,select_nature_categorise_libelle,"nature_categorise_libelle");
            create_options(data,select_famille_libelle,"famille_libelle");
            create_options(data,select_procedure_categorise,"procedure_categorise");
            create_options(data,select_etat,"etat");
        });
    });
}

select_procedure_categorise.onchange = function () {
    let procedure_categorise = select_procedure_categorise.value;
    to_fetch[8] = procedure_categorise;

    fetch("/search/" + to_fetch.join('/')).then(function (response) {
        response.json().then(function (data) {
            
            if (procedure_categorise=='None') {
                create_options(data,select_procedure_categorise,"procedure_categorise");
            }

            create_options(data,select_famille,"famille");
            create_options(data,select_type_marche,"type_marche");
            create_options(data,select_descripteur_libelle,"descripteur_libelle");
            create_options(data,select_nature_categorise_libelle,"nature_categorise_libelle");
            create_options(data,select_famille_libelle,"famille_libelle");
            create_options(data,select_perimetre,"perimetre");
            create_options(data,select_etat,"etat");
        });
    });
}

select_type_marche.onchange = function () {
    let new_type_marche = select_type_marche.value;
    to_fetch[2] = new_type_marche;

    fetch("/search/" + to_fetch.join('/')).then(function (response) {
        response.json().then(function (data) {
            
            if (new_type_marche=='None') {
                create_options(data,select_type_marche,"type_marche");
            }

            create_options(data,select_famille,"famille");
            create_options(data,select_descripteur_libelle,"descripteur_libelle");
            create_options(data,select_nature_categorise_libelle,"nature_categorise_libelle");
            create_options(data,select_famille_libelle,"famille_libelle");
            create_options(data,select_perimetre,"perimetre");
            create_options(data,select_procedure_categorise,"procedure_categorise");
            create_options(data,select_etat,"etat");
        });
    });
}

/*
div_input_criteres.onchange = function () {
    let new_criteres = div_input_criteres.value;

    fetch('/search/' + famille + "/None/None/None/None/None/None/None/None/None").then(function (response) {
        response.json().then(function (data) {
            let optionHTML = '<option value="None">Tout</option>';

            for (const [famille,nb] of Object.entries(data.famille)) {
                optionHTML += '<option value="' + famille + '">' + famille + '</option>';
            }
        
            select_famille.innerHTML = optionHTML;

            optionHTML = '<option value="None">Tout</option>';
            
            for (const [type_marche,nb] of Object.entries(data.type_marche)) {
                optionHTML += '<option value="' + type_marche + '">' + type_marche + '</option>';
            }

            select_type_marche.innerHTML = optionHTML;

            optionHTML = '<option value="None">Tout</option>';
            
            for (const [nature_categorise_libelle,nb] of Object.entries(data.nature_categorise_libelle)) {
                optionHTML += '<option value="' + nature_categorise_libelle + '">' + nature_categorise_libelle + '</option>';
            }

            select_nature_categorise_libelle.innerHTML = optionHTML;

            optionHTML = '<option value="None">Tout</option>';

            optionHTML += '<datalist class="code_departement_list" id="departements">';
            
            for (const [code_departement,nb] of Object.entries(data.code_departement)) {
                optionHTML += '<option value="' + code_departement + '">';
            }

            optionHTML += '</datalist>';

            input_code_departement.setAttribute('list',optionHTML);

            optionHTML = '<option value="None">Tout</option>';
            
            for (const [etat,nb] of Object.entries(data.etat)) {
                optionHTML += '<option value="' + etat + '">' + etat + '</option>';
            }

            select_etat.innerHTML = optionHTML;

            optionHTML = '<option value="None">Tout</option>';
            
            for (const [descripteur_libelle,nb] of Object.entries(data.descripteur_libelle)) {
                optionHTML += '<option value="' + descripteur_libelle + '">' + descripteur_libelle + '</option>';
            }

            select_descripteur_libelle.innerHTML = optionHTML;

            optionHTML = '<option value="None">Tout</option>';
            
            for (const [famille_libelle,nb] of Object.entries(data.famille_libelle)) {
                optionHTML += '<option value="' + famille_libelle + '">' + famille_libelle + '</option>';
            }

            select_famille_libelle.innerHTML = optionHTML;

            optionHTML = '<option value="None">Tout</option>';
            
            for (const [perimetre,nb] of Object.entries(data.perimetre)) {
                optionHTML += '<option value="' + perimetre + '">' + perimetre + '</option>';
            }

            select_perimetre.innerHTML = optionHTML;

            optionHTML = '<option value="None">Tout</option>';
            
            for (const [procedure_categorise,nb] of Object.entries(data.procedure_categorise)) {
                optionHTML += '<option value="' + procedure_categorise + '">' + procedure_categorise + '</option>';
            }

            select_procedure_categorise.innerHTML = optionHTML;
        });
    });
}*/

document.addEventListener('DOMContentLoaded', async () => {
    fetch("/search/" + to_fetch.join('/')).then(function (response) {
        response.json().then(function (data) {
            let optionHTML = '<option value="None">Tout</option>';

            for (const [famille,nb] of Object.entries(data.famille)) {
                optionHTML += '<option value="' + famille + '">' + famille + '</option>';
            }
        
            select_famille.innerHTML = optionHTML;

            optionHTML = '<option value="None">Tout</option>';
            
            for (const [type_marche,nb] of Object.entries(data.type_marche)) {
                optionHTML += '<option value="' + type_marche + '">' + type_marche + '</option>';
            }

            select_type_marche.innerHTML = optionHTML;

            optionHTML = '<option value="None">Tout</option>';
            
            for (const [nature_categorise_libelle,nb] of Object.entries(data.nature_categorise_libelle)) {
                optionHTML += '<option value="' + nature_categorise_libelle + '">' + nature_categorise_libelle + '</option>';
            }

            select_nature_categorise_libelle.innerHTML = optionHTML;

            optionHTML = '<option value="None">Tout</option>';

            optionHTML += '<datalist class="code_departement_list" id="departements">';
            
            for (const [code_departement,nb] of Object.entries(data.code_departement)) {
                optionHTML += '<option value="' + code_departement + '">';
            }

            optionHTML += '</datalist>';

            input_code_departement.setAttribute('list',optionHTML);

            optionHTML = '<option value="None">Tout</option>';
            
            for (const [etat,nb] of Object.entries(data.etat)) {
                optionHTML += '<option value="' + etat + '">' + etat + '</option>';
            }

            select_etat.innerHTML = optionHTML;

            optionHTML = '<option value="None">Tout</option>';
            
            for (const [descripteur_libelle,nb] of Object.entries(data.descripteur_libelle)) {
                optionHTML += '<option value="' + descripteur_libelle + '">' + descripteur_libelle + '</option>';
            }

            select_descripteur_libelle.innerHTML = optionHTML;

            optionHTML = '<option value="None">Tout</option>';
            
            for (const [famille_libelle,nb] of Object.entries(data.famille_libelle)) {
                optionHTML += '<option value="' + famille_libelle + '">' + famille_libelle + '</option>';
            }

            select_famille_libelle.innerHTML = optionHTML;

            optionHTML = '<option value="None">Tout</option>';
            
            for (const [perimetre,nb] of Object.entries(data.perimetre)) {
                optionHTML += '<option value="' + perimetre + '">' + perimetre + '</option>';
            }

            select_perimetre.innerHTML = optionHTML;

            optionHTML = '<option value="None">Tout</option>';
            
            for (const [procedure_categorise,nb] of Object.entries(data.procedure_categorise)) {
                optionHTML += '<option value="' + procedure_categorise + '">' + procedure_categorise + '</option>';
            }

            select_procedure_categorise.innerHTML = optionHTML;
        });
    });
});