#import numpy as np
import pandas as pd
#import matplotlib.pyplot as plt
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


@app.route("/search")
def search():
    if not 'new_prediction' in locals():
        new_prediction=''
    new_data=pd.DataFrame(data=request.form, index=[0])
    ask=['Exemple 1', 'Exemple 2']                      # Add things to ask
    ask_type=['number', 'text']                         # Add type of the things to ask
    if not new_data.empty:
        new_prediction='Bravo !'                        # Add function to return offers.
    return render_template('search.html', ask=ask, ask_type=ask_type, prediction=new_prediction)

if __name__ == "__main__":
    app.run(debug=True)