---
id: refresh-token
title: Refresh Token
sidebar_label: Refresh Token
api:
  method: POST
  url:
    sandbox: https://sb-oauth.revenuemonster.my/v1/token
    prod: https://oauth.revenuemonster.my/v1/token

  requiresSignature: false
  requiresAccessToken: false

  headers:
    Content-Type: application/json
    Authorization: Basic <BASE64_CLIENT_ID_AND_SECRET>
  body: |
    {
      "grantType": "refresh_token",
      "refreshToken": "YOUR_REFRESH_TOKEN"
    }

examples:
  request: |
    curl --location --request POST "https://sb-oauth.revenuemonster.my/v1/token" \
      --header "Content-Type: application/json" \
      --header "Authorization: Basic MTM5NjMxNzEzNjIyMzY4MzExMjpEWGxaTWpQem96dXh2Z2JRRmtYWmFDcnFoRmliS3B4ZQ==" \
      --data "{
      \"grantType\": \"refresh_token\",
      \"refreshToken\": \"OgoHjoZyLZPnHemifOrHIwStdeyzKuFoDaJBtBRULxEIJgANlhsLgFuBFiVTtqiQgmYDOTBkakwXZWfcLqXQTUTiqCpQTAEVHuqshWdiuvtGMIYztLiVfEmLEoXNlALi\"
    }"
  body: |
    There is no example body request.
  response: |
    {
      "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjIwMTgtMDMtMTMiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOlsiYXBpX2NsaWVudEBFaGNLQzA5QmRYUm9RMnhwWlc1MEVJbmVpOW5mbE9DN0ZRIl0sImV4cCI6MjM0NDQyOTc0OSwiaWF0IjoxNTU2MDI5NzQ5LCJpc3MiOiJodHRwczovL3NiLW9hdXRoLnJldmVudWVtb25zdGVyLm15IiwianRpIjoiRWh3S0VFOUJkWFJvUVdOalpYTnpWRzlyWlc0UXJ1dkxrSUthaU13ViIsIm5iZiI6MTU1NjAyOTc0OSwic3ViIjoiRWhRS0NFMWxjbU5vWVc1MEVKWFZ6ZDN3cmFxVE9SSVFDZ1JWYzJWeUVJeUpxSXp2eU1QVmNRIn0.PL3u_qTOw1c51HWNJsgTVDQBIZssLMRT2Nuo95_qyHHRTOhYz_LPtFdnICabU8P77lBOtZR5rMTuw3jzFFUopu3mCfT6ULzLtbBMVtlwXRdAZAw-kecYIhG5AmkT7H7Iwskvpitkqp1G31xb6PPOEhNTiO3iUY_Q-o3lsjn8uAWdDn7oXdWSmTMCI-1Mo0eYpWIQxsMI6HdQKXzhn1NELE1zvedyUhb6syw3oIocL7yll2eMg_LcYMdTOh26Ae614an8m7zSxgSBydwMHC0gjf7mzYEgqUzJ0M7zg_-vHy67u5UrysXQXDx-1MVHXaetzh3RriCR0R0_qESnIge3SQ",
      "tokenType": "Bearer",
      "expiresIn": 72591999,
      "refreshToken": "XtBwKribhoPsoEbhHnLNJSjkSuskqsRIpTnvVxmOTyQhenqlgGQisbtbpcjcapmhPEaHrJZVbPGvkvaTwWozamuCBUfvWdWQzHJSnjpuurEACugOZssEpUffUSDoSxLz",
      "refreshTokenExpiresIn": 1576799999
    }
---

import ApiEndpoint from "@site/src/components/api/ApiEndpoint";

<ApiEndpoint
  method="POST"
  sandbox="/v1/token"
  prod="/v1/token"
/>




import { Box, Heading, Text, Card, Image, Button, Flex } from "rebass";


:::note Refresh token is used to get new access token

- When Access Token has expired (29 days)
- Access token is compromised/hacked/stolen/destroyed

In case you lost your refresh token or do not want to deal with refresh token, you may opt to get new access token/refresh token using client credentials again. But this is not a suggested practice. (You don't want your clientid/clientsecret always exposed in network traffic. That is why you should use refresh tokens.)

:::

### Step 1 : Get Client ID and Client Secret

To get your **Client ID** and **Client Secret** , go to [RM Merchant Portal](https://merchant.revenuemonster.my/) > **Developer** > **Application**

<ParamTable
  title="Details"
  rows={[
    { name: "ClientID", type: "String", required: true, description: "Client ID or AppID as obtained from RM Merchant Portal.", example: "3208919753194101125" },
    { name: "ClientSecret", type: "String", required: true, description: "Client secret or AppSecret as obtained from RM Merchant Portal.", example: "mglve4W3UhPSGOV7gnwoYKyvbRCe83zZ" }
  ]}
/>


### Step 2 : Encode the parameters from Step 1 in Base 64 format

Structure: <br />
`clientID`:`clientSecret`

Example: <br />
Before Base64 encoding: <br />
`3675930941412424316:wmn7FUauXHdkoYa9182kCMkjGnNJVgin`

After Base64 encoding: <br />
`MzY3NTkzMDk0MTQxMjQyNDMxNjp3bW43RlVhdVhIZGtvWWE5MTgya0NNa2pHbk5KVmdpbg==`

### Step 3 : Put the Base64 encoded in Headers

**Content-Type** : application/json <br />
**Authorization** : Basic MzY3NTkzMDk0MTQxMjQyNDMxNjp3bW43RlVhdVhIZGtvWWE5MTgya0NNa2pHbk5KVmdpbg==

More info: [Authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)

**In Body Request** :

<ParamTable
  title="Details"
  rows={[
    { name: "grantType", type: "String", required: true, description: "Only support refresh_token", example: "refresh_token" },
    { name: "refreshToken", type: "String", required: true, description: "Refresh token is obtained from response parameter when access token is generated.", example: "Random String" }
  ]}
/>


### Response Parameters

<ParamTable
  title="Response Parameters"
  rows={[
    { name: "accessToken", type: "String", description: "Required for subsequent request(s)", example: "Access Token" },
    { name: "tokenType", type: "String", description: "We only support “Bearer” type", example: "Bearer" },
    { name: "expiresIn", type: "String", description: "Token expiry, in seconds format. “72591999” means 72591999 seconds or 30 day", example: "72591999" },
    { name: "refreshToken", type: "String", description: "Required for getting new access token after expiry", example: "Refresh token string" },
    { name: "refreshTokenExpiresIn", type: "String", description: "Token expiry, in seconds format. “1576799999” means 1576799999 seconds", example: "1576799999" }
  ]}
/>

