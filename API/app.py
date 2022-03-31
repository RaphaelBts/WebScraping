#import numpy as np
import pandas as pd
#import matplotlib.pyplot as plt

import requests
import json
import regex as re

import random as rd
from math import *
from datetime import datetime

from flask import Flask, jsonify,render_template,request

from request import request_boamp,display_result,field_actualized

app = Flask(__name__)

@app.context_processor
def inject_now():
    return dict(now=datetime.now())

@app.route("/")
def index():
    return render_template('index.html')

@app.errorhandler(404)
def error404(e):
    return render_template('error404.html')

# For the future ameliorated versions : NOT DEVELOPPED YET
# If we want to get a profitable business 
@app.route("/subscription")
def sub():
    return render_template('subsciption.html')

ask=[
        'mot','famille','criteres','type_marche','descripteur_libelle','code_departement','nature_categorise_libelle',
        'famille_libelle','perimetre','procedure_categorise','etat'
        ]

@app.route("/search/<famille>/<criteres>/<type_marche>/<descripteur_libelle>/<code_departement>/<nature_categorise_libelle>/<famille_libelle>/<perimetre>/<procedure_categorise>/<etat>")
def fetch_options(famille,criteres,type_marche,descripteur_libelle,code_departement,nature_categorise_libelle,famille_libelle,perimetre,procedure_categorise,etat):
    returned = field_actualized(famille,criteres,type_marche,descripteur_libelle,code_departement,nature_categorise_libelle,famille_libelle,perimetre,procedure_categorise,etat)

    return jsonify(returned)

@app.route("/search", methods=['GET','POST'])
def search():

    button = False

    if not 'new_prediction' in locals():
        new_prediction=''

    
    ask_type=['text','text','none', 'text','text','text','number','text','text','text','text','text','text']                              # Add type of the things to ask
    ask_select={
        'famille':['FNS','JOUE','MAP','DSP','DIVERS'],
        'type_marche':['TOUT','SERVICES','TRAVAUX','FOURNITURES'],
        'nature_categorise_libelle':['Avis de marché','Résultat de marché','Rectificatif','Avis informatif','Avis d\'intention de conclure','Modification','Autre','Periodique'],
        'etat':['INITIAL','RECTIFICATIF','RECTIFICANNUL','ANNULATION','MODIFICATION','INCONNU'],
        'descripteur_libelle':[],
        'code_departement':[],
        'famille_libelle':[],
        'perimetre':[],
        'procedure_categorise':[]
        }
    
    ask_checkbox={'criteres':["environnementaux","sociaux"]}

    new_data=pd.DataFrame(data=request.form, index=[0])

    for values in ask_checkbox.values():
        new_data.drop(values, axis=1, errors='ignore', inplace=True)

    if not new_data.empty:

        button = True

        for key in ask_checkbox.keys():
            new_data[key]=[[]]
            for a_c in ask_checkbox[key]:
                if request.form.get(a_c)=='on':
                    new_data[key][0].append(a_c)
        
        for key in ask_select.keys():
            new_data[key]=[request.form.get(key)]

        parameters={}
        for column in new_data.columns:
            if len(new_data[column])>0:
                if isinstance(new_data[column][0],list):
                    if len(new_data[column][0])==0:
                        parameters[column]=None
                    else:
                        parameters[column]=new_data[column][0][0]
                else:
                    parameters[column]=new_data[column][0]
            else:
                parameters[column]=None

        new_prediction=display_result(request_boamp(**parameters))                                                            # Add function to return offers.
        #new_prediction=retrieve("FNS","sociaux","SERVICES","Menuiserie")  -- to test
    return render_template('search.html', ask=ask, ask_type=ask_type, prediction=new_prediction, ask_select=ask_select, ask_checkbox=ask_checkbox, button_on = button)

