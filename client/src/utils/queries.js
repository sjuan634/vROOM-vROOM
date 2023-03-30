import { gql } from '@apollo/client';

export const queryProperties = gql`
  {
    user {
      user_id
      properties {
        address
        night_cost
        available_date
      }
    }
  }
`;