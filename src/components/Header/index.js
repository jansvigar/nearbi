import React from "react";
import { Menu, Container } from "semantic-ui-react";

const Header = () => (
  <React.Fragment>
    <Menu inverted>
      <Container>
        <Menu.Item as="a" header>
          Nearbi
        </Menu.Item>
      </Container>
    </Menu>
  </React.Fragment>
);

export default Header;
