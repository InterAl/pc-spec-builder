import _ from 'lodash';
import React from 'react';
import './ComboBox.less';

const {PropTypes} = React;
const noop = _.noop;

export default class ComboBox extends React.Component {
    static propTypes = {
        tabs: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired
        })),
        options: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired
        })),
        onChange: PropTypes.func.isRequired,
        filter: PropTypes.func.isRequired,
        placeholder: PropTypes.string
    }

    static defaultProps = {
        onChange: noop
    }

    constructor(props) {
        super(props);

        this.state = {
            opened: false,
            value: props.placeholder
        };

        this.handleSelectClick = this.handleSelectClick.bind(this);
        this.handleOptionClick = this.handleOptionClick.bind(this);
    }

    handleSelectClick() {
        this.toggleSelect(!this.state.opened);
    }

    toggleSelect(opened) {
        this.setState({opened});
    }

    handleOptionClick({text, value}) {
        this.props.onChange(value);
        this.toggleSelect(false);
        this.setState({value: text});
    }

    setValue(value) {
        this.setState({value});
    }

    renderSelect() {
        return (
            <div className="comboBox-select" onClick={this.handleSelectClick}>
                <input value={this.state.value} type="text" />
                {this.renderArrow()}
                {this.renderClear()}
            </div>
        );
    }

    renderArrow() {
        return (
            <div className="comboBox-arrow" />
        );
    }

    renderClear() {
        return (
            <div className="comboBox-clear">×</div>
        );
    }

    renderDropdown() {
        return (
            <div className="comboBox-dropdown">
                {this.renderTabpages()}
                {this.renderOptions()}
            </div>
        );
    }

    renderOptions() {
        return (
            <div className="comboBox-options">
                {_.map(this.props.options, option => {
                    return (
                        <div className="comboBox-option"
                             key={option.value}
                             onClick={() => this.handleOptionClick(option)}
                        >
                            {option.text}
                        </div>
                    );
                })}
            </div>
        );
    }

    renderTabpages() {
        return (
            <div className="comboBox-tabpages">
                <div className="comboBox-tabpages-tab">
                    Intel
                </div>
                <div className="comboBox-tabpages-tab">
                    AMD
                </div>
                <div className="comboBox-tabpages-tab">
                    ARM
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className='comboBox'>
                {this.renderSelect()}
                {this.state.opened && this.renderDropdown()}
            </div>
        );
    }
}
