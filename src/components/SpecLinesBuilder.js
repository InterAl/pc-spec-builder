import './SpecLinesBuilder.less';
import _ from 'lodash';
import React from 'react';
import * as actions from '../actions/chosenProducts';
import proceedToOffer from '../actions/proceedToOffer';
import SpecLine from './SpecLine';
import SortPicker from './SortPicker';
import categoryLinesSelector from '../selectors/categoryLines';
import totalSumSelector from '../selectors/totalCalc';
import numeral from 'numeral';

export default class SpecLinesBuilder extends React.Component {
    constructor() {
        super();
        this.handleAddLine = this.handleAddLine.bind(this);
        this.handleProceedToOffer = this.handleProceedToOffer.bind(this);
        this.renderCategoryLine = this.renderCategoryLine.bind(this);
    }

    PropTypes: {
        dispatch: React.PropTypes.func.isRequired,
        categories: React.PropTypes.array.isRequired,
        systems: React.PropTypes.array.isRequired,
        tags: React.PropTypes.array.isRequired,
        products: React.PropTypes.array.isRequired,
        chosenProducts: React.PropTypes.array.isRequired,
        chosenSystem: React.PropTypes.array.isRequired,
        sortBy: React.PropTypes.string.isRequired
    }

    handleAddLine(categoryId) {
        this.props.dispatch(actions.addEmptySpecLine(categoryId));
    }

    handleProceedToOffer() {
        this.props.dispatch(proceedToOffer());
    }

    getTotalPrice() {
        return totalSumSelector({
            products: this.props.products,
            chosenProducts: this.props.chosenProducts
        });
    }

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
                    <div className="row">
                        <div className="col-xs-3 pull-right">
                            <span className="title">{category.name}</span>
                        </div>
                        <div className="col-xs-9 pull-right">
                            {productComponents}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-5 pull-right"/>
                        <div className="addLineBtn col-xs-1 pull-right">
                            <button onClick={() => this.handleAddLine(category.id)}>
                                +
                            </button>
                        </div>
                    </div>
            </div>
        );
    }

    renderCategories() {
        let categories = this.props.systems && categoryLinesSelector(this.props);
        let lines = _.map(categories, this.renderCategoryLine);

        return (
            <div className="categories">
                {lines}
            </div>
        );
    }

    renderTotal() {
        let totalPrice = this.getTotalPrice();
        let formattedTotal = numeral(totalPrice).format('0,0');

        return (
            <div className="categoryLine">
                <div className="title">סה״כ</div>
                <div className="title">
                    ₪{formattedTotal}
                </div>
            </div>
        );
    }

    renderSortPicker() {
        return (
            <div className='col-md-3 col-sm-6 pull-right'>
                <SortPicker
                    dispatch={this.props.dispatch}
                    sortBy={this.props.sortBy}
                />
            </div>
        );
    }

    renderProceedToOffer() {
        return this.getTotalPrice() > 0 && (
            <div className='offer control-row col-xs-6 pull-right'>
                <a onClick={this.handleProceedToOffer}>המשך להצעה</a>
            </div>
        );
    }

    renderControls() {
        return (
            <div className='controls row'>
                {this.renderSortPicker()}
                {this.renderProceedToOffer()}
            </div>
        );
    }

    render() {
        return (
            <div className="specLinesBuilder">
                {this.renderControls()}
                {this.renderTotal()}
                {this.renderCategories()}
            </div>
        );
    }
}
