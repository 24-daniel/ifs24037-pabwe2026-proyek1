pipeline {
  agent any

  parameters {
    string(name: "API_BASEURL", defaultValue: "https://URL-BACKEND-KAMU/api/v1", description: "URL API backend (HTTPS)")
  }

  environment {
    VITE_API_BASEURL = "${params.API_BASEURL}"
  }

  stages {
    stage("Install") { steps { sh "npm install" } }
    stage("Test")    { steps { sh "npm test" } }
    stage("Build")   { steps { sh "npm run build" } }
  }
}
