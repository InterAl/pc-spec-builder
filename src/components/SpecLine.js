import * as actions from '../actions/chosenProducts';
import './SpecLine.less';
import _ from 'lodash';
import React from 'react';
import ComboBox from './ComboBox/index.js';
import numeral from 'numeral';

export default class SpecLine extends React.Component {
    constructor() {
        super();
        this.handleRemoveLine = this.handleRemoveLine.bind(this);
        this.handleSelectProduct = this.handleSelectProduct.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
    }

    PropTypes: {
        chosenProduct: React.PropTypes.object,
        products: React.PropTypes.array.isRequired,
        dispatch: React.PropTypes.func.isRequired,
        categoryId: React.PropTypes.number.isRequired,
        idx: React.PropTypes.number.isRequired
    }

    handleRemoveLine() {
        let payload = actions.deleteSpecLine(this.props.chosenProduct.lineId);
        this.props.dispatch(payload);
    }

    handleSelectProduct(productId) {
        let payload = actions.selectProduct(productId,
                                            this.props.chosenProduct.lineId);
        this.props.dispatch(payload);
    }

    handleQuantityChange(event) {
        let payload = actions.changeProductQuantity(this.props.chosenProduct.lineId,
                                                    event.target.value);
        payload && this.props.dispatch(payload);
    }

    handleChangeSelect({id}) {
        this.handleSelectProduct(id);
    }

    handleComboBoxFilter(options, value, tabValue) {
        let words = (value || '').toLowerCase().split(' ');

        return _.filter(options, option => {
            return (_.isEmpty(words) ||
                    _.every(words, word => _.includes(option.text.toLowerCase(), word))) &&
                   (!option.value.shelf || !tabValue || option.value.shelf === tabValue);
        });
    }

    getTabs(products) {
        let tabs = _(products)
                    .map('shelf')
                    .uniq()
                    .map(s => ({text: s, value: s}))
                    .value();
        return tabs;
    }

    renderDropdown() {
        let products = this.props.products;

        let options = _.map(products, (p, idx) => {
            return {
                value: p,
                text: `₪ (+${numeral(p.price).format('0,0')}) - ${p.manufacturer} - ${p.id} - ${p.name}`,
                id: p.id,
                price: p.price,
                manufacturer: p.manufacturer
            };
        });

        return (
            <ComboBox onChange={this.handleChangeSelect}
                      value={this.props.chosenProduct.id || -1}
                      className="col-xs-10 pull-right"
                      options={options}
                      placeholder="בחר מוצר / הקלד לחיפוש"
                      onClear={this.handleRemoveLine}
                      filter={this.handleComboBoxFilter}
                      tabs={this.getTabs(products)}
                      showRowCount={true}
                />
        );
    }

    renderProductLink() {
        let productWasChosen = this.props.chosenProduct.productId;
        productWasChosen = !!productWasChosen && productWasChosen !== '-1';

        return productWasChosen && (
            <div className='link col-xs-1 pull-right'>
                <a href={`/detail.tmpl?sku=${this.props.chosenProduct.productId}`}
                    target='_blank'><img src='/1inf.gif' /></a>
            </div>
        );
    }

    renderQuantity() {
        return (
            <div className="quantity col-xs-1 pull-right">
                <span className="pull-right">
                    <input type="textbox"
                           className="input-xs"
                           onChange={this.handleQuantityChange}
                           value={this.props.chosenProduct.quantity}
                           size={1} />
                </span>
            </div>
        );
    }

    render() {
        return (
            <div className="specLine row">
                {this.renderDropdown()}
                {this.renderQuantity()}
                {this.renderProductLink()}
            </div>
        );
    }
};
