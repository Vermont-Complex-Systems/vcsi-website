// https://learn.microsoft.com/en-us/graph/tutorials/javascript?tabs=aad
// Configuration for Microsoft Graph API
export const settings = {
  clientId: process.env.clientId,
  tenantId: process.env.tenantId,
  clientSecret: process.env.clientSecret,
  // SharePoint/Graph resource IDs
  siteId: '9430299f-8470-4d7a-8c0f-0097ef160cb1',
  // Default scopes for client credentials flow
  scopes: ['https://graph.microsoft.com/.default'],
};

export default settings;