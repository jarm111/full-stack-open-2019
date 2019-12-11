import gql from 'graphql-tag'
import { BOOK_DETAILS } from './fragments'

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
