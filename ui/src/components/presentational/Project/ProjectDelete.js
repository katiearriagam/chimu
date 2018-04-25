import React from 'react';

import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

function ProjectDelete(props) {
	return (
		<span>
			<IconButton className="iconbutton" aria-label="delete-project" onClick= {props.handler}>
				<DeleteIcon />
			</IconButton>
		</span>
	);
}

export default ProjectDelete;