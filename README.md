# ArcheAge Tools - React App

## Project Setup
In order to run, this project requires:
- [NodeJS](https://nodejs.org/)
- Node Package Manager ([Yarn](https://yarnpkg.com))

Once cloned, run an install:
`yarn install`

### Service Rewrite
You'll need to rewrite some local endpoints to the Mokulu.io data services.

#### Apache Setup
Enable the rewrite module, `mod_rewrite.so`.

Then add the following proxies to your httpd.conf:
```
ProxyPass /session/ http://www.mokulu.io/session/
ProxyPassReverse /session/ http://www.mokulu.io/session/

ProxyPass /service/ http://archeage.mokulu.io/service/
ProxyPassReverse /service/ http://archeage.mokulu.io/service/

ProxyPass / http://localhost:3000/
```

#### IIS 7.0+ Setup
Install the [URL Rewrite module](https://www.iis.net/downloads/microsoft/url-rewrite).

Add this to the site's web.config under `<system.webServer>`:
```
        <rewrite>
            <rules>
                <clear />
                <rule name="ArcheAge Tools Service Proxy" enabled="true" stopProcessing="true">
                    <match url="service/(.*)" />
                    <conditions logicalGrouping="MatchAll" trackAllCaptures="false" />
                    <action type="Rewrite" url="http://archeage.mokulu.io/service/{R:1}" />
                </rule>
                <rule name="Mokulu.io Session Proxy" enabled="true" stopProcessing="true">
                    <match url="session/(.*)" />
                    <conditions logicalGrouping="MatchAll" trackAllCaptures="false" />
                    <action type="Rewrite" url="http://www.mokulu.io/session/{R:1}" />
                </rule>
                <rule name="NodeJS Proxy" enabled="true" stopProcessing="true">
                    <match url="(.*)" />
                    <conditions logicalGrouping="MatchAll" trackAllCaptures="false" />
                    <action type="Rewrite" url="http://localhost:3000/{R:1}" />
                </rule>
            </rules>
            <outboundRules>
                <rule name="SetAccessControlAllowOrigin">
                    <match serverVariable="RESPONSE_Access-Control-Allow-Origin" pattern=".+" negate="true" />
                    <conditions>
                        <add input="{AllowedOrigins:{CAPTURED_ORIGIN}}" pattern=".+" />
                    </conditions>
                    <action type="Rewrite" value="{C:0}" />
                </rule>
            </outboundRules>
            <rewriteMaps>
                <rewriteMap name="AllowedOrigins">
                </rewriteMap>
            </rewriteMaps>
        </rewrite>
```

## Running Locally

Starting the local hot reload server using:
`yarn run start`

Due to cookies being created on the mokulu.io domain, the site will work best by using:
### http://localhost.mokulu.io/

## Useful Links
- [Material UI](https://material-ui.com/)

*To Do: Expose the ArcheAge Service API*
