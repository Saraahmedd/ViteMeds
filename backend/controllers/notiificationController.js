const Notification = require("../models/notifiicationModel");
const handlerfactory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");

exports.updateNotification = handlerfactory.updateOne(Notification);

exports.getNotifications = catchAsync(async (req, res, next) => {
  const notifications = await Notification.find({ user: req.user._id });
  res.status(200).json({
    message: "success",
    data: {
      data: notifications,
    },
  });
});
