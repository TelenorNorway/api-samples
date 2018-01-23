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

const https = require('https');
const config = require('../config');


// Retrieve a list of all webhooks
function getWebhooks(msisdn, token) {
  const requestOptions = {
    hostname: config.hostname,
    path: `/ifttt-webhooks/v1/tel:${msisdn}/webhooks`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(requestOptions, (res) => {
      let error;
      let rawData = '';

      if (res.stautsCode < 200 || res.statusCode >= 400) {
        error = new Error(`Could not fetch webhooks.\nStatus code: ${res.statusCode}`);
      }

      res.on('data', (chunk) => { rawData += chunk; });

      res.on('end', () => {
        try {
          const data = JSON.parse(rawData);
          resolve({ headers: res.headers, data: data, error: !!error });
        } catch (error) {

          reject(new Error('Error parsing data').message);
        }
      });
    });

    req.on('error', (error) => reject(error));

    req.end();
  });
}

function addWebhook() {

}

function deleteWebhook() {

}

function updateWebhook() {

}

exports.getWebhooks = getWebhooks;
exports.addWebhook = addWebhook;
exports.deleteWebhook = deleteWebhook;
exports.updateWebhook = updateWebhook;
