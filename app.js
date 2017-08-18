const check = require('is-reachable');
const request = require('request');
const api_host = 'tracker_api_host';
const api_key = 'tracker_api_key';

request.get({
          url: api_host,
    qs: {
        'api_key': api_key
    }
}, (error, response, body) => {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        for (i = 0; i < body.data.length; i++) {
            if (body.data[i].url != "null") {
                getStatus(body.data[i].url, body.data[i].id);
            }
        }
    } else if (response == undefined) {
        console.log(new Date().toLocaleString() + ' - An error occured while fetching the domain list: ' + error);
    }
});

function getStatus(url, id) {
    check(url).then(reachable => {
        if (reachable) {
            request.post(api_host, {
                form: {
                    api_key: api_key,
                    id: id,
                    status: 'UP'
                }
            }, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    console.log(new Date().toLocaleString() + ' - Done sending UP status update for: ' + url);
                } else if (response.statusCode != 200) {
                    console.log(new Date().toLocaleString() + ' - Error sending UP status update for: ' + url);
                }
            });
        } else {
            request.post(api_host, {
                form: {
                    api_key: api_key,
                    id: id,
                    status: 'DOWN'
                }
            }, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    console.log(new Date().toLocaleString() + ' - Done sending DOWN status update for: ' + url);
                } else if (response.statusCode != 200) {
                    console.log(new Date().toLocaleString() + ' - Error sending DOWN status update for: ' + url);
                }
            });
        }
    });
}
