import BasicLayout from '../BasicLayout.js';
import MenuPanel from '../MenuPanel.js';
import Navbar from '../navbar/Navbar.js';
import "../../styles.scss";

class PageLayout extends React.Component {
	constructor (props){
		super(props);
    this.toggleClass = this.toggleClass.bind(this);

    this.displayedClass = "displayed";
    this.collapsedClass = "collapsed";

    this.state = {
      content: props.content ? props.content : "",
      marginClass: this.collapsedClass
    };
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
			<BasicLayout>
        <div className='main-container'>
          <div className={'full-width'} >
						<Navbar text={'Top Questions'}/>
            <div className='main-container-content'>
							{this.props.content}
						</div>
          </div>
        </div>
			</BasicLayout>
		);
	}
}


export default PageLayout;
