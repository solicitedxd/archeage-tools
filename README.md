# ArcheAge Tools - React App

## Project Setup
In order to run, this project requires:
- [NodeJS](https://nodejs.org/)
- Node Package Manager ([Yarn](https://yarnpkg.com) recommended)

Once cloned, run an install:
`yarn install`

### Service Rewrite
You'll need to rewrite some local endpoints to the Mokulu.io data services.

#### Apache Setup
In your httpd.conf:

Enable the rewrite module, `mod_rewrite.so` and the SSL module `mod_ssl.so`.

Add the following proxy lines to the end of the file:
```
SSLProxyEngine On

ProxyPass /session/ https://www.mokulu.io/session/
ProxyPassReverse /session/(.*)$ https://www.mokulu.io/session/$1

ProxyPass /service/ https://archeage-api.mokulu.io/
ProxyPassReverse /service/(.*)$ https://archeage-api.mokulu.io/$1

ProxyPass / http://localhost:3000/
```

## Running Locally

Starting the local hot reload server using:
`yarn run start`

Due to cookies being created on the mokulu.io domain, the site will work best by using:
### http://localhost.mokulu.io/

## Useful Links
- [Material UI](https://material-ui.com/)
