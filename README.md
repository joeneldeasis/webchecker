# webchecker
Website status checker using node.js

Change ```api_host``` and ```api_key``` in app.js.

```
const api_host = 'tracker_api_host';
const api_key = 'tracker_api_key';
```

Run the script every 10 minutes: ```crontab -e```

```*/10 * * * * node /path/to/file/app.js```
