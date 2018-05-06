import BasicLayout from '../BasicLayout.js';
import Link from 'next/link';
import MenuPanel from '../MenuPanel.js';
import "../../styles.scss";

class PageLayout extends React.Component {
	constructor (props){
		super(props);
    this.toggleClass = this.toggleClass.bind(this);

    this.displayedClass = "displayed";
    this.collapsedClass = "collapsed";

    this.state = {
      content: props.content ? props.content : "",
      marginClass: this.displayedClass
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
        <div className="main-container">
          <MenuPanel onToggle={this.toggleClass} />
          <div className={this.state.marginClass + " full-width"} >
            {this.props.content}
          </div>
        </div>
			</BasicLayout>
		);
	}
}


export default PageLayout;
