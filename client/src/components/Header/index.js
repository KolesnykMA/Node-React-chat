import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Header as HeaderUI, Image, Grid, Icon, Button } from 'semantic-ui-react';


const Header = ({ user, logout }) => {


  return (
    <div>
      <Grid centered container columns="2">
        <Grid.Column>
          {user && (
            <NavLink exact to="/">
              <HeaderUI>
                <Image />
                {' '}
                {user.username}
              </HeaderUI>
            </NavLink>
          )}
        </Grid.Column>
        <Grid.Column textAlign="right">
          <NavLink exact activeClassName="active" to="/profile">
            <Icon name="user circle" size="large" />
          </NavLink>
          <Button basic icon type="button" onClick={logout}>
            Log Out
          </Button>
        </Grid.Column>
      </Grid>
    </div>
  );
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Header;