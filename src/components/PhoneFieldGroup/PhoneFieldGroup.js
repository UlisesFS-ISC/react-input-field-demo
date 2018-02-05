import React from 'react';
import {Map} from 'immutable';

import 'bulma/css/bulma.css';
import './PhoneFieldGroup.css';

import {InputField} from '../InputField/InputField';
import {ResultSet} from '../ResultSet/ResultSet';

const TYPE_LIST = ['Home', 'Work', 'Mobile', 'Other'];
const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

export class PhoneFieldGroup extends React.Component {

    PhoneFields = (content, availableTypes, updatePhoneFieldType, removePhoneField, setPhoneField) => {
        let elementCounterFlag = 0;
        return content.map((phoneFieldData, i) =>
            (
                <div key={i}>
                    <InputField
                        isRemovable={elementCounterFlag++}
                        hasSelector={true}
                        onSelectorChange={updatePhoneFieldType}
                        onRemove={removePhoneField}
                        onTextChange={setPhoneField}
                        type={i}
                        selectorOptions={availableTypes}
                    />
                </div>
            )
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            content: new Map(),
            submitFlag: false
        };
    }

    getAvailableTypes() {
        let {content} = this.state;
        let typesInUse = [...content.keys()];
        let availableTypes = TYPE_LIST.slice(0);
        typesInUse.forEach(type => {
            let indexOfType = availableTypes.indexOf(type);
            availableTypes.splice(indexOfType, 1);
        });
        return availableTypes;
    }


    updateSubmitStatus = () => {
        let submitFlag = false;
        let {content} = this.state;
        content.forEach(fieldData => {
            if (fieldData) {
                submitFlag = PHONE_REGEX.test(fieldData);
            } else {
                submitFlag = false;
            }
        });
        this.setState({
            submitFlag: submitFlag
        })
    }

    setPhoneField = (type, fieldContent) => {
        let {content} = this.state;
        if (TYPE_LIST.indexOf(type) > -1) {
            this.setState({
                content: content.set(type, fieldContent)
            });
        }
    }

    addPhoneField = () => {
        let availableTypes = this.getAvailableTypes();
        this.setPhoneField(availableTypes[0], '');
    }

    updatePhoneFieldType = (previousType, newType) => {
        let {content} = this.state;
        let contentForNewType = content.get(previousType);
        content = content.set(newType, contentForNewType);
        content = content.delete(previousType);
        this.setState({
            content: content
        });
    }

    removePhoneField = (type) => {
        let {content} = this.state;
        this.setState({
            content: content.delete(type)
        });
    }

    componentDidMount() {
        this.setPhoneField('Home', '');
    }

    componentWillUpdate() {
        if (this.state.submitFlag) {
            this.updateSubmitStatus();
        }
    }

    render() {
        let {content, submitFlag} = this.state;
        let {PhoneFields} = this;
        let availableTypes = this.getAvailableTypes();
        let logResult = submitFlag ? (<ResultSet data={content} />) : <ResultSet data={null} />;

        return (
            <div className="PhoneFieldGroup">
                {PhoneFields(content, availableTypes, this.updatePhoneFieldType, this.removePhoneField, this.setPhoneField)}
                <div className="column  is-offset-one-quarter">
                    <button className="button is-light" onClick={this.updateSubmitStatus}>Log</button>
                    <button className="button is-success" onClick={this.addPhoneField}>Add field</button>
                </div>
                <hr/>
                {logResult}
            </div>
        );
    }
}
