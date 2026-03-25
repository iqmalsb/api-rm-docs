---
id: online-payment
title: "Online Payment"
sidebar_label: "Online Payment"

api:
  method: POST
  url:
    sandbox: https://sb-open.revenuemonster.my/v3/payment/online
    prod: https://open.revenuemonster.my/v3/payment/online
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
        "storeId": "123456789012345678901234",
        "redirectUrl": "https://merchant.com/payment/redirect",
        "notifyUrl": "https://merchant.com/payment/notify",
        "layoutVersion": "v4",
        "type": "WEB_PAYMENT",
        "order": {
          "id": "ORDER123456789012345678",
          "title": "Online Payment",
          "currencyType": "MYR",
          "amount": 1000
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
  sandbox="/v3/payment/online"
  prod="/v3/payment/online"
/>


import { Box, Heading, Text, Card, Image, Button, Flex } from "rebass";

# Online Payment

Online payment allow business to accept online payments through our web applications. With Revenue Monster's Online
Payment, customer can enter payment details or select e-wallet options to complete the payment process from their
smartphones and website.

- Demo Web Payment : [Click Here](https://sb-api.revenuemonster.my/demo/payment/online)

:::info
Online payment is an online payment method and it's subscription will based on online subscription rate.
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
        "https://drive.google.com/drive/folders/1MOJBWY6aw6KiUUMRMbHo-hXMuxjI3Z0Q?usp=sharing";
    }}
  >
    Payment Sequence Diagram
  </Button>
</Flex>

<br />

**Example of Web Payment**

![image](/img/gif/web-payment.gif)

**Example of Mobile Payment**

<img src="/img/gif/mobile-web-payment.gif" width="300" height="600" />

## Hosted Payment Checkout


:::note

- To create a unified payment checkout page for your website and mobile.
- **Data object** needs to be sorted, the **Nested object** also needs to be sorted.
:::

**Request Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "storeId", type: "String", required: true, description: "Store ID" },
    { name: "redirectUrl", type: "String", required: true, description: "Example of Redirect URL Response" },
    { name: "notifyUrl", type: "String", required: true, description: "Example of Notify URL Response" },
    { name: "layoutVersion", type: "String", required: true, description: "Always use v4" },
    { name: "type", type: "String", required: true, description: "Checkout session type" },
    { name: "method", type: "[]String", description: "Payment methods" },
    { name: "order.id", type: "String", required: true, description: "Order ID" },
    { name: "order.title", type: "String", required: true, description: "Order Title" },
    { name: "order.currencyType", type: "String", required: true, description: "Order Currency Type ( currently supported MYR only)" },
    { name: "order.amount", type: "Uint64", required: true, description: "Order Amount" },
    { name: "order.detail", type: "String", description: "Order Detail" },
    { name: "order.additionalData", type: "String", description: "Order Additional Data" },
    { name: "customer.userId", type: "String", description: "Required when the tokenization is enabled" },
    { name: "customer.email", type: "String" },
    { name: "customer.countryCode", type: "String" },
    { name: "customer.phoneNumber", type: "String" }
  ]}
/>


**Response Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "item.checkoutId", type: "String", description: "Checkout session id" },
    { name: "item.url", type: "String", description: "Checkout session url" },
    { name: "code", type: "String", description: "Determine request have success" },
    { name: "error.code", type: "String", description: "Error code" },
    { name: "error.message", type: "String", description: "Error message" },
    { name: "error.debug", type: "String", description: "Debug message ( sandbox only )" }
  ]}
/>


### Advance: Individual Payment Checkout

After you have the **checkout session url** from the checkout api.

**Example**:
https://sb-pg.revenuemonster.my/v4/checkout?checkoutId=1548316308361173347

### Redirect Response

:::info
Redirect URL to redirect your customer back to your page after payment, it's can be any of the URL ( deeplink, browser
url, server url ) as long as the browser itself can go and process.
:::

**Method :** <span style={{ color: "orange", fontWeight: "bold" }}>GET</span><br/>

<ParamTable
  title="Details"
  rows={[
    { name: "status", type: "String", required: true, description: "Payment Status" },
    { name: "orderId", type: "String", required: true, description: "Payment Order ID" },
    { name: "reason", type: "String", description: "Payment fail reason" }
  ]}
/>


### Notify Response

:::info
Notify URL or Callback URL to inform server on transaction status after payment made. <br />

Notify will call only when the transaction is success, fail and refund will not fired a notify to your server. We
suggest you to do a query transaction to get full transaction info if you need full info, for notify will only response
the partial transaction info.

