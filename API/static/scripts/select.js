'use strict';

/***************************************************************************************************************************************
 * A CHANGER
 * 
 * - L'appel du lien dans fetch(xxxx) n'est pas bon. Il faut le rendre dynamique avec les autres queryselector pour CHAQUE onchange ;
 * - Gérer la partie du div_input_criteres ;
 * - Changer la déclaration de variable à CHAQUE début de onchange.
 * 
 ***************************************************************************************************************************************/

const select_famille =  document.querySelector(".famille");
const select_type_marche = document.querySelector(".type_marche");
const select_nature_categorise_libelle = document.querySelector(".nature_categorise_libelle");
const select_etat = document.querySelector(".etat");
const select_descripteur_libelle = document.querySelector(".descripteur_libelle");
const select_famille_libelle = document.querySelector(".famille_libelle");
const select_perimetre = document.querySelector(".perimetre");
const select_procedure_categorise = document.querySelector(".procedure_categorise");

const div_input_criteres = document.querySelector(".div_input_criteres");

const input_code_departement = document.querySelector(".code_departement");

select_famille.onchange = function () {
    let famille = select_famille.value;

    fetch('/search/' + famille + "/None/None/None/None/None/None/None/None/None").then(function (response) {
        response.json().then(function (data) {
            let optionHTML = '';
            
            for (const [type_marche,nb] of Object.entries(data.type_marche)) {
                optionHTML += '<option value="' + type_marche + '">' + type_marche + '</option>';
            }

            select_type_marche.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [nature_categorise_libelle,nb] of Object.entries(data.nature_categorise_libelle)) {
                optionHTML += '<option value="' + nature_categorise_libelle + '">' + nature_categorise_libelle + '</option>';
            }

            select_nature_categorise_libelle.innerHTML = optionHTML;

            optionHTML = '';

            optionHTML += '<datalist class="code_departement_list" id="departements">';
            
            for (const [code_departement,nb] of Object.entries(data.code_departement)) {
                optionHTML += '<option value="' + code_departement + '">';
            }

            optionHTML += '</datalist>';

            input_code_departement.setAttribute('list',optionHTML);

            optionHTML = '';
            
            for (const [etat,nb] of Object.entries(data.etat)) {
                optionHTML += '<option value="' + etat + '">' + etat + '</option>';
            }

            select_etat.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [descripteur_libelle,nb] of Object.entries(data.descripteur_libelle)) {
                optionHTML += '<option value="' + descripteur_libelle + '">' + descripteur_libelle + '</option>';
            }

            select_descripteur_libelle.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [famille_libelle,nb] of Object.entries(data.famille_libelle)) {
                optionHTML += '<option value="' + famille_libelle + '">' + famille_libelle + '</option>';
            }

            select_famille_libelle.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [perimetre,nb] of Object.entries(data.perimetre)) {
                optionHTML += '<option value="' + perimetre + '">' + perimetre + '</option>';
            }

            select_perimetre.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [procedure_categorise,nb] of Object.entries(data.procedure_categorise)) {
                optionHTML += '<option value="' + procedure_categorise + '">' + procedure_categorise + '</option>';
            }

            select_procedure_categorise.innerHTML = optionHTML;
        });
    });
}

