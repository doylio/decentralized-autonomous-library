from base64 import b64encode
import requests

def sierra_auth(host_uri, api_key, api_secret):
    # add /token to host uri
    api_url = host_uri+'/token'
    # combine api_key and api_secret & encode in base64
    api_token = api_key+':'+ api_secret
    encoded_key = str(b64encode(api_token.encode('utf-8')), 'utf-8')
    # create auth headers for api call
    auth_headers = {'Accept': 'application/json', 'Authorization': 'Basic ' + encoded_key,'Content-Type':'application/x-www-form-urlencoded'}
    # Set grant type request for HTTP body
    grant_type = 'client_credentials' # Request a client credentials grant authorization
    auth_response = requests.post(api_url, headers = auth_headers, data = grant_type)
    # make sure we get 200 server code
    if auth_response.status_code == 200:
        # RETURN THE SESSION KEY
        return_token = auth_response.json()['access_token']
    else:
        return_token = 'BAD_RESPONSE'
    return return_token

if __name__ == '__main__':
    print("tests here")
