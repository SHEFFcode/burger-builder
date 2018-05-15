import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        error: null
      }
    }

    componentDidMount() {
      axios.interceptors.request.use((request) => {
        this.setState({error: null});
        return request;
      });
      axios.interceptors.response.use(response => response, error => {
        console.log(error);
        this.setState({error: error});
        return error;
      });
    }

    errorConfirmedHandler() {
      this.setState({error: null});
    }

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler.bind(this)}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
}

export default withErrorHandler;