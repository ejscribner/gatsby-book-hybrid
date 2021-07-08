/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */
const React = require('react');
const Layout = require('./src/components/layout');

// having this in both gatsby-browser and gatsby-ssr syncs up browser rendering
// and server side rendering of the Layout component which wraps all our pages
exports.wrapPageElement = ({element, props}) => {
  return <Layout {...props}>{element}</Layout>
}
