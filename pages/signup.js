import Layout from '../components/Layout.js';
import DismissableAlert from '../components/alerts/DismissableAlert.js';
import "../styles.scss";
import { Form, FormGroup, FormControl, Button, ControlLabel, Col, Checkbox } from 'react-bootstrap';
import Config from '../config.json';
import $ from "jquery";

class Signup extends React.Component {

	constructor (props){
		super(props);
		this.addError = this.addError.bind(this);
		this.prepareData = this.prepareData.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.validUserPass = this.validUserPass.bind(this);
		this.confirmPasswordMatch = this.confirmPasswordMatch.bind(this);
		this.buildError = this.buildError.bind(this);
		this.state = { error: ""};
	}

	buildError(message) {
		return (
			<DismissableAlert type='danger' title='Unable to signup' message={message} />
		);
	}

	// Converts the array data from serializeArray() into usable JSON
	prepareData(formArray) {
		var map = {};
		for (var i = 0; i < formArray.length; i++) {
		  map[formArray[i]['name']] = formArray[i]['value'];
		}

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
		var valueMap = $('#signupForm').serializeArray();
		var preparedData = self.prepareData(valueMap);

		if (!self.validUserPass(preparedData)) {
			self.state.addError(self.buildError("please enter both a username and password to signup"));
			return
		}

		if(!self.confirmPasswordMatch(preparedData)) {
			self.state.addError(self.buildError("passwords do not match"));
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
				<Form id="signupForm" onSubmit={this.handleSubmit} method="post">
					<FormGroup controlId="email">
						<Col componentClass={ControlLabel} sm={2}>
							Email
						</Col>
						<Col sm={10}>
							<FormControl type="email" placeholder="Email" />
						</Col>
					</FormGroup>

					<FormGroup controlId="username">
						<Col componentClass={ControlLabel} sm={2}>
							Username
						</Col>
						<Col sm={10}>
							<FormControl type="text" placeholder="Username" />
						</Col>
					</FormGroup>

					<FormGroup controlId="password">
						<Col componentClass={ControlLabel} sm={2}>
							Password
						</Col>
						<Col sm={10}>
							<FormControl type="password" placeholder="Password" />
						</Col>
					</FormGroup>

					<FormGroup controlId="confirmPassword">
						<Col componentClass={ControlLabel} sm={2}>
							Confirm Password
						</Col>
						<Col sm={10}>
							<FormControl type="password" placeholder="Confirm Password" />
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
