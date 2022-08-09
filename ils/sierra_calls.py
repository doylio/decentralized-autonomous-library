from configparser import ConfigParser
from os.path import dirname, realpath
from auth import sierra_auth
from patron import patron_session, patron_verify
from item import item_session
import sys
import json

def get_patroninfo(patron_url, patron_headers, patron_id):
    patron_json = patron_verify(patron_url, patron_headers, patron_id) 
    return patron_json

def get_itemdata(json_file):
    item_objects = open(json_file)
    item_data = json.load(item_objects)
    item_list = []
    for (v) in item_data.values():
        item_list.append(v)
    return item_list

if __name__ == '__main__':
    # get the current directory
    current_dir = dirname(realpath(__file__))
    # import the configuration file
    config_file = ConfigParser()
    config_file.read(current_dir+"/config.ini")
    sierra_host = config_file['sierra']['api_host']
    sierra_uri = config_file['sierra']['api_uri']
    sierra_key = config_file['sierra']['api_key']
    sierra_secret = config_file['sierra']['api_secret']
    # form url of sierra api
    sierra_addr = sierra_host+sierra_uri
    # make SIERRA_AUTH a var to call later
    access_token = sierra_auth(sierra_addr, sierra_key, sierra_secret)
    # MAKE SURE WE GET AN OK REPONSE FROM THE SIERRA SERVER
    if access_token != 'BAD_RESPONSE':
        item_url = item_session(sierra_addr,access_token)[0] # patron calls made here
        item_headers = item_session(sierra_addr,access_token)[1] # headers to make the call to patron api
        if sys.argv[1] == 'createitem':
            # second argument is json data file
            print(sys.argv[2])
            #get the key values of each json object
            item_metadata = get_itemdata(sys.argv[2])
            print(item_metadata)
        if sys.argv[1] == 'patron':
            print(sys.argv[2])
            # second argument is a library card number
            patron_id = sys.argv[2]
            patron_url = patron_session(sierra_addr,access_token)[0] # patron calls made here
            patron_headers = patron_session(sierra_addr,access_token)[1] # headers to make the call
            print(get_patroninfo(patron_url, patron_headers, patron_id))
    else:
        print('COULDN\'T AUTHENTICATE')
        print(access_token)
