const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Event = require("./models/event");
// Load env vars
dotenv.config({ path: "./config/config.env" });
// Connect to database
connectDB();
const app = express();

app.use(bodyParser.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`

    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!

    }
    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!

    }


    type RootQuery {
        events: [Event!]!
    }
    type RootMutation {
        createEvent(eventInput:EventInput): Event

    }


    schema {
         query:RootQuery
         mutation:RootMutation
        }
         `),
    rootValue: {
      events: () => {
        return Event.find()
          .then((events) => {
            return events.map((event) => {
              return { ...event._doc, _id: event.id };
            });
          })
          .catch((err) => {
            throw err;
          });
      },
      createEvent: (args) => {
        try {
          const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
          });
          return event.save().then((result) => {
            console.log(result);
            return { ...result._doc, _id: result._doc._id.toString() };
          });
        } catch (err) {
          throw err;
        }
      },
    },
    graphiql: true,
  })
);
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
