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
    , hbs = require('hbs')
    , http = require('http')
    , path = require('path')

const authRoutes = require('./auth')
    , { getWebhooks } = require('./libs/ifttt');

const app = express()



// setup views directory
app.set('views', path.join(__dirname, 'views'));
// setup view engine
app.set('view engine', 'hbs');


// inject authorize routes
app.use(authRoutes);


// Example application routes
app.get('/', (req, res) => {
  res.send('ifttt-webhook');
});


// list all webhooks
app.get('/webhooks/:msisdn', (req, res) => {

  // Get all webhooks on given msisdn. I.e. /webhooks/4712345678)
  // msisdn must stasrt with 47 following by the phone number
  getWebhooks(req.params.msisdn, req.query.token)
    .then((result) => {

      // Renders the webhooks view (views/webhooks.hbs) using
      // the { webhooks: ... } object as the model
      res.render('webhooks', { webhooks: result.data });
    })
    .catch((error) => {
      res.send(error);
    });
});


// Start http server on port 3000
const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Server is live');
});
