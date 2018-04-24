import Layout from '../components/Layout.js';
import DismissableAlert from '../components/alerts/DismissableAlert.js';
import "../styles.scss";
import { Form, FormGroup, FormControl, Button, ControlLabel, Col, Checkbox } from 'react-bootstrap';
import Config from '../config.json';
import $ from 'jquery';

class Signup extends React.Component {

	constructor (props){
		super(props);
		this.addError = this.addError.bind(this);
		this.prepareData = this.prepareData.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.validUserPass = this.validUserPass.bind(this);
		this.confirmPasswordMatch = this.confirmPasswordMatch.bind(this);
		this.buildError = this.buildError.bind(this);
		this.username = "";
		this.password = "";
		this.email = "";
		this.confirmPassword = "";
		this.state = { error: ""};
	}

	buildError(message) {
		return (
			<DismissableAlert type='danger' title='Unable to signup' message={message} />
		);
	}

	prepareData() {
		var map = {};
		map['email'] = this.email.value;
		map['username'] = this.username.value;
		map['password'] = this.password.value;
		map['confirmPassword'] = this.confirmPassword.value;

		return map;
	}

	addError(error) {
		this.setState({error: error});
	}

	validUserPass(obj) {
		return !(obj['username'] === "" || obj['password'] === "");
	}

	confirmPasswordMatch(obj) {
		return obj['password'] === obj['confirmPassword'];
	}

	handleSubmit(e) {
		e.preventDefault();
		var self = this;
		var preparedData = self.prepareData();

		if (!self.validUserPass(preparedData)) {
			self.addError(self.buildError("please enter both a username and password to signup"));
			return
		}

		if(!self.confirmPasswordMatch(preparedData)) {
			self.addError(self.buildError("passwords do not match"));
			return
		}

		// Post to backend
		$.ajax({
			type: "POST",
			url: Config.serverURL + "/users",
			data: JSON.stringify(preparedData),
			xhrFields: {
				withCredentials: false
			},
			success: function(json) {
				$.ajax({
					type: "POST",
					url: Config.serverURL + "/login",
					data: JSON.stringify(preparedData),
					xhrFields: {
						withCredentials: true
					},
					success: function(json) {
						// Cause a rerender of our global components
						//self.props.updateLoginStatus(true);
						//self.setState({signupRedirect: true});
						console.log("Successfully logged in");
					},
					error: function (xhr) {
						//TODO: ensure responseText is JSON;
						var data = JSON.parse(xhr.responseText);
						self.addError(self.buildError(data['error']));
					}
				});
			},
			error: function (xhr) {
				var data = JSON.parse(xhr.responseText);
				self.addError(self.buildError(data['error']));
			}
		});
	}

	render() {
		return (
			<Layout>
				<div className="signup-form">
				<div className="error-container">
					{this.state.error}
				</div>
				<Form onSubmit={this.handleSubmit} method="post">
					<FormGroup controlId="email">
						<Col componentClass={ControlLabel} sm={2}>
							Email
						</Col>
						<Col sm={10}>
							<FormControl type="email" placeholder="Email" inputRef={ref => { this.email = ref; }}/>
						</Col>
					</FormGroup>

					<FormGroup controlId="username">
						<Col componentClass={ControlLabel} sm={2}>
							Username
						</Col>
						<Col sm={10}>
							<FormControl type="text" placeholder="Username" inputRef={ref => { this.username = ref; }}/>
						</Col>
					</FormGroup>

					<FormGroup controlId="password">
						<Col componentClass={ControlLabel} sm={2}>
							Password
						</Col>
						<Col sm={10}>
							<FormControl type="password" placeholder="Password" inputRef={ref => { this.password = ref; }} />
						</Col>
					</FormGroup>

					<FormGroup controlId="confirmPassword">
						<Col componentClass={ControlLabel} sm={2}>
							Confirm Password
						</Col>
						<Col sm={10}>
							<FormControl type="password" placeholder="Confirm Password" inputRef={ref => { this.confirmPassword = ref; }}/>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col smOffset={2} sm={10}>
							<Button type="submit">Sign up</Button>
						</Col>
					</FormGroup>
				</Form>
				</div>
			</Layout>
		);
	}
}

export default Signup
