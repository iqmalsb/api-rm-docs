---
id: cancel-transaction
title: "Cancel Transaction"
sidebar_label: "Cancel Transaction"

api:
  method: POST
  url:
    sandbox: https://sb-open.revenuemonster.my/v3/payment/reverse
    prod: https://open.revenuemonster.my/v3/payment/reverse
  headers:
    Authorization: Bearer {{access_token}}
    X-Timestamp: {{timestamp}}
  body:
    type: json
    example: |
      {
        "orderId": "180730103903010431152179"
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
  sandbox="/v3/payment/reverse"
  prod="/v3/payment/reverse"
/>




import { Box, Heading, Text, Card, Image, Button, Flex } from "rebass";

# Cancel Transaction

:::info Refund & Reverse
**Refund** is returns funds to the customer either before / after settlement date is based on the payment provider.

**Reverse** will cancel the transactions only between specific such as 15 minutes after transaction happened, mainly for integrator to handle some situation like bad connection to prevent double charges. 
:::

## Reverse

:::note
If a transaction is timed out, the merchant should perform a reverse order before creating a new transaction. This is to prevent a double charge.
:::


**Request Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "orderId", type: "String", required: true, description: "Order ID" }
  ]}
/>


```json title="Example Request"
{
  "orderId": "180730103903010431152179"
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


## Refund

:::note
Transaction refundable is based on payment provider, so every payment have their own refund period if still need a refund after the period, please email to [support@revenuemonster.my](mailto:support@revenuemonster.my?subject=%5BRefund%20Request%5D). Format as per below is recommended :-

Email Subject: [Refund Request] Test Merchant - 4118165203679668885

Email Body:

Transaction ID: 230514103255300424706686<br />
Reference ID ( if applicable ): 20230512111212800110171906802679242<br />
Total Tranasaction Amount: RM 10.00<br />
Total Refund Amount ( if applicable ): RM 10.00<br />
Reason for refund request/s: Exceed refund period and would like to request manual refund
:::


**Request Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "transactionId", type: "String", required: true, description: "Transaction ID" },
    { name: "refund.type", type: "String", required: true, description: "Refund type" },
    { name: "refund.currencyType", type: "String", required: true, description: "Refund currency type" },
    { name: "refund.amount", type: "Uint64", required: true, description: "Refund amount" },
    { name: "reason", type: "String", required: true }
  ]}
/>


```json title="Example Request"
{
  "transactionId": "180730103903010431152179",
  "refund": {
    "type": "FULL",
    "currencyType": "MYR",
    "amount": 100
  },
  "reason": "test"
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
