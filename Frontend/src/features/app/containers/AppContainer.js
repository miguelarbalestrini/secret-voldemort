import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import App from '../components/App';

import { getUserData, getLoginData } from '../../login/actions/LoginAction';

function mapStateToProps(state) {
    return {
        statusLogin: state.login.statusLogin,
        is_logged: state.login.is_logged
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getUserData,
        getLoginData
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
