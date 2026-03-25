---
id: terminal-integration
title: "Terminal Integration"
sidebar_label: "Terminal Integration"

api:
  method: POST
  url:
    sandbox: https://sb-open.revenuemonster.my/v3/payment/terminal/quickpay
    prod: https://open.revenuemonster.my/v3/payment/terminal/quickpay
  headers:
    Authorization: Bearer {{access_token}}
    X-Timestamp: {{timestamp}}
  body:
    type: json
    example: |
      {
        "terminalId": "1554193032595276913",
        "type": "E-WALLET",
        "receiptType": 3,
        "cameraType": "FRONT",
        "order": {
          "amount": 10,
          "currencyType": "MYR",
          "id": "387153091916665362292147",
          "title": "title"
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
  sandbox="/v3/payment/terminal/quickpay"
  prod="/v3/payment/terminal/quickpay"
/>




import { Box, Heading, Text, Card, Image, Button, Flex } from "rebass";

# Terminal Integration

Terminal Integration allow businesses to process their orders using systems and process transactions more efficiency
using RM Terminal to improve customer experience by allowing them to pay using their preferred methods such as credit
cards, debit cards and e-wallets. The most common use cases integration are for **POS** & **Self Service Kiosk**
systems.

There's two type of API **Server** and **Event**, Event will send the action to the terminal from our server while *
*Server** will only process at our server and response to you directly. So **Event** may take some time to process and
also can fail when the terminal not connected to the server.

:::note
This integration can be applicable on any system as long as you're using our terminal for payment acceptance then you
can integrate this to trigger the payment with your own machine / system.
:::

## Event: Quick Pay

:::tip Information
If your hardware device have it's own scanner to scan the payment qrcode, you will not needed to use our terminal to
accept payment while you can proceed the [OpenAPI QuickPay](./quick-pay.md) instead to have better experience and
performance.
:::


**Request Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "terminalId", type: "String", required: true, description: "Terminal ID" },
    { name: "type", type: "String", required: true, description: "Payment type" },
    { name: "receiptType", type: "Uint", required: true, description: "1 : Print Merchant Copy and Customer copy2 : Print Customer copy3 : Do not print Merchant Copy & Customer Copy" },
    { name: "cameraType", type: "String", required: true, description: "For \"E-WALLET\" only, use back or front camera to scan QR" },
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
  "terminalId": "1554193032595276913",
  "type": "E-WALLET",
  "receiptType": 3,
  "cameraType": "FRONT",
  "order": {
    "amount": 10,
    "currencyType": "MYR",
    "id": "387153091916665362292147",
    "title": "title",
    "detail": "desc",
    "additionalData": "010100 Pay parking ticket\n30/07/20 07:13 - 30/07/20 18:40\nLength of stay: 0 Days. 11:35\n02993777014011020212260030??"
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


---
api:
  method: POST
  url:
    sandbox: https://sb-open.revenuemonster.my/v3/payment/terminal/quickpay
    prod: https://open.revenuemonster.my/v3/payment/terminal/quickpay
  headers:
    Authorization: Bearer {{access_token}}
    X-Timestamp: {{timestamp}}
  bodyType: json
  body:
    terminalId:
      type: string
      required: true
    type:
      type: string
      required: true
      enum: ["CARD"]
    receiptType:
      type: number
      required: true
      enum: [1,2,3]
    order:
      type: object
      required: true
      properties:
        id:
          type: string
          required: true
        title:
          type: string
          required: true
        currencyType:
          type: string
          required: true
          enum: ["MYR"]
        amount:
          type: number
          required: true
---

## Event: Card Payment


**Request Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "terminalId", type: "String", required: true, description: "Terminal ID" },
    { name: "type", type: "String", required: true, description: "Payment type" },
    { name: "receiptType", type: "Uint", required: true, description: "1 : Print Merchant Copy and Customer copy2 : Print Customer copy3 : Do not print Merchant Copy & Customer Copy" },
    { name: "cameraType", type: "String", required: true, description: "For \"E-WALLET\" only, use back or front camera to scan QR" },
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
  "terminalId": "1554193032595276913",
  "type": "CARD",
  "receiptType": 3,
  "cameraType": "BACK",
  "order": {
    "amount": 10,
    "currencyType": "MYR",
    "id": "387153091916665362292147",
    "title": "title",
    "detail": "desc",
    "additionalData": "010100 Pay parking ticket\n30/07/20 07:13 - 30/07/20 18:40\nLength of stay: 0 Days. 11:35\n02993777014011020212260030??"
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


## Event: Card Refund


**Request Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "terminalId", type: "String", required: true, description: "Terminal ID" },
    { name: "type", type: "String", required: true, description: "Event Type" },
    { name: "data.transactionId", type: "String", required: true, description: "Transaction ID" },
    { name: "data.receiptType", type: "Uint", description: "1 : Print Merchant Copy and Customer copy2 : Print Customer copy3 : Do not print Merchant Copy & Customer Copy" },
    { name: "data.reason", type: "String" },
    { name: "data.email", type: "String", required: true, description: "Email match with the refund pin" },
    { name: "data.pin", type: "String", required: true, description: "Refund Pin" }
  ]}
