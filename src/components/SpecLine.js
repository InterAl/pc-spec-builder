import * as actions from '../actions/chosenProducts';
import './SpecLine.less';
import _ from 'lodash';
import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

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
        categoryId: React.PropTypes.number.isRequired
    }

    handleRemoveLine() {
        let payload = actions.deleteSpecLine(this.props.chosenProduct.lineId);
        this.props.dispatch(payload);
    }

    handleSelectProduct(option) {
        let productId = option.value;
        let payload = actions.selectProduct(productId,
                                            this.props.chosenProduct.lineId);
        this.props.dispatch(payload);
    }

    handleQuantityChange(event) {
        let payload = actions.changeProductQuantity(this.props.chosenProduct.lineId,
                                                    event.target.value);
        payload && this.props.dispatch(payload);
    }

    handleChangeSelect(value) {
        if (value)
            this.handleSelectProduct(value);
        else
            this.handleRemoveLine(value);
    }

    renderDropdown() {
        let products = this.props.products;

        let options = _.map(products, (p, idx) => {
            return {
                value: p.id,
                label: `₪ (+${p.price}) - ${p.manufacturer} - ${p.name}`
            };
        });

        options.unshift({value: -1, label: 'בחר מוצר'});

        return (
            <Select onChange={this.handleChangeSelect}
                    value={this.props.chosenProduct.id || -1}
                    className="select col-xs-9 pull-right"
                    dir="ltr"
                    options={options}
                    name='lalala'
                />
        );
    }

    renderProductLink() {
        let productWasChosen = this.props.chosenProduct.productId;
        productWasChosen = !!productWasChosen && productWasChosen !== '-1';

        return productWasChosen && (
            <div className='link col-xs-1 pull-right'>
                <a href={`http://www.plonter.co.il/detail.tmpl?sku=${this.props.chosenProduct.productId}`}
                    target='_blank'><img src='http://www.plonter.co.il/1inf.gif' /></a>
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
