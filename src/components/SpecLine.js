import './SpecLine.less';
import _ from 'lodash';
import React from 'react';

export default React.createClass({
    PropTypes: {
        products: React.PropTypes.array.isRequired,
        chosenProducts: React.PropTypes.array,
        selectedProductId: React.PropTypes.number
    },

    getProducts() {
        let products = [...this.props.products, ...this.props.chosenProducts];
        return products;
    },

    renderDropdown() {
        let products = this.getProducts();

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

    render() {
        return (
            <div className="specLine">
                {this.renderDropdown()}
                {this.renderQuantity()}
            </div>
        );
    }
});
