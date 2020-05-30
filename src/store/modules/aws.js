import AWS from "aws-sdk"

export default {
    "state": {},
    "mutations": {},
    "actions": {
        fetchAWSCred ({state}, token) {

            // Fetch AWS credentials for JS SDK access
            AWS.config.region = state.vueEnv.VUE_APP_AWS_REGION
            AWS.config.apiVersions = {"s3": state.vueEnv.VUE_APP_AWS_VERSION}
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                "IdentityPoolId": state.vueEnv.VUE_APP_AWS_ID,
                "Logins": {
                    "accounts.google.com": token
                }
            })

        }
    },
    "getters": {}
}
