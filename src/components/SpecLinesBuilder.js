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
        systems: React.PropTypes.array.isRequired,
        tags: React.PropTypes.array.isRequired,
        products: React.PropTypes.array.isRequired,
        chosenProducts: React.PropTypes.array.isRequired,
        chosenSystem: React.PropTypes.array.isRequired,
        sortBy: React.PropTypes.string.isRequired
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
            <div className="categoryLine row" key={idx}>
                    <div className="row">
                        <div className="title col-md-3 pull-right">{category.name}</div>
                        <div className="col-md-9 pull-right">
                            {productComponents}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5 pull-right"/>
                        <div className="addLineBtn col-md-1 pull-right">
                            <button onClick={() => this.handleAddLine(category.id)}>
                                +
                            </button>
                        </div>
                    </div>
            </div>
        );
    },

    renderCategories() {
        let categories = this.props.systems && categoryLinesSelector(this.props);
        let lines = _.map(categories, this.renderCategoryLine);

        return (
            <div className="categories">
                {lines}
            </div>
        );
    },

    renderTotal() {
        let totalPrice = totalSumSelector({
            products: this.props.products,
            chosenProducts: this.props.chosenProducts
        });

        return (
            <div className="categoryLine">
                <div className="title">סה״כ</div>
                <div>
                    ₪{totalPrice}
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
            <div className="specLinesBuilder container">
                {this.renderSortPicker()}
                {this.renderTotal()}
                {this.renderCategories()}
            </div>
        );
    }
});
