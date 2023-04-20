import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/transaction-confirm", (req, res) => {
  res.send("I got a transaction confirmation");
});

app.post("/vnpay/ipn", (req, res) => {
  const vnpayData = req.body;

  // Validate VNPAY payment result here
  const { vnp_SecureHash, ...vnpayFields } = vnpayData;
  const secretKey = "vnpay@MERCHANT";
  const hash = crypto
    .createHmac("SHA256", secretKey)
    .update(vnpayFields)
    .digest("hex");
  if (hash !== vnp_SecureHash) {
    return res.status(400).send("Invalid VNPAY payment result");
  }

  // Handle successful payment
  if (vnpayData.vnp_ResponseCode === "00") {
    // Payment successful
    res.send("Payment successful");
  } else {
    // Payment failed
    res.send("Payment failed");
  }
});

app.listen(443, () => {
  console.log("Example app listening on port 443!");
});
