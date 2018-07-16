import Config from '../config.js';
import Content from '../components/content/Content.js';
import PageLayout from '../components/content/PageLayout.js';
import { getAsync } from '../util/util.js';

class Search extends React.Component {
  constructor (props) {
    super(props);
  }

  static async getInitialProps({ req }) {
    let query = '';
    // Check if there is a query paramter named 'query'
    if (req.query.query) {
        query = 'query=' + req.query.query;
        if(req.query.organization) {
          query = query + '&organization=' + req.query.organization;
        }
    }

    const url = Config.serverURL + '/search?' + query;
    try {
      const options =  {
        headers: {
          Cookie: `${Config.COOKIE_NAME}=${req.cookies[Config.COOKIE_NAME]}`,
        },
      }
      const searchResponse = await getAsync(url, options);
      return ({
        posts: searchResponse.data,
      });
    } catch (error) {
      console.error(`Received ${error.response.status} when requesting search`);
    }

    return ({posts: []});
  }

  getResultText = () => {
    if (this.props.posts.length === 0) {
      return 'No results found';
    } else if (this.props.posts.length === 1) {
      return `${this.props.posts.length} result`;
    }

    return `${this.props.posts.length} results`;
  }

  render() {
    return (
      <PageLayout>
        <div className='search-wrapper'>
          <div className='search-result-info'>
            <div className='search-result-text'>Search Results</div>
            <div className='search-result-count'>{this.getResultText()}</div>
          </div>
          <Content posts={this.props.posts} className='search-results-wrapper'/>
        </div>
      </PageLayout>
    );
  }
}

export default Search;
