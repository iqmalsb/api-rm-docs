---
id: tokenization-payment
title: "Tokenization Payment"
sidebar_label: "Tokenization Payment"

api:
  method: POST
  url:
    sandbox: https://sb-open.revenuemonster.my/v3/recurring-payment
    prod: https://open.revenuemonster.my/v3/recurring-payment
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
        "storeId": "123456789012345678901234",
        "email": "customer@email.com",
        "name": "Customer Name",
        "countryCode": "MY",
        "phoneNumber": "0123456789",
        "productName": "Subscription",
        "productDescription": "Weekly subscription",
        "currency": "MYR",
        "amount": 1000,
        "redirectUrl": "https://merchant.com/redirect",
        "notifyUrl": "https://merchant.com/notify",
        "recurringInterval": "WEEKLY",
        "recurringTarget": "customer",
        "recurringRepetition": 12
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
  sandbox="/v3/recurring-payment"
  prod="/v3/recurring-payment"
/>




import { Box, Heading, Text, Card, Image, Button, Flex } from "rebass";

# Tokenization Payment

Tokenization involves the substitution of sensitive data with non-sensitive data. Within the payments sector, it is employed to protect a card's Primary Account Number (PAN) by substituting it with a distinctive sequence of numbers. Payment tokens are issued in real-time used at online payment scenario only example recurring, subscription and mobility or even micromobility transactions.

## Tokenization: Recurring Payment

Recurring payment is for your customer to bind their card and our system able to take the fund from customer card and receive payment based on the recurring rules been defined and pass to recurring engine.

### Create Recurring Customer


**Request Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "storeId", type: "String", required: true, description: "Store ID" },
    { name: "email", type: "String", required: true, description: "Customer email" },
    { name: "name", type: "String", required: true, description: "Customer name" },
    { name: "countryCode", type: "String", required: true, description: "Customer country code" },
    { name: "phoneNumber", type: "String", required: true, description: "Customer phone number" },
    { name: "productName", type: "String", required: true, description: "Recurring product name" },
    { name: "productDescription", type: "String", required: true, description: "Recurring product description" },
    { name: "currency", type: "String", required: true, description: "Recurring payment currency" },
    { name: "amount", type: "Uint64", required: true, description: "Recurring payment amount" },
    { name: "redirectUrl", type: "String", required: true, description: "Redirect URL after customer bind card" },
    { name: "notifyUrl", type: "String", required: true, description: "Notify URL when payment has made" },
    { name: "recurringInterval", type: "String", required: true },
    { name: "recurringTarget", type: "String", required: true, description: "Recurring target rules can be different values based on interval" },
    { name: "recurringRepetition", type: "Uint64", required: true, description: "Recurring repetition rules, how many times charge the customer card" }
  ]}
/>


<strong>Recurring Target Rules:</strong>




| Interval | Target | Payment Behaviour                     |
| -------- | ------ | ------------------------------------- |
| WEEKLY   | 0      | Every week of Sunday                  |
| WEEKLY   | 1      | Every week of Monday                  |
| WEEKLY   | 2      | Every week of Tuesday                 |
| WEEKLY   | 3      | Every week of Wednesday               |
| WEEKLY   | 4      | Every week of Thursday                |
| WEEKLY   | 5      | Every week of Friday                  |
| WEEKLY   | 6      | Every week of Saturday                |
| MONTHLY  | -1     | End of every month e.g. 2022/10/31    |
| MONTHLY  | 0      | Start of every month, e.g. 2022/10/01 |
| MONTHLY  | 1 - 28 | Day of month                          |




```json title="Example Request"
{
    "storeId": "1602660043994159611",
    "email": "oska.ng@revenuemonster.my",
    "name":" Oska Ng OpenAPI",
    "countryCode": "60",
    "phoneNumber": "187824152",
    "currency":"MYR",
    "amount": 120,
    "redirectUrl": "https://google.com",
    "notifyUrl": "https://google.com",
    "productName": "Some Product Name",
    "productDescription": "Some Product productDescription",
    "recurringInterval": "WEEKLY",
    "recurringTarget": "1",
    "recurringRepetition": 10
}
```