select_descripteur_libelle.onchange = function () {
    let famille = select_famille.value;

    fetch('/search/' + famille + "/None/None/None/None/None/None/None/None/None").then(function (response) {
        response.json().then(function (data) {
            let optionHTML = '';
            
            for (const [famille,nb] of Object.entries(data.famille)) {
                optionHTML += '<option value="' + famille + '">' + famille + '</option>';
            }

            select_famille.innerHTML = optionHTML;

            optionHTML = '';

            for (const [type_marche,nb] of Object.entries(data.type_marche)) {
                optionHTML += '<option value="' + type_marche + '">' + type_marche + '</option>';
            }

            select_type_marche.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [nature_categorise_libelle,nb] of Object.entries(data.nature_categorise_libelle)) {
                optionHTML += '<option value="' + nature_categorise_libelle + '">' + nature_categorise_libelle + '</option>';
            }

            select_nature_categorise_libelle.innerHTML = optionHTML;

            optionHTML = '';

            optionHTML += '<datalist class="code_departement_list" id="departements">';
            
            for (const [code_departement,nb] of Object.entries(data.code_departement)) {
                optionHTML += '<option value="' + code_departement + '">';
            }

            optionHTML += '</datalist>';

            input_code_departement.setAttribute('list',optionHTML);

            optionHTML = '';
            
            for (const [etat,nb] of Object.entries(data.etat)) {
                optionHTML += '<option value="' + etat + '">' + etat + '</option>';
            }

            select_etat.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [famille_libelle,nb] of Object.entries(data.famille_libelle)) {
                optionHTML += '<option value="' + famille_libelle + '">' + famille_libelle + '</option>';
            }

            select_famille_libelle.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [perimetre,nb] of Object.entries(data.perimetre)) {
                optionHTML += '<option value="' + perimetre + '">' + perimetre + '</option>';
            }

            select_perimetre.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [procedure_categorise,nb] of Object.entries(data.procedure_categorise)) {
                optionHTML += '<option value="' + procedure_categorise + '">' + procedure_categorise + '</option>';
            }

            select_procedure_categorise.innerHTML = optionHTML;
        });
    });
}

select_etat.onchange = function () {
    let famille = select_famille.value;

    fetch('/search/' + famille + "/None/None/None/None/None/None/None/None/None").then(function (response) {
        response.json().then(function (data) {
            let optionHTML = '';

            for (const [famille,nb] of Object.entries(data.famille)) {
                optionHTML += '<option value="' + famille + '">' + famille + '</option>';
            }

            select_famille.innerHTML = optionHTML;

            optionHTML = '';
            for (const [type_marche,nb] of Object.entries(data.type_marche)) {
                optionHTML += '<option value="' + type_marche + '">' + type_marche + '</option>';
            }

            select_type_marche.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [nature_categorise_libelle,nb] of Object.entries(data.nature_categorise_libelle)) {
                optionHTML += '<option value="' + nature_categorise_libelle + '">' + nature_categorise_libelle + '</option>';
            }

            select_nature_categorise_libelle.innerHTML = optionHTML;

            optionHTML = '';

            optionHTML += '<datalist class="code_departement_list" id="departements">';
            
            for (const [code_departement,nb] of Object.entries(data.code_departement)) {
                optionHTML += '<option value="' + code_departement + '">';
            }

            optionHTML += '</datalist>';

            input_code_departement.setAttribute('list',optionHTML);

            optionHTML = '';
            
            for (const [descripteur_libelle,nb] of Object.entries(data.descripteur_libelle)) {
                optionHTML += '<option value="' + descripteur_libelle + '">' + descripteur_libelle + '</option>';
            }

            select_descripteur_libelle.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [famille_libelle,nb] of Object.entries(data.famille_libelle)) {
                optionHTML += '<option value="' + famille_libelle + '">' + famille_libelle + '</option>';
            }

            select_famille_libelle.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [perimetre,nb] of Object.entries(data.perimetre)) {
                optionHTML += '<option value="' + perimetre + '">' + perimetre + '</option>';
            }

            select_perimetre.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [procedure_categorise,nb] of Object.entries(data.procedure_categorise)) {
                optionHTML += '<option value="' + procedure_categorise + '">' + procedure_categorise + '</option>';
            }

            select_procedure_categorise.innerHTML = optionHTML;
        });
    });
}

