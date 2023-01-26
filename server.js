const express = require("express");

const {graphqlHTTP} = require("express-graphql");

const port = 5000;

const app = express();

app.use('/graphql', graphqlHTTP(
    {
      graphiql: true,
    }
))


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