**Response Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "item.id", type: "String", description: "Recurring payment id" },
    { name: "item.merchantId", type: "String", description: "Merchant ID" },
    { name: "item.storeId", type: "String", description: "Store ID" },
    { name: "item.label", type: "String", description: "Customer card front six last four digits" },
    { name: "item.email", type: "String", description: "Customer email" },
    { name: "item.countryCode", type: "String", description: "Customer country code" },
    { name: "item.phoneNumber", type: "String", description: "Customer phone number" },
    { name: "item.productName", type: "String", description: "Recurring product name" },
    { name: "item.productDescription", type: "String", description: "Recurring product description" },
    { name: "item.isActive", type: "String", description: "Recurring payment is active, when card bind successfully will automatically become active" },
    { name: "item.createdAt", type: "String", description: "Recurring created date time" },
    { name: "item.updatedAt", type: "String", description: "Recurring last updated date time" },
    { name: "item.clientKey", type: "String", description: "Internal usage only" },
    { name: "item.redirectUrl", type: "String", description: "URL for customer to redirect after card bind" },
    { name: "item.notifyUrl", type: "String", description: "URL for notify when transaction made" },
    { name: "item.paymentUrl", type: "String", description: "URL for customer bind their card" },
    { name: "item.recurringPayment.amount", type: "Uint64", description: "Recurring payment amount" },
    { name: "item.recurringPayment.currency", type: "Uint64", description: "Recurring payment currency" },
    { name: "item.recurringPayment.recurringInterval", type: "Uint64", description: "Recurring payment interval" },
    { name: "item.recurringPayment.recurringTarget", type: "Uint64", description: "Recurring target rules can be different values based on interval" },
    { name: "item.recurringPayment.recurringRepetition", type: "Uint64", description: "Recurring repetition rules, how many times charge the customer card" },
    { name: "code", type: "String", description: "Determine request have success" },
    { name: "error.code", type: "String", description: "Error code" },
    { name: "error.message", type: "String", description: "Error message" },
    { name: "error.debug", type: "String", description: "Debug message ( sandbox only )" }
  ]}
/>



### Redirect Response

:::info
Redirect URL to redirect your customer back to your page after card bind, it's can be any of the URL ( deeplink, browser url, server url ) as long as the browser itself can go and process.
:::

**Method :** <span style={{ color: "orange", fontWeight: "bold" }}>GET</span><br/>

<ParamTable
  title="Details"
  rows={[
    { name: "status", type: "String", required: true, description: "Card bind status" },
    { name: "customerId", type: "String", required: true, description: "Card bind customer id" },
    { name: "reason", type: "String", description: "Card bind fail reason" }
  ]}
/>


### Notify Response

:::info
Notify URL or Callback URL to inform server on transaction status after payment made. <br />

Notify will call only when the transaction is success, fail and refund will not fired a notify to your server. We suggest you to do a query transaction to get full transaction info if you need full info, for notify will only response the partial transaction info.

Reference: [Query Transaction](./query-transaction.md)
:::

**Method :** <span style={{ color: "orange", fontWeight: "bold" }}>GET</span><br/>

<ParamTable
  title="Details"
  rows={[
    { name: "eventType", type: "String", required: true, description: "Notify event type" },
    { name: "data.amount", type: "Uint64", required: true, description: "Recurring payment amount" },
    { name: "data.currency", type: "String", required: true, description: "Recurring order currency" },
    { name: "data.countryCode", type: "String", required: true, description: "Recurring customer country code" },
    { name: "data.phoneNumber", type: "String", required: true, description: "Recurring customer phone number" },
    { name: "data.customerId", type: "String", required: true, description: "Recurring customer id" },
    { name: "data.email", type: "String", required: true, description: "Recurring customer email" },
    { name: "data.name", type: "String", required: true, description: "Recurring customer name" },
    { name: "data.merchantId", type: "String", required: true, description: "Merchant id" },
    { name: "data.storeId", type: "String", required: true, description: "Store id" },
    { name: "data.orderId", type: "String", required: true, description: "Recurring transaction order id" },
    { name: "data.status", type: "String", required: true },
    { name: "data.createdAt", type: "String", required: true, description: "Recurring order created date time" },
    { name: "data.updatedAt", type: "String", required: true, description: "Recurring order updated date time" }
  ]}
/>


## Tokenization: Tokenized Payment

Tokenized payment is for your to let your customer bind their card and you can take the fund from customer and receive payment based on your own requirements. If you have own recurring engine to process payment you can using this API instead of our recurring payment example like [WooCommerce Subscription Plugin](https://woocommerce.com/products/woocommerce-subscriptions/).

### Create Tokenized Customer


**Request Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "storeId", type: "String", required: true, description: "Store ID" },
    { name: "email", type: "String", required: true, description: "Customer email" },
    { name: "name", type: "String", required: true, description: "Customer name" },
    { name: "countryCode", type: "String", required: true, description: "Customer country code" },
    { name: "phoneNumber", type: "String", required: true, description: "Customer phone number" },
    { name: "productName", type: "String", required: true, description: "Tokenized product name" },
    { name: "productDescription", type: "String", required: true, description: "Tokenized product description" },
    { name: "redirectUrl", type: "String", required: true, description: "Redirect URL after customer bind card" }
  ]}
