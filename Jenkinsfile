pipeline {
    agent any
    environment {
        TIMESTAMP = sh(script: "date +%s", returnStdout: true).trim()
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
                sh "docker-compose down"
                sh "docker-compose up -d --build"
                sh "mkdir -p ${SCREENSHOT_PATH}"
                sh "chmod a=rwx ${SCREENSHOT_PATH}"
            }
        }
        stage("Execute UI tests") {
            steps {
                dir("outputs") {
                    sh "nohup dotnet Blogifier.dll > /dev/null 2>&1 &"
                }

                dir("tests/ui") {
                    sh "npx testcafe chrome:headless register.js"
                    sh "npx testcafe chrome:headless login.js"
                }
            }
            post {
                always {
                    archiveArtifacts artifacts: "${SCREENSHOT_PATH}/**", allowEmptyArchive: true
                }
            }
        }
    }
}