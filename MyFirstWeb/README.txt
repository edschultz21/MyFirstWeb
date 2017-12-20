For an http call to work, you need to ensure that allows for CORS (cross site scripting).
For elasticsearch that involves adding the following to the elasticsearch.yml config file.
http.cors.enabled: true
http.cors.allow-origin: /https?:\/\/localhost(:[0-9]+)?/
Also, since this solution runs with windows credentials, you also need to make sure that
elasticsearch.exe allows for that user to run the application.
