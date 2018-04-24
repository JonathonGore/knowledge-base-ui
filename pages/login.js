import Layout from '../components/Layout.js'
import { Form, FormGroup, FormControl, Button, ControlLabel, Col, Checkbox } from 'react-bootstrap'
import DismissableAlert from '../components/alerts/DismissableAlert.js';
import "../styles.scss";
import Config from '../config.json';
import $ from 'jquery';

class Signup extends React.Component {

	constructor (props){
		super(props);
		this.addError = this.addError.bind(this);
		this.prepareData = this.prepareData.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.validUserPass = this.validUserPass.bind(this);
		this.buildError = this.buildError.bind(this);
		this.username = "";
		this.password = "";
		this.email = "";
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

		return map;
	}

	addError(error) {
		this.setState({error: error});
	}

	validUserPass(obj) {
		return !(obj['username'] === "" || obj['password'] === "");
	}

	handleSubmit(e) {
		e.preventDefault();
		var self = this;
		var preparedData = self.prepareData();

		if (!self.validUserPass(preparedData)) {
			self.addError(self.buildError("please enter both a username and password to signup"));
			return
		}

		// Post to backend
		$.ajax({
			type: "POST",
			url: Config.serverURL + "/login",
			data: JSON.stringify(preparedData),
			xhrFields: {
				withCredentials: true
			},
			success: function(json) {
					// TODO: Add a redirect here
					console.log("Successfully logged in")
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
				<Form onSubmit={this.handleSubmit} horizontal>
					<FormGroup controlId="formHorizontalEmail">
						<Col componentClass={ControlLabel} sm={2}>
							Email
						</Col>
						<Col sm={10}>
							<FormControl type="text" placeholder="Username" inputRef={ref => { this.username = ref; }} />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontalPassword">
						<Col componentClass={ControlLabel} sm={2}>
							Password
						</Col>
						<Col sm={10}>
							<FormControl type="password" placeholder="Password" inputRef={ref => { this.password = ref; }} />
						</Col>
					</FormGroup>

					<FormGroup>
						<Col smOffset={2} sm={10}>
							<Checkbox>Remember me</Checkbox>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col smOffset={2} sm={10}>
							<Button type="submit">Sign in</Button>
						</Col>
					</FormGroup>
				</Form>
			</Layout>
		);
	}
}

export default Signup
