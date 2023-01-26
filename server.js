// Description: This is the entry point of the application
//import express from "express";
const express = require("express");
//assign port
const port = 5000;
//import {graphqlHTTP} from "express-graphql";
const {graphqlHTTP} = require("express-graphql");
//import GraphQLSchema,GraphQLObjectType,GraphQLList,GraphQLInt,GraphQLNonNull and GraphQLString  from "graphql";
const {GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt, GraphQLNonNull} = require("graphql");

//create authors data
const authors = [
    {id: 1, name: 'J. K. Rowling'},
    {id: 2, name: 'J. R. R. Tolkien'},
    {id: 3, name: 'Brent Weeks'}
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

//create bookType GraphQLObjectType
const BookType = new GraphQLObjectType({
    name: 'Book',//name of the type
    description: 'This represents a book written by an author',//description of the type
    fields: () => ({//fields is the object that contains the data
        id: {type: GraphQLNonNull(GraphQLInt)},//id is the field
        name: {type: GraphQLNonNull(GraphQLString)},//name is the field
        authorId: {type: GraphQLNonNull(GraphQLString)},//authorId is the field
        author: {//author is the field
            type: AuthorType,//type of the field
            resolve: (book) => {//resolve is the function that returns the data
                return authors.find(author => author.id === book.authorId)
            }
        }
    })
});

//create authorType GraphQLObjectType
const AuthorType = new GraphQLObjectType({
    name: 'Author',//name of the type
    description: 'This represents an author of a book',//description of the type
    fields: () => ({//fields is the object that contains the data
        id: {type: GraphQLNonNull(GraphQLInt)},//id is the field
        name: {type: GraphQLNonNull(GraphQLString)},//name is the field
        books: {//books is the field
            type: new GraphQLList(BookType),//type of the field
            resolve: (author) => {//resolve is the function that returns the data
                return books.filter(book => book.authorId === author.id)
            }
        }
    })
});

//create rootQuery GraphQLObjectType
const RootQueryType = new GraphQLObjectType({
    name: 'Query',//name of the type
    description: 'Root Query',//description of the type
    fields: () => ({//fields is the object that contains the data
        book: {
            type: BookType,
            description: 'A Single Book',
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (parent, args) => books.find(book => book.id === args.id)
        },
        books: {//books is the field
            type: new GraphQLList(BookType),//type of the field
            description: 'List of All Books',//description of the field
            resolve: () => books//resolve is the function that returns the data
        },
        author: {
            type: AuthorType,
            description: 'A Single Author',
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (parent, args) => authors.find(author => author.id === args.id)
        },
        authors: {//authors is the field
            type: new GraphQLList(AuthorType),//type of the field
            description: 'List of All Authors',//description of the field
            resolve: () => authors//resolve is the function that returns the data
        }
    })
});


//create rootMutation GraphQLObjectType
const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',//name of the type
    description: 'Root Mutation',//description of the type
    fields: () => ({//fields is the object that contains the data
        addBook: {//addBook is the field
            type: BookType,//type of the field
            description: 'Add a book',//description of the field
            args: {//args is the object that contains the arguments
                name: {type: GraphQLNonNull(GraphQLString)},//name is the argument
                authorId: {type: GraphQLNonNull(GraphQLInt)},//authorId is the argument
            },
            resolve: (parent, args) => {//resolve is the function that returns the data
                const book = {id: books.length + 1, name: args.name, authorId: args.authorId};
                books.push(book);
                return book;
            }
        },
        addAuthor: {//addBook is the field
            type: AuthorType,//type of the field
            description: 'Add a Author',//description of the field
            args: {//args is the object that contains the arguments
                name: {type: GraphQLNonNull(GraphQLString)},//name is the argument
            },
            resolve: (parent, args) => {//resolve is the function that returns the data
                const author = {id: authors.length + 1, name: args.name};//create author
                authors.push(author);//push the author to the authors array
                return author;//resolve is the function that returns the data
            }
        }
    })
});


//create schema
const schema = new GraphQLSchema({
    query: RootQueryType,//query is the root query
    mutation: RootMutationType//mutation is the root mutation
})

// //create schema
// const schema = new GraphQLSchema({
//     query: new GraphQLObjectType({//query is the root query
//         name: 'HelloWorld',//name of the query
//         fields: () => ({//fields is the object that contains the data
//             message: {//message is the field
//                 type: GraphQLString,//type of the field
//                 resolve: () => 'Hello World'//resolve is the function that returns the data
//             }
//         })
//     })
// })


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
