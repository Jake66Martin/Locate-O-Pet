import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query Query {
    me {
      _id
      name
      email
      password
      role
      petsSeen {
        _id
        species
        sex
        breed
        createdAt
        colours
        message
        status
        img
        lng
        lat
      }
      petsLost {
        _id
        species
        sex
        breed
        createdAt
        colours
        message
        status
        img
        lng
        lat
      }
    }
  }
`;

export const QUERY_PETID = gql`
  query Query($id: ID!) {
    petById(_id: $id) {
      _id
      species
      sex
      breed
      createdAt
      colours
      message
      status
      img
      lng
      lat
      user {
        _id
        name
        email
        password
      }
    }
  }
`;

export const QUERY_ALLPETS = gql`
  query AllPets {
    allPets {
      _id
      species
      sex
      breed
      createdAt
      colours
      message
      status
      img
      lng
      lat
      user {
        _id
        name
        email
        password
      }
    }
  }
`;

export const USER_EMAIL = gql`
  query UserEmail($email: String!) {
    userEmail(email: $email) 
  }
`;


