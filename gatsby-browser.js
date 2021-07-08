/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// Used during build in node env

const React = require("react");
const Layout = require('./src/components/layout').default;



// gatsby looks for this hook and will inject element and props into the func
// all we need to do is return layout component here rendering element (children) within the layout component
exports.wrapPageElement = ({element, props}) => {
  return <Layout {...props}>{element}</Layout>
}

// same code goes in gatsby-ssr
