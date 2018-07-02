import Header from './Header';

const layoutStyle = {
	  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
};

const Layout = (props) => (
  <div>
    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css'></link>
    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'></link>
    <Header />
    <div style={layoutStyle}>
      {props.children}
    </div>
  </div>
);

export default Layout;
