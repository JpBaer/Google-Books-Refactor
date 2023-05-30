const { gql } = require('apollo-server-express');

const typeDefs = gql`

# Add ! to things that are required
type Book {
  authors: [String]
  description: String
  bookId: String
  image: String
  link: String
  title: String
}

type User {
  _id: ID
  username: String
  email: String
  password: String
  bookCount: Int
  savedBooks: [Book]
}

type Auth {
  token: ID!
  user: User
}

input bookInput {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

type Query {
    me: User
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  saveBook(
    input: bookInput
  ): User
  removeBook(userId: ID!, bookId: ID!): User
}
`

module.exports = typeDefs;