select_famille_libelle.onchange = function () {
    let famille = select_famille.value;

    fetch('/search/' + famille + "/None/None/None/None/None/None/None/None/None").then(function (response) {
        response.json().then(function (data) {
            let optionHTML = '';
            
            for (const [famille,nb] of Object.entries(data.famille)) {
                optionHTML += '<option value="' + famille + '">' + famille + '</option>';
            }

            select_famille.innerHTML = optionHTML;

            optionHTML = '';

            for (const [type_marche,nb] of Object.entries(data.type_marche)) {
                optionHTML += '<option value="' + type_marche + '">' + type_marche + '</option>';
            }

            select_type_marche.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [nature_categorise_libelle,nb] of Object.entries(data.nature_categorise_libelle)) {
                optionHTML += '<option value="' + nature_categorise_libelle + '">' + nature_categorise_libelle + '</option>';
            }

            select_nature_categorise_libelle.innerHTML = optionHTML;

            optionHTML = '';

            optionHTML += '<datalist class="code_departement_list" id="departements">';
            
            for (const [code_departement,nb] of Object.entries(data.code_departement)) {
                optionHTML += '<option value="' + code_departement + '">';
            }

            optionHTML += '</datalist>';

            input_code_departement.setAttribute('list',optionHTML);

            optionHTML = '';
            
            for (const [etat,nb] of Object.entries(data.etat)) {
                optionHTML += '<option value="' + etat + '">' + etat + '</option>';
            }

            select_etat.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [descripteur_libelle,nb] of Object.entries(data.descripteur_libelle)) {
                optionHTML += '<option value="' + descripteur_libelle + '">' + descripteur_libelle + '</option>';
            }

            select_descripteur_libelle.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [perimetre,nb] of Object.entries(data.perimetre)) {
                optionHTML += '<option value="' + perimetre + '">' + perimetre + '</option>';
            }

            select_perimetre.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [procedure_categorise,nb] of Object.entries(data.procedure_categorise)) {
                optionHTML += '<option value="' + procedure_categorise + '">' + procedure_categorise + '</option>';
            }

            select_procedure_categorise.innerHTML = optionHTML;
        });
    });
}

select_nature_categorise_libelle.onchange = function () {
    let famille = select_famille.value;

    fetch('/search/' + famille + "/None/None/None/None/None/None/None/None/None").then(function (response) {
        response.json().then(function (data) {
            let optionHTML = '';
            
            for (const [famille,nb] of Object.entries(data.famille)) {
                optionHTML += '<option value="' + famille + '">' + famille + '</option>';
            }

            select_famille.innerHTML = optionHTML;

            optionHTML = '';

            for (const [type_marche,nb] of Object.entries(data.type_marche)) {
                optionHTML += '<option value="' + type_marche + '">' + type_marche + '</option>';
            }

            select_type_marche.innerHTML = optionHTML;

            optionHTML = '';

            optionHTML += '<datalist class="code_departement_list" id="departements">';
            
            for (const [code_departement,nb] of Object.entries(data.code_departement)) {
                optionHTML += '<option value="' + code_departement + '">';
            }

            optionHTML += '</datalist>';

            input_code_departement.setAttribute('list',optionHTML);

            optionHTML = '';
            
            for (const [etat,nb] of Object.entries(data.etat)) {
                optionHTML += '<option value="' + etat + '">' + etat + '</option>';
            }

            select_etat.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [descripteur_libelle,nb] of Object.entries(data.descripteur_libelle)) {
                optionHTML += '<option value="' + descripteur_libelle + '">' + descripteur_libelle + '</option>';
            }

            select_descripteur_libelle.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [famille_libelle,nb] of Object.entries(data.famille_libelle)) {
                optionHTML += '<option value="' + famille_libelle + '">' + famille_libelle + '</option>';
            }

            select_famille_libelle.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [perimetre,nb] of Object.entries(data.perimetre)) {
                optionHTML += '<option value="' + perimetre + '">' + perimetre + '</option>';
            }

            select_perimetre.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [procedure_categorise,nb] of Object.entries(data.procedure_categorise)) {
                optionHTML += '<option value="' + procedure_categorise + '">' + procedure_categorise + '</option>';
            }

            select_procedure_categorise.innerHTML = optionHTML;
        });
    });
}

