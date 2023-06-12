# Run the project locally
## Run the front
### `cd thetiptop-front`
### `npm i`
### `npm start`

## Run the API
### `cd thetiptop-api`
### `docker compose up`

# Process to add a feature
### Pull the branch staging
### Create your branch and work on it
### Push your local branch to your remote branch
### When finish -> merge to staging -> test will run and staging env will be created
### If everything ok -> merge to master
### Merge develop to master

# Run tests
### `cd thetiptop-front`

### To run test in the browser:
### `npm run cypress`

### To run test headless:
### `npm run cypress:component`
OR
### `npm run cypress:e2e`

# MEMO Dockers
./thetiptop-front: \
  -> docker-compose: uses Dockerfile.dev -> run the front locally \

./thetiptop-api: \
  -> docker-compose: uses /thetiptop-api/Dockerfile.dev -> runs the backend locally \
  -> Dockerfile: for prod \

./: \
  -> docker-compose.test.ci.yml: \
    -> builds the backend: /thetiptop-api/Dockerfile.dev \
    -> builds the frontend: ./thetiptop-front/Dockerfile.test \
  -> This file is executed by /cloudbuild-stagging.yaml (can be triggered by a PR from github if setup) \

# Tips
### See content of running docker container
### `docker exec -t -i <ContainerID> /bin/bash`

### See docker image content
### `docker run -it <image_name> sh`

### Delete all useless docker containers
### `docker system prune`

gcloud auth login \
gcloud projects list \
gcloud config set project <project-name> \
gcloud container clusters create <cluster-name> --zone europe-west1-b \
gcloud container clusters list


