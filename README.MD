# SMS Bar Media Extension

This repository contains the code for a Twilio Live Custom Composer. A Custom Composer is a Media Extension that creates a livestream based on developer provided JavaScript code. You can read more about custom composers [here](https://www.twilio.com/docs/live/custom-composer).

This custom composer displays video room participants on the screen alongside a user-provided phone number and an SMS bar.  Messages sent to the phone number automatically appear in the SMS bar.

## Demo
![Demo](demo.png?raw=true)

## Design
![Architecture](architecture.png?raw=true)

The solution consists of the following building blocks:
- **Phone Number**: a Twilio phone number that will receive the messages to be displayed in the SMS bar.
- **SMS handler**: a Twilio function that saves the incoming messages into to Twilio Sync.
- **Twilio Sync**: a Twilio Sync list that stores the incoming messages
- **Media Processor**: a React app, hosted on Twilio Runtime, that displays the video participants, the phone number and the SMS bar with the text messages.
- **Sync token generator**: a twilio function for generating Twilio Sync access tokens so the Media Processor can access the messages.


## Setup

1. Create a Twilio Sync list
2. Rename the `.env.example` file to `.env` and supply the required environment variable values:
    - `ACCOUNT_SID`: your Twilio account sid
    - `AUTH_TOKEN`: your Twilio auth token
    - `SYNC_LIST_SID`: your twilio sync list sid from step 1
    - `SYNC_SERVICE_SID`: your twilio sync service sid from step 1
    - `SYNC_IDENTITY`: random secret string used to secure the token generator
    - `API_KEY`: your Twilio api key
    - `API_SECRET`: your Twilio api secret

3. Install the [Twilio Serverless Toolkit](https://www.twilio.com/docs/labs/serverless-toolkit).
4. Run the `twilio serverless:deploy` command. This will deploy the assets as well as the sms handler and token generator functions.
5. Buy a phone number and set its inbound message webhook to the SMS handler function from step 4
6. Open `src/config.js` and supply the required variable values:
    - `SYNC_TOKEN_URL`: url of the token generator function from step 4
    - `SYNC_LIST_NAME`: name of the sync list from step 1
    - `SYNC_IDENTITY`: random secret string used to secure the token generator from step 2
    - `SMS_PHONE_NUMBER`: phone number from step 5
    - `TWILIO_VIDEO_TOKEN`: (for development only) access token for the video room to display in the stream. 

7. Bundle the react app by running the `npm run build-assets` command. 
8. Run the `twilio serverless:deploy` command to deploy the bundled react app as an asset.
9. That is it! The custom composer should be online at `/index.html`.
10. To use the composer with a media extension, pass its url when creating the extension as the `Extension` parameter's value.


## Maintainer
Thanks for reading this far!
If you have any questions, do not hesitate to reach out at `hello@slintab.dev`