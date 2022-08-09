from configparser import ConfigParser
from os.path import dirname, realpath
from sierra_modules.auth import sierra_auth
from sierra_modules.patron import patron_session, patron_verify

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
        patron_url = patron_session(sierra_addr,access_token)[0] # patron calls made here
        patron_headers = patron_session(sierra_addr,access_token)[1] # headers to make the call to patron api
        patron_id = patron_verify(patron_url, patron_headers, '1234567') 
        # if valid - return library card number, and patron type.
        print(patron_id)
        # need to work on item logic
    else:
        print('COULDN\'T AUTHENTICATE')
        print(access_token)
