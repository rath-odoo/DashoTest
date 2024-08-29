// src/containers/RegistrationContainer.js

import { connect } from 'react-redux';
import RegistrationForm from '../components/RegistrationForm';

const mapStateToProps = (state) => ({
  registration: state.registration,
});

export default connect(mapStateToProps)(RegistrationForm);