""" Old retrieve functions
def retrieve(famille,criteres,type_marche,descripteur_libelle):
    infos={'dataset': "boamp", 
        'rows': 10,
        'sort': "dateparution",
        'facet':["famille","code_departement","famille_libelle","perimetre","procedure_categorise","nature_categorise_libelle","criteres,marche_public_simplifie","etat","descripteur_code","descripteur_libelle","type_marche","type_marche_facette","type_avis"],
        'refine.famille':famille,
        #'refine.famille_libelle':famille_libelle,
        'refine.criteres':criteres,
        'refine.type_marche':type_marche,
        'refine.descripteur_libelle':descripteur_libelle,   
        }
    final_response=requests.get('https://boamp-datadila.opendatasoft.com/api/records/1.0/search/?',params=infos).json()
    #print(final_response.json())
    return final_response
"""

""" Old retrieve function v2
def retrieve(mot,famille,code_departement,famille_libelle,perimetre,procedure_categorise,nature_categorise_libelle,criteres,etat,descripteur_libelle,type_marche):
    infos={'dataset': "boamp", 
        'rows': 3,
            'q': mot,
        'sort': "dateparution",
        'facet':["famille","code_departement","famille_libelle","perimetre","procedure_categorise","nature_categorise_libelle","criteres,marche_public_simplifie","etat","descripteur_code","descripteur_libelle","type_marche","type_marche_facette","type_avis"],
        'refine.famille':famille,
        'refine.famille_libelle':famille_libelle,
            'refine.code_departement':code_departement,
            'refine.perimetre':perimetre,
            'refine.procedure_categorise':procedure_categorise,
            'refine.nature_categorise_libelle':nature_categorise_libelle,
            'refine.etat':etat,
            'refine.criteres':criteres,
            'refine.type_marche':type_marche,
            'refine.descripteur_libelle':descripteur_libelle
        }
    final_response=requests.get('https://boamp-datadila.opendatasoft.com/api/records/1.0/search/?',params=infos).json()
            #print(final_response.json())
    return final_response

def retrieve(filename,mot,famille,code_departement,famille_libelle,perimetre,procedure_categorise,nature_categorise_libelle,criteres,etat,descripteur_libelle,type_marche):
    results=pd.read_csv(filename, index_col=0, low_memory=False)
    results = read_result(results,mot,famille,code_departement,famille_libelle,perimetre,procedure_categorise,nature_categorise_libelle,criteres,etat,descripteur_libelle,type_marche)
    html_results = ""
    for row in results:
        for i in row:
            html_results+=i + ' '
        html_results+='\n'
    return html_results
# to test
# test = retrieve("informatique","FNS","75","Marchés entre 90 k€ et seuils européens","AUTRE","PROCEDURE_ADAPTEE","Avis de marché","environnementaux","INITIAL","Etude","SERVICES")
# print(test) 

#################################################################################################################################
################################### ATTENTION A NE PAS RENAME LES VALEURS DES CHAMPS !!!#########################################
#################################################################################################################################

def read_result(result_csv,mot,famille,code_departement,famille_libelle,perimetre,procedure_categorise,nature_categorise_libelle,criteres,etat,descripteur_libelle,type_marche):
    new_df=result_csv.copy()
    new_df=new_df[new_df.criteres.str.contains(criteres,na=False)]
    new_df=new_df[new_df.type_marche.str.contains(type_marche,na=False)]
    new_df=new_df[new_df.descripteur_libelle.str.contains(descripteur_libelle,na=False)]
    new_df=new_df[new_df.code_departement==str(code_departement)]
    new_df=new_df[new_df.famille_libelle.str.contains(famille_libelle,na=False)]
    new_df=new_df[new_df.etat.str.contains(etat,na=False)]
    new_df.reset_index(inplace=True)
    new_df.drop('index',axis=1,inplace=True)
    new_df=new_df[['objet','datelimitereponse','dateparution','departement_offre']]
    results=[]
    for i in range(new_df.shape[0]):
        results.append(list(new_df.loc[i]))
    return results
"""

if __name__ == "__main__":
    
    app.run(debug=True)