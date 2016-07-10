import * as actions from '../actions/chosenProducts';
import './SpecLine.less';
import _ from 'lodash';
import React from 'react';

export default React.createClass({
    PropTypes: {
        chosenProduct: React.PropTypes.object,
        products: React.PropTypes.array.isRequired,
        dispatch: React.PropTypes.func.isRequired,
        categoryId: React.PropTypes.number.isRequired
    },

    handleRemoveLine() {
        let payload = actions.deleteSpecLine(this.props.chosenProduct.lineId);
        this.props.dispatch(payload);
    },

    handleSelectProduct(event) {
        let productId = event.target.value;
        let payload = actions.selectProduct(productId,
                                            this.props.chosenProduct.lineId);
        this.props.dispatch(payload);
    },

    handleQuantityChange(event) {
        let payload = actions.changeProductQuantity(this.props.chosenProduct.lineId,
                                                    event.target.value);
        payload && this.props.dispatch(payload);
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
                    value={this.props.chosenProduct.id || -1}>
                <option key={-1} value={-1}>Select a product</option>
                {options}
            </select>
        );
    },

    renderQuantity() {
        return (
            <div className="quantity">
                <input type="textbox"
                       onChange={this.handleQuantityChange}
                       value={this.props.chosenProduct.quantity}
                       size={2} />
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
