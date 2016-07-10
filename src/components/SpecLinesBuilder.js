import './SpecLinesBuilder.less';
import _ from 'lodash';
import React from 'react';
import * as actions from '../actions/chosenProducts';
import SpecLine from './SpecLine';
import SortPicker from './SortPicker';
import categoryLinesSelector from '../selectors/categoryLines';
import totalSumSelector from '../selectors/totalCalc';

export default React.createClass({
    PropTypes: {
        dispatch: React.PropTypes.func.isRequired,
        categories: React.PropTypes.array.isRequired,
        products: React.PropTypes.array.isRequired,
        chosenProducts: React.PropTypes.array.isRequired
    },

    handleAddLine(categoryId) {
        this.props.dispatch(actions.addEmptySpecLine(categoryId));
    },

    renderCategoryLine(category, idx) {
        let productComponents = _.map(category.productLines,
          (chosenProduct, idx) => (
              <SpecLine dispatch={this.props.dispatch}
                        key={chosenProduct.lineId}
                        products={category.availableProducts}
                        chosenProduct={chosenProduct} />
          ));

        return (
            <div className="categoryLine" key={idx}>
                <div className="title">{category.name}</div>
                <div>
                    {productComponents}
                </div>
                <div className="addLineBtn">
                    <button onClick={() => this.handleAddLine(category.id)}>
                        +
                    </button>
                </div>
            </div>
        );
    },

    renderCategories() {
        let categories = categoryLinesSelector({
            products: this.props.products,
            categories: this.props.categories,
            chosenProducts: this.props.chosenProducts
        });

        return _.map(categories, this.renderCategoryLine);
    },

    renderTotal() {
        let totalPrice = totalSumSelector({
            products: this.props.products,
            chosenProducts: this.props.chosenProducts
        });

        return (
            <div className="categoryLine">
                <div className="title">Total</div>
                <div>
                    ${totalPrice}
                </div>
            </div>
        );
    },

    renderSortPicker() {
        return (
            <SortPicker 
                dispatch={this.props.dispatch} 
                sortBy={this.props.sortBy}
            />
        );
    },

    render() {
        return (
            <div className="specLinesBuilder">
                {this.renderSortPicker()}
                {this.renderTotal()}
                {this.renderCategories()}
            </div>
        );
    }
});
