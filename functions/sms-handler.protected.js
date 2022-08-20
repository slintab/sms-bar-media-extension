exports.handler = async (context, event, callback) => {
  const syncListSid = context.SYNC_LIST_SID;
  const syncServiceSid = context.SYNC_SERVICE_SID;
  const message = { message: event.Body };

  const syncClient = Runtime.getSync({ serviceName: syncServiceSid });

  await syncClient
    .syncLists(syncListSid)
    .syncListItems.create({ data: message });

  return callback(null, "Message processed");
};
