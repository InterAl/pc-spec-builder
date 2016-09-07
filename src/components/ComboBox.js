import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';
import './ComboBox.less';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import clickOutside from 'react-onclickoutside';

const {PropTypes} = React;
const noop = _.noop;

class ComboBox extends React.Component {
    static propTypes = {
        tabs: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired
        })),
        options: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.any.isRequired,
            text: PropTypes.string.isRequired
        })),
        onChange: PropTypes.func.isRequired,
        onTabChange: PropTypes.func,
        onClear: PropTypes.func,
        filter: PropTypes.func.isRequired,
        placeholder: PropTypes.string
    }

    static defaultProps = {
        onChange: noop,
        onTabChange: noop
    }

    constructor(props) {
        super(props);

        this.state = {
            opened: false,
            value: null,
            options: props.options,
            selectedTab: null
        };

        this.handleSelectClick = this.handleSelectClick.bind(this);
        this.handleOptionClick = this.handleOptionClick.bind(this);
        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    handleClickOutside() {
        this.toggleSelect(false);
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

    handleTabClick({text, value}) {
        if (value === this.state.tabValue) {
            value = null;
        }

        this.selectTab(value);
        this.invokeFilter({tabValue: value});
    }

    handleTextChange({target: {value}}) {
        this.invokeFilter({value});
        this.setState({value});
    }

    handleClear() {
        this.props.onClear();
    }

    selectTab(tabValue) {
        this.setState({tabValue});
    }

    setValue(value) {
        this.setState({value});
    }

    invokeFilter({value = this.state.value, tabValue = this.state.tabValue}) {
        let options = this.props.filter(this.props.options, value, tabValue);
        this.setState({options});
    }

    renderSelect() {
        return (
            <div className="comboBox-select" onClick={this.handleSelectClick}>
                <input type="text"
                       value={this.state.value || this.props.placeholder}
                       onChange={this.handleTextChange}/>
                {this.renderArrow()}
                {this.props.onClear && this.renderClear()}
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
            <div className="comboBox-clear" onClick={this.handleClear}>
                ×
            </div>
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
                {_.map(this.state.options, (option, idx) => {
                    return (
                        <div className="comboBox-option"
                             key={idx}
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
                {_.map(this.props.tabs, (tab, idx) => {
                    return (
                       <div className={classNames("comboBox-tabpages-tab", {
                           selected: this.state.tabValue === tab.value
                       })}
                             key={idx}
                             onClick={() => this.handleTabClick(tab)}
                        >
                            {tab.text}
                        </div>
                    );
                })}
            </div>
        );
    }

    render() {
        return (
            <div className='comboBox'>
                {this.renderSelect()}
                <CSSTransitionGroup
                    transitionName={'slideFoldAnimation'}
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnterTimeout={0}
                    transitionLeaveTimeout={0}>

                    {this.state.opened && this.renderDropdown()}
                </CSSTransitionGroup>
            </div>
        );
    }
}

export default clickOutside(ComboBox);
