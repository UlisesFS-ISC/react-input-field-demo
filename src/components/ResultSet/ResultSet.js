import React from 'react';
import PropTypes from 'prop-types';

export let ResultSet = (props) => {

    let resultSet = null;
    let {data} = props;

    if (!data && data === null) {
        resultSet = (
            <div>
                <label className="label">Please enter valid phone numbers on the field(s)</label>
            </div>
        );
    } else {
        let entryElements = data.map((dataEntry, i) =>
            (
                <div>
                    <label className="label">{`${i}: ${dataEntry}`}</label>
                </div>
            ));
        resultSet = (
            <div>
                {entryElements}
            </div>
        );
    }

    return (
        <div className="column is-offset-one-quarter">
            {resultSet}
        </div>
    );
};

ResultSet.PropTypes = {
    data: PropTypes.Map
};