/>


```json title="Example Request"
{
  "terminalId": "1582107209454501456",
  "type": "REFUND",
  "data": {
    "transactionId": "210215083727100327507906",
    "receiptType": 3,
    "reason": "Testing Refund",
    "email": "oska.ng@revenuemonster.my",
    "pin": "321123"
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


## Event: Card Settlement


**Request Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "terminalId", type: "String", required: true, description: "Terminal ID" },
    { name: "type", type: "String", required: true, description: "Event Type" },
    { name: "data.receiptType", type: "Uint", description: "1 : Print Merchant Copy and Customer copy2 : Print Customer copy3 : Do not print Merchant Copy & Customer Copy" }
  ]}
/>


```json title="Example Request"
{
  "terminalId": "1554193032595276913",
  "type": "SETTLEMENT",
  "data": {
    "receiptType": 3
  }
}
```

**Response Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "code", type: "String", description: "Determine request have success" },
    { name: "error.code", type: "String", description: "Error code" },
    { name: "error.message", type: "String", description: "Error message" },
    { name: "error.debug", type: "String", description: "Debug message ( sandbox only )" },
    { name: "summary.batchNo", type: "String", description: "Sequence no. of the terminal settlement" },
    { name: "summary.currencyType", type: "String", description: "Settlement Currency Type ( currently supported MYR only)" },
    { name: "summary.noOfTransactions", type: "Uint64", description: "Count of settled transactions" },
    { name: "summary.settlementAt", type: "String", description: "Date and time of the settlement" },
    { name: "summary.totalSalesAmount", type: "Uint64", description: "Total sales amount in cents" },
    { name: "transactions[*].amount", type: "Uint64", description: "Transactions amount in cents" },
    { name: "transactions[*].currencyType", type: "Uint64", description: "Transaction Currency Type ( currently supported MYR only)" },
    { name: "transactions[*].transactionAt", type: "String", description: "Date and time of the transaction" },
    { name: "transactions[*].transactionId", type: "String", description: "Transaction ID" },
    { name: "transactions[*].type", type: "String", description: "Transaction type" }
  ]}
/>


## Event: Cancel Event


**Request Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "terminalId", type: "String", required: true, description: "Terminal ID" },
    { name: "type", type: "String", required: true, description: "Event Type" }
  ]}
/>


```json title="Example Request"
{
  "terminalId": "1582107209454501456",
  "type": "CANCEL"
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


## Server: Payment Refund

:::caution
This applicable to e-wallet transactions only, for card payment will have to perform refund on terminal via Event API.

Reference: [Cancel Transaction > Reverse](./cancel-transaction.md#refund)
:::

## Server: Payment Reverse

:::caution
This applicable to e-wallet transactions only, for card payment will have to perform refund on terminal via Event API.

Reference: [Cancel Transaction > Reverse](./cancel-transaction.md#refund)
:::