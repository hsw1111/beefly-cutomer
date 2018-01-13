import React from 'react';

export default class Error404 extends React.Component {
	render() {
		return (
			<div className="error-page">
				<div className="error-content">
					<h3><i className="fa fa-warning text-yellow"></i> 404! Page not found.</h3>
				</div>
			</div>
		)
	}
}
