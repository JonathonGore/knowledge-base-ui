import Layout from '../components/Layout.js'
import "../styles.scss"
import { Form, FormGroup, FormControl, Button, ControlLabel, Col, Checkbox } from 'react-bootstrap'

class Signup extends React.Component {
	render() {
		return (
			<Layout>	
				<div className="signup-form">
				<Form horizontal>
					<FormGroup controlId="email">
						<Col componentClass={ControlLabel} sm={2}>
							Email
						</Col>
						<Col sm={10}>
							<FormControl type="email" placeholder="Email" />
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
