import React from 'react';

import Typography from 'material-ui/Typography';
import '../../style/style.css';

function Error404(props) {
	return(
		<div>
			<h1 className="error-header">Error 404</h1>
			<Typography className="notification-description" variant="subheading" color="textSecondary">
				<p className="error-text">{"The page you're looking for doesn't exist!"}</p>
				<p className="error-text">{"ウェブサイト が ありません。"}</p>
			</Typography>
		</div>
	);
}

export default Error404;