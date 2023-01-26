// Description: This is the entry point of the application
//import express from "express";
const express = require("express");
//assign port
const port = 5000;
//import {graphqlHTTP} from "express-graphql";
const {graphqlHTTP} = require("express-graphql");
//import GraphQLSchema,GraphQLObjectType and GraphQLString  from "graphql";
const {GraphQLSchema, GraphQLObjectType, GraphQLString} = require("graphql");

//create authors data
const authors = [
    { id: 1, name: 'J. K. Rowling' },
    { id: 2, name: 'J. R. R. Tolkien' },
    { id: 3, name: 'Brent Weeks' }
]

//create books data
const books = [
    {id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1},
    {id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1},
    {id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1},
    {id: 4, name: 'The Fellowship of the Ring', authorId: 2},
    {id: 5, name: 'The Two Towers', authorId: 2},
    {id: 6, name: 'The Return of the King', authorId: 2},
    {id: 7, name: 'The Way of Shadows', authorId: 3},
    {id: 8, name: 'Beyond the Shadows', authorId: 3}
];

//create schema
const schema = new GraphQLSchema({
    query: new GraphQLObjectType({//query is the root query
        name: 'HelloWorld',//name of the query
        fields: () => ({//fields is the object that contains the data
            message: {//message is the field
                type: GraphQLString,//type of the field
                resolve: () => 'Hello World'//resolve is the function that returns the data
            }
        })
    })
})


//create express app
const app = express();

//create graphql endpoint
app.use('/graphql', graphqlHTTP(//graphqlHTTP is the middleware that handles the graphql request
    {
        schema: schema,//schema is the schema that we created
        graphiql: true,//graphiql is the tool that we use to test our graphql endpoint
    }
))

//listen to port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);//log the port that the server is running on
});
