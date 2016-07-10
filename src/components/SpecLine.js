import * as actions from '../actions/chosenProducts';
import './SpecLine.less';
import _ from 'lodash';
import React from 'react';

export default React.createClass({
    PropTypes: {
        lineId: React.PropTypes.number.isRequired,
        products: React.PropTypes.array.isRequired,
        selectedProductId: React.PropTypes.number,
        dispatch: React.PropTypes.func.isRequired,
        categoryId: React.PropTypes.number.isRequired
    },

    handleRemoveLine() {
        let payload = actions.deleteSpecLine(this.props.lineId);
        this.props.dispatch(payload);
    },

    handleSelectProduct(event) {
        let productId = event.target.value;
        let payload = actions.selectProduct(productId,
                                            this.props.lineId);
        this.props.dispatch(payload);
    },

    renderDropdown() {
        let products = this.props.products;

        let options = _.map(products, (p, idx) => {
            return (
                <option key={idx} value={p.id}>{p.name} - ${p.price}</option>
            );
        });

        return (
            <select onChange={this.handleSelectProduct}
                    value={this.props.selectedProductId || -1}>
                <option key={-1} value={-1}>Select a product</option>
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
