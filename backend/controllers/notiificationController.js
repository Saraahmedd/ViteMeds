const Notification = require('../models/notifiicationModel');
const handlerfactory = require("./handlerFactory");

exports.updateNotification = handlerfactory.updateOne(Notification)

exports.getNotifications = catchAsync(async (req,res,next)=>{
    const notifications = await Notification.find({user: req.user._id}) 
    res.status(200).json({
        message: "success",
        data: {
            data: notifications
        }
    }
    )
})