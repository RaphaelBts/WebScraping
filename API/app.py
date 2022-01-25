#import numpy as np
import pandas as pd
#import matplotlib.pyplot as plt

import requests
import json

import random as rd
from math import *
from datetime import datetime

from flask import Flask,render_template,request

app = Flask(__name__)

@app.context_processor
def inject_now():
    return dict(now=datetime.now())

@app.route("/")
def index():
    return render_template('index.html')

# For the future ameliorated versions : NOT DEVELOPPED YET
# If we want to get a profitable business 
@app.route("/subscription")
def sub():
    return render_template('subsciption.html')


@app.route("/search", methods=['GET','POST'])
def search():
    if not 'new_prediction' in locals():
        new_prediction=''
    new_data=pd.DataFrame(data=request.form, index=[0])
    ask=['Famille', 'Famille libelle','Criteres','Type_marche','descripteur_libelle']            # Add things to ask
    ask_type=['text', 'text','text', 'text','text']                              # Add type of the things to ask
    ask_select={}
    ask_checkbox={7:["environnementaux","sociaux"]}
    print(new_data.head())
    if not new_data.empty:
        #new_prediction=retrieve(new_data['Famille'][0],new_data['Famille libelle'][0],new_data['Criteres'][0],new_data['Type_marche'][0],new_data['descripteur_libelle'][0])                                                              # Add function to return offers.
        new_prediction=retrieve("FNS","Divers","sociaux","SERVICES","Menuiserie")
    return render_template('search.html', ask=ask, ask_type=ask_type, prediction=new_prediction, ask_select=ask_select, ask_checkbox=ask_checkbox)

def retrieve(famille,famille_libelle,criteres,type_marche,descripteur_libelle):
    infos={'dataset': "boamp", 
        'rows': 2,
        'sort': "dateparution",
        'facet':["famille","code_departement","famille_libelle","perimetre","procedure_categorise","nature_categorise_libelle","criteres,marche_public_simplifie","etat","descripteur_code","descripteur_libelle","type_marche","type_marche_facette","type_avis"],
        'refine.famille':famille,
        'refine.famille_libelle':famille_libelle,
        'refine.criteres':criteres,
        'refine.type_marche':type_marche,
        'refine.descripteur_libelle':descripteur_libelle,   
        }
    final_response=requests.get('https://boamp-datadila.opendatasoft.com/api/records/1.0/search/?',params=infos).json()
    #print(final_response.json())
    return final_response

if __name__ == "__main__":
    app.run(debug=True)