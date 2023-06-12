# Gcloud Workflow Documentation step-by-step

## 1. Create account, a project and initialize gcloud CLI

gcloud account name : `dsp.final.2022@gmail.com`  
gcloud project name : `furiousduck-worklow`  
gcloud compute region : `europe-west1`  
gcloud compute zone : `europe-west1-b`

gcloud CLI [installation](https://cloud.google.com/sdk/docs/install?hl=fr)

## 2. Enable Billing for the account and create empty repository on Cloud Source Repositories

[Create empty repository](https://cloud.google.com/source-repositories/docs/creating-an-empty-repository?hl=fr#gcloud)  
[Transfer code from another repo](https://cloud.google.com/source-repositories/docs/pushing-code-from-a-repository?hl=fr#gcloud-cli)

repo name : `thetiptop-webapp`

## 3. Add ssh key and clone repository

[link](https://source.cloud.google.com/furiousduck-workflow/thetiptop-webapp) to our repo  
[auth with ssh documentation](https://cloud.google.com/source-repositories/docs/authentication?hl=fr#ssh)

## 4. Create a Docker repository in Artefact Registry
**Artifact Registry is used to store Docker images in GCP**  
```sh
gcloud artifacts repositories create thetiptop-webapp-docker-repo --repository-format=docker \
--location=europe-west1 --description="Repository used to store thetiptop Docker image"
```
## 5. Create a configuration file for compilation

**This file will explain to the Builder what he needs to do**  
See `cloudbuild.yaml` file  
[doc](https://cloud.google.com/build/docs/configuring-builds/create-basic-configuration)

## 6. Create a new Cloud Build Trigger on the repository

**This trigger will tell Cloud Build to trigger each time a push is made on a defined branch**  
[doc](https://cloud.google.com/build/docs/automating-builds/create-manage-triggers?hl=fr)

## 7. Create GKE cluster for Cloud Build to deploy to

[doc](https://cloud.google.com/build/docs/deploying-builds/deploy-gke)

#### Create Cluster
```sh
gcloud container clusters create furiousduck-workflow-cluster --release-channel None
```
#### Delete Cluster
```sh
gcloud container clusters delete furiousduck-workflow-cluster
```

## 8. Create Cloud SQL instance (Postgres) and link it to the cluster

**This will be our Database for the web app**  

[Tutorial we are following](https://cloud.google.com/sql/docs/postgres/connect-instance-kubernetes#gcloud_5)

Create instance:
```sh
gcloud sql instances create thetiptop-postgresql-instance \
--database-version=POSTGRES_13 \
--cpu=1 \
--memory=4GB \
--region=europe-west1 \
--root-password=79YyCcpXba3QEBc
```

kubectl create secret generic postgresql-db-secrets \
 --from-literal=postgresqlpassword=79YyCcpXba3QEBc \
 --from-literal=apidatabaseusername=cluster-user \
 --from-literal=apidatabasepwd='Ss8STGXqNH6Nz$K' \
 --from-literal=apidatabasename=thetiptop_contest

Create database:
```sh
gcloud sql databases create thetiptop_contest --instance=thetiptop-postgresql-instance
```

Create user:
```sh
gcloud sql users create default-user \
--instance=thetiptop-postgresql-instance \
--password=Ss8STGXqNH6Nz$K
```

Create service account:
```sh
gcloud iam service-accounts create gke-sql-service-account \
  --display-name="GKE SQL Service Account"
```

Add *Cloud SQL Client* role to the service account:
```sh
gcloud projects add-iam-policy-binding furiousduck-workflow \
  --member="serviceAccount:gke-sql-service-account@furiousduck-workflow.iam.gserviceaccount.com" \
  --role="roles/cloudsql.client"
```

The section about creating a Kubernetes service account of the previous doc is unclear, it needs to be completed with [this doc](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts)

Config kubectl in order to communicate with our cluster:
```sh
gcloud container clusters get-credentials furiousduck-workflow-cluster
```


Create the service account:
```sh
kubectl create serviceaccount ksa-cloud-sql
```

Workload Identity needs to be enabled on the cluster, see [doc here](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity?hl=fr#console_1)

Binds the IAM service account with the Kubernetes service account
```sh
gcloud iam service-accounts add-iam-policy-binding \
  --role="roles/iam.workloadIdentityUser" \
  --member="serviceAccount:furiousduck-workflow.svc.id.goog[default/ksa-cloud-sql]" \
  gke-sql-service-account@furiousduck-workflow.iam.gserviceaccount.com
```

Modifiy `deployment.yaml` to add the service account to the API pod

Annotate the Kubernetes service account with the IAM binding:
```sh
kubectl annotate serviceaccount \
  ksa-cloud-sql  \
  iam.gke.io/gcp-service-account=gke-sql-service-account@furiousduck-workflow.iam.gserviceaccount.com
```

Configure the secrets:
```sh
kubectl create secret generic gke-cloud-sql-secrets \
  --from-literal=database=thetiptop_contest \
  --from-literal=username=default-user \
  --from-literal=password=Ss8STGXqNH6Nz$K
```

Modify `deployment.yaml` in order to define var env for API container and add container for database proxy

## 9. Define Service and Ingress ressource to expose the cluster

**This ressources will handle communication inside the cluster, and allow reaching it from the Internet**  
See deployment.yaml file for Ingress definition  
Create a static IP for the cluster:
```sh
gcloud compute addresses create thetiptop-static-ip --global
```
To see the ip address
```sh
kubectl get ingress
```
Our ip: `34.160.17.44`

## 10. Reserve a domain and configure the DNS records

**This maps a domain name on the IP address we created in the previous stage**  
Reserve a domain name at [domains.google.com](domains.google.com)  
Our is : `dsp-archiwebo21-sb-lm-mt-hg.fr`  
Set up the [DNS records](https://cloud.google.com/dns/docs/set-up-dns-records-domain-name)  
Update the [server's name](https://cloud.google.com/dns/docs/update-name-servers)  
Update can take up to 72 hours

## Still needs to be figured out: the prometheus / graphana section

https://blog.gabrielsagnard.fr/installer-grafana-prometheus-sur-votre-cluster-k8s-gke-pour-monitorer-vos-services/

## Not used so far

Install auth plugin for gcloud
```sh
gcloud components install gke-gcloud-auth-plugin
```