import _ from 'lodash';
import React from 'react';
import './ComboBox.less';

const {PropTypes} = React;

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
        filter: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            opened: false
        };

        this.handleSelectClick = this.handleSelectClick.bind(this);
    }

    handleSelectClick() {
        this.toggleSelect(!this.state.opened);
    }

    toggleSelect(opened) {
        this.setState({opened});
    }

    renderSelect() {
        return (
            <div className="comboBox-select" onClick={this.handleSelectClick}>
                <input type="text" />
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
                <div className="comboBox-option">
                    i5 4GHZ 2MB
                </div>
                <div className="comboBox-option">
                    i7 8GHZ 2MB
                </div>
                <div className="comboBox-option">
                    i3 2GHZ 2MB
                </div>
                <div className="comboBox-option">
                    i7 1GHZ 2MB
                </div>
                <div className="comboBox-option">
                    i7 1GHZ 2MB
                </div>
                <div className="comboBox-option">
                    i7 1GHZ 2MB
                </div>
                <div className="comboBox-option">
                    i7 1GHZ 2MB
                </div>
                <div className="comboBox-option">
                    i7 1GHZ 2MB
                </div>
                <div className="comboBox-option">
                    i7 1GHZ 2MB
                </div>
                <div className="comboBox-option">
                    i7 1GHZ 2MB
                </div>
                <div className="comboBox-option">
                    i7 1GHZ 2MB
                </div>
                <div className="comboBox-option">
                    LASTTTTTTTTTT
                </div>
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
