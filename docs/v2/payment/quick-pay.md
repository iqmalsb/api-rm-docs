---
id: quick-pay
title: "Quick Pay"
sidebar_label: "Quick Pay"

api:
  method: POST
  url:
    sandbox: https://sb-open.revenuemonster.my/v3/payment/quickpay
    prod: https://open.revenuemonster.my/v3/payment/quickpay
  headers:
    Authorization: Bearer {{access_token}}
    X-Timestamp: {{timestamp}}
    Content-Type: application/json
  body:
    type: json
    example: |
      {
        "authCode": "134850717797247290",
        "storeId": "6170506694335521334",
        "ipAddress": "8.8.8.8",
        "order": {
          "id": "ODR-20230513-1001",
          "title": "Payment via OpenAPI",
          "currencyType": "MYR",
          "amount": 1000,
          "detail": "",
          "additionalData": ""
        }
      }

examples:
  request: |
    There is no example request provided.
  body: |
    There is no example body request.
  response: |
    There is no example response provided.
---

import ApiEndpoint from "@site/src/components/api/ApiEndpoint";

<ApiEndpoint
  method="POST"
  sandbox="/v3/payment/quickpay"
  prod="/v3/payment/quickpay"
/>



import { Box, Heading, Text, Card, Image, Button, Flex } from "rebass";

<Box
  sx={{
    width: "100%",
    height: 0,
    paddingBottom: 900 / 16 + "%",
    position: "relative",
    overflow: "hidden",
    "& > iframe": {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      bottom: 0,
      left: 0,
      border: 0,
    },
  }}
>
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/sGmQCTvXORQ"
    frameBorder="0"
    allowFullScreen
  />
</Box>

<br />

# Quick Pay

Quick Pay allows businesses to accept payments from customers using a mobile app or QR code. 
With Revenue Monster's Quick Pay, customers can simply scan a QR code displayed by the merchant, 
and then make a payment using their preferred payment method such as credit card, debit card, or e-wallet. 
This process is quick, easy, and secure, allowing businesses to accept payments from their customers with minimal effort.

:::info
Quick Pay is an offline payment method and it's subscription will based on offline subscription rate.
:::

<Flex justifyContent="center">
  <Button
    width="100%"
    sx={{
      ":hover": {
        backgroundColor: "blue",
      },
      backgroundColor: "#528ef7",
      borderRadius: 15,
    }}
    onClick={() => {
      window.location.href =
        "https://drive.google.com/drive/folders/1x5jjspiW46mPKXbFO-0d-BZoyjpM1kp4?usp=sharing";
    }}
  >
    Sequence Diagram
  </Button>
</Flex>

## Standard Quick Pay



**Request Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "authCode", type: "String", required: true, description: "Auth code of QR code/barcode being scanned" },
    { name: "ipAddress", type: "String", required: true, description: "IP address of terminal/application for payment" },
    { name: "storeId", type: "String", required: true, description: "Revenue Monster Store ID" },
    { name: "order.id", type: "String", required: true, description: "Order ID" },
    { name: "order.title", type: "String", required: true, description: "Order Title" },
    { name: "order.currencyType", type: "String", required: true, description: "Order Currency Type ( currently supported MYR only)" },
    { name: "order.amount", type: "Uint64", required: true, description: "Order Amount" },
    { name: "order.detail", type: "String", description: "Order Detail" },
    { name: "order.additionalData", type: "String", description: "Order Additional Data" }
  ]}
/>


```json title="Example Request"
{
    "authCode": "134850717797247290",
    "storeId": "6170506694335521334",
    "ipAddress": "8.8.8.8",
    "order": {
        "id": "ODR-20230513-1001",
        "title": "Payment via OpenAPI",
        "currencyType": "MYR",
        "amount": 1000,
        "detail": "",
        "additionalData": "",
    },
}
```

**Response Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "item", type: "JSON", description: "Transaction response" },
    { name: "code", type: "String", description: "Determine request have success" },
    { name: "error.code", type: "String", description: "Error code" },
    { name: "error.message", type: "String", description: "Error message" },
    { name: "error.debug", type: "String", description: "Debug message ( sandbox only )" }
  ]}
/>


## Quick Pay + Voucher

:::tip About voucher redemption flow
Voucher can be generated as a QRCode for scanning the voucher code, so we suggest to scan the voucher qrcode first then only go for the wallet's qrcode.
:::


**Request Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "authCode", type: "String", required: true, description: "Auth code of QR code/barcode being scanned" },
    { name: "ipAddress", type: "String", required: true, description: "IP address of terminal/application for payment" },
    { name: "storeId", type: "String", required: true, description: "Revenue Monster Store ID" },
    { name: "order.id", type: "String", required: true, description: "Order ID" },
    { name: "order.title", type: "String", required: true, description: "Order Title" },
    { name: "order.currencyType", type: "String", required: true, description: "Order Currency Type ( currently supported MYR only)" },
    { name: "order.amount", type: "Uint64", required: true, description: "Order Amount" },
    { name: "order.detail", type: "String", description: "Order Detail" },
    { name: "order.additionalData", type: "String", description: "Order Additional Data" },
    { name: "voucher.code", type: "String", description: "Revenue Monster Voucher Code" }
  ]}
/>


```json title="Example Request"
{
    "authCode": "134850717797247290",
    "storeId": "6170506694335521334",
    "ipAddress": "8.8.8.8",
    "order": {
        "id": "ODR-20230513-1001",
        "title": "Payment via OpenAPI",
        "currencyType": "MYR",
        "amount": 1000,
        "detail": "",
        "additionalData": "",
    },
    "voucher": {
      "code": "haYkAch3VN"
    }
}
```

