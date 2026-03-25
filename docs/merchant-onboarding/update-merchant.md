---
id: update-merchant
title: Update Merchant
sidebar_label: Update Merchant

api:
  method: PATCH
  url:
    sandbox: https://sb-open.revenuemonster.my/v3/partner/merchant/{merchantID}
    prod: https://open.revenuemonster.my/v3/partner/merchant/{merchantID}
  headers:
    Content-Type: application/json
    Authorization: Bearer {{access_token}}
    X-Signature: sha256 {{signature}}
    X-Nonce-Str: {{nonce}}
    X-Timestamp: {{timestamp}}
  body:
    type: json
    example: |
      {
        "brandName": "Revenue Monster",
        "websiteUrl": "https://revenuemonster.my",
        "registrationNumber": "XAS1233123",
        "establishedAt": "2006-01-02T15:04:05Z"
      }

examples:
  request: |
    curl --location --request PATCH "https://sb-open.revenuemonster.my/v3/partner/merchant/1629258448138509563" \
      --header "Content-Type: application/json" \
      --header "Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjIwMTgtMDMtMTMiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOlsiKiJdLCJleHAiOjE1MjE2MjkyNTYsImlhdCI6MTUyMTYyMjA1NywiaXNzIjoiaHR0cHM6Ly9zYi1vYXV0aC5yZXZlbnVlbW9uc3Rlci5teSIsImp0aSI6IkVod0tFRTlCZFhSb1FXTmpaWE56Vkc5clpXNFF5cmYza3EzTDY4QnoiLCJuYmYiOjE1MjE2MjIwNTcsInN1YiI6IkVoUUtDRTFsY21Ob1lXNTBFSlhWemQzd3JhcVRPUklRQ2dSVmMyVnlFSXlKcUl6dnlNUFZjUSJ9.dJknY9MZHLNrKx1p7gZxS0_oA3uXLWplDU1r1dpwxIbmdB6yw4tQBTXKlWArDfKLlBDn6v22_gT5Px7sdCMj7e5M9eRoJoMnoPnslgYpmJJ5kjqAbKU7dUxKb1OzFLrvmtSK9r-FRLVtMFHioWYpwgSvSPBgZ6lAYkUyDzH7aKadFYtQcBuJR0hlq2CXtP0mzbHOeu2q6giONf3E5-XqS8lLRtuHPAbJ7_YFwo0Oe2zc6h05IOocmx_NvBVPfDBnuygTU063h70Q987MYeGDV_Os4N6N_I4b-GoHprEPtmntB1RJPrFrY28hvvoUfDHXHZVXT1GlrsozrkWV4EjbTw" \
      --header "X-Signature: sha256 Uf8oEHcq3l5ZkPc/y9eUsRjoKkx0dLUQz5PEFntWUZcR4A0DYdtQ9+VTx5Rq4e4XsRVp+4KZb4cwpDfzPABCZA==" \
      --header "X-Nonce-Str: VYNknZohxwicZMaWbNdBKUrnrxDtaRhN" \
      --header "X-Timestamp: 1527407052" \
      --data-raw '{
        "brandName": "Revenue Monster",
        "websiteUrl": "https://revenuemonster.my",
        "registrationNumber": "XAS1233123",
        "establishedAt": "2006-01-02T15:04:05Z",
        "addressLine1": "1, Jalan Pertanian 25",
        "addressLine2": "Taman Universiti",
        "postCode": "81300",
        "city": "SKUDAI",
        "state": "JOHOR",
        "country": "MALAYSIA",
        "countryCode": "60",
        "phoneNumber": "187824152",
        "companyName": "Revenue Monster",
        "companyType": "PRIVATE LIMITED COMPANY (SDN BHD)",
        "businessCategory": "COMPUTER AND ELECTRONICS",
        "averageTicketSize": 1000000,
        "averageTurnoverPerMonth": 1000000,
        "businessScope": "some business scope",
        "invoiceAddress": {
            "addressLine1": "1, Jalan Pertanian 25",
            "addressLine2": "Taman Universiti",
            "postCode": "81300",
            "city": "SKUDAI",
            "state": "JOHOR",
            "country": "MALAYSIA"
        },
        "document": {
            "ctosFileUrl": "https://somefilenedpoint.com",
            "ownerICFileUrl": "https://somefilenedpoint.com",
            "directorICFileUrl": "https://somefilenedpoint.com",
            "shareHolderICFileUrl": "https://somefilenedpoint.com",
            "businessRegistrationFileUrl": "https://somefilenedpoint.com",
            "bankStatementFileUrl": "https://somefilenedpoint.com",
            "moaFileUrl": "https://somefilenedpoint.com",
            "form24FileUrl": "https://somefilenedpoint.com",
            "form49FileUrl": "https://somefilenedpoint.com",
            "section14FileUrl": "https://somefilenedpoint.com",
            "form44FileUrl": "https://somefilenedpoint.com",
            "businessSitePhotoFileUrl": "https://somefilenedpoint.com"
        },
        "inspectList": [
            {
                "fullName": "NG SZE CHEN",
                "gender": "MALE",
                "birthday": "1999-07-14T15:59:59Z",
                "nationality": "MALAYSIAN",
                "idType": "IC",
                "idNo": "2131290134"
            }
        ],
        "bankAccountType": "CORPORATE",
        "bankAccountHolderName": "Revenue Monster",
        "bankAccountNo": "32312323",
        "bankCode": "HLBB",
        "latitude": 0.0,
        "longitude": 0.0,
        "paymentSubscription": "BOTH",
        "terminalOfflineEWallet": false,
        "terminalOfflineCreditCard": false,
        "onlineCreditCard": false
    }'
  body: |
    There is no example body request.
  response: |
    {
      "item": {
        "id": "1622609881925201839",
        "merchantId": "1622608181378590507",
        "isDefault": true,
        "companyName": "Revenue Monster",
        "companyType": "PRIVATE LIMITED COMPANY (SDN BHD)",
        "registrationNumber": "XAS1233123",
        "businessCategory": "COMPUTER AND ELECTRONICS",
        "businessScope": "some business scope",
        "sourceOfFunds": "",
        "customerOrigin": "",
        "establishedAt": "2006-01-02T15:04:05Z",
        "countryCode": "60",
        "phoneNumber": "187824152",
        "addressLine1": "1, Jalan Pertanian 25",
        "addressLine2": "Taman Universiti",
        "postcode": "81300",
        "city": "SKUDAI",
        "state": "JOHOR",
        "country": "MALAYSIA",
        "isSameBusinessAddress": false,
        "invoiceAddress": {
          "addressLine1": "1, Jalan Pertanian 25",
          "addressLine2": "Taman Universiti",
          "postcode": "81300",
          "city": "SKUDAI",
          "state": "JOHOR",
          "country": "MALAYSIA"
        },
        "inspectList": [
          {
            "fullName": "NG SZE CHEN",
            "email": "",
            "position": "",
            "countryCode": "",
            "phoneNumber": "",
            "gender": "MALE",
            "birthday": "1999-07-14T15:59:59Z",
            "nationality": "MALAYSIAN",
            "idType": "IC",
            "idNo": "2131290134",
            "beginAt": "",
            "endAt": ""
          }
        ],
        "status": "UNVERIFIED",
        "document": {
          "ctosFileUrl": "https://somefilenedpoint.com",
          "ownerICFileUrl": "https://somefilenedpoint.com",
          "directorICFileUrl": "https://somefilenedpoint.com",
          "shareHolderICFileUrl": "https://somefilenedpoint.com",
          "businessRegistrationFileUrl": "https://somefilenedpoint.com",
          "bankStatementFileUrl": "https://somefilenedpoint.com",
          "moaFileUrl": "https://somefilenedpoint.com",
          "form24FileUrl": "https://somefilenedpoint.com",
          "form49FileUrl": "https://somefilenedpoint.com",
          "section14FileUrl": "https://somefilenedpoint.com",
          "form44FileUrl": "https://somefilenedpoint.com",
          "businessSitePhotoFileUrl": "https://somefilenedpoint.com"
        },
        "documentFile": {
          "CTOSFileURL": null,
          "OwnerICFileURL": null,
          "DirectorICFileURL": null,
          "ShareHolderICFileURL": null,
          "BusinessRegistrationFileURL": null,
          "BankStatementFileURL": null,
          "MOAFileURL": null,
          "Form24FileURL": null,
          "Form49FileURL": null,
          "Section14FileURL": null,
          "Form44FileURL": null,
          "BusinessSitePhotoFileURL": null
        },
        "bankAccountNo": "32312323",
        "bankAccountType": "CORPORATE",
        "bankAccountHolderName": "Revenue Monster",
        "bankName": "HONG LEONG BANK",
        "bankCode": "HLBB",
        "averageTicketSize": 0,
        "averageTurnoverPerMonth": 0,
        "paymentSubscription": "",
        "createdAt": "2021-06-02T14:37:25+08:00",
        "updatedAt": "2021-06-02T14:37:25+08:00"
      },
      "code": "SUCCESS"
    }
