const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// Start express app
const app = express();
const adminRouter = require('./routes/adminRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const patientRouter = require('./routes/patientRoutes.js');
const pharmacistRouter = require('./routes/pharmacistRoutes.js');
const medicineRouter = require('./routes/medicineRoutes.js');

app.enable('trust proxy');


// 1) GLOBAL MIDDLEWARES
app.use(cors());

app.options('*', cors());

// Set secure HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
if (process.env.NODE_ENV === 'production') {
  app.use('/api', limiter);
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use(compression());

//Please use the following format when adding new routers, this means that any request begining with this route  /api/v1/exampleRouter after the domain will be handled by the handlers of routes inside this router
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/patient', patientRouter);
app.use('/api/v1/pharmacist', pharmacistRouter);
app.use('/api/v1/medicines', medicineRouter);

//404 Error , YOU MUST PUT YOUR ROUTERS ABOVE THAT COMMENT 
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
