// Description: This is the entry point of the application
//import express from "express";
const express = require("express");

//import {graphqlHTTP} from "express-graphql";
const {graphqlHTTP} = require("express-graphql");

//assign port
const port = 5000;

//create express app
const app = express();

//create graphql endpoint
app.use('/graphql', graphqlHTTP(
    {
      graphiql: true,
    }
))

//listen to port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