Reference: [Query Transaction](./query-transaction.md)
:::

**Method :** <span style={{ color: "orange", fontWeight: "bold" }}>POST</span><br/>

<ParamTable
  title="Details"
  rows={[
    { name: "eventType", type: "ENUM(\"PAYMENT_WEB_ONLINE\")", required: true, description: "Notify event type" },
    { name: "data.store", type: "JSON", description: "Store details" },
    { name: "data.referenceId", type: "String", description: "Reference ID" },
    { name: "data.transactionId", type: "String", required: true, description: "Transaction ID" },
    { name: "data.terminalId", type: "String", description: "Terminal ID" },
    { name: "data.currencyType", type: "String", required: true, description: "Currency Type ( currently supported MYR only)" },
    { name: "data.balanceAmount", type: "Uint64", required: true, description: "Remaining balance amount for initiate refund" },
    { name: "data.finalAmount", type: "Uint64", required: true, description: "Amount after all deductions ( voucher, membership)" },
    { name: "data.platform", type: "String", required: true, description: "Transaction platform" },
    { name: "data.type", type: "String", required: true, description: "Transaction type" },
    { name: "data.method", type: "String", required: true, description: "Transaction payment method" },
    { name: "data.region", type: "String", required: true, description: "Transaction pament region" },
    { name: "data.status", type: "String", required: true, description: "Transaction payment status" },
    { name: "data.transactionAt", type: "String", description: "Transaction payment date time ( exists only when SUCCESS )" },
    { name: "data.createdAt", type: "String", required: true, description: "Transaction created date time" },
    { name: "data.updatedAt", type: "String", required: true, description: "Transaction last updated date time" },
    { name: "data.payee.userId", type: "String", description: "Payment provider user id" },
    { name: "data.payee.subUserId", type: "String", description: "Payment provider sub user id" },
    { name: "data.order.id", type: "String", required: true, description: "Order ID" },
    { name: "data.order.title", type: "String", required: true, description: "Order Title" },
    { name: "data.order.currencyType", type: "String", required: true, description: "Order Currency Type ( currently supported MYR only)" },
    { name: "data.order.amount", type: "Uint64", required: true, description: "Order Amount" },
    { name: "data.order.detail", type: "String", description: "Order Detail" },
    { name: "data.order.additionalData", type: "String", description: "Order Additional Data" }
  ]}
/>


## Query Payment Checkout

:::caution
Please note that payment checkout isn't the payment transaction info, while payment checkout will only return the
checkout information like status, amount, redirectUrl but for more information about the success payment checkout
transaction you can query transcation using [Query By Transaction ID](./query-transaction.md#query-by-transaction-id)
with the response of this API `transactionId`.
:::


**Request Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "checkoutId", type: "QueryParam", description: "Payment checkout  id" }
  ]}
/>


**Response Paramters**

<ParamTable
  title="Details"
  rows={[
    { name: "code", type: "String", description: "Determine request have success" },
    { name: "error.code", type: "String", description: "Error code" },
    { name: "error.message", type: "String", description: "Error message" },
    { name: "error.debug", type: "String", description: "Debug message ( sandbox only )" },
    { name: "item.id", type: "String", description: "Payment checkout id" },
    { name: "item.type", type: "String", description: "Payment checkout type" },
    { name: "item.transactionId", type: "String", description: "Payment transaction id, you can query transaction using Query Transaction" },
    { name: "item.order.id", type: "String", description: "Order ID" },
    { name: "item.order.title", type: "String", description: "Order Title" },
    { name: "item.order.currencyType", type: "String", description: "Order Currency Type ( currently supported MYR only)" },
    { name: "item.order.amount", type: "Uint64", description: "Order Amount" },
    { name: "item.order.detail", type: "String", description: "Order Detail" },
    { name: "item.order.additionalData", type: "String", description: "Order Additional Data" },
    { name: "item.platform", type: "String", description: "Payment checkout platform" },
    { name: "item.method", type: "String", description: "Payment checkout available methods" },
    { name: "item.redirectUrl", type: "String", description: "Payment redirect url including cancel and fail" },
    { name: "item.notifyUrl", type: "String", description: "Payment notify url" },
    { name: "item.startAt", type: "String", description: "Payment checkout start date time" },
    { name: "item.status", type: "String", description: "Payment checkout status" },
    { name: "item.createdAt", type: "String", description: "Payment checkout created date time" },
    { name: "item.updatedAt", type: "String", description: "Payment checkout last updated date time" }
  ]}
