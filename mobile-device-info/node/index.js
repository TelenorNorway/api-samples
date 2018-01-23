/*
   Copyright 2018 Telenor Norge

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

const express = require('express')
    , http = require('http')
    , path = require('path')

const { getDeviceInfo } = require('./libs/mobiledeviceinfo')
    , config = require('./config')
    , TelenorAuthLibrary = require('telenor-auth-library');

const app = express()
    , Auth = new TelenorAuthLibrary(config);


app.get('/', (req, res) => {
  res.status(200).send('mobile-user-info');
});


// Display userinfo results from API
app.get('/deviceinfo', (req, res) => {
  getDeviceInfo(req.query.token)
    .then((data) => res.status(200).send(data))
    .catch((error) => res.status(200).send(error));
});


// Triggers end user consent
// This will redirect the user to a Telenor specific login page.
app.get('/authorize', (req, res) => {
  Auth.AuthorizationCode().authorize()
      .then((location) => res.redirect(location))
      .catch((error) => res.status(401).send('Failed authorizing.'));
});


// Callback route after user authentication
// Success object: { access_token, expires_in }
app.get('/callback', (req, res) => {
  Auth.AuthorizationCode().getToken(req.query.code)
      .then((result) => res.redirect(`/?token=${result.access_token}`))
      .catch((error) => res.status(200).send('Error fetching token'));
});


// Start HTTP server
app.listen(3000, () => {
  console.log('Server is live');
});
