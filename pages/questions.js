import Config from '../config.js';
import Index from './index.js';
import PageLayout from '../components/content/PageLayout.js';
import Router from 'next/router';
import QuestionDisplay from '../components/content/questions/QuestionDisplay';
import { getAsync } from '../util/util.js';
import { withRouter } from 'next/router';
import '../styles.scss';

class Questions extends React.Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps({ req }) {
    if (!req.params.id) {
      return ({ id: '' }); // Empty id causes the Index page to load.
    }

    const url = Config.serverURL + '/questions/' + req.params.id;
    const answersURL = url + '/answers';

    try {
      const questionResponse = await getAsync(url);
      const answersResponse = await getAsync(answersURL);
      return ({
        question: questionResponse.data,
        answers: answersResponse.data,
      });
    } catch (error) {
      console.error(`Received ${error.response.status} when requesting question`);
    }

    // TODO: eventually redirect to 404 page
    return ({ id: '' });
  }

  buildContent() {
    return (
      <QuestionDisplay answers={this.props.answers} question={this.props.question}/>
    );
  }

  render() {
    if (this.props.id === '') {
      return (<Index />);
    }

    return (
      <PageLayout content={this.buildContent()} />
    );
  }
}

export default withRouter(Questions);
