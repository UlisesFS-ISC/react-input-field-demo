import React from 'react';
import ReactDOM from 'react-dom';

import {Home} from './Pages/Home/Home';

const title = "React input fields demo";
class App extends React.Component {
    render() {
        return (
        	<div>
        	    <div className="column is-half is-offset-one-quarter">
        	        <div className="title">{title}</div>
        	    </div>
        	   <Home/>
        	</div>
        )
    }
}

ReactDOM.render(<App/>, app)
module.hot.accept();