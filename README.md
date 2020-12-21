# Linking API

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

# Solving issues with deployment

Currently pipelines work and deployment is done.
There are issues with the SQL scripts. Apparently the SQL work with SQL 5.7. Now deployed on MySQL 8 on AWS.
Check how make work Stored Procedures editing directly on FTP
