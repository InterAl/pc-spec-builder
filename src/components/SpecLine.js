import * as actions from '../actions/chosenProducts';
import './SpecLine.less';
import _ from 'lodash';
import React from 'react';

export default React.createClass({
    PropTypes: {
        lineId: React.PropTypes.number.isRequired,
        products: React.PropTypes.array.isRequired,
        selectedProductId: React.PropTypes.number,
        dispatch: React.PropTypes.func.isRequired
    },

    handleRemoveLine() {
        let payload = actions.deleteSpecLine(this.props.lineId);
        this.props.dispatch(payload);
    },

    renderDropdown() {
        let products = this.props.products;

        let options = _.map(products, (p, idx) => {
            return (
                <option key={idx} value={p.id}>{p.name}</option>
            );
        });

        return (
            <select value={this.props.selectedProductId}>
                {options}
            </select>
        );
    },

    renderQuantity() {
        return (
            <div className="quantity">
                <input type="textbox" size={2} />
            </div>
        );
    },

    renderRemove() {
        return (
            <div className="removeLineBtn">
                <button onClick={this.handleRemoveLine}>
                    -
                </button>
            </div>
        );
    },

    render() {
        return (
            <div className="specLine">
                {this.renderDropdown()}
                {this.renderQuantity()}
                {this.renderRemove()}
            </div>
        );
    }
});
