import React from 'react';

import Button from 'material-ui/Button';

function ProjectJoin(props) {
	return (
		<div className="join-project">
			<Button variant="raised" onClick= {props.handler}>
				JOIN PROJECT
			</Button>
		</div>
	);
}

export default ProjectJoin;