pipeline {
    agent any

    environment {
        ACR_LOGIN_SERVER = "carservregistry.azurecr.io"
        IMAGE_NAME = "carserv-nextjs"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $ACR_LOGIN_SERVER/$IMAGE_NAME:latest .'
            }
        }

        stage('Login to ACR') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'acr-creds',
                        usernameVariable: 'USER',
                        passwordVariable: 'PASS'
                    )
                ]) {
                    sh 'docker login $ACR_LOGIN_SERVER -u $USER -p $PASS'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sh 'docker push $ACR_LOGIN_SERVER/$IMAGE_NAME:latest'
            }
        }
    }
}