select_perimetre.onchange = function () {
    let famille = select_famille.value;

    fetch('/search/' + famille + "/None/None/None/None/None/None/None/None/None").then(function (response) {
        response.json().then(function (data) {
            let optionHTML = '';

            for (const [famille,nb] of Object.entries(data.famille)) {
                optionHTML += '<option value="' + famille + '">' + famille + '</option>';
            }
        
            select_famille.innerHTML = optionHTML;
        
            optionHTML = '';
            
            for (const [type_marche,nb] of Object.entries(data.type_marche)) {
                optionHTML += '<option value="' + type_marche + '">' + type_marche + '</option>';
            }

            select_type_marche.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [nature_categorise_libelle,nb] of Object.entries(data.nature_categorise_libelle)) {
                optionHTML += '<option value="' + nature_categorise_libelle + '">' + nature_categorise_libelle + '</option>';
            }

            select_nature_categorise_libelle.innerHTML = optionHTML;

            optionHTML = '';

            optionHTML += '<datalist class="code_departement_list" id="departements">';
            
            for (const [code_departement,nb] of Object.entries(data.code_departement)) {
                optionHTML += '<option value="' + code_departement + '">';
            }

            optionHTML += '</datalist>';

            input_code_departement.setAttribute('list',optionHTML);

            optionHTML = '';
            
            for (const [etat,nb] of Object.entries(data.etat)) {
                optionHTML += '<option value="' + etat + '">' + etat + '</option>';
            }

            select_etat.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [descripteur_libelle,nb] of Object.entries(data.descripteur_libelle)) {
                optionHTML += '<option value="' + descripteur_libelle + '">' + descripteur_libelle + '</option>';
            }

            select_descripteur_libelle.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [famille_libelle,nb] of Object.entries(data.famille_libelle)) {
                optionHTML += '<option value="' + famille_libelle + '">' + famille_libelle + '</option>';
            }

            select_famille_libelle.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [procedure_categorise,nb] of Object.entries(data.procedure_categorise)) {
                optionHTML += '<option value="' + procedure_categorise + '">' + procedure_categorise + '</option>';
            }

            select_procedure_categorise.innerHTML = optionHTML;
        });
    });
}

select_procedure_categorise.onchange = function () {
    let famille = select_famille.value;

    fetch('/search/' + famille + "/None/None/None/None/None/None/None/None/None").then(function (response) {
        response.json().then(function (data) {
            let optionHTML = '';

            for (const [famille,nb] of Object.entries(data.famille)) {
                optionHTML += '<option value="' + famille + '">' + famille + '</option>';
            }
        
            select_famille.innerHTML = optionHTML;
        
            optionHTML = '';
            
            for (const [type_marche,nb] of Object.entries(data.type_marche)) {
                optionHTML += '<option value="' + type_marche + '">' + type_marche + '</option>';
            }

            select_type_marche.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [nature_categorise_libelle,nb] of Object.entries(data.nature_categorise_libelle)) {
                optionHTML += '<option value="' + nature_categorise_libelle + '">' + nature_categorise_libelle + '</option>';
            }

            select_nature_categorise_libelle.innerHTML = optionHTML;

            optionHTML = '';

            optionHTML += '<datalist class="code_departement_list" id="departements">';
            
            for (const [code_departement,nb] of Object.entries(data.code_departement)) {
                optionHTML += '<option value="' + code_departement + '">';
            }

            optionHTML += '</datalist>';

            input_code_departement.setAttribute('list',optionHTML);

            optionHTML = '';
            
            for (const [etat,nb] of Object.entries(data.etat)) {
                optionHTML += '<option value="' + etat + '">' + etat + '</option>';
            }

            select_etat.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [descripteur_libelle,nb] of Object.entries(data.descripteur_libelle)) {
                optionHTML += '<option value="' + descripteur_libelle + '">' + descripteur_libelle + '</option>';
            }

            select_descripteur_libelle.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [famille_libelle,nb] of Object.entries(data.famille_libelle)) {
                optionHTML += '<option value="' + famille_libelle + '">' + famille_libelle + '</option>';
            }

            select_famille_libelle.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [perimetre,nb] of Object.entries(data.perimetre)) {
                optionHTML += '<option value="' + perimetre + '">' + perimetre + '</option>';
            }

            select_perimetre.innerHTML = optionHTML;
        });
    });
}

