# node-api-and-client
 Node API and Client used for managing users and their favorite bands
 
 Author : Sahil Mehta
 
 **BandsAPI :** 
- A separate API used for all CRUD operation on User and their Bands.
- Sequelize ORM is used for manipulating data in database.
- MySQL Database used to store User and Bands data.
- URLs for API are:
     - **GET:** 
         - `/api/users/user/:uid` -> Get user profile
         - `/api/users/:uid/bands` -> Get all bands of user
         - `/api/users/:uid/bands/band/:bid` -> Get specific band of user
     - **POST:**
         - `/api/users/verify-otp` -> Gets otp of user that matches email in request body
         - `/api/users` -> Creates a new user
         - `/api/users/user` -> Gets password of a user that matches email in request body
         - `/api/users/:uid/bands` -> Creates new band for a user
     - **PUT:**
         - `/api/users/reset-pswd` -> updates password of user that matches email in the request body
         - `/api/users/send-otp` -> updates otp of a user that matches email in request body
         - `/api/users/user/:uid` -> Updates user profile 
         - `/api/users/:uid/bands/band/:bid` -> Update specific band of user
     - **DELETE:** 
         - `/api/users/:uid/bands/band/:bid` -> Deletes specific band of user 

**BandsAPP :**
- Application that manages users and their bands.
- Consumes BandsAPI.
- Encrypts password using bcrypt package.
- Has forgot password functionality, which allows user to reset their password by verifying OTP sent to their registered email.
- Uses express-session to maintain user sessions and avoid unauthorized access to a resource
- Uses node-fetch to consume API.
- All views are powered by ejs(Embedded JavaScript).
