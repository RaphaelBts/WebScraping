import pandas as pd 
import csv
import regex as re
import json
import requests
from jsonpath_ng.ext import parse
import jsonpath
import flask

def request_boamp(mot=None,famille=None,code_departement=None,famille_libelle=None,perimetre=None,procedure_categorise=None,nature_categorise_libelle=None,criteres=None,etat=None,descripteur_libelle=None,type_marche=None):
    
    def retrieve(mot,famille,code_departement,famille_libelle,perimetre,procedure_categorise,nature_categorise_libelle,criteres,etat,descripteur_libelle,type_marche):
        infos={'dataset': "boamp", 
            'rows': 3,
                'q': mot,
            'sort': "dateparution",
            'facet':["famille","code_departement","famille_libelle","perimetre","procedure_categorise","nature_categorise_libelle","criteres","marche_public_simplifie","etat","descripteur_code","descripteur_libelle","type_marche","type_marche_facette","type_avis"],
            'refine.famille':famille,
            'refine.famille_libelle':famille_libelle,
                'refine.code_departement':code_departement,
                'refine.perimetre':perimetre,
                'refine.procedure_categorise':procedure_categorise,
                'refine.nature_categorise_libelle':nature_categorise_libelle,
                'refine.etat':etat,
                'refine.criteres':criteres,
                'refine.type_marche':type_marche,
                'refine.descripteur_libelle':descripteur_libelle,
                'format':'json' #tu peux test avec geojson et d'autres formats peut etre ca marchera.. (liste dispo : json jsonp geojson geojsonp rss atom)
            }
        keys_to_pop = []
        for key in infos.keys():
            if infos[key]==None or infos[key]=='None' or infos[key]=='' or infos[key]=='TOUT':
                keys_to_pop.append(key)
        for key in keys_to_pop:
            infos.pop(key)
        req=requests.get('https://boamp-datadila.opendatasoft.com/api/records/1.0/search/?',params=infos)
        #print(req.url)
        final_response=requests.get('https://boamp-datadila.opendatasoft.com/api/records/1.0/search/?',params=infos).json()
        
        return final_response

    test = retrieve(mot,famille,code_departement,famille_libelle,perimetre,procedure_categorise,nature_categorise_libelle,criteres,etat,descripteur_libelle,type_marche)

    if len(test['records']) == 0:
        return 'No result'

    # On sauvegarde le rendu de l'api dans un fichier json
    with open('data.json', 'w') as fp:
        json.dump(test, fp)

    # on lit ce fichier json et on le transforme en dataframe
    with open('data.json', encoding='utf-8') as inputfile:
        df_temp = pd.read_json(inputfile, lines = True)

    #df_temp.to_csv('data.csv', encoding='utf-8', index=False, sep = ',')

    # on enleve les parties non désirées qui ne sont pas des données à afficher
    df_dict = [record for record in df_temp['records'][0]]
    for record in df_dict:
        record.pop('datasetid')
        record.pop('recordid')
        record.pop('record_timestamp')

    # on transforme uniquement les données des appels d'offre en un dataframe
    df = pd.DataFrame([record['fields'] for record in df_dict],index=list(range(len(df_dict))))

    df = df.drop(['annonce_reference_schema_v110','famille','procedure_libelle','procedure_categorise','sousnature'
                ,'nature_categorise','nature_categorise_libelle','type_marche_facette','source_schema'], axis=1, errors='ignore')

    departement_offre= pd.DataFrame(df['code_departement'].copy())
    df.insert(4, "departement_offre", True)
    df['departement_offre'] = df['code_departement']

    DEPARTMENTS = {
        '01': 'Ain', 
        '02': 'Aisne', 
        '03': 'Allier', 
        '04': 'Alpes-de-Haute-Provence', 
        '05': 'Hautes-Alpes',
        '06': 'Alpes-Maritimes', 
        '07': 'Ardèche', 
        '08': 'Ardennes', 
        '09': 'Ariège', 
        '10': 'Aube', 
        '11': 'Aude',
        '12': 'Aveyron', 
        '13': 'Bouches-du-Rhône', 
        '14': 'Calvados', 
        '15': 'Cantal', 
        '16': 'Charente',
        '17': 'Charente-Maritime', 
        '18': 'Cher', 
        '19': 'Corrèze', 
        '2A': 'Corse-du-Sud', 
        '2B': 'Haute-Corse',
        '21': 'Côte-d\'Or', 
        '22': 'Côtes-d\'Armor', 
        '23': 'Creuse', 
        '24': 'Dordogne', 
        '25': 'Doubs', 
        '26': 'Drôme',
        '27': 'Eure', 
        '28': 'Eure-et-Loir', 
        '29': 'Finistère', 
        '30': 'Gard', 
        '31': 'Haute-Garonne', 
        '32': 'Gers',
        '33': 'Gironde', 
        '34': 'Hérault', 
        '35': 'Ille-et-Vilaine', 
        '36': 'Indre', 
        '37': 'Indre-et-Loire',
        '38': 'Isère', 
        '39': 'Jura', 
        '40': 'Landes', 
        '41': 'Loir-et-Cher', 
        '42': 'Loire', 
        '43': 'Haute-Loire',
        '44': 'Loire-Atlantique', 
        '45': 'Loiret', 
        '46': 'Lot', 
        '47': 'Lot-et-Garonne', 
        '48': 'Lozère',
        '49': 'Maine-et-Loire', 
        '50': 'Manche', 
        '51': 'Marne', 
        '52': 'Haute-Marne', 
        '53': 'Mayenne',
        '54': 'Meurthe-et-Moselle', 
        '55': 'Meuse', 
        '56': 'Morbihan', 
        '57': 'Moselle', 
        '58': 'Nièvre', 
        '59': 'Nord',
        '60': 'Oise', 
        '61': 'Orne', 
        '62': 'Pas-de-Calais', 
        '63': 'Puy-de-Dôme', 
        '64': 'Pyrénées-Atlantiques',
        '65': 'Hautes-Pyrénées', 
        '66': 'Pyrénées-Orientales', 
        '67': 'Bas-Rhin', 
        '68': 'Haut-Rhin', 
        '69': 'Rhône',
        '70': 'Haute-Saône', 
        '71': 'Saône-et-Loire', 
        '72': 'Sarthe', 
        '73': 'Savoie', 
        '74': 'Haute-Savoie',
        '75': 'Paris', 
        '76': 'Seine-Maritime', 
        '77': 'Seine-et-Marne', 
        '78': 'Yvelines', 
        '79': 'Deux-Sèvres',
        '80': 'Somme', 
        '81': 'Tarn', 
        '82': 'Tarn-et-Garonne', 
        '83': 'Var', 
        '84': 'Vaucluse', 
        '85': 'Vendée',
        '86': 'Vienne', 
        '87': 'Haute-Vienne', 
        '88': 'Vosges', 
        '89': 'Yonne', 
        '90': 'Territoire de Belfort',
        '91': 'Essonne', 
        '92': 'Hauts-de-Seine', 
        '93': 'Seine-Saint-Denis', 
        '94': 'Val-de-Marne', 
        '95': 'Val-d\'Oise',
        '971': 'Guadeloupe', 
        '972': 'Martinique', 
        '973': 'Guyane', 
        '974': 'La Réunion', 
        '976': 'Mayotte',
    }

    df=df.replace({"departement_offre": DEPARTMENTS})

    liste_finale = []
    for numero in range(0,len(df.index)):
        first_line = df['donnees'][numero]
        first_line = first_line.replace('{"OBJET": ','')
        first_line=first_line[:-1]
        first_line = re.split('[{}]', first_line)
        for elm in first_line:
            if not re.search(':("|\s")',elm):
                first_line.remove(elm)
            # si un élément a plusieurs clés valeurs mais que l'element se termine par ':' on ajoute ""
        for i in range(len(first_line)):
            elm_bis = first_line[i].split(",")
            temp=""
            for micro_elm in elm_bis:
                if re.search(':',micro_elm) and (not re.search(':("|\s)',micro_elm) and (': [' not in micro_elm)):
                    micro_elm += '""'
                    temp+= micro_elm+","
                elif not re.search(':|"',micro_elm):
                    temp+= micro_elm+ " "
                else:
                    temp+= micro_elm+","            
            temp = temp[:-1] # on enlève la dernière virgule
            first_line[i] =  temp  
        dictio ={}
        for elm in first_line:
            for elm_bis in elm.split(',', elm.count(": ")- elm.count("adresse suivante")):
                try:
                    cle_val =elm_bis.split(': ')
                    cle_dictio= re.sub('"','',cle_val[0])
                    if cle_dictio.upper() == cle_dictio:
                        cle_dictio = re.sub(' ','',cle_dictio)
                    val_dictio = re.sub('"','',' '.join(cle_val[1:]))
                    dictio[cle_dictio] = val_dictio
                except:
                    pass
        try:
            dictio["VALEUR TECHNIQUE"] = dictio["@POIDS"]
            dictio["PRIX DES PRESTATIONS"] = 100 - int(dictio["@POIDS"])
            del dictio["#text"]
            del dictio["@POIDS"]
        except:
            pass
        liste_cle = list(dictio.keys())
        for i in range(len(liste_cle)-1,-1,-1):
            if len(liste_cle[i]) >40 or "soit" in liste_cle[i] :
                dictio[liste_cle[i-1]] = dictio[liste_cle[i-1]] + liste_cle[i] +dictio[liste_cle[i]]
                del dictio[liste_cle[i]]
        liste_cle =list(dictio.keys())
        for i in range(len(liste_cle)-1,-1,-1):
            if liste_cle[i].upper() != liste_cle[i] or liste_cle[i].upper() == 'NON' :
                dictio[liste_cle[i-1]] += liste_cle[i]
                del dictio[liste_cle[i]]
        liste_cle =list(dictio.keys())
        for k in liste_cle:
            if dictio[k]=='':
                del dictio[k]
        liste_finale.append(dictio)

    dataframe = pd.DataFrame.from_records(liste_finale)
    the_one = pd.concat([df,dataframe], axis = 1)

    return the_one

