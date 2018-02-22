// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import { Link }       from 'react-router-dom';
// import classnames     from 'classnames/bind';
import {Jumbotron}    from '../../components';
import AnimatedView   from '../../components/animatedView/AnimatedView';
import styles         from './home.scss';
import { Container, Row, Col } from 'reactstrap';

// IMPORTANT: we need to bind classnames to CSSModule generated classes:
// const cx = classnames.bind(styles);

class Home extends PureComponent {
  static propTypes= {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,

    // views:
    currentView:  PropTypes.string.isRequired,
    enterHome:    PropTypes.func.isRequired,
    leaveHome:    PropTypes.func.isRequired
  };

  componentDidMount() {
    const { enterHome } = this.props;
    enterHome();
  }

  componentWillUnmount() {
    const { leaveHome } = this.props;
    leaveHome();
  }

  render() {
    return(
      <AnimatedView>
        <Jumbotron />

        <Container fluid>

          <Row>
            <Col xs="11" md="11" className={styles.navCards}>
              <Col xs="3" md="3">
                <div className={styles.card}></div>
              </Col>
              <Col xs="3" md="3">
                <div className={styles.card}></div>
              </Col>
              <Col xs="3" md="3">
                <div className={styles.card}></div>
              </Col>
            </Col>
            <Col xs="1" md="1">
            </Col>
          </Row>

        </Container>

      </AnimatedView>
    );
  }
}

export default Home;