---

import ApiEndpoint from "@site/src/components/api/ApiEndpoint";

<ApiEndpoint
  method="PATCH"
  sandbox="/v3/partner/merchant/{merchantID}"
  prod="/v3/partner/merchant/{merchantID}"
/>




import { Box, Heading, Text, Card, Image, Button, Flex } from "rebass";


:::note
Update Merchant By ID
:::

### Request Parameters

<ParamTable
  title="Request Parameters"
  rows={[
    { name: "brandName", type: "String", example: "\"\"" },
    { name: "websiteURL", type: "String", example: "\"\"" },
    { name: "registrationNumber", type: "String", example: "\"\"" },
    { name: "establishedAt", type: "DateTime", example: "\"\"" },
    { name: "addressLine1", type: "String", example: "\"\"" },
    { name: "addressLine2", type: "String", example: "\"\"" },
    { name: "postCode", type: "String", example: "\"\"" },
    { name: "city", type: "String", example: "\"\"" },
    { name: "state", type: "String", example: "\"\"" },
    { name: "countryCode", type: "String", example: "\"\"" },
    { name: "phoneNumber", type: "String", example: "\"\"" },
    { name: "companyName", type: "String", example: "\"\"" },
    { name: "companyType", type: "String", example: "\"\"" },
    { name: "businessCategory", type: "String", example: "\"\"" },
    { name: "averageTicketSize", type: "String", example: "\"\"" },
    { name: "averageTurnoverPerMonth", type: "String", example: "\"\"" },
    { name: "businessScope", type: "String", example: "\"\"" },
    { name: "invoiceAddress", type: "Object (nullable)", example: "Refer Below" },
    { name: "document", type: "Object", example: "Refer Below" },
    { name: "inspectList", type: "Array (nullable)", example: "Refer Below" },
    { name: "bankAccountType", type: "String", example: "\"\"" },
    { name: "bankAccountHolderName", type: "String", example: "\"\"" },
    { name: "bankAccountNo", type: "String", example: "\"\"" },
    { name: "bankCode", type: "String", example: "\"\"" },
    { name: "latitude", type: "Float", example: "\"\"" },
    { name: "longitude", type: "Float", example: "\"\"" },
    { name: "paymentSubscription", type: "String", example: "\"\"" },
    { name: "terminalOfflineEWallet", type: "String", example: "\"\"" },
    { name: "terminalOfflineCreditCard", type: "String", example: "\"\"" },
    { name: "onlineCreditCard", type: "String", example: "\"\"" }
  ]}
