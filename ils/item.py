import requests
import json

def item_session(host_uri, session_token):
    # add the /item to host uri
    item_url = host_uri+'/items'
    item_headers = {'Accept': 'application/json', 'Authorization': 'Bearer ' + session_token,'ContentType':'application/json'}
    return item_url, item_headers



def item_create(item_json, item_uri, item_headers):
    #item_object = json.load(item_json)
    item_objects = open(item_json)
    item_data = json.load(item_objects)
    for (v) in item_data.values():
      #item uri 
      print(v)
    #patron_verified = requests.get(patron_uri+'/'+patron_id, headers = patron_headers)
    #if patron_verified.status_code == 200:
    #    patron_status = patron_verified.text
    #else:
    #    print(patron_verified.status_code)
    #    print(patron_verified.text)
    #    patron_status = False
    #return patron_status
    return item_json


'''items = '/home/mfree@cambridgelibraries.ca/Documents/Repositories/hedera-library-system/data.json'
item_uri = '/v6/items'
item_create(items, item_uri )'''