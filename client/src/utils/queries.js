import { gql } from '@apollo/client';

export const QUERY_PROPERTIES = gql`
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