import styled from "styled-components"
import * as react from "react";
import React from "react"

// styled.<anyHTMLtag> to create a component w/ styles that we can use
const BookItemWrapper = styled.section `
  border: 1px solid #ddd;
  background: #fff;
  padding: 1.5rem;
  margin-bottom: 1rem;
  display: flex; // children rendered will position side by side
  h2 { // we can also nest styles, so this applies to all <h2> inside of a BookItem
    small { // and this applies to all <small> inside of a BookItem
      font-weight: normal;
      font-size: 18px;
      padding-left: 8px;
    }
  }
`;

const BookItemImageWrapper = styled.div`
  max-width: 200px;
  margin-right: 1.5rem;
  img {
    max-width: 200px;
  }
`;

const BookItemContentWrapper = styled.div`
  flex-grow: 1;
`;

// set equal to a REACT component
const BookItem = ({ authorName, bookTitle, bookSummary, bookCover, children }) => {
  return (
    <BookItemWrapper>
      <BookItemImageWrapper>
        <img src={bookCover} alt="" />
      </BookItemImageWrapper>
      <BookItemContentWrapper>
        <h2>
          {bookTitle} <small>{authorName}</small>
        </h2>
        <p>
          {bookSummary}
        </p>
        <div>{children}</div>
      </BookItemContentWrapper>
    </BookItemWrapper>
  )
}

export default BookItem;
