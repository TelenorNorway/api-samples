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

function getDeviceInfo(token) {
  const options = {
    host: config.hostname,
    path: '/mobile-device-info/v1/device',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  };

  return new Promise(function (resolve, reject) {
    const req = https.request(options, (res) => {
      let error;
      let rawData = '';

      if (res.statusCode !== 200) {
        error = new Error(`Failed to get mobile device info.\nStatus code: ${res.statusCode}`);
      }

      res.on('data', (chunk) => { rawData += chunk; })

      res.on('end', () => {
        try {
          const data = JSON.parse(rawData);
          resolve({ headers: res.headers, data: data, error: error });
        } catch (error) {
          reject(new Error(`Could not parse data.`).message);
        }
      });
    });

    req.end();
  });
}

exports.getDeviceInfo = getDeviceInfo;
