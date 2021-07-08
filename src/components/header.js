import * as React from "react"
import { useContext } from "react"
import PropTypes from "prop-types"
import { Link, navigate } from "gatsby"
import { FirebaseContext } from "./Firebase"
import styled from "styled-components"

const LogoutLink = styled.span`
  color: #fff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const HeaderWrapper = styled.header`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
`;

const HeaderContent = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  display: flex;
  
  >h1 {
    margin: 0;
    flex-grow: 1;
    
    >a {
      color: white;
      text-decoration: none;
    }
  }

  >div {
    margin: auto 0;
  }
`;

const UserInfo = styled.div`
  text-align: right;
  color: #fff;
`;

const LoginLink = styled.div`
  margin: auto 0;
  a {
    color: #fff;
  }
`;

const Divider = styled.span`
  margin: 0 8px;
  padding-right: 1px;
  background: #ddd;
`;

const Header = ({ siteTitle }) => {
  // best way to access firebase context for our needs
  const {firebase, user} = useContext(FirebaseContext);
  console.log(firebase, user);

  function handleLogoutClick() {
    firebase.logout().then(() => navigate('/login'))
  }

  return (
    <HeaderWrapper>
      <HeaderContent>
        <h1>
          <Link to="/">
            {siteTitle}
          </Link>
        </h1>
        <div>
          {!!user && !!user.email &&
          <UserInfo>
            Hello, {user.username || user.email}
            <div>
              <LogoutLink onClick={handleLogoutClick}>
                Logout
              </LogoutLink>
            </div>
          </UserInfo>
          }
          {(!user || !user.email) &&
            <LoginLink>
              <Link to="/login">Login</Link>
              <Divider />
              <Link to="/register">Register</Link>
            </LoginLink>
          }
        </div>
      </HeaderContent>
    </HeaderWrapper>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
