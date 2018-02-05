import React from 'react';
import PropTypes from 'prop-types';
import 'bulma/css/bulma.css';
import './InputField.css';

export class InputField extends React.Component {

    static PropTypes = {
        textContent: PropTypes.string,
        selectorOptions: PropTypes.Array,
        hasSelector: PropTypes.bool,
        isRemovable: PropTypes.bool,
        onSelectorChange: PropTypes.func,
        onTextChange: PropTypes.func,
        onRemove: PropTypes.func
    };


    AvailableOptionsSelector = ({onSelectorChange, hasSelector, selectorOptions, setOptionValue}) => {
        if (!hasSelector) return null;
        let selectorNodes = selectorOptions.map((option, i) => {
            if (this.getOptionValue() !== option)
                return (<option key={i} value={option}>{option}</option>)
        });
        let initialNodeValue = this.state.optionValue;
        return (
            <select className="select" onChange={(event) => {
                let selectedOption = event.target.value;
                onSelectorChange(this.getOptionValue(), selectedOption)
                setOptionValue(selectedOption);

            }}>
                <option value={initialNodeValue}>{initialNodeValue}</option>
                {selectorNodes}
            </select>
        );
    }

    RemoveButton = ({isRemovable, onRemove}) => {
        if (!isRemovable) return null;

        return (
            <button className="button is-danger" onClick={() => {
                onRemove(this.getOptionValue());
            }}>
                X
            </button>
        );
    }

    TextInput = ({onTextChange, textContent}) => {
        return (
                <input className="input" type="text" onChange={(event) => {
                    let textValue = event.target.value;
                    textContent = textValue;
                    onTextChange(this.getOptionValue(), textContent);
                }}>
                    {textContent}
                </input>
        );
    }

    constructor(props) {
        super(props);
        let initialOption = (props.type) ? props.type : '';
        this.state = {
            optionValue: initialOption
        };
    }

    setOptionValue = (newOptionValue) => {
        this.setState({
            optionValue: newOptionValue
        });
    }

    getOptionValue = () => {
        return this.state.optionValue;
    }

    render() {

        let {AvailableOptionsSelector, RemoveButton, TextInput} = this;
        let {isRemovable, hasSelector, onSelectorChange, onTextChange, onRemove, selectorOptions, textContent} = this.props;

        return (
            <div className="column inputField">
                <AvailableOptionsSelector onSelectorChange={onSelectorChange}
                                          hasSelector={hasSelector}
                                          selectorOptions={selectorOptions}
                                          setOptionValue={this.setOptionValue}
                />
                <TextInput onTextChange={onTextChange} textContent={textContent}/>
                <RemoveButton isRemovable={isRemovable} onRemove={onRemove} getOptionValue={this.getOptionValue}/>
            </div>
        );
    }
}
