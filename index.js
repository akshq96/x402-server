// import express from "express";
// import dotenv from "dotenv";
// import { withX402 } from "x402-open";

// dotenv.config();

// const app = express();

// app.get("/", (req, res) => {
//   res.send("Server is running");
// });

// app.get(
//   "/premium",
//   withX402({
//     price: 1000,
//     facilitatorUrl: process.env.FACILITATOR_BASE_URL
//   }),
//   (req, res) => {
//     res.json({
//       success: true,
//       message: "Access granted via x402"
//     });
//   }
// );

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });

// import express from "express";
// import dotenv from "dotenv";
// import {
//   FacilitatorClient,
//   createExpressMiddleware
// } from "x402-open";

// dotenv.config();

// const app = express();

// /**
//  * Create facilitator client (PUBLIC facilitator)
//  */
// const facilitator = new FacilitatorClient({
//   baseUrl: process.env.FACILITATOR_BASE_URL
// });

// /**
//  * Create x402 middleware
//  */
// const x402Middleware = createExpressMiddleware({
//   facilitator,
//   price: 1000
// });

// /**
//  * Free endpoint
//  */
// app.get("/", (req, res) => {
//   res.send("x402 server is running");
// });

// /**
//  * PAID endpoint (THIS IS THE SUBMISSION ENDPOINT)
//  */
// app.get("/premium", x402Middleware, (req, res) => {
//   res.json({
//     success: true,
//     message: "Paid access granted using x402"
//   });
// });

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });

import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/**
 * Free endpoint
 */ 
app.get("/", (req, res) => {
  res.send("x402 server is running");
});

/**
 * Paid endpoint (x402-protected)
 */ 
app.get("/premium", (req, res) => {
  res.status(402).json({
    error: "Payment Required",
    protocol: "x402",
    facilitator: process.env.FACILITATOR_BASE_URL,
    price: 1000,
    message: "This endpoint requires x402 payment"
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
