const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");

const dotenv = require("dotenv");
const connectDB = require("./config/db");
const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolver/index");

// Load env vars
dotenv.config({ path: "./config/config.env" });
// Connect to database
connectDB();
const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
