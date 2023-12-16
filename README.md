![Logo](https://flowbite.com/docs/images/logo.svg)

# Vite Meds

ViteMeds is at the forefront of transforming how users interact with pharmacies, offering an innovative, user-friendly interface that significantly enhances the overall experience. ViteMeds brings the pharmacy to your fingertips, blending technology and healthcare in a seamless and efficient way.

## Motivation

ViteMeds is developed to streamline prescription management and improve patient accessibility to medications. This innovative solution significantly enhances the efficiency of the healthcare system by offering a user-friendly interface for both patients and healthcare providers. By simplifying the process of obtaining prescription medications, it reduces waiting/commute time and potential errors associated with traditional pharmacy visits. Vite Meds offers a wide range of products, including over-the-counter medications, making it a one-stop shop for everything health related. The platform's secure and confidential handling of patient data ensures privacy and trust, while its 24/7 availability offers unparalleled convenience, particularly for those with mobility issues or living in remote areas. Overall, Vite Meds represents a significant leap forward in making healthcare more accessible, efficient, and patient-centered.

## Build Status

Passing - All tests successful as of 16/12/2023.

- The project is currently in development.
- The development team is utilizing GitHub for version control
- To ensure a structured and organized development process, we have adopted the GitFlow workflow.

Issues to be resolved:

- When adding to cart for the first time the same medicine twice, the cart is created twice if the network hasn't responded quick enough since no lock is aquired for the cart yet. Therefore the same object will be duplicated in the cart as 2 separate entities rather than 1 entity with quantity of 2.
- Redirecting is a bit slower than we'd like it to be.## Code Style

### Formatting

Adhering to the Prettier code formatter for JavaScript. This project was built by utilizing a modern JavaScript ES6+ style in our code, combined with React functional components and Redux for state management. This approach reflects a preference for a scalable and efficient web application development. It features arrow functions, template literals, and React hooks like useState and useEffect, along with Redux's useDispatch and useSelector for state management. The project code demonstrates a structured and modular component architecture, as seen in the various component and action imports. Additionally, Next.js features were incorporated, such as optimized image handling, client-side directives and file path aliases to maintain an organized and effective development process.

### Consistency

- Naming Conventions: We use clear, meaningful variable and function names following camelCase format for javaScript variables & functions, kebab-case for custom css classes & PascalCase for react components.

- File Structure: We maintain a logical file structure, grouping related files in dedicated folders, and following a consistent naming convention for files and directories.

### Code Reviews

The development team is utilizing GitHub for version control anlong with the GitFlow workflow to ensure a structured and organized development process. Developers are required to work on separate branches and issue a pull request when their task is done, which will then be reviewed by atleast 2 other team members who will give comments for improvements or approve the merge.

## Screenshots

![Admin Dashboard](screenshots/image.png)
![Admin Sales Report](screenshots/image-1.png)
![Admin Medicines Page](screenshots/image-10.png)
![Patient Profile Page](screenshots/image-2.png)
![Patient Medicines Page](screenshots/image-4.png)
![Patient Cart](screenshots/image-5.png)
![Patient Checkout](screenshots/image-6.png)
![Patient Checkout - Add Address](screenshots/image-7.png)
![Patient View Order Details](screenshots/image-8.png)
![Patient Cancel Order Warning](screenshots/image-9.png)
![Pharmacist Profile Page](screenshots/image-11.png)

## Tech/Framework Used

![Mongo DB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)![Expree.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Node.JS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white) ![VS code](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)

### MERN stack (MongoDB, Express.js, React, Node.js)

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

### Other technologies used

- [Javascript](https://www.javascript.com/)
- [Next](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [tremor](https://www.tremor.so/)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Redux](https://redux.js.org/)
- [VSCode](https://code.visualstudio.com/)
- [Stripe](https://stripe.com/)
- [Mailtrap](https://mailtrap.io/)
- [MailJet](https://www.mailjet.com/)
- [Github](https://github.com/)
- [Postman](https://www.postman.com/)
- [Axios](https://www.axios.com/)## Features

### Guest Users

- **Informative Exploration**: Guests can learn more about ViteMeds' offerings, policies, and practices through the Home and Policy pages, ensuring transparency and informed decisions.
- **Sign Up Opportunities**: Guests can easily sign up to become a patient on ViteMeds, expanding their access to healthcare services.
- **Career Pathways**: Aspiring pharmacists can apply directly through ViteMeds, making it a gateway to professional opportunities.

### Patients

- **Medicine Browsing**: Patients have the convenience of browsing through an extensive range of medicines available on ViteMeds, view the details of each product and even get alternative suggestions if the item is sold out.
- **Cart Functionality**: The ability to add medicines to a cart facilitates a smooth shopping experience, allowing patients to manage and summarize their selections effectively.
- **Flexible Checkout Options**: Patients can finalize their purchases using their wallet or Stripe, offering flexibility and ease in transactions.
- **Profile Management**: Patients can access their user-profiles to view and manage personal details, including password changes.

### Pharmacists

- **Medicine Management**: Pharmacists have the capability to edit existing medicines or introduce new ones, ensuring the pharmacy's inventory is up-to-date.
- **Inventory Oversight**: A vital feature allowing pharmacists to monitor pharmacy medicines, ensuring adequate stock and variety.
- **Sales Insights**: Access to sales reports and order breakdowns provides pharmacists with valuable insights into pharmacy operations and customer preferences.

### Administrators

- **Comprehensive User Management**: Admins have the authority to manage patient and pharmacist accounts, ensuring proper oversight of the platform's users.
- **Admin Account Management**: Besides managing other users, admins can manage existing admin accounts or create new ones, as well as update their own passwords.
- **Application Review**: Admins play a crucial role in reviewing pharmacist applications, maintaining the quality and professionalism of the ViteMeds team.
- **Product Oversight**: Admins can view and monitor pharmacy medicines, although with limited product details compared to pharmacists.
- **Sales Analysis**: Access to sales reports and order summaries equips admins with critical data for strategic decision-making and operational insights.

**User Guide for Navigating the Platform:**
Each user role on ViteMeds - Guest, Patient, Pharmacist, and Admin - has tailored features and functionalities designed to provide a seamless and efficient experience on the platform. Whether it's for healthcare needs, professional management, or administrative oversight, ViteMeds caters to a wide spectrum of user requirements with ease and precision.

## Code Examples

### User Signup

#### backend/controllers/authController

```javascript
exports.signup = catchAsync(async (req, res, next) => {
  if (req.body.role === enums.ROLE.ADMIN) {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    token = req.cookies?.jwt;
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    var emailValidator =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    console.log(req.body.username);
    if (!emailValidator.test(req.body.username))
      return next(
        new AppError(
          "For an administrator, the username must be an email address",
          400
        )
      );
  }

  const newUser = await User.create({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });

  req.body.user = newUser.id;
  if (req.body.role === enums.ROLE.ADMIN) {
    res.status(200).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
    return;
  }
  try {
    if (req.body?.role === undefined || req.body?.role === enums.ROLE.PATIENT)
      await Patient.create(req.body);

    if (req.body.role === enums.ROLE.PHARMACIST) {
      req.body.documents = req.locals?.docs;
      await Pharmacist.create(req.body);
    }
    createSendToken(newUser, 201, req, res);
  } catch (err) {
    await User.deleteOne({ username: newUser.username });
    res.status(400).json({
      status: "fail",
      data: {
        data: err,
      },
    });
  }
  try {
    if (!req.body.role || req.body.role === "patient") {
      signupToClinic(req, res, next);
    }
  } catch (err) {
    console.error(err);
  }
});
```

### Order Checkout

#### backend/controllers/orderController

```javascript
const createOrderCheckout = async (session) => {
  console.log(session);
  const userId = session.client_reference_id;
  const user = await User.findById(userId);
  const cart = await Cart.findOne({ patient: userId });

  const deliveryAddress = user.deliveryAddress.id(
    session.metadata.deliveryAddress
  );

  const order = Order.create({
    medicines: cart.items,
    user: userId,
    deliveryAddress: deliveryAddress || user.deliveryAddress[0],
    paymentMethod: "Stripe",
    isPaid: true,
    totalPrice: cart.totalPrice,
  });
  await Cart.deleteOne({ _id: cart._id });
  // res.status(200).json({message: 'Order created successfully'});
};
```

### Send Message in Chat

#### backend/controllers/chatController

```javascript
exports.sendMessage = async (req, res) => {
  const { content, sender } = req.body;

  try {
    const newMessage = new Message({ content, sender });
    req.io.emit("newMessage", newMessage);

    await newMessage.save();

    // Emit the new message through sockets

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
```

### Add Medicine Action

#### newfrontend/src/app/redux/actions/medicineActions

```javascript
export const addMedicine = (medicine) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_MEDICINE_REQUEST,
    });
    // console.log(medicine);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${baseURL}/api/v1/medicines/new-medicine`,
      medicine,
      config
    );
    // console.log(data);

    dispatch({
      type: ADD_MEDICINE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    // console.log(error);

    dispatch({
      type: ADD_MEDICINE_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Add medicine failed. Please try again.",
    });
  }
};
```

### Add To Cart Reducer

#### newfrontend/src/app/redux/reducers/cartReducer

```javascript
export const addToCartReducer = (state = addToCartInitialState, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        loading: false,
        error: null,
      };
    case ADD_TO_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "Reset":
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
```

### Change Password Component

####newfrontend/src/components/ChangePassword.js

````javascript
"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, TextInput } from '@tremor/react';
import { Button } from '@tremor/react';
import { validatePassword } from '@/app/redux/validators';
import { changePasswordAction } from '../app/redux/actions/authActions';
import { changePasswordReducer } from '@/app/redux/reducers/authReducer';
import { BottomCallout } from "@/components/BottomCallout";

const ChangePassword = () => {

  const dispatch = useDispatch();
  const [visibleFeedback, setVisibleFeedback] = useState(false);


  const {
    loading: changeLoading,
    success: changeSuccess,
    error: changeError,
  } = useSelector((state) => state.changePasswordReducer);

  const [formData, setFormData] = useState({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changePasswordAction({ ...formData }));
    setFormData({
      passwordCurrent: "",
      password: "",
      passwordConfirm: "",
    });
  };


  return (
    <Card className="prof w-[35rem]">
      {changeSuccess && (
        <BottomCallout
          message="Changing password was successful"
          variant="success"
          visible={true}
          setVisible={setVisibleFeedback}
        />
      )}

      {changeError && (
        <BottomCallout
          message="Your Old password is not correct"
          variant="error"
          visible={true}
          setVisible={setVisibleFeedback}
        />
      )}
      <h1 className="text-xl text-white font-bold">Change Password</h1>
      <TextInput
        className="w-full px-8 py-2 rounded-lg font-medium bg-gray-800 border border-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 mt-5"
        type="password"
        onChange={handleChange}
        placeholder="Old Password"
        error={changeError && "Old Password is incorrect"}
        name="passwordCurrent"
      />
      <TextInput
        className="w-full px-8 py-2 rounded-lg font-medium bg-gray-800 border border-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400  mt-5"
        type="password"
        placeholder="New Password"
        onChange={handleChange}
        name="password"
        required
        error={
          !validatePassword(formData.password) && formData.password !== ""
        }
        errorMessage={
          !validatePassword(formData.password) &&
          formData.password !== "" &&
          "Password must be at least 8 characters with 1 uppercase, 1 lowercase and 1 number"
        }
      />
      <TextInput
        className="w-full px-8 py-2 rounded-lg font-medium bg-gray-800 border border-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400  mt-5"
        type="password"
        placeholder="Confirm Password"
        onChange={handleChange}
        name="passwordConfirm"
        required
        error={
          formData.password !== formData.passwordConfirm &&
          formData.passwordConfirm !== ""
        }
        errorMessage={
          formData.password !== formData.passwordConfirm &&
          formData.passwordConfirm !== "" &&
          "Passwords do not match"
        }
      />
      <Button
        loading={changeLoading}
        onClick={handleSubmit}
        className="prof mt-5 tracking-wide font-semibold bg-purple-600 text-gray-100 w-full py-4 rounded-lg hover:bg-purple-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
      >
        <span className="ml-3 text-white">Submit</span>
      </Button>
    </Card>
  );
};

export default ChangePassword;
```## Installation

#### Install with npm

```bash
> git clone https://github.com/advanced-computer-lab-2023/ay-haga-Clinic.git
> cd ay-haga-clinic/
> cd backend && npm i
> cd newfrontend && npm i
````

#### Frontend Dependencies

```bash
  "dependencies": {
    "@heroicons/react": "^2.0.18",
    "@material-tailwind/react": "^2.1.5",
    "@reduxjs/toolkit": "^1.9.5",
    "@stripe/stripe-js": "^2.2.0",
    "@tremor/react": "^3.5.0",
    "autoprefixer": "10.4.14",
    "axios": "^1.6.2",
    "eslint": "8.45.0",
    "eslint-config-next": "13.4.12",
    "heroicons": "^2.0.18",
    "lottie-react": "^2.4.0",
    "next": "13.4.12",
    "postcss": "8.4.27",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-icons": "^4.12.0",
    "react-redux": "^8.1.3",
    "react-select": "^5.8.0",
    "socket.io-client": "^4.7.2",
    "stripe": "^14.8.0",
    "tailwindcss": "3.3.3"
  }
```

#### Backend Dependencies

```bash
 {
  "dependencies": {
    "@babel/polyfill": "^7.4.4",
    "archiver": "^6.0.1",
    "axios": "^0.18.1",
    "bcryptjs": "^2.4.3",
    "compression": "^1.7.4",
    "cookie-parser": "^1.4.4",
    "cors": "^2.8.5",
    "dotenv": "^7.0.0",
    "express": "^4.16.4",
    "express-mongo-sanitize": "^1.3.2",
    "express-rate-limit": "^3.5.0",
    "helmet": "^3.16.0",
    "hpp": "^0.2.2",
    "html-to-text": "^5.1.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.13.21",
    "morgan": "^1.9.1",
    "multer": "^1.4.1",
    "node-mailjet": "^6.0.5",
    "node-schedule": "^2.1.1",
    "nodemailer": "^6.1.1",
    "pug": "^2.0.3",
    "raw-body": "^2.5.2",
    "sharp": "^0.30.7",
    "slugify": "^1.3.4",
    "socket.io": "^4.7.2",
    "stripe": "^10.1.0",
    "validator": "^10.11.0",
    "xss-clean": "^0.1.1"
  },
  "devDependencies": {
    "eslint": "^5.16.0",
    "eslint-config-airbnb": "^17.1.0",
    "eslint-config-prettier": "^4.1.0",
    "eslint-plugin-import": "^2.17.2",
    "eslint-plugin-jsx-a11y": "^6.2.1",
    "eslint-plugin-node": "^8.0.1",
    "eslint-plugin-prettier": "^3.0.1",
    "eslint-plugin-react": "^7.12.4",
    "prettier": "^1.17.0"
  }
}
```

## API References

<details>
<summary>User Routes</summary>

- **POST /api/v1/user/signup**
  Registers a new user with document uploads.
- **POST /api/v1/user/login**
  Authenticates a user for login.
- **POST /api/v1/user/logout**
  Ends the current user session.
- **GET /api/v1/user**
  Retrieves all users. Requires authentication.
- **DELETE /api/v1/user/:id**
  Deletes a specific user. Requires authentication.
- **POST /api/v1/user/forgotPassword**
  Initiates the password reset process for a user.
- **PATCH /api/v1/user/resetPassword**
  Allows a user to reset their password using a token.
- **GET /api/v1/user/me**
  Retrieves details of the currently authenticated user.
- **PATCH /changePassword**
  Enables the authenticated user to change their password.

</details>

<details>
<summary>Patient Routes</summary>

- **GET /api/v1/patient**
  Authorization: Bearer Token (required)
  Description: Retrieve a list of all patients. Accessible by authenticated users.
- **PATCH /api/v1/patient/addAddressToPatient**
  Authorization: Bearer Token (required)
  Access Restriction: Patient
  Body: address: String (required) - The address to be added to the patient's profile.
  Description: Adds an address to the authenticated patient's profile.
- **GET /api/v1/patient/getMyDetails**
  Authorization: Bearer Token (required)
  Description: Retrieve details of the authenticated patient.
- **GET /api/v1/patient/:id**
  Authorization: Bearer Token (required)
  Access Restriction: Administrator
  Parameters: id: String (required) - The unique ID of the patient.
  Description: Retrieve details of a specific patient by their ID. Accessible by administrators.

</details>

<details>
<summary>Pharmacist Routes</summary>

- **GET /api/v1/pharmacist/:id**
  Authorization: Bearer Token (required)
  Access Restriction: Administrator
  Parameters: id: String (required) - The unique ID of the pharmacist.
  Description: Retrieve details of a specific pharmacist by their ID. Accessible by administrators.
- **GET /api/v1/pharmacist/**
  Authorization: Bearer Token (required)
  Access Restriction: Administrator
  Description: Retrieves a list of all registered pharmacists. Accessible by administrators.
- **PATCH /api/v1/pharmacist/acceptpharmacist/:id**
  Authorization: Bearer Token (required)
  Parameters: id: String (required) - The unique ID of the pharmacist to accept.
  Description: Approves a pharmacist's application. Used by administrators.
- **GET /api/v1/pharmacist/docs/:id**
  Authorization: Bearer Token (required)
  Parameters: id: String (required) - The unique ID of the pharmacist.
  Description: Retrieve documents associated with a pharmacist. Accessible by administrators.

</details>

<details>
<summary>Order Routes</summary>

- **POST /api/v1/order/checkout-session**
  Creates a checkout session for an order.
- **POST /api/v1/order**
  Creates a new order.
- **GET /api/v1/order/viewOrderDetails/:id**
  Retrieves details of a specific order.
- **GET /api/v1/order**
  Retrieves all orders for the current user.
- **PATCH /api/v1/order/:id**
  Cancels an order.
- **GET /api/v1/order/total-sales_month/:month**
  Retrieves total sales for a specified month.
- **GET /api/v1/order/allOrders**
  Retrieves all orders.
- **GET /api/v1/order/orderCount**
  Retrieves the total count of orders.
- **GET /api/v1/order/total-sales**
  Retrieves the total sales.
- **GET /api/v1/order/profit**
  Retrieves profit from orders.
- **GET /api/v1/order/profitPerMonth/:month**
  Retrieves profit for a specified month.
- **GET /api/v1/order/expenses**
  Retrieves order expenses.
- **GET /api/v1/order/expensesPerMonth/:month**
  Retrieves expenses for a specified month.
- **GET /api/v1/order/filtered-orders/:medicineId?**
  Retrieves orders filtered by medicine ID.

</details>

<details>
<summary>Medicine Routes</summary>

- **GET /api/v1/medicines/getmedicines**
  Retrieves all medicines for the user.
- **GET /api/v1/medicines/getmedicines/pharmacist**
  Retrieves all medicines for the pharmacist.
- **GET /api/v1/medicines/getmedicines/admin**
  Retrieves all medicines for the administrator.
- **GET /api/v1/medicines/getarchivedmedicines/pharmacist**
  Retrieves all archived medicines for the pharmacist.
- **POST /api/v1/medicines/new-medicine**
  Creates a new medicine.
- **PATCH /api/v1/medicines/update/:id**
  Updates a specific medicine.
- **DELETE /api/v1/medicines/delete/:id**
  Deletes a specific medicine.
- **GET /api/v1/medicines/medUses**
  Retrieves all medicinal uses.
- **GET /api/v1/medicines/:id**
  Retrieves a specific medicine by ID.
- **PATCH /api/v1/medicines/archive/:id**
  Archives a specific medicine.
- **GET /api/v1/medicines/alternative/:id**
  Retrieves alternative medicines.

</details>

<details>
<summary>Notification Routes</summary>

- **PATCH /api/v1/notifications/:id**
  Updates a specific notification.
- **GET /api/v1/notifications**
  Retrieves all notifications.

</details>

<details>
<summary>Chat Routes</summary>

- **POST /api/v1/chat/send**
  Sends a chat message.
- **GET /api/v1/chat/history/:userId**
  Retrieves chat history with a specific user.

</details>

<details>
<summary>Cart Routes</summary>

- **GET /api/v1/cart**
  Retrieves the current user's cart.
- **POST /api/v1/cart/presc**
  Adds a prescription to the cart.
- **POST /api/v1/cart**
  Adds an item to the cart.
- **PATCH /api/v1/cart/items**
  Updates a cart item.
- **DELETE /api/v1/cart/items/:medicineId**
  Removes a cart item.

</details>

for more details refer to the [postman collection](./Elha2ny.postman_collection.json)

#### Third party APIs used

MailTrap -- Testing alert emails & transactional emails
MailJet -- Implementating alert emails & transactional emails
Stripe -- creditcard payment gateway

## Tests

For details refer to the [postman collection](./Elha2ny.postman_collection.json)

## How to Use

### How to run the project

```bash
git clone https://github.com/advanced-computer-lab-2023/ay-haga-Pharmacy.git
cd ay-haga-pharmacy/
```

- Then open 2 terminals

#### First Terminal

```bash
> cd backend
> npm install
> nodemon server
```

#### Second Terminal

```bash
> cd newfrontend
> npm install
> npm run dev
```

- you will now find the project frontend running on "localhost:3000/" & backend running on "localhost:8000/"

### User guide for navigating the platform

Refer to features section

## Contribute

Contributions are always welcome!
Contribution guidelines highlighting areas for improvement such as:

- Implementing responsive design for different device sizes.
- Using Mailjet templates for email communications.
- Optimizing heavy endpoints with NoSQL queries instead of manual looping.
- When a new cart is created, a lock should be aquired.

## Credits

Acknowledgment of resources and tutorials that assisted in the project development:

- [Udemy courses for JavaScript and Node.js](https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/)
- [YouTube tutorials](https://www.youtube.com/@NetNinja)
- [ChatGPT](https://chat.openai.com/)
- [Stack Overflow](https://stackoverflow.com/)
- Documentations for aforementioned technologies

## License

This project integrates several third-party services, each governed by its own terms of service. Below are the services we use along with links to their respective terms and licensing information:

[stripe](https://stripe.com/)
Stripe is a comprehensive payment processing platform. Our project's use of Stripe is in accordance with Stripe's services agreement, which can be reviewed at: Stripe Services Agreement. Licensed under the Apache 2.0 License.

[mailjet](https://www.mailjet.com/)
Mailjet is an email marketing and email automation service. The use of Mailjet in this project adheres to their terms of use, available here: Mailjet Terms of Use.

[mailtrap](https://mailtrap.io/)
Mailtrap is an email testing tool used for safe email development. Usage of Mailtrap in our project follows their terms of service, detailed at: Mailtrap Terms of Service.

[Apache2.0](https://www.apache.org/) this project is licensed under the Apache 2.0 License, which allows for free use, modification, and distribution.

[ViteMeds](https://opensource.org/license/mit/)
This project is open-source software licensed under the MIT License. A copy of the license is available in the project repository.
[Another Library/Tool] (Apache 2.0 License)
