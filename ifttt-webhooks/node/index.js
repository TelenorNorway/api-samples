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
    , TelenorAuthLibrary = require('telenor-auth-library');

const app = express()
    , Auth = new TelenorAuthLibrary('api.telenor.no');

const config = {
  client_id: '',
  client_secret: ''
};


// Example application routes
app.get('/', (req, res) => {
  res.send('ifttt-webhook');
});

// Triggers end user consent
app.get('/authorize', (req, res) => {
  Auth.AuthorizationCode().authorize(config.client_id)
      .then((data) => {
        if (data.headers && data.headers.location) {
          res.redirect(data.headers.location);
        } else {
          res.redirect('/');
        }
      })
      .catch((error) => {
        res.send('Failed authorizing.');
      });
});


// Callback route after user authentication
// Success object: { access_token, expires_in }
app.get('/authorized', (req, res) => {
  if (req.query.code === undefined) {
    return res.send('Invalid request.');
  }

  Auth.AuthorizationCode().getToken(config.client_id, config.client_secret, req.query.code)
      .then((data) => {
        res.send(data.data);
      })
      .catch((error) => {
        res.send('Error fetching token');
      });
});


// Start http server on port 3000
const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Server is live');
});
