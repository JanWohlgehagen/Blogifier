pipeline {
    agent any
    environment {
        SCREENSHOT_PATH = "screenshots/"
    }
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
                sh "mkdir -p ${SCREENSHOT_PATH}"
                sh "chmod a=rwx ${SCREENSHOT_PATH}"
            }
        }
        stage("Execute UI tests") {
            steps {
                sh "testcafe chrome:headless tests/AdminRegistrationAndLogin.js -s path=${SCREENSHOT_PATH}"
            }
            post {
                always {
                    archiveArtifacts artifacts: "${SCREENSHOT_PATH}/**", allowEmptyArchive: true
                }
            }
        }
        stage("Execute Load test") {
            steps {
                sh "k6 run /var/lib/jenkins/workspace/Blogifier/tests/BlogifierLoadTest.js"
            }
        }
    }
}
pipeline{
    agent any
    @daily
    stages {
        stage("Execute Stress test") {
            steps {
                sh "k6 run /var/lib/jenkins/workspace/Blogifier/tests/BlogifierLoadTest.js"
            }
        }
    }
}
