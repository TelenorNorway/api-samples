# Sample usage using Node.js

### Authorization

This sample uses [telenor-auth-library](https://github.com/TelenorNorway/auth-library) to implement the OAuth 2.0 authentication. Consult the code in the auth-library for further information on how Authorization Code Grant type works.


### Retrieve user info

Method: getUserInfo()

This method performs a request on the user-info API and returns a Promise. The returned object contains the user information if succeeded.