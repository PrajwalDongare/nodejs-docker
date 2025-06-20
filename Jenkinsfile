pipeline {
    agent any
    
    tools {
        nodejs "node"
    }
    
    stages {
        stage("Clone code from GitHub") {
            steps {
                script {
                    checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'GITHUB_CREDENTIALS', url: 'https://github.com/PrajwalDongare/nodejs-docker']])
                }
            }
        }
     
        stage('Node JS Build') {
            steps {
                sh 'npm install'
            }
        }
  
        stage('Build Node JS Docker Image') {
            steps {
                script {
                    sh 'docker build -t prdong/node-app-1.0 .'
                }
            }
        }


        stage('Deploy Docker Image to DockerHub') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'prdongdocker', variable: 'prdongdocker')]) {
                        sh 'docker login -u prdong -p ${prdongdocker}'
                    }

                    sh 'docker push prdong/node-app-1.0'
                }
            }   
        }
         
        stage('Deploying Node App to Kubernetes') {
            steps {
                script {
                    sh ('aws eks update-kubeconfig --name app_cluster --region us-east-1')
                    sh "kubectl get ns"
                    sh "kubectl apply -f app_deploy.yaml"
                }
            }
        }
    }
}