# -*- coding: utf-8 -*-

from time import sleep
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
import regex as re
import pandas as pd 

from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

#Update Chemin relatif pour file
import os
import sys

#Navigate to Appel_offre_liste_test directory
newPath=os.path.abspath("./Appel_offre_listetest2.txt")
newPath2=os.path.abspath("./Appel_offre_listetest.txt")

driver = webdriver.Chrome() 
driver.get('https://www.boamp.fr/')
sleep(3)# We add delay to reduce the risk of ban using get function
# il faut faire attention à l'utilisation de get/ban

# le path a été copié on cherche aire de jeux publié depuis 3 mois
search_bar = driver.find_element_by_xpath('//*[@id="motsDescripteurs"]')
search_bar.send_keys("Aire de jeux")
date = driver.find_element_by_xpath('//*[@id="dateMel"]').send_keys('Depuis trois mois')
search_bar.send_keys(Keys.ENTER)

dictionnaire_NUTS = {#"FRB": "CENTRE-VAL DE LOIRE",
#"FRB0"  :	"Centre-Val de Loire",
"FRB01" :	"Cher",
"FRB02" :	"Eure-et-Loir",
"FRB03" :   "Indre",
"FRB04" :	"Indre-et-Loire",
"FRB05" :	"Loir-et-Cher",
"FRB06" :	"Loiret",
#"FRC"	:   "BOURGOGNE-FRANCHE-COMTÉ",
"FRC1"	:   "Bourgogne",
"FRC11"	:   "Côte-d’Or",
"FRC12"	:   "Nièvre",
"FRC13"	:   "Saône-et-Loire",
"FRC14"	:   "Yonne",
"FRC2"  :	"Franche-Comté",
"FRC21" : 	"Doubs",
"FRC22" :	"Jura",
"FRC23" :	"Haute-Saône",
"FRC24"	:   "Territoire de Belfort",
#"FRD"   :	"NORMANDIE",
"FRD1"  :	"Basse-Normandie",
"FRD11"	:   "Calvados",
"FRD12"	:   "Manche",
"FRD13"	:   "Orne",
"FRD2"	:   "Haute-Normandie",
"FRD21" : 	"Eure",
"FRD22" :	"Seine-Maritime",
#"FRE"   :	"NORD-PAS DE CALAIS-PICARDIE",
"FRE1"  :	"Nord-Pas de Calais",
"FRE11" :	"Nord",
"FRE12" :	"Pas-de-Calais",
"FRE2"  :	"Picardie",
"FRE21" :	"Aisne",
"FRE22"	:   "Oise",
"FRE23" :	"Somme",
#"FRF"   :	"ALSACE-CHAMPAGNE-ARDENNE-LORRAINE",
"FRF1"	:   "Alsace",
"FRF11" :	"Bas-Rhin",
"FRF12" :	"Haut-Rhin",
"FRF2"  :	"Champagne-Ardenne",
"FRF21" :	"Ardennes",
"FRF22" :	"Aube",
"FRF23" :	"Marne",
"FRF24" :	"Haute-Marne",
"FRF3"  :	"Lorraine",
"FRF31" :	"Meurthe-et-Moselle",
"FRF32" :	"Meuse",
"FRF33" :	"Moselle",
"FRF34" :	"Vosges",
#"FRG"   :	"PAYS DE LA LOIRE",
#"FRG0"  :	"Pays de la Loire",
"FRG01" :	"Loire-Atlantique",
"FRG02" :	"Maine-et-Loire",
"FRG03" :	"Mayenne",
"FRG04" :	"Sarthe",
"FRG05" :	"Vendée",
#"FRH"  :	"BRETAGNE",
#"FRH0"  :	"Bretagne",
"FRH01" :	"Côtes-d’Armor",
"FRH02" :	"Finistère",
"FRH03" :	"Ille-et-Vilaine",
"FRH04" :	"Morbihan",
#"FRI"  :	"AQUITAINE-LIMOUSIN-POITOU-CHARENTES",
"FRI1"  :	"Aquitaine",
"FRI11" :	"Dordogne",
"FRI12" :	"Gironde",
"FRI13" :	"Landes",
"FRI14" :	"Lot-et-Garonne",
"FRI15" :	"Pyrénées-Atlantiques",
"FRI2"  :	"Limousin",
"FRI21" :	"Corrèze",
"FRI22" :	"Creuse",
"FRI23" :	"Haute-Vienne",
"FRI3"	:   "Poitou – Charentes",
"FRI31" :	"Charente",
"FRI32" :	"Charente-Maritime",
"FRI33"	:   "Deux-Sèvres",
"FRI34"	:   "Vienne",
#"FRJ"	:   "LANGUEDOC-ROUSSILLON-MIDI-PYRÉNÉES",
"FRJ1"	:   "Languedoc-Roussillon",
"FRJ11"	:   "Aude",
"FRJ12"	:   "Gard",
"FRJ13"	:   "Hérault",
"FRJ14"	:   "Lozère",
"FRJ15"	:   "Pyrénées-Orientales",
"FRJ2"	:   "Midi-Pyrénées",
"FRJ21"	:   "Ariège",
"FRJ22"	:   "Aveyron",
"FRJ23" :	"Haute-Garonne",
"FRJ24" :	"Gers",
"FRJ25" :	"Lot",
"FRJ26" :	"Hautes-Pyrénées",
"FRJ27"	:   "Tarn",
"FRJ28" :	"Tarn-et-Garonne",
#"FRK"   :	"AUVERGNE-RHÔNE-ALPES",
"FRK1"  :	"Auvergne",
"FRK11" :	"Allier",
"FRK12" :	"Cantal",
"FRK13" :	"Haute-Loire",
"FRK14" :	"Puy-de-Dôme",
"FRK2"  :	"Rhône-Alpes",
"FRK21" :	"Ain",
"FRK22" :	"Ardèche",
"FRK23" :	"Drôme",
"FRK24" :	"Isère",
"FRK25" :	"Loire",
"FRK26" :	"Rhône",
"FRK27" :	"Savoie",
"FRK28" :	"Haute-Savoie",
#"FRL"   :	"PROVENCE-ALPES-CÔTE D’AZUR",
#"FRL0"  :	"Provence-Alpes-Côte d’Azur",
"FRL01" :	"Alpes-de-Haute-Provence",
"FRL02" :	"Hautes-Alpes",
"FRL03" :	"Alpes-Maritimes",
"FRL04" :	"Bouches-du-Rhône",
"FRL05" :	"Var",
"FRL06" :	"Vaucluse",
#"FRM"   :   "CORSE",
#"FRM0"  :	"Corse",
"FRM01" :	"Corse-du-Sud",
"FRM02" :	"Haute-Corse",
#"FRY"   :	"RUP FR – RÉGIONS ULTRAPÉRIPHÉRIQUES FRANÇAISES",
"FRY1"  :	"Guadeloupe",
#"FRY10" :	"Guadeloupe",
"FRY2"  :	"Martinique",
#"FRY20" :	"Martinique",
"FRY3"  :	"Guyane",
#"FRY30" :	"Guyane",
"FRY4"  :	"La Réunion",
#"FRY40" :	"La Réunion",
"FRY5"  :	"Mayotte",
#FRY50" :	"Mayotte",
#"FRZ"   :	"EXTRA-REGIO NUTS 1",
#"FRZZ"  :	"Extra-Regio NUTS 2",
#"FRZZZ" :	"Extra-Regio NUTS 3",
#"FR1"   :	"ILE-DE-FRANCE",
"FR10"  :	"Ile-de-France",
"FR101" :	"Paris",
"FR102" :	"Seine-et-Marne",
"FR103" :	"Yvelines",
"FR104" :	"Essonne",
"FR105" :	"Hauts-de-Seine",
"FR106"	:   "Seine-Saint-Denis",
"FR107"	:   "Val-de-Marne",
"FR108" :	"Val-d’Oise"}

# Pour éviter de re-scraper à chaque fois
import pickle
with open (newPath, 'rb') as f:
    appels = pickle.load(f)

for appel in appels:
    print("appel avant : ", appel)
    driver.get('https://www.boamp.fr/avis/detail/{identite}'.format(identite = appel[0]))
    item = driver.find_element_by_css_selector("div[id='detail-avis-content'] > table > tbody > tr > td[class = 'txt']")
    texte_detail =item.get_attribute("innerText")
    signification_NUTS = list(v for k,v in dictionnaire_NUTS.items() if k in texte_detail)
    try:
        signification_NUTS2 = str(signification_NUTS[-1])
        print(signification_NUTS)
    except:
        signification_NUTS2 = "None"
    appel.append(signification_NUTS2)
    print("appel après : ", appel)

for appel in appels:
    print(appel)

with open(newPath2, 'wb') as f:
    pickle.dump(appels, f)    
    """
    for elm in codes:
        print("elm : ",elm, "\n\n elm text : ",elm.text)
    print("c'est le code",codes)
    """   
  
driver.quit()

print("blabla")