/>


## Direct Payment Checkout


:::note

- With this you can create payment checkout with your own ui design page
- There's two mode qrcode & url, most of the times URL is preferred over QRCode
- For assets information you may take from [Github](https://github.com/RevenueMonster/Payment-Icon).
  :::

:::caution
Please note that direct payment checkout is required you to perform API call to let us know that your payment checkout
is still active. So the API call for [Query Payment Checkout](#query-payment-checkout) is required else the payment
status will not keep updated until our system perform a pre-timeout check. Suggested API interval check will be 3 to 5
seconds or even longer based on your use cases.
:::

### Mode: URL

**Request Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "checkoutId", type: "String", required: true, description: "Checkout ID" },
    { name: "type", type: "String", required: true, description: "Checkout type url" },
    { name: "method", type: "String", required: true, description: "Checkout method" }
  ]}
/>


```json title="Example Request"
{
  "checkoutId": "1582438693268947023",
  "type": "URL",
  "method": "ALIPAYPLUS_MY"
}
```

**Response Paramters**

<ParamTable
  title="Details"
  rows={[
    { name: "item.type", type: "String", description: "Checkout session type" },
    { name: "item.url", type: "String", description: "Checkout session url" },
    { name: "code", type: "String", description: "Determine request have success" },
    { name: "error.code", type: "String", description: "Error code" },
    { name: "error.message", type: "String", description: "Error message" },
    { name: "error.debug", type: "String", description: "Debug message ( sandbox only )" }
  ]}
/>


### Mode: QRCode


  
  Using <b>qrCodeImageBase64</b> URL to generate a QR Code
  <Card width="100%">
    <Image src="/img/payment-image/individual-qr-code.png" />
  </Card>



  
  Once user scan the QR Code it will display 
  <Card width="100%">
    <Image src="/img/payment-image/check-out-payment.png" />
  </Card>

<br/>

**Request Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "checkoutId", type: "String", required: true, description: "Checkout ID" },
    { name: "type", type: "String", required: true, description: "Checkout type qrcode" },
    { name: "method", type: "String", required: true, description: "Checkout method" }
  ]}
/>


```json title="Example Request"
{
  "checkoutId": "1582438693268947023",
  "type": "QRCODE",
  "method": "MAYBANK_MY"
}
```

**Response Paramters**

<ParamTable
  title="Details"
  rows={[
    { name: "item.type", type: "String", description: "Checkout session type" },
    { name: "item.qrcode.base64Image", type: "String" },
    { name: "item.qrcode.data", type: "String" },
    { name: "code", type: "String", description: "Determine request have success" },
    { name: "error.code", type: "String", description: "Error code" },
    { name: "error.message", type: "String", description: "Error message" },
    { name: "error.debug", type: "String", description: "Debug message ( sandbox only )" }
  ]}
/>


### Mode: DuitNow QR

**Request Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "checkoutId", type: "String", required: true, description: "Checkout ID" },
    { name: "type", type: "String", required: true, description: "Checkout type qrcode" },
    { name: "method", type: "String", required: true, description: "Checkout method" }
  ]}
/>


```json title="Example Request"
{
  "checkoutId": "1687168234460362061",
  "method": "",
  "type": "DUITNOW_QRCODE"
}
```

**Response Paramters**

<ParamTable
  title="Details"
  rows={[
    { name: "item.type", type: "String", description: "Checkout session type" },
    { name: "item.qrcode.base64Image", type: "String" },
    { name: "item.qrcode.data", type: "String" },
    { name: "code", type: "String", description: "Determine request have success" },
    { name: "error.code", type: "String", description: "Error code" },
    { name: "error.message", type: "String", description: "Error message" },
    { name: "error.debug", type: "String", description: "Debug message ( sandbox only )" }
  ]}
/>


### Mode: Alipay Mini Program

**Request Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "checkoutId", type: "String", required: true, description: "Checkout ID" },
    { name: "type", type: "String", required: true, description: "Checkout type qrcode" },
    { name: "method", type: "String", required: true, description: "Checkout method" }
  ]}
/>


```json title="Example Request"
{
  "checkoutId": "1582438693268947023",
  "type": "MINI_PROGRAM",
  "method": "ALIPAY_CN"
}
```

**Response Paramters**

