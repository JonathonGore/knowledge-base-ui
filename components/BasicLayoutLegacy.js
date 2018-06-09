// This component uses bootstrap 3.3.7 instead of latest (version 4.*.*).
// This is because currently react bootstrap has not implement components for all of
// Bootstrap v4. So in order for things to work like the bootstrap navbar we must uses
// V3.
const BasicLayoutLegacy = (props) => (
  <div>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"></link>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    <div>
      {props.children}
    </div>
  </div>
);

export default BasicLayoutLegacy;
