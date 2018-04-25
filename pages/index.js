import Layout from '../components/Layout.js';
import BasicLayout from '../components/BasicLayout.js';
import Link from 'next/link';
import Content from '../components/content/Content.js'
import { Form } from 'react-bootstrap';

class Index extends React.Component {
	constructor (props){
		super(props);
	}

	render() {
		return (
			<BasicLayout>
        <div className="main-container">
          <Content />
        </div>
			</BasicLayout>
		);
	}
}


export default Index;
