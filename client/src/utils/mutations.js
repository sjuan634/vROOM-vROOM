import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`

export const ADMIN_LOGIN_MUTATION = gql`
  mutation AdminLogin($email: String!, $password: String!) {
    adminLogin(email: $email, password: $password) {
      token
      user {
        _id
        isAdmin
      }
    }
  }
`;


export const ADD_USER_MUTATION = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
        properties {
          _id
          name
          address
          images
          night_cost
          available_date
          room
          house
          description
        }
      }
    }
  }
`;


export const SIGNUP_ADMIN = gql`
  mutation SignupAdmin($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    signupAdmin(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
        isAdmin
      }
    }
  }
`;