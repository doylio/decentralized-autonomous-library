'''
calling an ils
'''
import sys
import os.path
import json
from configparser import ConfigParser
from os.path import dirname, realpath
from auth import sierra_auth
from patron import patron_session, patron_verify
from item import item_session

def create_ilsitem(new_id, location_id, status_code, bar_code, item_title, author_title):

    return

def search_itemno():
    return

def search_author():
    return

def search_title():
    return

def get_patroninfo(patron_urls, patron_header, patron_ids):
    '''
    get patron info
    '''
    patron_json = patron_verify(patron_urls, patron_header, patron_ids)
    if patron_json is False:
        member_status = False
    else:
        member_status = patron_json
    return member_status

def get_itemdata(json_file):
    '''
    get item data
    '''
    item_list = []
    with open(json_file, encoding='utf-8') as item_objects:
        item_data = json.load(item_objects)
        for item_values in item_data.values():
            item_list.append(item_values)
    return item_list

if __name__ == '__main__':
    current_dir = dirname(realpath(__file__))
    config_file = ConfigParser()
    config_file.read(current_dir+"/config.ini")
    sierra_host = config_file['sierra']['api_host']
    sierra_uri = config_file['sierra']['api_uri']
    sierra_key = config_file['sierra']['api_key']
    sierra_secret = config_file['sierra']['api_secret']
    sierra_addr = sierra_host+sierra_uri
    access_token = sierra_auth(sierra_addr, sierra_key, sierra_secret)
    ils_db = current_dir+'/books.json'
    if access_token != 'BAD_RESPONSE':
        item_url = item_session(sierra_addr,access_token)[0]
        item_headers = item_session(sierra_addr,access_token)[1]
        if sys.argv[1] == 'createitem':
            print(sys.argv[2])
            item_metadata = get_itemdata(sys.argv[2])
            watcher_data = current_dir+'/watch_info.json'
            if bool(os.path.isfile(watcher_data)):
                print(item_metadata)
            else:
                print(item_metadata)
        if sys.argv[1] == 'patron':
            patron_id = sys.argv[2]
            patron_url = patron_session(sierra_addr,access_token)[0] # patron calls made here
            patron_headers = patron_session(sierra_addr,access_token)[1]
            print(get_patroninfo(patron_url, patron_headers, patron_id))

        if sys.argv[1] == 'searchitem':
            if sys.argv[2] == 'title':
                title_provided = sys.argv[3]
                with open(ils_db, encoding='utf-8') as search_title:
                    find_title = json.load(search_title)
                    for key in find_title.keys():
                        title_name = find_title[key]
                        if title_name['title'] == title_provided:
                            print(title_name)

            if sys.argv[2] == 'author':
                author_provided = sys.argv[3]
                with open(ils_db, encoding='utf-8') as search_author:
                    find_author = json.load(search_author)
                    for key in find_author.keys():
                        author_name = find_author[key]
                        if author_name['author'] == author_provided:
                            print(author_name)

            if sys.argv[2] == 'itemno':
                itemno_provided = sys.argv[3]
                with open(ils_db, encoding='utf-8') as search_itemno:
                    find_itemno = json.load(search_itemno)
                    for key in find_itemno.keys():
                        item_number = find_itemno[key]
                        if item_number['barcode'] == itemno_provided:
                            print(item_number)
                        #else return nothing

        if sys.argv[1] == 'checkoutitem':
            checkout_item = sys.argv[2]
            print("asdf") #change state

        if sys.argv[1] == 'checkinitem':
            print("test")
        
        if sys.argv[1] == 'transferitem':
            print("test")
    else:
        print('COULDN\'T AUTHENTICATE')
        print(access_token)
