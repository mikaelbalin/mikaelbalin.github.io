import { gql } from "graphql-request";

export const query = gql`
  query homePageData {
    homePage {
      data {
        attributes {
          title
          description
          blocks {
            ... on ComponentLayoutHeroSection {
              heading
              description
              link {
                url
                text
              }
            }
          }
        }
      }
    }
  }
`;
