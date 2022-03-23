# chargev-io-jwtauth

## Abstract

This repository holds some scripts and documentation describing how to access the EV Freaks chargev.io Backend REST API.

## Generate a JWT Token

```shell
# generate a brand new key for testing purposes
openssl ecparam -genkey -name prime256v1 -noout -out chargev-io-api-test.pem

# extract the public key
openssl ec -in chargev-io-api-test.pem -pubout -out chargev-io-api-test.pub

# print out the public key
cat chargev-io-api-test.pub
```

Securely transfer the public key to ev-freaks.com. You will get an unique `kid` identifier. E.g. use that to generate valid JWT tokens:

```shell
export kid=60d9aca1cf439e00c15ec8fe

token="$(npm start -- --key chargev-io-api-test.pem --kid $kid --iss test)"
```

Then, try to access the API:

Access the dev environment (running in docker):

```shell
curl -H "Authorization: Bearer $token" http://localhost:3000/api/apiuser/ping
```

Access the staging environment>

```shell
curl -H "Authorization: Bearer $token" https://chargev-staging.io.ev-freaks.com/api/apiuser/ping
```

Access the production environment:

```shell
curl -H "Authorization: Bearer $token" https://io.chargev.app/api/apiuser/ping
```



t.b.c.


## Author

Remus Lazar <remus@ev-freaks.com>
