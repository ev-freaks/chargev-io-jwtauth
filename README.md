# chargev-io-jwtauth

## Abstract

This repository holds some scripts and documentation describing how to access the EV Freaks chargev.io Backend REST API.

## Generate a JWT Token

```shell
# generate a brand new key for testing purposes
openssl ecparam -genkey -name prime256v1 -noout -out chargev-io-api-test.pem

# extract the public key
openssl ec -in chargev-io-api-test.pem -pubout -out chargev-io-api-test.pub

# Add an API User for Development
docker-compose exec app npm run cli -- --add-api-user --name dev-api-user --public-key-file chargev-io-api-dev.pub --scopes "read:locations,read:iap,read:appconfig"

# replace this kid with the correct one (being printed out in the previous step)
export kid=60d9aca1cf439e00c15ec8fe

token="$(npm start -- --key chargev-io-api-test.pem --kid $kid --iss test)"

curl -H "Authorization: Bearer $token" localhost:3000/api/apiuser/ping
```

t.b.c.


## Author

Remus Lazar <remus@ev-freaks.com>