<ParamTable
  title="Details"
  rows={[
    { name: "item.type", type: "String", description: "Checkout session type" },
    { name: "item.data", type: "String", description: "Base64 encoded data for pass to mini program" },
    { name: "code", type: "String", description: "Determine request have success" },
    { name: "error.code", type: "String", description: "Error code" },
    { name: "error.message", type: "String", description: "Error message" },
    { name: "error.debug", type: "String", description: "Debug message ( sandbox only )" }
  ]}
/>


**Alipay Mini Program Frontend**

:::note
Use base64 decode data paramter, and pass into mini program api.
:::

```js
my.tradePay({
    orderStr: <
    < decoded base64 from url parameter >>,
    success
:
(res) => {
    console.log("success", res)
},
    fail
:
(res) => {
    console.log("error", res)
},
})
;
```

### Mode: WechatPay Mini Program

:::note
Before start integration, you will need contact us via support@revenuemonster.my and inform us to bind your "Mini
Program App ID / 小程序 App ID" to your account once binded then we will inform you and can proceed with the developmen.
:::

**Request Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "checkoutId", type: "String", required: true, description: "Checkout ID" },
    { name: "type", type: "String", required: true, description: "Checkout type qrcode" },
    { name: "method", type: "String", required: true, description: "Checkout method" },
    { name: "userId", type: "String", required: true, description: "Wechat User Open ID" }
  ]}
/>


```json title="Example Request"
{
  "checkoutId": "1582438693268947023",
  "type": "MINI_PROGRAM",
  "method": "WECHATPAY_CN",
  "userId": "oFGqK6w1kZyjDTtNAcOXBDHAa8CY"
}
```

**Response Paramters**

<ParamTable
  title="Details"
  rows={[
    { name: "item.type", type: "String", description: "Checkout session type" },
    { name: "item.data", type: "String", description: "Base64 encoded data for pass to mini program" },
    { name: "code", type: "String", description: "Determine request have success" },
    { name: "error.code", type: "String", description: "Error code" },
    { name: "error.message", type: "String", description: "Error message" },
    { name: "error.debug", type: "String", description: "Debug message ( sandbox only )" }
  ]}
/>


**WechatPay Mini Program Frontend**

:::note
Use base64 decode data paramter, and pass into mini program api.
:::

```js
var base64decoded = "<< decoded base64 from url parameter >>";
var payload = JSON.parse(base64decoded);
wx.requestPayment({
    ...payload,
    'success': function (res) {
        console.log("success", res)
    },
    'fail': function (res) {
        console.log("fail", res)
    },
    'complete': function (res) {
        console.log("complete", res)
    }
});
```

### Mode: FPX


  
  <b>Method</b> : <span style={{ color: "orange", fontWeight: "bold" }}>GET</span><br />
  <b>URL</b> : https://open.revenuemonster.my/v3/payment/fpx-bank<br />
  <b>Sandbox URL</b> : https://sb-open.revenuemonster.my/v3/payment/fpx-bank<br /><br />

  ```json
{
  "item": {
    "ABB0233:B2C": {
      "code": "ABB0233:B2C",
      "isOnline": true,
      "name": "Affin Bank"
    },
    "ABMB0212:B2C": {
      "code": "ABMB0212:B2C",
      "isOnline": true,
      "name": "Alliance Bank (Personal)"
    },
    "AGRO01:B2C": {
      "code": "AGRO01:B2C",
      "isOnline": true,
      "name": "AGRONet"
    },
    "AMBB0209:B2C": {
      "code": "AMBB0209:B2C",
      "isOnline": true,
      "name": "AmBank"
    },
    "BCBB0235:B2C": {
      "code": "BCBB0235:B2C",
      "isOnline": true,
      "name": "CIMB Bank"
    },
    "BIMB0340:B2C": {
      "code": "BIMB0340:B2C",
      "isOnline": true,
      "name": "Bank Islam"
    },
    "BKRM0602:B2C": {
      "code": "BKRM0602:B2C",
      "isOnline": true,
      "name": "Bank Rakyat"
    },
    "BMMB0341:B2C": {
      "code": "BMMB0341:B2C",
      "isOnline": true,
      "name": "Bank Muamalat"
    },
    "BSN0601:B2C": {
      "code": "BSN0601:B2C",
      "isOnline": true,
      "name": "Bank Simpanan Nasional"
    },
    "HLB0224:B2C": {
      "code": "HLB0224:B2C",
      "isOnline": true,
      "name": "Hong Leong Bank"
    },
    "HSBC0223:B2C": {
      "code": "HSBC0223:B2C",
      "isOnline": true,
      "name": "HSBC"
    },
    "KFH0346:B2C": {
      "code": "KFH0346:B2C",
      "isOnline": true,
      "name": "Kuwait Finance House"
    },
    "MB2U0227:B2C": {
      "code": "MB2U0227:B2C",
      "isOnline": true,
      "name": "Maybank2U"
    },
    "MBB0228:B2C": {
      "code": "MBB0228:B2C",
      "isOnline": true,
      "name": "Maybank2E"
    },
    "OCBC0229:B2C": {
      "code": "OCBC0229:B2C",
      "isOnline": true,
      "name": "OCBC"
    },
    "PBB0233:B2C": {
      "code": "PBB0233:B2C",
      "isOnline": true,
      "name": "Public Bank"
    },
    "RHB0218:B2C": {
      "code": "RHB0218:B2C",
      "isOnline": true,
      "name": "RHB Bank"
    },
    "SCB0216:B2C": {
      "code": "SCB0216:B2C",
      "isOnline": true,
      "name": "Standard Chartered Bank"
    },
    "UOB0226:B2C": {
      "code": "UOB0226:B2C",
      "isOnline": true,
      "name": "United Oversea Bank"
    }
  },
  "code": "SUCCESS"
}
  ```




  


