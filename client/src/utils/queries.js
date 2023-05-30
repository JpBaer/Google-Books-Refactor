import { gql } from '@apollo/client';

export const GET_ME = gql`
    query GetCurrentUser {
        me {
            _id
            bookCount
            email
            password
            username
            savedBooks {
                authors
                bookId
                description
                image
                link
                title
            }
            
  }
    }`