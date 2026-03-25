---
id: create-merchant
title: Create Merchant
sidebar_label: Create Merchant
api:
  method: POST
  url:
    sandbox: https://sb-open.revenuemonster.my/v3/partner/merchant
    prod: https://open.revenuemonster.my/v3/partner/merchant
  headers:
    Content-Type: application/json
    Authorization: Bearer {{access_token}}
    X-Signature: sha256 {{signature}}
    X-Nonce-Str: {{nonce}}
    X-Timestamp: {{timestamp}}
  body: |
    {
      "companyName": "Revenue Monster",
      "countryCode": "60",
      "email": "rmtesting@gmail.com",
      "firstName": "Edwin",
      "lastName": "Testing",
      "phoneNumber": "164699177"
    }

examples:
  request: |
    curl --location --request POST "https://sb-open.revenuemonster.my/v3/partner/merchant" \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjIwMTgtMy0xOCIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiYXBpX2NsaWVudEBFaGNLQzA5QmRYUm9RMnhwWlc1MEVQZUEyYXJ4dk1PSUZnIl0sImV4cCI6MTU5MzU4MDY0NSwiaWF0IjoxNTkwOTg4NjQ1LCJpc3MiOiJodHRwczovL29hdXRoLnJldmVudWVtb25zdGVyLm15IiwianRpIjoiRWh3S0VFOUJkWFJvUVdOalpYTnpWRzlyWlc0UXMtNnI5LVgzbElvVyIsIm5iZiI6MTU5MDk4ODY0NSwic3ViIjoiRWhRS0NFMWxjbU5vWVc1MEVMUF9wNlNKNnFQN0ZSSVFDZ1JWYzJWeUVPaXZfb1dKNnFQN0ZRIn0.RKtXykw3y0ov3mKKa_K2h5FZB2jXtqf3gNRwwnzzA4xTMdY09mEHlFupMeUmchFW2XHYK254LdMYbF4ZhjxK9K51UUdQBYH-zZpo0WWtPSZqrPGtT-c4z_sEO73EDVcek3rDwyWiXvjSKDpsZM7NOdKRm5tvT3qNK-7C7WMUjSXDcBzbTFhwfOAOO1n-wMR9H_w0DuIE-yMjEZkOdt7GUIBC8F5izATlZH0FRTx4VAwQWY4gjjQ9-3PbUbHx-NKiFXwCOAsxu-79PiF0HDEHb6ZOCGywNmKuanEXqLonli0caZiUZfrdT53y3Xnd3W2SEr6s7ZQxWnQO5PeOU7BQYA" \
    --header "X-Signature: sha256 bFGc2JOEFqdI91DE5VXYBUllr+9DHcrrylRFU3i1r72aPmJreljn0dU+nwPSwTH/dTQUiZ9C2aQSF8AuT959EW4WEyEZ6VWgt9gCyZaU/bcOQ/ZIhKc06+uwzivVhAzpbUtG5tm5/sBp4ig6Sk7L6SE0Ecu6Tm0FhYl0qdgZvrTh4EEpLs3kHIuYL9QXKJILfKlu4gTX1Exrt7nNyEr8ndeUMaKYrj3FckMbRtmCwc829SsVp6FAgvoDPnguUJ+VjLF1e9NXhar2JwYjuqMkwsmUWRDbittqCgCCfaPF8anarlLsoXbdYEa7bp9BYp2U/Dw3Xd2MlamEZSR8H+Dosw==" \
    --header "X-Nonce-Str: VYNknZohxwicZMaWbNdBKUrnrxDtaRhN" \
    --header "X-Timestamp: 1528450585" \
    --data-raw '{
        "companyName":"Revenue Monster",
        "countryCode":"60",
        "email":"rmtesting@gmail.com",
        "firstName":"Edwin",
        "lastName":"Testing",
        "phoneNumber":"164699177"
    }'
  body: |
    There is no example body request.
  response: |
    {
      "item": {
        "merchant": {
          "id": "1629292083526787883",
          "companyName": "Revenue Monster",
          "brandName": "",
          "companyType": "",
          "companyLogoUrl": "https://storage.googleapis.com/rm-sandbox-asset/img/merchant.png",
          "registrationNumber": "",
          "businessCategory": "",
          "businessScope": "",
          "sourceOfFunds": "",
          "customerOrigin": "",
          "websiteUrl": "",
          "establishedAt": "0001-01-01T00:00:00Z",
          "countryCode": "",
          "phoneNumber": "",
          "addressLine1": "",
          "addressLine2": "",
          "postcode": "",
          "city": "",
          "state": "",
          "country": "",
          "invoiceAddress": null,
          "isActive": true,
          "status": "UNVERIFIED",
          "isMasterMerchant": false,
          "masterMerchantId": "",
          "isPartner": true,
          "partnerId": "",
          "gstNo": "",
          "extraInfo": {
            "contactInfo": [],
            "businessHour": []
          },
          "paymentSubscription": "",
          "subscription": {
            "terminalOfflineEWallet": false,
            "terminalOfflineCreditCard": false,
            "onlineCreditCard": false
          },
          "registrationSource": "OPEN_API",
          "createdAt": "2021-08-18T13:08:03.530436644Z",
          "updatedAt": "2021-08-18T13:08:03.530437084Z"
        },
        "store": {
          "id": "1629292083696729288",
          "merchantSettlementId": "",
          "name": "Revenue Monster",
          "imageUrl": "https://storage.googleapis.com/rm-prod-asset/img/store.png",
          "addressLine1": "",
          "addressLine2": "",
          "postCode": "",
          "city": "",
          "state": "",
          "country": "",
          "countryCode": "",
          "phoneNumber": "",
          "geoLocation": {
            "latitude": 0,
            "longitude": 0
          },
          "status": "ACTIVE",
          "createdAt": "2021-08-18T13:08:03.535674197Z",
          "updatedAt": "2021-08-18T13:08:03.53567448Z"
        },
        "user": {
          "id": "1629292083650514742",
          "firstName": "EDWIN",
          "lastName": "TESTING",
          "countryCode": "60",
          "phoneNumber": "164699177",
          "email": "rmtesting@gmail.com",
          "avatarUrl": "https://storage.googleapis.com/rm-sandbox-asset/img/avatar.png",
          "status": "ACTIVE",
          "settlementAccountId": [],
          "storeId": [],
          "isActive": true,
          "currentStoreId": "",
          "createdAt": "2021-08-18T13:08:03.537653715Z",
          "updatedAt": "2021-08-18T13:08:03.537654163Z"
        }
      },
      "code": "SUCCESS"
    }
