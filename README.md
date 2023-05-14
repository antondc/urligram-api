# Woprs API

## Debug

Add local api of the machine running the app to config.test.json

    "ENDPOINT_CLIENTS": ["https://192.168.88.193", "http://dev.urligram.com", "https://dev.urligram.com"],

## Environment variables

Add .env file with environment variables:

    JWT_SECRET=xxxx
    DATABASE_PASSWORD=xxxx
    EMAIL_PASSWORD=xxxx
    NODE_TLS_REJECT_UNAUTHORIZED=0

## Conventions

### Naming conventions

    [I(nterface)][Module][Action][ModuleSubtype][ModuleType]

E. g.:

- ILinkCreateResponse
- UserFollowingDeleteController
- LinkGetOneUseCase
- ILinkRepo
- StateRepo
- userFollowerGetAll

## Rebuild

1 2
