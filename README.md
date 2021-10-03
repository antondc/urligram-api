# Linking API

## Debug

Add local api of the machine running the app to config.test.json

    "ENDPOINT_CLIENTS": ["https://192.168.88.193", "http://dev.linking.me", "https://dev.linking.me"],

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

[1]