---

import ApiEndpoint from "@site/src/components/api/ApiEndpoint";

<ApiEndpoint
  method="POST"
  sandbox="/v3/partner/merchant"
  prod="/v3/partner/merchant"
/>



import { Box, Heading, Text, Card, Image, Button, Flex } from "rebass";


:::note

For Merchant that has a Partner account

**For Active a Partner account [(contact us)](https://revenuemonster.my/about-us)**

:::

### Request Parameters

<ParamTable
  title="Request Parameters"
  rows={[
    { name: "companyName", type: "String", example: "\"Revenue Monster\"" },
    { name: "countryCode", type: "String", example: "\"60\"" },
    { name: "email", type: "String", example: "\"rmtesting@gmail.com\"" },
    { name: "firstName", type: "String", example: "\"Edwin\"" },
    { name: "lastName", type: "String", example: "\"Testing\"" },
    { name: "phoneNumber", type: "String", example: "\"164699177\"" }
  ]}
/>



### Response Parameters

<ParamTable
  title="Response Parameters"
  rows={[
    { name: "item", type: "Object", example: "(Refer to explanation below)" },
    { name: "code", type: "String", description: "Successfully call this endpoint. If fail, will return error code object (Refer Appendix 1: Error Codes)", example: "\"SUCCESS\"" }
  ]}
/>


<br/>

<strong>Merchant Object (item):</strong>

<ParamTable
  title="Details"
  rows={[
    { name: "id", type: "String", description: "Store ID", example: "\"6170506694335521334\"" },
    { name: "companyName", type: "String", description: "Company name of merchant", example: "\"REVENUE MONSTER\"" },
    { name: "brandName", type: "String", description: "Brand name of merchant", example: "\"REVENUE MONSTER\"" },
    { name: "companyType", type: "String", description: "Type of company incorporation", example: "\"SOLE PROPRIETOR\"" },
    { name: "companyLogoUrl", type: "String", description: "Public URL to show merchant's logo", example: "\"https://storage.googleapis.com/rm-dev-asset/img/merchant.png\"" },
    { name: "registrationNumber", type: "String", description: "Registration number of merchant", example: "“12344”" },
    { name: "businessCategory", type: "String", description: "Business category of merchant", example: "\"SOFTWARE AND IT\"" },
    { name: "businessScope", type: "String", description: "Business category of merchant", example: "\"SOFTWARE AND IT\"" },
    { name: "sourceOfFunds", type: "String", description: "Business category of merchant", example: "\"SOFTWARE AND IT\"" },
    { name: "customerOrigin", type: "String", description: "Business category of merchant", example: "\"SOFTWARE AND IT\"" },
    { name: "websiteUrl", type: "String", description: "Business category of merchant", example: "\"SOFTWARE AND IT\"" },
    { name: "establishedAt", type: "DateTime", description: "Established date time of merchant", example: "\"2018-03-26T04:50:57Z\"" },
    { name: "countryCode", type: "String", description: "Country code of merchant contact number", example: "\"60\"" },
    { name: "phoneNumber", type: "String", description: "Phone number of merchant", example: "\"377334080\"" },
    { name: "addressLine1", type: "String", description: "Address 1 of merchant", example: "\"20, JALAN JASA 38, TAMAN MUTIARA RINI\"" },
    { name: "addressLine2", type: "String", description: "Address 2 of merchant", example: "\"\"" },
    { name: "postcode", type: "String", description: "Postcode of merchant", example: "“81300”" },
    { name: "city", type: "String", description: "City of merchant", example: "\"Selangor\"" },
    { name: "state", type: "String", description: "State of merchant", example: "\"Selangor\"" },
    { name: "country", type: "String", description: "Country of merchant", example: "\"Malaysia\"" },
    { name: "invoiceAddress", type: "Object", description: "Object of Invoice Address", example: "(Refer below)" },
    { name: "isActive", type: "Boolean", description: "Merchant active or deactivated status", example: "true" },
    { name: "status", type: "String", description: "Current status of merchant", example: "“REVIEWING”" },
    { name: "isMasterMerchant", type: "Bool", description: "Master Merchant flag", example: "true" },
    { name: "masterMerchantId", type: "String", description: "Master Merchant ID, if any", example: "\"2301663653361832803\"" },
    { name: "isPartner", type: "Bool", description: "Partner Merchant flag", example: "true" },
    { name: "partnerId", type: "String", description: "Partner Merchant ID, if any", example: "\"2301663653361832803\"" },
    { name: "gstNo", type: "String", description: "GST No, if any", example: "\"\"" },
    { name: "paymentSubscription", type: "String", example: "\"\"" },
    { name: "subscription", type: "Object", example: "Refer Below" },
    { name: "registrationSource", type: "String", description: "Register From", example: "\"OPEN_API\"" },
    { name: "createdAt", type: "DateTime", description: "Creation date time of merchant", example: "\"2018-02-12T08:53:13Z\"" },
    { name: "updatedAt", type: "DateTime", description: "Last update date time of merchant", example: "\"2018-02-12T08:53:13Z\"" }
  ]}
/>


<br/>

<strong>Subscription object :</strong>

<ParamTable
  title="Details"
  rows={[
    { name: "terminalOfflineEWallet", type: "Bool", example: "false" },
    { name: "terminalOfflineCreditCard", type: "Bool", example: "false" },
    { name: "onlineCreditCard", type: "Bool", example: "false" }
  ]}
/>


<br />

<strong>Store object (store):</strong>

<ParamTable
  title="Details"
  rows={[
    { name: "id", type: "String", description: "Store ID", example: "\"6170506694335521334\"" },
    { name: "merchantSettlementId", type: "String", description: "Merchant Settlement Id", example: "\"1596124530153936377\"" },
    { name: "name", type: "String", description: "Store Name", example: "\"REVENUE MONSTER\"" },
    { name: "imageUrl", type: "String", description: "Default Image", example: "\"https://storage.googleapis.com/rm-prod-asset/img/store.png\"" },
    { name: "addressLine1", type: "String", description: "Store Address 1", example: "\"B-5-30, 5th Floor, Block Bougainvillea,\"" },
    { name: "addressLine2", type: "String", description: "Store Address 2", example: "\"PJU 6A, Lebuhraya SPRINT, 10 Boulevard,\"" },
    { name: "postCode", type: "String", description: "Postcode of store", example: "\"47400\"" },
    { name: "city", type: "String", description: "City of store", example: "\"Petaling Jaya\"" },
    { name: "state", type: "String", description: "State of store", example: "\"Selangor\"" },
    { name: "country", type: "String", description: "Country of store", example: "\"Malaysia\"" },
    { name: "countryCode", type: "String", description: "Country code of store contact number", example: "\"60\"" },
    { name: "phoneNumber", type: "String", description: "Phone number of store", example: "\"377334080\"" },
    { name: "geoLocation", type: "Object of [Float]", description: "Geo Location (latitude and longtitude) of store", example: "{\"latitude\": 3.1349857, \"longtitude\": 101.6136659 }" },
    { name: "status", type: "String", description: "Current status of store", example: "\"ACTIVE\"" },
    { name: "createdAt", type: "DateTime", description: "Creation date time of store", example: "\"2018-02-12T08:53:13Z\"" },
    { name: "updatedAt", type: "DateTime", description: "Last update date time of store", example: "\"2018-02-12T08:53:13Z\"" }
  ]}
/>


<br />

<strong>User object (store):</strong>

<ParamTable
  title="Details"
  rows={[
    { name: "id", type: "String", description: "User ID", example: "“8190656045166232716”" },
    { name: "firstName", type: "String", description: "First name of user", example: "“MOHAMED”" },
    { name: "lastName", type: "String", description: "Last name of user", example: "“YUSSUF”" },
    { name: "countryCode", type: "String", description: "Country code of user contact number", example: "\"60\"" },
    { name: "phoneNumber", type: "String", description: "Phone number of user", example: "\"377334080\"" },
    { name: "email", type: "String", description: "Email address of user", example: "\"yussuf@revenuemonster.my\"" },
    { name: "avatarUrl", type: "String", description: "Public URL to show user’s avatar", example: "\"https://storage.googleapis.com/rm-prod-asset/img/avatar.png\"" },
    { name: "status", type: "String", description: "Current status of user", example: "“ACTIVE”" },
    { name: "SettlementAccountId", type: "Object", description: "Settlement Account ID", example: "[]" },
    { name: "storeId", type: "Object", description: "Store ID", example: "[]" },
    { name: "isActive", type: "Boolean", description: "User active or deactivated status", example: "true" },
    { name: "currentStoreId", type: "String", description: "Current Store ID", example: "\"\"" },
    { name: "createdAt", type: "DateTime", description: "Creation date time of user", example: "\"2018-02-12T08:53:13Z\"" },
    { name: "updatedAt", type: "DateTime", description: "Last update date time of user", example: "\"2018-02-12T08:53:13Z\"" }
  ]}
/>

