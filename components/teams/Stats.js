import moment from 'moment';

const DATE_FORMAT = 'MMM Do YYYY';

const Stats = (props) => (
  <div className='team-display-stats'>
    <span className='team-display-members'>Members: {props.members}</span>
    <span className='team-display-dob'>Created On: {moment(props.createdOn).format(DATE_FORMAT)}</span>
  </div>
);

export default Stats;
