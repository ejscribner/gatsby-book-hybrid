import * as React from 'react';
import Layout from "../components/layout"
import BookItem from "../components/BookItem"
import { BookComments } from "../components/common"

import {graphql} from "gatsby"
import { useContext } from "react"
import { FirebaseContext } from "../components/Firebase"

const BookTemplate = (props) => {
  const {firebase} = useContext(FirebaseContext);

  return (
    // we can use the layout component to wrap our content so it looks the same as index page, etc.
    <section>
      <BookItem
        authorName={props.data.book.author.name}
        bookSummary={props.data.book.summary}
        bookTitle={props.data.book.title}
        bookCover={props.data.book.localImage.publicURL}/>
      {!!firebase &&
        <BookComments firebase={firebase} bookId={props.data.book.id}/>
      }
    </section>
  )
};

export const query = graphql`
  query BookQuery($bookId: String!) {
    book(id: {eq: $bookId}) {
      id
      summary
      title
      localImage {
        publicURL 
      }
      author {
        name
      }
    }
  }
`;

export default BookTemplate;
