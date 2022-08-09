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
    # ils database
    ils_db = current_dir+'/books.json'
    # MAKE SURE WE GET AN OK REPONSE FROM THE SIERRA SERVER
    if access_token != 'BAD_RESPONSE':
         # patron calls made here
        item_url = item_session(sierra_addr,access_token)[0]
        # headers to make the call to patron api
        item_headers = item_session(sierra_addr,access_token)[1]
        if sys.argv[1] == 'createitem':
            # second argument is json data file
            print(sys.argv[2])
            #get the key values of each json object
            item_metadata = get_itemdata(sys.argv[2])
            #watcher item info (books)
            watcher_data = current_dir+'/watch_info.json'
            #check and see if watcher_into.json file exists
            if bool(os.path.isfile(watcher_data)):
                #if it does - append to that file
                print(item_metadata)
            else:
                #if it doesn't create the file
                print(item_metadata)
        if sys.argv[1] == 'patron':
            # second argument is a library card number
            patron_id = sys.argv[2]
            # url to make the call to initiate session to ILS API
            patron_url = patron_session(sierra_addr,access_token)[0] # patron calls made here
            # form the headers for the session to make calls ot the api
            patron_headers = patron_session(sierra_addr,access_token)[1]
            #verify if the patron exists and get info
            # if doesn't equal flase - write to file
            print(get_patroninfo(patron_url, patron_headers, patron_id))
        if sys.argv[1] == 'searchitem':
            if sys.argv[2] == 'title':
                book_title = sys.argv[3]
                load_db = open(ils_db, encoding='utf-8')
                find_book_title = json.load(load_db)
                    item_list = []
                with open(ils_db, encoding='utf-8') as item_objects:
                    item_data = json.load(item_objects)
                    for item_values in item_data.values():
                        item_list.append(item_values)

                #if book_title in find_book_title:
                #    print("found booktitle")
                #print(book_title)
                #print(find_book_title)
                #for i in data['emp_details']:
                    #print(i)
            if sys.argv[2] == 'author':
                author_name = sys.argv[3]
                print(author_name)

            if sys.argv[2] == 'itemno':
                item_number = sys.argv[3]
                print(item_number)

        if sys.argv[1] == 'checkoutitem':
            checkout_itme = sys.argv[2]
            print("asdf") #change state

        if sys.argv[1] == 'checkinitem':
            print("test")
    else:
        print('COULDN\'T AUTHENTICATE')
        print(access_token)