select_type_marche.onchange = function () {
    let new_type_marche = select_type_marche.value;

    fetch('/search/' + new_type_marche + "/None/None/None/None/None/None/None/None/None").then(function (response) {
        response.json().then(function (data) {
            let optionHTML = '';

            for (const [famille,nb] of Object.entries(data.famille)) {
                optionHTML += '<option value="' + famille + '">' + famille + '</option>';
            }
        
            select_famille.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [nature_categorise_libelle,nb] of Object.entries(data.nature_categorise_libelle)) {
                optionHTML += '<option value="' + nature_categorise_libelle + '">' + nature_categorise_libelle + '</option>';
            }

            select_nature_categorise_libelle.innerHTML = optionHTML;

            optionHTML = '';

            optionHTML += '<datalist class="code_departement_list" id="departements">';
            
            for (const [code_departement,nb] of Object.entries(data.code_departement)) {
                optionHTML += '<option value="' + code_departement + '">';
            }

            optionHTML += '</datalist>';

            input_code_departement.setAttribute('list',optionHTML);

            optionHTML = '';
            
            for (const [etat,nb] of Object.entries(data.etat)) {
                optionHTML += '<option value="' + etat + '">' + etat + '</option>';
            }

            select_etat.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [descripteur_libelle,nb] of Object.entries(data.descripteur_libelle)) {
                optionHTML += '<option value="' + descripteur_libelle + '">' + descripteur_libelle + '</option>';
            }

            select_descripteur_libelle.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [famille_libelle,nb] of Object.entries(data.famille_libelle)) {
                optionHTML += '<option value="' + famille_libelle + '">' + famille_libelle + '</option>';
            }

            select_famille_libelle.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [perimetre,nb] of Object.entries(data.perimetre)) {
                optionHTML += '<option value="' + perimetre + '">' + perimetre + '</option>';
            }

            select_perimetre.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [procedure_categorise,nb] of Object.entries(data.procedure_categorise)) {
                optionHTML += '<option value="' + procedure_categorise + '">' + procedure_categorise + '</option>';
            }

            select_procedure_categorise.innerHTML = optionHTML;
        });
    });
}

div_input_criteres.onchange = function () {
    let new_criteres = div_input_criteres.value;

    fetch('/search/' + famille + "/None/None/None/None/None/None/None/None/None").then(function (response) {
        response.json().then(function (data) {
            let optionHTML = '';

            for (const [famille,nb] of Object.entries(data.famille)) {
                optionHTML += '<option value="' + famille + '">' + famille + '</option>';
            }
        
            select_famille.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [type_marche,nb] of Object.entries(data.type_marche)) {
                optionHTML += '<option value="' + type_marche + '">' + type_marche + '</option>';
            }

            select_type_marche.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [nature_categorise_libelle,nb] of Object.entries(data.nature_categorise_libelle)) {
                optionHTML += '<option value="' + nature_categorise_libelle + '">' + nature_categorise_libelle + '</option>';
            }

            select_nature_categorise_libelle.innerHTML = optionHTML;

            optionHTML = '';

            optionHTML += '<datalist class="code_departement_list" id="departements">';
            
            for (const [code_departement,nb] of Object.entries(data.code_departement)) {
                optionHTML += '<option value="' + code_departement + '">';
            }

            optionHTML += '</datalist>';

            input_code_departement.setAttribute('list',optionHTML);

            optionHTML = '';
            
            for (const [etat,nb] of Object.entries(data.etat)) {
                optionHTML += '<option value="' + etat + '">' + etat + '</option>';
            }

            select_etat.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [descripteur_libelle,nb] of Object.entries(data.descripteur_libelle)) {
                optionHTML += '<option value="' + descripteur_libelle + '">' + descripteur_libelle + '</option>';
            }

            select_descripteur_libelle.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [famille_libelle,nb] of Object.entries(data.famille_libelle)) {
                optionHTML += '<option value="' + famille_libelle + '">' + famille_libelle + '</option>';
            }

            select_famille_libelle.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [perimetre,nb] of Object.entries(data.perimetre)) {
                optionHTML += '<option value="' + perimetre + '">' + perimetre + '</option>';
            }

            select_perimetre.innerHTML = optionHTML;

            optionHTML = '';
            
            for (const [procedure_categorise,nb] of Object.entries(data.procedure_categorise)) {
                optionHTML += '<option value="' + procedure_categorise + '">' + procedure_categorise + '</option>';
            }

            select_procedure_categorise.innerHTML = optionHTML;
        });
    });
}