import React from "react";
import { Menu, Container, Icon } from "semantic-ui-react";

const SiteHeader = () => (
  <React.Fragment>
    <Menu inverted>
      <Container>
        <Menu.Item as="a" header>
          <Icon name="location arrow" size="large" inverted />
          NEARBI
        </Menu.Item>
      </Container>
    </Menu>
  </React.Fragment>
);

export default SiteHeader;
