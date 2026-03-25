---
id: reconciliation
title: "Reconciliation"
sidebar_label: "Reconciliation"

api:
  method: POST
  url:
    sandbox: https://sb-open.revenuemonster.my/v3/payment/reconciliation
    prod: https://open.revenuemonster.my/v3/payment/reconciliation
  headers:
    Authorization: Bearer {{access_token}}
    X-Signature: sha256 {{signature}}
    X-Nonce-Str: {{nonce}}
    X-Timestamp: {{timestamp}}
    Content-Type: application/json
  body:
    type: json
    example: |
      {
        "transactionType": "PAYMENT",
        "date": "2021-07-28",
        "method": ["BOOST"],
        "region": ["MALAYSIA"],
        "cursor": ""
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
  sandbox="/v3/payment/reconciliation"
  prod="/v3/payment/reconciliation"
/>



import { Box, Heading, Text, Card, Image, Button, Flex } from "rebass";


**Request Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "transactionType", type: "String", description: "Terminal ID" },
    { name: "date", type: "String", required: true, description: "Transaction date" },
    { name: "method", type: "List(String)", description: "Transaction method" },
    { name: "region", type: "List(String)", description: "Transaction region" },
    { name: "cursor", type: "String", description: "Pagination cursor" }
  ]}
/>


```json title="Example Request"
{
    "transactionType": "PAYMENT",
    "date": "2021-07-28",
    "method": ["BOOST"],
    "region": ["MALAYSIA"],
    "cursor": "",
}
```

**Response Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "items.*.transactionAt", type: "String", description: "Transaction date time" },
    { name: "items.*.merchantId", type: "String", description: "Merchant ID" },
    { name: "items.*.merchantName", type: "String", description: "Merchant Name" },
    { name: "items.*.storeId", type: "String", description: "Store ID" },
    { name: "items.*.storeName", type: "String", description: "Store Name" },
    { name: "items.*.region", type: "String", description: "Transaction region" },
    { name: "items.*.method", type: "String", description: "Transaction method" },
    { name: "items.*.transactionType", type: "String", description: "Transaction payment or refund type" },
    { name: "items.*.type", type: "String", description: "Transaction type" },
    { name: "items.*.transactionId", type: "String", description: "Transaction ID" },
    { name: "items.*.orderId", type: "String", description: "Order ID" },
    { name: "items.*.currencyType", type: "String", description: "Transaction currency type" },
    { name: "items.*.grossAmount", type: "String", description: "Transaction gross amount" },
    { name: "items.*.mdr", type: "String", description: "Transaction mdr amount" },
    { name: "items.*.serviceFee", type: "String", description: "Transaction service fee" },
    { name: "items.*.settlementAmount", type: "String", description: "Transaction settlement amount" },
    { name: "meta.cursor", type: "String", description: "Pagination cursor" },
    { name: "code", type: "String", description: "Determine request have success" },
    { name: "error.code", type: "String", description: "Error code" },
    { name: "error.message", type: "String", description: "Error message" },
    { name: "error.debug", type: "String", description: "Debug message ( sandbox only )" }
  ]}
/>

