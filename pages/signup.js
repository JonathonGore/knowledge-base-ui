import BasicLayout from '../components/BasicLayout.js';
import SignupForm from '../components/signup/SignupForm.js';
import Logo from '../components/misc/Logo.js';
import FontAwesome from 'react-fontawesome';
import Link from 'next/link';
import '../styles.scss';

class Signup extends React.Component {
	constructor (props){
		super(props);
		this.addError = this.addError.bind(this);
		this.state = { error: "" };
		this.aboutHeader = "Make your knowledge work for you";
		this.aboutText = "All of your companys knowledge sorted and"
			+ "fully searchable in one unified solution.";
	}

	componentDidMount(){
    document.body.style.backgroundColor = "#3ea9f5";
	}

	componentWillUnmount(){
	    document.body.style.backgroundColor = null;
	}

	addError(error) {
		this.setState({error: error});
	}

	render() {
		return (
			<BasicLayout>
				<div className="signup-page">
					<div className="signup-header">
						<Logo size={40} inline />
						<span className="sp-login-button">
							<Link href="/login">
								<a className="sp-login-link">Login</a>
							</Link>
						</span>
					</div>
					<div className="signup-form-container">
						<div className="error-container">
							{this.state.error}
						</div>
						<div className="signup-text-header">
							{this.aboutHeader}
						</div>
						<div className="signup-text">
							{this.aboutText}
						</div>
						<SignupForm addError={this.addError} />
					</div>
				</div>
			</BasicLayout>
		);
	}
}

export default Signup;
