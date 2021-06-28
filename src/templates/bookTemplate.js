// import * as React from 'react';
import React from 'react';
import Layout from "../components/layout"
import BookItem from "../components/BookItem"

const BookTemplate = (props) => {
  console.log(props.pageContext);
  return (
    // we can use the layout component to wrap our content so it looks the same as index page, etc.
    <Layout>
      <BookItem
        authorName={props.pageContext.author.name}
        bookSummary={props.pageContext.summary}
        bookTitle={props.pageContext.title}
        bookCover={props.pageContext.localImage.childImageSharp.fixed}/>
    </Layout>
  )
}

export default BookTemplate;
