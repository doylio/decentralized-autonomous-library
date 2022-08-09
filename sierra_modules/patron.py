import requests

def patron_session(host_uri, session_token):
    # add the /patrons to host uri
    patron_url = host_uri+'/patrons'
    patron_headers = {'Accept': 'application/json', 'Authorization': 'Bearer ' + session_token,'ContentType':'application/json'}
    return patron_url, patron_headers

def patron_verify(patron_uri, patron_headers, patron_id):
    patron_verified = requests.get(patron_uri+'/'+patron_id, headers = patron_headers)
    if patron_verified.status_code == 200:
        patron_status = patron_verified.text
    else:
        print(patron_verified.status_code)
        print(patron_verified.text)
        patron_status = False
    return patron_status



def patron_checkout():
    return

def patron_return():
    return


if __name__ == '__main__':
    print("tests here")
