# -*- coding: utf-8 -*-

from time import sleep
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
import regex as re
import pandas as pd 

#Update Chemin relatif pour file
import os
import sys

#Navigate to Appel_offre_liste_test directory
newPath=os.path.abspath("./Appel_offre_listetest2.txt")

driver = webdriver.Chrome() 
driver.get('https://www.boamp.fr/')
sleep(3)# We add delay to reduce the risk of ban using get function
# il faut faire attention à l'utilisation de get/ban

# le path a été copié on cherche aire de jeux publié depuis 3 mois
search_bar = driver.find_element_by_xpath('//*[@id="motsDescripteurs"]')
#search_bar.send_keys("Aire de jeux")
date = driver.find_element_by_xpath('//*[@id="dateMel"]').send_keys('Depuis trois mois')
search_bar.send_keys(Keys.ENTER)


# Une liste de classe appel_offre, chaque classe correspond à un appel d'offre
appels = []


is_last_page = False
i = 0
while not is_last_page:
    i+=1 # On parcourt uniquement les 2 premieres pages dont on incrémente jusqu'à i=5
    offers = driver.find_elements_by_class_name("result-search-avis")
    print(offers[1])
    for offer in offers:
        print("\n\n")
        titre = offer.find_element_by_css_selector("h3 a").text
        #title = offer.find_element_by_partial_link_text("/avis/detail/")
        date_publi = offer.find_element_by_css_selector("p.date-publishing").text
        date_limite = offer.find_element_by_css_selector("p.date-response").text
        avisid = offer.find_element_by_css_selector("div label").text
        avisid2 = re.search(r'\d+-\d+', avisid).group()
        appels.append([avisid2, titre, date_publi, date_limite])
        print("\n\n")   
    try:
        next_page = driver.find_element_by_css_selector("li.next a")
        next_page.send_keys(Keys.ENTER)
    except:
        is_last_page = True
    if i>2: 
        break #2 pages parcourut
    sleep(3)

# Pour obtenir les organismes acheteur
for appel in appels:
    try:
        driver.get('https://www.boamp.fr/avis/detail/{identite}'.format(identite = appel.identifiant))
        infos1 = driver.find_element_by_class_name("detail-avis.detail-main-1")
        Organisme_acheteur = infos1.find_element_by_css_selector("p").text
        appel.extend(Organisme_acheteur)
    except:
        print("Pas d'organisme acheteur")

for appel in appels:
    print(appel,'\n')

import pickle
with open(newPath, 'wb') as f:
    pickle.dump(appels, f)

driver.quit()