**Response Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "item", type: "JSON", description: "Transaction response" },
    { name: "code", type: "String", description: "Determine request have success" },
    { name: "error.code", type: "String", description: "Error code" },
    { name: "error.message", type: "String", description: "Error message" },
    { name: "error.debug", type: "String", description: "Debug message ( sandbox only )" }
  ]}
/>


## Quick Pay + Spending Loyalty

:::info About QRCODE Type
You will receive extra parameteres in the transaction response and you will need to print the generate the qrcode and print it out in receipt so the customer able to use their loyalty program to retrieve the spending loyalty's points.

Reference: [Transaction Object > Spending Loyalty](./query-transaction.md#spending-loyalty)
:::


**Request Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "authCode", type: "String", required: true, description: "Auth code of QR code/barcode being scanned" },
    { name: "ipAddress", type: "String", required: true, description: "IP address of terminal/application for payment" },
    { name: "storeId", type: "String", required: true, description: "Revenue Monster Store ID" },
    { name: "order.id", type: "String", required: true, description: "Order ID" },
    { name: "order.title", type: "String", required: true, description: "Order Title" },
    { name: "order.currencyType", type: "String", required: true, description: "Order Currency Type ( currently supported MYR only )" },
    { name: "order.amount", type: "Uint64", required: true, description: "Order Amount" },
    { name: "order.detail", type: "String", description: "Order Detail" },
    { name: "order.additionalData", type: "String", description: "Order Additional Data" },
    { name: "loyalty.type", type: "String", description: "Loyalty type" },
    { name: "loyalty.memberId", type: "String", description: "Loyalty Member's ID" },
    { name: "loyalty.countryCode", type: "String", description: "Loyalty Member's Country Code" },
    { name: "loyalty.phoneNumber", type: "String", description: "Loyalty Member's Phone Number" }
  ]}
/>


```json title="Example Request"
{
    "authCode": "134850717797247290",
    "storeId": "6170506694335521334",
    "ipAddress": "8.8.8.8",
    "order": {
        "id": "ODR-20230513-1001",
        "title": "Payment via OpenAPI",
        "currencyType": "MYR",
        "amount": 1000,
        "detail": "",
        "additionalData": "",
    },
    "loyalty": {
      "type": "PHONENUMBER",
      "countryCode": "60",
      "phoneNumber": "103403660"
    }
}
```

**Response Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "item", type: "JSON", description: "Transaction response" },
    { name: "code", type: "String", description: "Determine request have success" },
    { name: "error.code", type: "String", description: "Error code" },
    { name: "error.message", type: "String", description: "Error message" },
    { name: "error.debug", type: "String", description: "Debug message ( sandbox only )" }
  ]}
/>


## Quick Pay + Membership Card

:::info
Currently available membership card only Alipay's Gourmet Card ( 马来西亚美食优惠卡 )
:::

### Verify Membership Card

**Request Parameters**

**Request Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "memberCardId", type: "String", required: true, description: "Alipay's Member Card ID" },
    { name: "storeId", type: "String", required: true, description: "Store ID" }
  ]}
/>


```json title="Example Request"
{
  "memberCardId": "28158443195878043074",
  "storeId": "4949529109748431621"
}
```

**Response Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "code", type: "String", description: "Determine request have success" },
    { name: "error.code", type: "String", description: "Error code" },
    { name: "error.message", type: "String", description: "Error message" },
    { name: "error.debug", type: "String", description: "Debug message ( sandbox only )" }
  ]}
/>



### Quick Pay


**Request Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "authCode", type: "String", required: true, description: "Auth code of QR code/barcode being scanned" },
    { name: "ipAddress", type: "String", required: true, description: "IP address of terminal/application for payment" },
    { name: "storeId", type: "String", required: true, description: "Revenue Monster Store ID" },
    { name: "order.id", type: "String", required: true, description: "Order ID" },
    { name: "order.title", type: "String", required: true, description: "Order Title" },
    { name: "order.currencyType", type: "String", required: true, description: "Order Currency Type ( currently supported MYR only)" },
    { name: "order.amount", type: "Uint64", required: true, description: "Order Amount" },
    { name: "order.detail", type: "String", description: "Order Detail" },
    { name: "order.additionalData", type: "String", description: "Order Additional Data" },
    { name: "extraInfo.type", type: "String", description: "Extra Type \"MEMBERSHIP\"" },
    { name: "extraInfo.reference", type: "String", description: "Membership Card ID" }
  ]}
/>


```json title="Example Request"
{
    "authCode": "134850717797247290",
    "storeId": "6170506694335521334",
    "ipAddress": "8.8.8.8",
    "order": {
        "id": "ODR-20230513-1001",
        "title": "Payment via OpenAPI",
        "currencyType": "MYR",
        "amount": 1000,
        "detail": "",
        "additionalData": "",
    },
    "extraInfo": {
      "type": "MEMBERSHIP",
      "reference": "28158443195878043074"
    }
}
```

**Response Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "item", type: "JSON", description: "Transaction response" },
    { name: "code", type: "String", description: "Determine request have success" },
    { name: "error.code", type: "String", description: "Error code" },
    { name: "error.message", type: "String", description: "Error message" },
    { name: "error.debug", type: "String", description: "Debug message ( sandbox only )" }
  ]}
/>
