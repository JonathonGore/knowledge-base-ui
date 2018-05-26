import BasicLayoutLegacy from '../BasicLayoutLegacy.js';
import MenuPanel from '../MenuPanel.js';
import KBNavbar from '../navbar/Navbar.js';
import { getCookie } from '../../util/util.js';
import "../../styles.scss";

const COOKIE_NAME = 'kb-public';

class PageLayout extends React.Component {
	constructor (props){
		super(props);
    this.toggleClass = this.toggleClass.bind(this);

    this.displayedClass = "displayed";
    this.collapsedClass = "collapsed";

    this.state = {
      content: props.content ? props.content : "",
      marginClass: this.collapsedClass,
			username: '',
			isLoggedIn: false
    };
	}

	componentDidMount() {
		const uname = getCookie(COOKIE_NAME);

		this.setState({
			username: uname,
			isLoggedIn: uname !== ''
		});
	}

	toggleClass() {
	  if (this.state.marginClass === this.displayedClass) {
	    this.setState({marginClass: this.collapsedClass});
	  } else {
	    this.setState({marginClass: this.displayedClass});
	  }
	}

	render() {
		return (
			<BasicLayoutLegacy>
        <div className='main-container'>
          <div className={'full-width'} >
						<KBNavbar username={this.state.username} isLoggedIn={this.state.isLoggedIn}/>
            <div className='main-container-content'>
							{this.props.content}
						</div>
          </div>
        </div>
			</BasicLayoutLegacy>
		);
	}
}


export default PageLayout;