def display_result(df_result):
    
    if isinstance(df_result,str):
        return df_result

    ps={"main":{},"details":{}}
    for i,row in df_result.iterrows():
        ps["main"][i] = {"acheteur":row["nomacheteur"]}
        ps["main"][i]["objet"] = row["TITRE_MARCHE"]
        #detail = re.search("INDEXATION.+",row["gestion"]).group(0)
        #detail = re.search("RESUME_OBJET.+?}",detail).group(0)
        #detail = detail.replace("RESUME_OBJET\": \"","").replace("\"}","")

        ps["details"][i] = {}
        ps["details"][i]["departement"] = row["departement_offre"]
        ps["details"][i]["fin de diffusion"] = row["datefindiffusion"]
        ps["details"][i]["type de marche"] = row["type_marche"]
        ps["details"][i]["libelle du descripteur"] = row["descripteur_libelle"]
        ps["details"][i]["famille libelle"] = row["famille_libelle"]

        #ps["details"][i] = detail
    ps["jsonified"]=json.dumps(ps)
    
    return ps

def get_field(field_name,request):
    jsonpath_expression = parse(f"$.facets[?(@.name == {field_name})].facets[*]")
    adjusted_fields={}
    for match in jsonpath_expression.find(request):
        adjusted_fields[match.value['name']]=match.value['count']
    return adjusted_fields

