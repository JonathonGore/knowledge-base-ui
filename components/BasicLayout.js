const BasicLayout = (props) => (
	<div>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"></link>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>
		<div>
				{props.children}
		</div>
	</div>
);

export default BasicLayout;
