//importing path module
const path = require("path");
//Importing express package
const express = require("express");
//Importing mongoose for database connection
const mongoose = require("mongoose");
//importing morgan middleware to print the request format in console.
const morgan = require("morgan");
//importing handlebars to use handlebar engine
const exphbs = require("express-handlebars");
//imporitng cross origin resource sharing
const cors = require("cors");
//importing passport for authentication. needs config and middleware
const passport = require("passport");
//importing express session
const session = require("express-session");
//importing connect-mongo for sessions
const MongoStore = require("connect-mongo");
//importing routes
const dashboardRoutes = require("./routes/dashboardRoutes");
const userRoutes = require("./routes/userRoutes");
const googleRoutes = require("./routes/googleRoutes");
const diaryRoutes = require("./routes/diaryRoutes");
//initializing app
const app = express();

//Loading environment variables
if (process.env.NODE_ENV === "development") {
  //importing .env file
  require("dotenv").config({ path: "./config/.env" });
  //adding morgan middleware
  app.use(morgan("dev"));
}
require("./config/passport")(passport);

//port mapping
const PORT = process.env.PORT || PORT;
//storing env variable in local constant.
const MONGO_URI = process.env.MONGO_URI || MONGO_URI;

//Middlewars
app.use(cors({}));

//Express session middleware:
app.use(
  session({
    secret: process.env.SESSION_SECRET || SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 600000,
    },
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI || MONGO_URI }),
  })
);

//Passport middlewares
app.use(passport.initialize());
app.use(passport.session());

//configuring handlebar to use .hbs extention.
app.engine(".hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view enginer", ".hbs");

//path to Static folder. renders assets to template engine.
//path.join, choose absolute path to current dir and the public folder that contains assets.
//No need to add /public in path specification.
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/api/v1/", dashboardRoutes);
app.use("/api/v1/", userRoutes);
app.use("/auth", googleRoutes);
app.use("/api/v1/", diaryRoutes);

//connecting to the database and starting server
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connect) => {
    console.log(
      `Successfully connected to the database": ${connect.connection.host}`
    );
    app.listen(PORT, () => {
      console.log(`Successfully listening at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
