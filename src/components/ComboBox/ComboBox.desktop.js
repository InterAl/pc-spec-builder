import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import './ComboBox.desktop.less';
import clickOutside from 'react-onclickoutside';
import TextAreaAutoRows from '../TextAreaAutoRows.js';
import {PropTypes} from './index.js';

const noop = _.noop;

@clickOutside
class ComboBox extends React.Component {
    static propTypes = PropTypes;

    static defaultProps = {
        onChange: noop,
        onTabChange: noop
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.options !== this.props.options) {
            this.setState({options: nextProps.options});
        }
    }

    componentDidMount() {
        let opt = _.find(this.props.options, o => o.id === this.props.value);
        if (opt) {
            this.setState({value: opt.text, selected: this.props.value});
        }
    }

    componentDidUpdate() {
        this.scrollToSelectedOption();
    }

    scrollToSelectedOption() {
        let dropdownEle = ReactDOM.findDOMNode(this.refs.dropdown);
        if (dropdownEle) {
            let ele = this.refs[`option${this.state.selected}`];

            if (ele) {
                dropdownEle.scrollTop = ele.offsetTop - dropdownEle.offsetHeight / 2;
            }
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            opened: false,
            value: null,
            options: props.options,
            selectedTab: null,
            dirty: false
        };

        this.handleSelectClick = this.handleSelectClick.bind(this);
        this.handleOptionClick = this.handleOptionClick.bind(this);
        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    handleClickOutside() {
        this.toggleSelect(false);
    }

    handleSelectClick() {
        this.toggleSelect(!this.state.opened);
    }

    toggleSelect(opened) {
        this.setState({opened});

        if (opened)
            this.refs.input.focus();
    }

    handleOptionClick({text, value, id}) {
        this.props.onChange(value);
        this.toggleSelect(false);
        this.setState({dirty: false, value: text, selected: id});
    }

    handleTabClick({text, value}) {
        let tabValue = value;

        if (tabValue === this.state.tabValue) {
            tabValue = null;
        }

        this.selectTab(tabValue);
        this.invokeFilter({tabValue});
        this.refs.input.focus();
    }

    handleTextChange({target: {value}}) {
        this.invokeFilter({value});
        this.setState({dirty: true, value});
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
        value = this.state.dirty ? value : null;
        let options = this.props.filter(this.props.options, value, tabValue);
        this.setState({options});
    }

    getTextValue(value) {
        return value === undefined || value === null ? this.props.placeholder : this.state.value;
    }

    renderSelect() {
        const inputValue = this.getTextValue(this.state.value);

        return (
            <div className="comboBox-select" onClick={this.handleSelectClick}>
                <TextAreaAutoRows
                       className="hidden-md hidden-lg"
                       type="text"
                       ref="input"
                       value={inputValue}
                       onFocus={()=>{this.refs.input.select()}}
                       onChange={this.handleTextChange}
                 />
                 <input
                       className="hidden-xs hidden-sm"
                       type="text"
                       ref="input"
                       value={inputValue}
                       onFocus={()=>{this.refs.input.select()}}
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
                {this.props.tabs && this.renderTabpages()}
                {this.renderOptions()}
            </div>
        );
    }

    renderOptions() {
        let options = [...this.state.options];

        if (this.props.showRowCount)
            options.unshift({
                text: `מציג ${options.length} מוצרים`,
                unclickable: true
            });

        return (
            <div ref="dropdown" className="comboBox-options">
                {_.map(options, (option, idx) => {
                    return (
                       <div ref={`option${option.id}`}
                            className={classNames("comboBox-option", {
                            unclickable: option.unclickable,
                            selected: option.id === this.state.selected
                       })}
                             key={idx}
                             onClick={() => !option.unclickable &&
                                            this.handleOptionClick(option)}
                        >
                            <span>
                                {option.text}
                            </span>
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
                       <div className={classNames('comboBox-tabpages-tab', {
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
           <div className={classNames('comboBox', this.props.className, {
               opened: this.state.opened
           })}>
                {this.renderSelect()}
                {this.state.opened && this.renderDropdown()}
            </div>
        );
    }
}

export default ComboBox;
