import { gql } from '@apollo/client';

//me will get the information for the logged in user
export const GET_ME = gql`
    query me {
        me {
            _id
            email
            username
            bookCount
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