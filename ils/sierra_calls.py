from configparser import ConfigParser
from os.path import dirname, realpath
from auth import sierra_auth
from patron import patron_session, patron_verify
from item import item_session
import sys
def read_config():
    return

def check_patron():
    return

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
        print(sys.argv)
        #if create time is flagged
        #if sys.argv[0] == "--create-item":
            # get the second argument, which is a json file.
        #    item_data = sys.argv[1]
        #    print(item_data)
            #for loop - loop through the file 
            #for each item in the file - call, create item
            #create_item()
        #patron_id = patron_verify(patron_url, patron_headers, '1234567') 
        # if valid - return library card number, and patron type.
        #print(patron_id)

    else:
        print('COULDN\'T AUTHENTICATE')
        print(access_token)
