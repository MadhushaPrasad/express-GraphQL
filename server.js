const express = require("express");

const expressGraphQL = require("express-graphql");

const app = express();

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