| Code             | Name                        |
|------------------|-----------------------------|
| ABB0233:B2C      | Affin Bank                  |
| ABMB0212:B2C     | Alliance Bank (Personal)    |
| AGRO01:B2C       | AGRONet                     |
| AMBB0209:B2C     | AmBank                      |
| BCBB0235:B2C     | CIMB Bank                   |
| BIMB0340:B2C     | Bank Islam                  |
| BKRM0602:B2C     | Bank Rakyat                 |
| BMMB0341:B2C     | Bank Muamalat               |
| BSN0601:B2C      | Bank Simpanan Nasional      |
| HLB0224:B2C      | Hong Leong Bank             |
| HSBC0223:B2C     | HSBC                        |
| KFH0346:B2C      | Kuwait Finance House        |
| MB2U0227:B2C     | Maybank2U                   |
| MBB0228:B2C      | Maybank2E                   |
| OCBC0229:B2C     | OCBC                        |
| PBB0233:B2C      | Public Bank                 |
| RHB0218:B2C      | RHB Bank                    |
| SCB0216:B2C      | Standard Chartered Bank     |
| UOB0226:B2C      | United Oversea Bank         |



**Request Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "checkoutId", type: "String", required: true, description: "Checkout ID" },
    { name: "type", type: "String", required: true, description: "Checkout type qrcode" },
    { name: "method", type: "String", required: true, description: "Checkout method" },
    { name: "fpx.bankCode", type: "String", required: true, description: "FPX Bank code" }
  ]}
/>


```json title="Example Request"
{
  "checkoutId": "1687166508263303064",
  "method": "FPX_MY",
  "type": "URL",
  "fpx": {
    "bankCode": "TEST0021"
  }
}
```

**Response Paramters**

<ParamTable
  title="Details"
  rows={[
    { name: "item.type", type: "String", description: "Checkout session type" },
    { name: "item.url", type: "String", description: "FPX Payment URL" },
    { name: "code", type: "String", description: "Determine request have success" },
    { name: "error.code", type: "String", description: "Error code" },
    { name: "error.message", type: "String", description: "Error message" },
    { name: "error.debug", type: "String", description: "Debug message ( sandbox only )" }
  ]}
/>


### Mode: GoBiz / Paydee / Mastercard

**Request Parameters**

<ParamTable
  title="Details"
  rows={[
    { name: "checkoutId", type: "String", required: true, description: "Checkout ID" },
    { name: "type", type: "String", required: true, description: "Checkout type qrcode" },
    { name: "method", type: "String", required: true, description: "Checkout method" },
    { name: "gobiz.type", type: "String", description: "GoBiz Payment Type" }
  ]}
/>


```json title="Example Request"
{
  "checkoutId": "1687168234460362061",
  "method": "MASTERCARD_MY",
  "type": "URL"
}
```

**Response Paramters**

<ParamTable
  title="Details"
  rows={[
    { name: "item.type", type: "String", description: "Checkout session type" },
    { name: "item.url", type: "String", description: "GoBiz Payment URL" },
    { name: "code", type: "String", description: "Determine request have success" },
    { name: "error.code", type: "String", description: "Error code" },
    { name: "error.message", type: "String", description: "Error message" },
    { name: "error.debug", type: "String", description: "Debug message ( sandbox only )" }
  ]}
/>

