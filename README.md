# chargev-io-jwtauth

## Abstract

This repository holds some scripts and documentation describing how to access the EV Freaks chargev.io Backend REST API.

## Basics

In order to access the chargev.io API, a JWT token is required. In a nutshell, the token will be signed using the private key and the remote (chargev.io Backend) will check the signature using the public key.


## Setup

Clone the repo and build:

```shell
git clone https://github.com/ev-freaks/chargev-io-jwtauth.git
cd chargev-io-jwtauth
npm i
npm run build
```

### Set env vars

```shell
# use the local docker environment (for development purposes)
#export CHARGEV_IO_API="http://localhost:3000/api/apiuser"

# use the staging environment 
export CHARGEV_IO_API="https://chargev-staging.io.ev-freaks.com/api/apiuser/"

# use the production environment
#export CHARGEV_IO_API="https://io.chargev.app/api/apiuser/"
```


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
export kid=60d9aca1cf439e00c15ec8fe # put your unique kid here

token="$(npm -s start -- --key chargev-io-api-test.pem --kid $kid)"
```

Then, try to access the API:

```shell
curl -H "Authorization: Bearer $token" $CHARGEV_IO_API/ping
```

## Locations Endpoint

Use this endpoint to fetch EV Locations data in OCPI format.

### Prerequisites

- a valid JWT token in the `$token` shell environment variable, see section above.

### Examples

Fetch location data near-by a given coordinate and radius, e.g. [Nearby Stuttgart](https://www.google.de/maps/@48.776,9.183,15z) using a limit of 10:

```shell
curl -H "Authorization: Bearer $token" $CHARGEV_IO_API/locations'?lat=48.776&lng=9.183&radius=500&limit=10'
```

### Query Params

| Name           | Type     | Description                                           | Example             | Default Value |
|----------------|----------|-------------------------------------------------------|---------------------|---------------|
| lat            | Number   | Latitude of the center point (for nearby queries)     | 48.776              | -             |
| lng            | Number   | Longitude of the center point (for nearby queries)    | 9.183               | -             |
| radius         | Number   | Radius for nearby queries, in meters                  | 500                 | -             |
| limit          | Number   | Limit the response size.                              |                     | 30            |
| offset         | Number   | Skip this given number of records, e.g. when limit >0 | 30                  | 0             |
| desired-fields | String[] | A (csv) list of paths to be selected                  | ocpi.evses,updatedAt |               |
| updated | Date String | Filter records being updated later than this timestamp | 2022-03-24T10:48:23.226Z                    | - |


## Author

Remus Lazar <remus@ev-freaks.com>
