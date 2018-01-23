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
    , bodyParser = require('body-parser')
    , hbs = require('hbs')
    , path = require('path')

const { getWebhooks } = require('./libs/ifttt')
    , config = require('./config')
    , TelenorAuthLibrary = require('telenor-auth-library');

const app = express()
    , Auth = new TelenorAuthLibrary(config);


app.use(bodyParser.json());
// setup views directory
app.set('views', path.join(__dirname, 'views'));
// setup view engine
app.set('view engine', 'hbs');



// Example application routes
app.get('/', (req, res) => {
  res.render('webhooks', { token: req.query.token });
});


// list all webhooks
app.post('/webhooks', (req, res) => {
  // Get all webhooks on given msisdn
  // msisdn must stasrt with 47 following by the phone number
  getWebhooks(req.body.msisdn, req.body.token)
   .then((result) => res.send(result))
   .catch((error) => {
     console.log(error);
     res.status(200).send(error.message);
   });
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


// Start http server on port 3000
app.listen(3000, () => {
  console.log('Server is live');
});
