import React from 'react';

import Button from 'material-ui/Button';
import DeleteIcon from '@material-ui/icons/Delete';

function ProjectMemberDelete(props) {
	return (
		<Button className="delete-member-from-project" onClick={() => props.deleteMember(props.member)}>
			<DeleteIcon />
		</Button>
	);
}

export default ProjectMemberDelete;