/>


```json title="Example Request"
{
    "storeId": "1602660043994159611",
    "email": "oska.ng@revenuemonster.my",
    "name":" Oska Ng OpenAPI",
    "countryCode": "60",
    "phoneNumber": "187824152",
    "redirectUrl": "https://google.com",
    "productName": "card tokenized binding",
    "productDescription": "some description for card tokenized"
}
```

**Response Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "item.id", type: "String", description: "Recurring payment id" },
    { name: "item.merchantId", type: "String", description: "Merchant ID" },
    { name: "item.storeId", type: "String", description: "Store ID" },
    { name: "item.label", type: "String", description: "Customer card front six last four digits" },
    { name: "item.email", type: "String", description: "Customer email" },
    { name: "item.countryCode", type: "String", description: "Customer country code" },
    { name: "item.phoneNumber", type: "String", description: "Customer phone number" },
    { name: "item.productName", type: "String", description: "Recurring product name" },
    { name: "item.productDescription", type: "String", description: "Recurring product description" },
    { name: "item.isActive", type: "String", description: "Recurring payment is active, when card bind successfully will automatically become active" },
    { name: "item.createdAt", type: "String", description: "Recurring created date time" },
    { name: "item.updatedAt", type: "String", description: "Recurring last updated date time" },
    { name: "item.clientKey", type: "String", description: "Internal usage only" },
    { name: "item.redirectUrl", type: "String", description: "URL for customer to redirect after card bind" },
    { name: "notifyUrl", type: "String", description: "Notify URL when payment has made" },
    { name: "item.paymentUrl", type: "String", description: "URL for customer bind their card" },
    { name: "code", type: "String", description: "Determine request have success" },
    { name: "error.code", type: "String", description: "Error code" },
    { name: "error.message", type: "String", description: "Error message" },
    { name: "error.debug", type: "String", description: "Debug message ( sandbox only )" }
  ]}
/>


### Redirect Response

:::info
Redirect URL to redirect your customer back to your page after card bind, it's can be any of the URL ( deeplink, browser url, server url ) as long as the browser itself can go and process.
:::

**Method :** <span style={{ color: "orange", fontWeight: "bold" }}>GET</span><br/>

<ParamTable
  title="Details"
  rows={[
    { name: "status", type: "String", required: true, description: "Card bind status" },
    { name: "customerId", type: "String", required: true, description: "Card bind customer id" },
    { name: "reason", type: "String", description: "Card bind fail reason" }
  ]}
/>


## Tokenization Customer API

This section's api is available for both recurirng payment and tokenized payment's customer mainly just for partner to able utilize the tokenize payment features and also the customer informations. 

:::note
These API will be available only when the customer been binded once else you will not able to use this API to request the customer information.
:::

### Get Customer Info


**Request Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "customer_id", type: "Param", required: true, description: "Customer ID return from the creation of recurring payment / tokenize payment" }
  ]}
/>


**Response Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "item.id", type: "String", description: "Recurring payment id" },
    { name: "item.merchantId", type: "String", description: "Merchant ID" },
    { name: "item.storeId", type: "String", description: "Store ID" },
    { name: "item.label", type: "String", description: "Customer card front six last four digits" },
    { name: "item.email", type: "String", description: "Customer email" },
    { name: "item.countryCode", type: "String", description: "Customer country code" },
    { name: "item.phoneNumber", type: "String", description: "Customer phone number" },
    { name: "item.productName", type: "String", description: "Recurring product name" },
    { name: "item.productDescription", type: "String", description: "Recurring product description" },
    { name: "item.isActive", type: "String", description: "Recurring payment is active, when card bind successfully will automatically become active" },
    { name: "item.createdAt", type: "String", description: "Recurring created date time" },
    { name: "item.updatedAt", type: "String", description: "Recurring last updated date time" },
    { name: "item.clientKey", type: "String", description: "Internal usage only" },
    { name: "item.redirectUrl", type: "String", description: "URL for customer to redirect after card bind" },
    { name: "item.notifyUrl", type: "String", description: "URL for notify when transaction made" },
    { name: "item.paymentUrl", type: "String", description: "URL for customer bind their card" },
    { name: "item.recurringPayment.amount", type: "Uint64", description: "Recurring payment amount" },
    { name: "item.recurringPayment.currency", type: "Uint64", description: "Recurring payment currency" },
    { name: "item.recurringPayment.recurringInterval", type: "Uint64", description: "Recurring payment interval" },
    { name: "item.recurringPayment.recurringTarget", type: "Uint64", description: "Recurring target rules can be different values based on interval" },
    { name: "item.recurringPayment.recurringRepetition", type: "Uint64", description: "Recurring repetition rules, how many times charge the customer card" },
    { name: "code", type: "String", description: "Determine request have success" },
    { name: "error.code", type: "String", description: "Error code" },
    { name: "error.message", type: "String", description: "Error message" },
    { name: "error.debug", type: "String", description: "Debug message ( sandbox only )" }
  ]}
