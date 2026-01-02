# Urligram API

## Environment variables

The application can be run via Makefile commands.
These commands take the proper docker compose configuration files and launch the app.
- On development, the environment variables come from the .env file. See ./.env-example for reference.
- On production, the environment variables come from the context of the pipeline runner, which are passed inlined to the Make command.

## Launch

    npm install
    make start-dev # For development
    make start-prod # For production


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

[1][2][3]
