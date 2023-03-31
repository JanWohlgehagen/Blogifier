pipeline {
    agent any
    environment {
        TIMESTAMP = sh(script: "date +%Y-%m-%d_%H-%M", returnStdout: true).trim()
        SCREENSHOT_PATH = "screenshots/${TIMESTAMP}"
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
                sh "rm -r screenshots"
                sh "mkdir -p ${SCREENSHOT_PATH}"
                sh "chmod a=rwx ${SCREENSHOT_PATH}"
            }
        }
        stage("Execute UI tests") {
            steps {
                sh "testcafe chrome:headless tests/AdminRegistrationAndLogin.js -s path=screenshots/${TIMESTAMP}"
            }
            post {
                always {
                    archiveArtifacts artifacts: "${SCREENSHOT_PATH}/**", allowEmptyArchive: true
                }
            }
        }
    }
}
