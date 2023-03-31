pipeline {
    agent any
    stages {
        stage("Build UI") {
            steps {
                dir("src/Blogifier") {
                    sh "dotnet publish Blogifier.csproj -o ../../outputs"
                }
            }
        }
        stage("Reset test environment") {
            steps {
                sh "docker compose down"
                sh "docker compose up -d --build"
                sh "rm -r screenshots"
                sh "mkdir screenshots"
                sh "chmod a=rwx screenshots"
            }
        }
        stage("Execute UI tests") {
            steps {
                sh "testcafe chrome:headless tests/AdminRegistrationAndLogin.js"
            }
        }
    }
}
