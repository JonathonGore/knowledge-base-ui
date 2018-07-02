import Meta from '../Meta';
import Navbar from './Navbar';

const LandingPage = (props) => (
  <div>
    <Meta />
    <Navbar />
    <style jsx global>{`
    body {
      font: 11px Geneva;
      color: #fff;
    }
  `}</style>
  </div>
);

export default LandingPage;