/>


<br/>

<strong>invoiceAddress (parameter) :</strong>

<ParamTable
  title="Details"
  rows={[
    { name: "addressLine1", type: "String", description: "AddressLine1", example: "\"\"" },
    { name: "addressLine2", type: "String", description: "AddressLine2", example: "\"\"" },
    { name: "postCode", type: "String", description: "Customer Remark", example: "\"\"" },
    { name: "city", type: "String", description: "City", example: "\"\"" },
    { name: "state", type: "String", description: "Address State", example: "\"\"" },
    { name: "country", type: "String", description: "Country", example: "\"\"" }
  ]}
/>


<br/>

<strong>inspectList (parameter) :</strong>

<ParamTable
  title="Details"
  rows={[
    { name: "fullName", type: "String", example: "\"\"" },
    { name: "email", type: "String", example: "\"\"" },
    { name: "position", type: "String", example: "\"\"" },
    { name: "countryCode", type: "String", example: "\"\"" },
    { name: "phoneNumber", type: "String", example: "\"\"" },
    { name: "gender", type: "String", example: "\"\"" },
    { name: "birthday", type: "String", example: "\"\"" },
    { name: "nationality", type: "String", example: "\"\"" },
    { name: "iDType", type: "String", example: "\"\"" },
    { name: "iDNo", type: "String", example: "\"\"" },
    { name: "beginDateTime", type: "String", example: "\"\"" },
    { name: "endDateTime", type: "String", example: "\"\"" }
  ]}
