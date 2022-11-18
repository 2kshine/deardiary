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
//initializing app
const app = express();

//Loading environment variables
if (process.env.NODE_ENV === "development") {
  //importing .env file
  require("dotenv").config({ path: "./config/.env" });
  //adding morgan middleware
  app.use(morgan("dev"));
}

//port mapping
const PORT = process.env.PORT || PORT;
//storing env variable in local constant.
const MONGO_URI = process.env.MONGO_URI || MONGO_URI;

//Middlewars
app.use(cors({}));
//configuring handlebar to use .hbs extention.
app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");

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
