import * as React from "react"
import { Link, graphql } from "gatsby"

import Seo from "../components/seo"
import BookItem from "../components/BookItem"
import styled from 'styled-components'

const LinkButton = styled.div`
  text-align: right;
  
  a {
    padding: 10px;
    color: rebeccapurple;
    border: 1px solid rebeccapurple;
    background: #fff;
    
    text-decoration: none;
    
    /* Hover stuff */
    -o-transition:.5s;
    -ms-transition:.5s;
    -moz-transition:.5s;
    -webkit-transition:.5s;
    /* ...and now for the proper property */
    transition:.5s;
    
    &:hover {
      background: rebeccapurple;
      color: #fff;
      text-decoration: none;
    }
  }
  

`


const IndexPage = (props) => {
  console.log(props);
  return (
    <section>
    {/*  Loop through books coming back from query (in props, map thru edges edges array) */}
    {/*  props.data.allbook.edges*/}
    {/*  for each edge (book) we want to render node.title node.summary and node.author.name*/}

      {props.data.allBook.edges.map(edge => (
        <BookItem
          authorName={edge.node.author.name}
          bookSummary={edge.node.summary}
          bookTitle={edge.node.title}
          bookCover={edge.node.localImage.publicURL}>
          <LinkButton>
            <Link to={`/book/${edge.node.id}`}>
              Join conversation
            </Link>
          </LinkButton>

        </BookItem>
      ))}
    </section>
  );
}


export default IndexPage

// when we export query like this, gatsby will auto run it and inject it into props for react component
export const query = graphql` 
  {
    allBook {
      edges {
        node {
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
    }
  }
  `
