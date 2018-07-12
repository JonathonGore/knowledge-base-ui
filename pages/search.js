import Config from '../config.js';
import Content from '../components/content/Content.js';
import PageLayout from '../components/content/PageLayout.js';
import { getAsync } from '../util/util.js';

class Search extends React.Component {
  constructor (props) {
    super(props);
    console.log('props:')
    console.log(props);
  }

  static async getInitialProps({ req }) {
    console.log('get initial props');
    console.log(req.query);
    let query = '';
    if (req.query.query) {
        query = 'query=' + req.query.query;
        if(req.query.organization) {
          query = query + '&organization=' + req.query.organization;
        }
    }
    
    const url = Config.serverURL + '/search?' + query;
    try {
      const searchResponse = await getAsync(url);
      return ({
        posts: searchResponse.data,
      });
    } catch (error) {
      console.error(`Received ${error.response.status} when requesting search`);
    }

    return ({posts: []});
  }

  render() {
    return (
      <PageLayout>
        <Content posts={this.props.posts} />
      </PageLayout>
    );
  }
}

export default Search;
