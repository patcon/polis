/** @jsx jsx */
import { Component } from 'react'
import { Flex, Box, jsx } from 'theme-ui'

import { Link } from 'react-router-dom'
import Logomark from '../framework/logomark'

class Header extends Component {
  render() {
    const { path } = this.props;
    console.log("ich bin hier im header", path)
    return (
      <Box>
        <Flex
          sx={{
            margin: `0 auto`,
            width: '100%',
            paddingTop: '2rem',
            paddingBottom: '1.45rem',
            justifyContent: 'space-between'
          }}>
          <Box sx={{ zIndex: 1000 }}>
            <Link sx={{ variant: 'links.nav' }} to="/home">
              <Logomark
                style={{ marginRight: 10, position: 'relative', top: 6 }}
                fill={'#03a9f4'}
              />
              Polis
            </Link>
          </Box>
          <Box>
          {path === '/' ? (
              <Link sx={{ variant: 'links.nav' }} to={'/createuser'}>
                Sign Up
              </Link>
            ) : (
              <Link 
              sx={{ variant: 'links.nav' }} 
              to={{ 
                  pathname: '/createuserPoll', 
                  state: { pathFromHeader: path }
              }}>
                Sign Up
              </Link>
            )}
          </Box>
        </Flex>
      </Box>
    )
  }
}

export default Header
