const mongoose = require("mongoose");
const Medicine = require("./medicineModel");
const User = require("./userModel");
const Notification = require("./notifiicationModel");

const orderSchema = new mongoose.Schema({
  medicines: [
    {
      medicine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicine",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deliveryAddress: {
    streetAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["COD", "Wallet", "Stripe"],
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: "Pending",
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

orderSchema.post("save", async function(doc) {
  if (doc.status === "Pending") {
    // Check if the order is newly created

    for (const orderItem of doc.medicines) {
      const medicine = await Medicine.findById(orderItem.medicine);

      if (medicine) {
        console.log(medicine.quantity);
        medicine.quantity -= orderItem.quantity;
        medicine.sales += orderItem.quantity * medicine.price;
        await medicine.save();

        if (medicine.quantity === 0) {
          // Create a new notification for every user
          const users = await User.find();
          const notificationText = `Medicine ${medicine.name} is out of stock.`;

          for (const user of users) {
            if (user.role !== "pharmacist") continue;

            const newNotification = new Notification({
              title: "Out of Stock",
              text: notificationText,
              user: user._id, // Associate the notification with the current user
            });

            await newNotification.save();
            sendEmails(medicine, user);
          }
        }
      }
    }
  } else {
    for (const orderItem of doc.medicines) {
      const medicine = await Medicine.findById(orderItem.medicine);

      if (medicine) {
        medicine.quantity += orderItem.quantity;
        // medicine.sales -= orderItem.quantity * medicine.price; //Is this the intended behaviour, we need to ask;Abdullah
        await medicine.save();
      }
    }
  }
});

const sendEmails = async (medicine, user) => {
  try {
    await new Email(user).sendMedOutfStock(medicine);
  } catch (err) {
    console.log(err);
  }
};

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
