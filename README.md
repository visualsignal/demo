# visualsignal-demo
This project is an example of a simple voice & video chat room system using [VisualSignal](https://visualsignal.io).

To run this project you will require an AWS account and a VisualSignal API Key. 
You can get one [here](https://dashboard.visualsignal.io).

The frontend of the application is largely comprised of two Vue 2 component, `src/views/Home.vue`, `src/views/Room.vue`
and a state file, `src/store/index.ts`.

### Home.vue
This page collects a display name and room name from out user which will be used to generate a VisualSignal Access Token 
via a REST API through AWS Amplify.

### Room.vue
This Vue component contains the logic that interacts with the VisualSignal SDK, [click here](https://dev.visualsignal.io) to view the SDK documentation.

### State File
Within this state file we fetch a VisualSignal Access token through an Amplify Rest api function. The code for this lambda
function is located in `amplify/backend/function/getAuthToken/src/index.ts`, it accepts the displayName and room name
from the Home component and makes a request to the Authentication Service to generate a token which the front end will
use to connect via the SDK.

> :warning: When you deploy the backend using `amplify push` you will need to manually add the VS_API_KEY
> [environment variable in the AWS console](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html).
> You can get your API key from your VisualSignal account dashboard.

## Project setup
```
npm install
```

### Setup Amplify
This project is built using [AWS Amplify](https://amplify.com). You can read more about getting started with AWS amplify
[here](https://docs.amplify.aws/start)

### Compiles and hot-reloads frontend for development
```
npm run serve
```

