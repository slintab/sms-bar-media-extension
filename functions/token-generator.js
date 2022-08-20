exports.handler = function (context, event, callback) {
  const response = new Twilio.Response();
  const identity = event.identity;

  if (identity !== context.identity) {
    response.setBody("Unauthorized");
    response.setStatusCode(401);
  } else {
    const AccessToken = Twilio.jwt.AccessToken;
    const SyncGrant = AccessToken.SyncGrant;

    const syncGrant = new SyncGrant({
      serviceSid: context.SYNC_SERVICE_SID,
    });

    const token = new AccessToken(
      context.ACCOUNT_SID,
      context.API_KEY,
      context.API_SECRET
    );

    token.addGrant(syncGrant);
    token.identity = identity;

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    const result = {
      identity: identity,
      token: token.toJwt(),
    };

    response.setBody(result);
    response.setStatusCode(200);
    response.setHeaders(headers);
  }

  callback(null, response);
};
