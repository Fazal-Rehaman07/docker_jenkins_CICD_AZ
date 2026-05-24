pipeline {
    agent any

    environment {
        ACR_LOGIN_SERVER = "carservregistry.azurecr.io"
        IMAGE_NAME = "carserv-nextjs"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'master',
                url: 'https://github.com/Fazal-Rehaman07/docker_jenkins_CICD_AZ.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %ACR_LOGIN_SERVER%/%IMAGE_NAME%:latest .'
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
                    bat 'docker login %ACR_LOGIN_SERVER% -u %USER% -p %PASS%'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                bat 'docker push %ACR_LOGIN_SERVER%/%IMAGE_NAME%:latest'
            }
        }
    }
}