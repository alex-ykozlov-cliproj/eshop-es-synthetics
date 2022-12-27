<!--not to html-->

# Install-uninstal

## UN-Install ES servers using ECK
- Uninstall apps:
```
kubectl apply -f ./k8s/eck.2.5.0/aiops-uptime-agent.yaml -n es
kubectl apply -f ./k8s/eck.2.5.0/aiops-browser-agent.yaml -n es

kubectl delete -f ./k8s/eck.2.5.0/aiops-k8s-agent.yaml -n es
kubectl delete -f ./k8s/eck.2.5.0/aiops-apm-agent.yaml -n es
kubectl delete -f ./k8s/eck.2.5.0/aiops-fleet-agent.yaml -n es

kubectl delete -f ./k8s/eck.2.5.0/aiops-kibana.yaml -n es
kubectl delete -f ./k8s/eck.2.5.0/aiops-es.yaml -n es
```

- Uninstall Operator and CRDs:
```
kubectl delete -f https://download.elastic.co/downloads/eck/2.5.0/operator.yaml
kubectl delete -f https://download.elastic.co/downloads/eck/2.5.0/crds.yaml
```

- Uninstall ingress and a namespace:
```
kubectl delete -f ./k8s/infra/es-aiops-ingress.dev-aks-05.yaml -n es
kubectl delete namespace es
```

# Install ES servers using ECK

## Step-by-step

0. kube-state-metrics
__deploy via helm - PREREQ for K8s monitoring by an agent! recommneded: use the help char managed by promi community__
```
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm show values prometheus-community/kube-state-metrics > kube-state-metrics.show.values.yaml
helm upgrade --install kube-state-metrics prometheus-community/kube-state-metrics --set selfMonitor.enabled=false
``` 

1. cd to the repo directory

2. install ECK operator
__elastic-system namespace will be created__
```
kubectl create -f https://download.elastic.co/downloads/eck/2.5.0/crds.yaml
kubectl apply -f https://download.elastic.co/downloads/eck/2.5.0/operator.yaml
```

3. create namespace + ingress
3.1 makesure nginx ingress is installed
3.2 update ./k8s/infra/es-aiops-ingress.yaml: replace *** with an ingress LB external IP
3.3 run:
```
kubectl create namespace es
kubectl apply -f ./k8s/infra/es-aiops-ingress.yaml -n es
```

4. deploy ES apps:
__Fleet server agent requires kibana https. To requre tls, comment out spec.http.tls.selfSignedCertificate.disabled__

__Note that mk8s uses a different storage class name, thus podTemplate is different__

```
kubectl apply -f ./k8s/eck.2.5.0/aiops-es.yaml -n es
kubectl apply -f ./k8s/eck.2.5.0/aiops-kibana.yaml -n es

kubectl apply -f ./k8s/eck.2.5.0/aiops-fleet-agent.yaml -n es
kubectl apply -f ./k8s/eck.2.5.0/aiops-k8s-agent.yaml -n es

kubectl apply -f ./k8s/eck.2.5.0/aiops-uptime-agent.yaml -n es
kubectl apply -f ./k8s/eck.2.5.0/aiops-browser-agent.yaml -n es
```

4. Retrieve generated elastic admin password:

6. ES login
```
export ES_NS=es
export INSTALL_NAME=aiops
export ES_LOGIN=elastic
export ES_PWD=$(kubectl get secret "$INSTALL_NAME-es-elastic-user" -n $ES_NS -o go-template='{{.data.elastic | base64decode }}')
echo ES_PWD=$ES_PWD
```

7. Enable enterprize trial license as needed
[How to setup license on ECK](https://www.elastic.co/guide/en/cloud-on-k8s/current/k8s-licensing.html)
[docs](https://www.elastic.co/guide/en/elasticsearch/reference/current/start-trial.html)
In Kibana Dev Tools: ` POST /_license/start_trial?acknowledge=true `