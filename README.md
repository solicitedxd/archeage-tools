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

# How to Run at AWS Amplify

I don't know much about React so I just did my best to get the project running.
Here you have to connect your repository branch and configure how it will run the application in amplify yml
This project also ran on heroku, so you can find some settings for it

To run the project locally you just need to use "yarn start" and don't forget to look at the environment variables in package.json
Remember to use:

        "node": "14.18.2",
        "yarn": "1.22.15",
        "npm": "6.14.15"

### amplify.yml
```
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - nvm install 14.18.2
        - nvm use 14.18.2
        - npm install --dev
    build:
      commands:
        - nvm use 14.18.2
        - npm run build
  artifacts:
    baseDirectory: public
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

Amplify ENV

![image](https://user-images.githubusercontent.com/13701531/225167873-b1457424-1327-4d58-b7e3-d8a1940e3b6b.png)
