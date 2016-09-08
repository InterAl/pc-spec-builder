import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
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
            text: PropTypes.string.isRequired,
            id: PropTypes.any
        })),
        onChange: PropTypes.func.isRequired,
        onTabChange: PropTypes.func,
        onClear: PropTypes.func,
        filter: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        className: PropTypes.string,
        showRowCount: PropTypes.bool
    }

    static defaultProps = {
        onChange: noop,
        onTabChange: noop
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.options !== this.props.options) {
            this.setState({options: nextProps.options});
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
        return (
            <div className="comboBox-select" onClick={this.handleSelectClick}>
                <input type="text"
                       ref="input"
                       value={this.getTextValue(this.state.value)}
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
           <div className={classNames('comboBox', this.props.className, {
               opened: this.state.opened
           })}>
                {this.renderSelect()}
                {/* <CSSTransitionGroup */}
                {/*     transitionName={'slideFoldAnimation'} */}
                {/*     transitionAppear={true} */}
                {/*     transitionAppearTimeout={0} */}
                {/*     transitionEnterTimeout={0} */}
                {/*     transitionLeaveTimeout={0}> */}

                    {this.state.opened && this.renderDropdown()}
                {/* </CSSTransitionGroup> */}
            </div>
        );
    }
}

export default clickOutside(ComboBox);