/>


### Get Customer Orders


**Request Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "customer_id", type: "Param", required: true, description: "Customer ID return from the creation of recurring payment / tokenize payment" }
  ]}
/>


**Response Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "item.*.id", type: "String", description: "Recurring order id" },
    { name: "item.merchantId", type: "String", description: "Merchant ID" },
    { name: "item.storeId", type: "String", description: "Store ID" },
    { name: "item.*.recurringCustomerId", type: "String", description: "Customer ID" },
    { name: "item.*.transactionId", type: "String", description: "Transaction ID" },
    { name: "item.*.createdAt", type: "String", description: "Recurring order created date time" },
    { name: "item.*.updatedAt", type: "String", description: "Recurring order last updated date time" },
    { name: "item.*.amount", type: "Uint64", description: "Recurring order payment amount" },
    { name: "item.*.currency", type: "String", description: "Recurring order currency" },
    { name: "code", type: "String", description: "Determine request have success" },
    { name: "error.code", type: "String", description: "Error code" },
    { name: "error.message", type: "String", description: "Error message" },
    { name: "error.debug", type: "String", description: "Debug message ( sandbox only )" }
  ]}
/>


### Toggle Customer Status


**Request Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "customer_id", type: "Param", required: true, description: "Customer ID return from the creation of recurring payment / tokenize payment" }
  ]}
/>



**Response Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "item.id", type: "String", description: "Recurring payment id" },
    { name: "item.merchantId", type: "String", description: "Merchant ID" },
    { name: "item.storeId", type: "String", description: "Store ID" },
    { name: "item.label", type: "String", description: "Customer card front six last four digits" },
    { name: "item.email", type: "String", description: "Customer email" },
    { name: "item.countryCode", type: "String", description: "Customer country code" },
    { name: "item.phoneNumber", type: "String", description: "Customer phone number" },
    { name: "item.productName", type: "String", description: "Recurring product name" },
    { name: "item.productDescription", type: "String", description: "Recurring product description" },
    { name: "item.isActive", type: "String", description: "Recurring payment is active, when card bind successfully will automatically become active" },
    { name: "item.createdAt", type: "String", description: "Recurring created date time" },
    { name: "item.updatedAt", type: "String", description: "Recurring last updated date time" },
    { name: "item.clientKey", type: "String", description: "Internal usage only" },
    { name: "item.redirectUrl", type: "String", description: "URL for customer to redirect after card bind" },
    { name: "item.notifyUrl", type: "String", description: "URL for notify when transaction made" },
    { name: "item.paymentUrl", type: "String", description: "URL for customer bind their card" },
    { name: "item.recurringPayment.amount", type: "Uint64", description: "Recurring payment amount" },
    { name: "item.recurringPayment.currency", type: "Uint64", description: "Recurring payment currency" },
    { name: "item.recurringPayment.recurringInterval", type: "Uint64", description: "Recurring payment interval" },
    { name: "item.recurringPayment.recurringTarget", type: "Uint64", description: "Recurring target rules can be different values based on interval" },
    { name: "item.recurringPayment.recurringRepetition", type: "Uint64", description: "Recurring repetition rules, how many times charge the customer card" },
    { name: "code", type: "String", description: "Determine request have success" },
    { name: "error.code", type: "String", description: "Error code" },
    { name: "error.message", type: "String", description: "Error message" },
    { name: "error.debug", type: "String", description: "Debug message ( sandbox only )" }
  ]}
/>


### Create Customer Order ( Payment )


:::caution
This API will use the customer binded card to make a payment, it's not a manual order creation.
:::

**Request Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "customer_id", type: "Param", required: true, description: "Customer ID return from the creation of recurring payment / tokenize payment" },
    { name: "currency", type: "String", required: true, description: "Payment currency" },
    { name: "amount", type: "Uint64", required: true, description: "Payment amount" },
    { name: "title", type: "String", description: "Payment information title" },
    { name: "description", type: "String", description: "Payment information description" }
  ]}
/>


```json title="Example Request"
{
    "currency": "MYR",
    "amount": 100,
    "title": "Some order title",
    "description": "Some order description"
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