def field_actualized(famille=None,famille_libelle=None,code_departement=None,perimetre=None,procedure_categorise=None,nature_categorise_libelle=None,criteres=None,etat=None,descripteur_libelle=None,type_marche=None):
    refine_facets={'famille':famille, 'code_departement':code_departement,'famille_libelle':famille_libelle,'perimetre':perimetre,'procedure_categorise':procedure_categorise,'nature_categorise_libelle':nature_categorise_libelle,'criteres':criteres,'etat':etat,'descripteur_libelle':descripteur_libelle,'type_marche':type_marche}
    infos={ #Enlever le facet de la case en question 
        'facet':["famille","code_departement","famille_libelle","perimetre","procedure_categorise","nature_categorise_libelle","criteres","etat","type_marche","descripteur_libelle"]
        }
    refined=[]
    for key,value in refine_facets.items():
        if value != None and value != "None":
            refined.append(key+':'+value)
    infos['refine']=refined 

    request_fields=requests.get("https://boamp-datadila.opendatasoft.com/api/v2/catalog/datasets/boamp/facets?",params=infos).json()
    #print(request_fields)
    all_facets = ["famille","code_departement","famille_libelle","perimetre","procedure_categorise","nature_categorise_libelle","criteres","etat","type_marche","descripteur_libelle"] #adapter l'ordre au case (pr rapidité + la selection (enlever les champs déja remplis))
    #enlever famille puis +1 à chaque fois qu'un champs a déja été remplis en checkant dans un dict qui est remplis sur des event filled boxes....
    adjusted = {}
    for elem in all_facets:
        adjusted[elem] = get_field(elem,request_fields)
    
    return adjusted