/>


<br/>
<strong>document (parameter) :</strong>

<ParamTable
  title="Details"
  rows={[
    { name: "ctosFileUrl", type: "String", example: "\"\"" },
    { name: "ownerICFileUrl", type: "String", example: "\"\"" },
    { name: "directorICFileUrl", type: "String", example: "\"\"" },
    { name: "shareHolderICFileUrl", type: "String", example: "\"\"" },
    { name: "businessRegistrationFileUrl", type: "String", example: "\"\"" },
    { name: "bankStatementFileUrl", type: "String", example: "\"\"" },
    { name: "moaFileUrl", type: "String", example: "\"\"" },
    { name: "form24FileUrl", type: "String", example: "\"\"" },
    { name: "form49FileUrl", type: "String", example: "\"\"" },
    { name: "section14FileUrl", type: "String", example: "\"\"" },
    { name: "form44FileUrl", type: "String", example: "\"\"" },
    { name: "businessSitePhotoFileUrl", type: "String", example: "\"\"" }
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
<strong>Item Object :</strong>

<ParamTable
  title="Details"
  rows={[
    { name: "id", type: "String", description: "Store ID", example: "\"1629258558902992793\"" },
    { name: "MerchantId", type: "String", description: "Merchant ID", example: "\"1629258448138509563\"" },
    { name: "isDefault", type: "bool", description: "Default Settlement", example: "true" },
    { name: "companyName", type: "String", description: "Company name of merchant", example: "\"REVENUE MONSTER\"" },
    { name: "companyType", type: "String", description: "Type of company incorporation", example: "\"SOLE PROPRIETOR\"" },
    { name: "registrationNumber", type: "String", description: "Registration number of merchant", example: "“12344”" },
    { name: "businessCategory", type: "String", description: "Business category of merchant", example: "\"SOFTWARE AND IT\"" },
    { name: "businessScope", type: "String", description: "Business category of merchant", example: "\"SOFTWARE AND IT\"" },
    { name: "sourceOfFunds", type: "String", description: "Business category of merchant", example: "\"SOFTWARE AND IT\"" },
    { name: "customerOrigin", type: "String", description: "Business category of merchant", example: "\"SOFTWARE AND IT\"" },
    { name: "establishedAt", type: "DateTime", description: "Established date time of merchant", example: "\"2018-03-26T04:50:57Z\"" },
    { name: "countryCode", type: "String", description: "Country code of merchant contact number", example: "\"60\"" },
    { name: "phoneNumber", type: "String", description: "Phone number of merchant", example: "\"377334080\"" },
    { name: "addressLine1", type: "String", description: "Address 1 of merchant", example: "\"20, JALAN JASA 38, TAMAN MUTIARA RINI\"" },
    { name: "addressLine2", type: "String", description: "Address 2 of merchant", example: "\"\"" },
    { name: "postcode", type: "String", description: "Postcode of merchant", example: "“81300”" },
    { name: "city", type: "String", description: "City of merchant", example: "\"Selangor\"" },
    { name: "state", type: "String", description: "State of merchant", example: "\"Selangor\"" },
    { name: "country", type: "String", description: "Country of merchant", example: "\"Malaysia\"" },
    { name: "isSameBusinessAddress", type: "Boolean", example: "false" },
    { name: "invoiceAddress", type: "Object (nullable)", example: "Refer Below" },
    { name: "inspectList", type: "Array (nullable)", example: "Refer Below" },
    { name: "status", type: "String", description: "Current status of merchant", example: "“REVIEWING”" },
    { name: "document", type: "Object", example: "Refer Below" },
    { name: "documentFile", type: "Object", example: "Refer Below" },
    { name: "bankAccountNo", type: "String", example: "\"\"" },
    { name: "bankAccountType", type: "String", example: "\"\"" },
    { name: "bankAccountHolderName", type: "String", example: "\"\"" },
    { name: "bankName", type: "String", example: "\"\"" },
    { name: "bankCode", type: "String", example: "\"\"" },
    { name: "averageTicketSize", type: "Uint", example: "0" },
    { name: "averageTurnoverPerMonth", type: "Uint", example: "0" },
    { name: "paymentSubscription", type: "String", example: "\"\"" },
    { name: "createdAt", type: "DateTime", description: "Creation date time of merchant", example: "\"2021-02-12T08:53:13Z\"" },
    { name: "updatedAt", type: "DateTime", description: "Last update date time of merchant", example: "\"2021-02-12T08:53:13Z\"" }
  ]}
/>


<br/>

<strong>invoiceAddress (parameter) :</strong>

<ParamTable
  title="Details"
  rows={[
    { name: "addressLine1", type: "String", description: "AddressLine1", example: "\"\"" },
    { name: "addressLine2", type: "String", description: "AddressLine2", example: "\"\"" },
    { name: "postCode", type: "String", description: "Customer Remark", example: "\"\"" },
    { name: "city", type: "String", description: "City", example: "\"\"" },
    { name: "state", type: "String", description: "Address State", example: "\"\"" },
    { name: "country", type: "String", description: "Country", example: "\"\"" }
  ]}
/>


<br/>

<strong>inspectList (parameter) :</strong>

<ParamTable
  title="Details"
  rows={[
    { name: "fullName", type: "String", example: "\"\"" },
    { name: "email", type: "String", example: "\"\"" },
    { name: "position", type: "String", example: "\"\"" },
    { name: "countryCode", type: "String", example: "\"\"" },
    { name: "phoneNumber", type: "String", example: "\"\"" },
    { name: "gender", type: "String", example: "\"\"" },
    { name: "birthday", type: "String", example: "\"\"" },
    { name: "nationality", type: "String", example: "\"\"" },
    { name: "iDType", type: "String", example: "\"\"" },
    { name: "iDNo", type: "String", example: "\"\"" },
    { name: "beginDateTime", type: "String", example: "\"\"" },
    { name: "endDateTime", type: "String", example: "\"\"" }
  ]}
/>


<br/>
<strong>document (parameter) :</strong>

<ParamTable
  title="Details"
  rows={[
    { name: "ctosFileUrl", type: "String", example: "\"\"" },
    { name: "ownerICFileUrl", type: "String", example: "\"\"" },
    { name: "directorICFileUrl", type: "String", example: "\"\"" },
    { name: "shareHolderICFileUrl", type: "String", example: "\"\"" },
    { name: "businessRegistrationFileUrl", type: "String", example: "\"\"" },
    { name: "bankStatementFileUrl", type: "String", example: "\"\"" },
    { name: "moaFileUrl", type: "String", example: "\"\"" },
    { name: "form24FileUrl", type: "String", example: "\"\"" },
    { name: "form49FileUrl", type: "String", example: "\"\"" },
    { name: "section14FileUrl", type: "String", example: "\"\"" },
    { name: "form44FileUrl", type: "String", example: "\"\"" },
    { name: "businessSitePhotoFileUrl", type: "String", example: "\"\"" }
  ]}
/>


<br/>
<strong>documentFile (parameter) :</strong>

<ParamTable
  title="Details"
  rows={[
    { name: "CTOSFileURL", type: "String", example: "\"\"" },
    { name: "OwnerICFileURL", type: "String", example: "\"\"" },
    { name: "DirectorICFileURL", type: "String", example: "\"\"" },
    { name: "ShareHolderICFileURL", type: "String", example: "\"\"" },
    { name: "BusinessRegistrationFileURL", type: "String", example: "\"\"" },
    { name: "BankStatementFileURL", type: "String", example: "\"\"" },
    { name: "MOAFileURL", type: "String", example: "\"\"" },
    { name: "Form24FileURL", type: "String", example: "\"\"" },
    { name: "Form49FileURL", type: "String", example: "\"\"" },
    { name: "Section14FileURL", type: "String", example: "\"\"" },
    { name: "Form44FileURL", type: "String", example: "\"\"" },
    { name: "BusinessSitePhotoFileURL", type: "String", example: "\"\"" }
  ]}
/>

