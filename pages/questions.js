import PageLayout from '../components/content/PageLayout.js';
import Router from 'next/router';
import QuestionDisplay from '../components/content/questions/QuestionDisplay';
import { withRouter } from 'next/router';
import Index from './index.js';
import '../styles.scss';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.router.query['id'] ? props.router.query['id'] : '',
      question: {}
    };
  }

  buildContent() {
    return (
      <QuestionDisplay {...this.state.question}/>
    );
  }

  render() {
    if (this.state.id === '') {
      return (<Index />);
    }

    return (
      <PageLayout content={this.buildContent()} />
    );
  }
}

export default withRouter(Questions);
