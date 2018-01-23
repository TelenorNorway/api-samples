# Sample usage using Node.js

### Authorization

This sample uses [telenor-auth-library](https://github.com/TelenorNorway/auth-library) to implement the OAuth 2.0 authentication. Consult the code in the auth-library for further information on how Authorization Code Grant type works.


### Retrieve mobile device info

Method: `getDeviceInfo()` [./libs/mobiledeviceinfo.js]

This method performs a request on the mobile-device-info API and returns a Promise. The returned object contains the mobile device information on the current subscription.