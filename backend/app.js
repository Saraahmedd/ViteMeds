const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");
dotenv.config({ path: "./config.env" });

// Start express app

const app = express();
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
const socketIO = require("socket.io");
const { initSocket } = require("./utils/socket");
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
initSocket(io);

const adminRouter = require("./routes/adminRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const patientRouter = require("./routes/patientRoutes.js");
const pharmacistRouter = require("./routes/pharmacistRoutes.js");
const medicineRouter = require("./routes/medicineRoutes.js");
const orderRouter = require("./routes/orderRoutes.js");
const orderController = require("./controllers/orderController");
const cartrRouter = require("./routes/cartRoutes.js");
const notificationRouter = require("./routes/notificationRoutes.js");
const chatRoutes = require("./routes/chatRoutes");

app.enable("trust proxy");

// ... (other imports)

// 1) GLOBAL MIDDLEWARES

var corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// app.use(cors())

// app.options('*', cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Set secure HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
if (process.env.NODE_ENV === "production") {
  app.use("/api", limiter);
}

app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next(); // Do nothing with the body because I need it in a raw state.
  } else {
    express.json()(req, res, next); // ONLY do express.json() if the received request is NOT a WebHook from Stripe.
  }
});

app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  orderController.webhookCheckout
);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use(compression());

//Please use the following format when adding new routers, this means that any request begining with this route  /api/v1/exampleRouter after the domain will be handled by the handlers of routes inside this router
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/patient", patientRouter);
app.use("/api/v1/pharmacist", pharmacistRouter);
app.use("/api/v1/medicines", medicineRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/cart", cartrRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/chat", chatRoutes);

//404 Error , YOU MUST PUT YOUR ROUTERS ABOVE THAT COMMENT
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

//Scheduler for salaries

const schedule = require("node-schedule");
const User = require("./models/userModel.js");
const Pharmacist = require("./models/pharmacistModel.js");

// Define a function to update wallet with salary
const updateWalletWithSalary = async () => {
  try {
    const users = await User.find();
    for (const user of users) {
      if (user.role === "pharmacist") {
        const p = await Pharmacist.findOne({ user: user._id });
        user.wallet += p.salary ? p.salary : 2000;
        await user.save({ validateBeforeSave: false });
      }
    }
  } catch (error) {
    console.error("Error updating wallets:", error);
  }
};

updateWalletWithSalary();
// Abdullah: This is a CRON expression to execute every first day of the month
const job = schedule.scheduleJob("0 0 1 * *", updateWalletWithSalary);

// You can handle errors or log success messages in the job callback
job.on("run", () => {
  console.log("Job ran successfully!");
});

process.on("unhandledRejection", (err) => {
  //handle unhandled errors like mongoDB authentication/promise erros etc..
  console.log(err.name, err.message, err.stack);
  console.log("Shutting down");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message, err.stack);
  console.log("Shutting down");
  server.close(() => {
    process.exit(1);
  });
});

module.exports = app;
