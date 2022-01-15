#import numpy as np
#import pandas as pd
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
@app.route("/subscription")
def sub():
    return render_template('subsciption.html')


if __name__ == "__main__":
    app.run(debug=True)