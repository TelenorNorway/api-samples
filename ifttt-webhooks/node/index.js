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

const authRoutes = require('./auth')
    , app = express()


app.use(authRoutes);


// Example application routes
app.get('/', (req, res) => {
  res.send('ifttt-webhook');
});


// Start http server on port 3000
const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Server is live');
});
