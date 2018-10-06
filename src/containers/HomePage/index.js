import React from 'react';
import {Segment, Container, Grid} from 'semantic-ui-react';
import Header from '../../components/Header';
import Map from '../../components/Map';

const HomePage = () => (
  <React.Fragment>
    <Grid style={{height: '90vh'}}>
      <Grid.Column width={16}>
        <Header />
        <Container style={{height: '100%'}}>
          <Segment style={{height: '100%'}}>
            <Map />
          </Segment>
        </Container>
      </Grid.Column>
    </Grid>
  </React.Fragment>
);

export default HomePage;
