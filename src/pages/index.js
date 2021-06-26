import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = (props) => {
  console.log(props);
  return (
    <Layout>
    {/*  Loop through books coming back from query (in props, map thru edges edges array) */}
    {/*  props.data.allbook.edges*/}
    {/*  for each edge (book) we want to render node.title node.summary and node.author.name*/}

      {props.data.allBook.edges.map(edge => (
        <div key={edge.node.id}>
          <h2>
            {edge.node.title} - <small>{edge.node.author.name}</small>
          </h2>
          <div>
            {edge.node.summary}
          </div>
          <Link to={`/book/${edge.node.id}`}>
            Join conversation
          </Link>
        </div>
      ))}
    </Layout>
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
          author {
            name
          }
        }
      }
    }
  }
  `
