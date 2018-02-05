import React from 'react';

import { PhoneFieldGroup }  from '../../components/PhoneFieldGroup/PhoneFieldGroup';

import 'bulma/css/bulma.css';

export class Home extends React.Component {
	render() {
		return (
			<div>
			    <div className="columns">
			        <div className="column is-half is-offset-one-quarter">
						<PhoneFieldGroup />
			        </div>
			    </div>
			</div>
		);
   	}
}