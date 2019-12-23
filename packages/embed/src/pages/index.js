import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Helmet from 'react-helmet';

const windowGlobal = typeof window !== "undefined" && window;

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
  }

  render() {

    return (
      <Fragment>
        <Helmet>
          <title>{`papergov One`}</title>
        </Helmet>
      </Fragment>
    );
  }
}

const mapStateToProps = function (state, ownProps) {
    return {
      oneService: state.oneServices,
      oneUser: state.oneUser
    };
};

export default connect(mapStateToProps)(Index);