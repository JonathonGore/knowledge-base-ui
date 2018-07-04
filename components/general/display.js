import moment from 'moment';
import PropTypes from 'prop-types';
import Button from '../misc/Button.js';
import Link from 'next/link';
import { DATE_FORMAT } from '../../constants/constants.js';

export const Header = (props) => (
  <div className={'display-header'}>
    <div>
      <span className='display-tab'>{props.title}</span>
      { !props.noButton ?
        (
          <span className='display-btn-container'>
            <Button text={props.buttonText} onClick={props.onClick}/>
          </span>
        ) : ''
      }
      {
        props.settings ? (
          <span className='display-settings-container'>
            {props.settings}
          </span>
        ) : ''
      }
    </div>
    <div className='display-info'>{props.info}</div>
  </div>
);

Header.propTypes = {
  info: PropTypes.node,
  title: PropTypes.string,
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
  settings: PropTypes.node,
};

Header.defaultProps = {
  info: '',
  title: '',
  buttonText: '',
  onClick: () => { console.log('Click'); },
  settings: '',
};

export const TwoPaneSplit = (props) => {
  return (
    <div className='two-pane-split-container'>
      <div className='split-pane-header'>{props.header}</div>
      <div className='two-pane-split'>
        <Panel items={props.left} {...props} />
        <Panel items={props.right} {...props} />
      </div>
    </div>
  );
};

TwoPaneSplit.propTypes = {
  header: PropTypes.string,
  left: PropTypes.array,
  right: PropTypes.array,
};

TwoPaneSplit.defaultProps = {
  header: '',
  left: [],
  right: [],
};

export const Preview = (props) => (
  <div className='display-preview'>
    <Link href={`/${props.type}/${props.name}`}>
      <a className='display-preview-name'>{props.name}</a>
    </Link>
    <div className='display-preview-stats'>
      <div>
        <span className='display-preview-members'>Members: {props['member-count']}</span>
        <span className='display-preview-teams'>{props['team-count'] !== undefined ? 'Teams: ' + props['team-count'] : ''}</span>
      </div>
      <div className='display-preview-dob'>Created On: {moment(props['created-on']).format(DATE_FORMAT)}</div>
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
