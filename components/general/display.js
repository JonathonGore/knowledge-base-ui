import moment from 'moment';
import PropTypes from 'prop-types';
import Button from '../misc/button.js';
import Link from 'next/link';
import { DATE_FORMAT } from '../../constants/constants.js';

export const Header = (props) => (
  <div className='display-header'>
    <div className='display-tab'>{props.title}</div>
    <span className='display-btn-container'>
      <Button text={props.buttonText} onClick={props.onClick}/>
    </span>
  </div>
);

Header.propTypes = {
  title: PropTypes.string,
  buttonText: PropTypes.string,
  onClick: PropTypes.func
};

Header.defaultProps = {
  title: 'Header',
  buttonText: 'Create',
  onClick: () => { console.log('Click'); }
};

export const TwoPaneSplit = (props) => {
  return (
    <div className='two-pane-split'>
      <Panel items={props.left} {...props} />
      <Panel items={props.right} {...props} />
    </div>
  )
};

TwoPaneSplit.propTypes = {
  left: PropTypes.array,
  right: PropTypes.array,
};

TwoPaneSplit.defaultProps = {
  left: [],
  right: [],
};

export const Preview = (props) => (
  <div className='display-preview'>
    <Link href={`/${props.type}/${props.name}`}>
      <a className='display-preview-name'>{props.name}</a>
    </Link>
    <div className='display-preview-stats'>
      <span className='display-preview-members'>Members: {props.members}</span>
      <span className='display-preview-dob'>Created On: {moment(props['created-on']).format(DATE_FORMAT)}</span>
    </div>
  </div>
);

Preview.propTypes = {
  link: PropTypes.string,
  name: PropTypes.string,
  members: PropTypes.number,
};

Preview.defaultProps = {
  link: '',
  name: '',
  members: 0,
};

export const Panel = (props) => (
  <div className='display-panel'>
    {
      props.items.map(item =>
        <Preview key={item.id} type={props.type} {...item}/>
      )
    }
  </div>
);

Panel.propTypes = {
  items: PropTypes.array,
};

Panel.defaultProps = {
  items: [],
};
