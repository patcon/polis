import React from 'react'
import PropTypes from 'prop-types'
import Header from './lander-header'
import Footer from './lander-footer'
import { Box } from 'theme-ui'

const Layout = ({ children, path }) => {
  console.log("ich bin hier im Layout", path)
  const globalWidth = '45em'
  return (
    <Box
      sx={{
        margin: `0 auto`,
        maxWidth: globalWidth,
        padding: `0 1.0875rem 1.45rem`
      }}>
      <Header globalWidth={globalWidth} path={path}/>
      <Box>{children}</Box>
      <Footer />
    </Box>
  )
}

Layout.propTypes = {
  children: PropTypes.element,
  path: PropTypes.string,
}

export default Layout
