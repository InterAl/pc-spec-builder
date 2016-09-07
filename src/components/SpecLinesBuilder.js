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
import $ from 'jquery';

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

    componentDidMount() {
        this.originHeaderTop = $('.controls.row').offset().top;
        this.fixHeaderPosition();
    }

    fixHeaderPosition() {
        $(document).on("scroll", e => {
            let docScrollTop = $(document).scrollTop();
            let container = $('.specLinesBuilder');
            let headerTop = $('.controls.row').offset().top;
            let socialbar = $('.at4-follow-container.addthis_24x24_style');

            if (docScrollTop > this.originHeaderTop) {
                container.addClass('fixed-header');
                socialbar.hide();
            } else {
                container.removeClass('fixed-header');
                socialbar.show();
            }
        });
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
                    <div className="col-xs-1 pull-right category-image">
                        <img src={`http://www.plonter.co.il/graphics/plonters/byopc/${category.engdivision}.png`} />
                    </div>
                    <div className="col-xs-10 pull-right categoryNameRow">
                        <button onClick={() => this.handleAddLine(category.id)}
                                className="btn btn-link"
                        >
                            +&nbsp;
                            {category.name}
                        </button>
                        <div className="row">
                            <div className="col-md-12 col-xs-10 pull-right">
                                {productComponents}
                            </div>
                        </div>
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
        let totalPriceCash = 0.98 * totalPrice;
        let formattedTotal = numeral(totalPrice).format('0,0');
        let formattedTotalCash = numeral(totalPriceCash).format('0,0');

        return (
            <div className="categoryLine total col-md-3 pull-right">
                <span className="title">סה״כ: </span>
                <span className="title">
                    {formattedTotal + ' / ₪' + formattedTotalCash}
                </span>
            </div>
        );
    }

    renderSortPicker() {
        return (
            <div className='col-md-4 col-xs-12 pull-right'>
                <SortPicker
                    dispatch={this.props.dispatch}
                    sortBy={this.props.sortBy}
                />
            </div>
        );
    }

    renderProceedToOffer() {
        return this.getTotalPrice() > 0 && (
            <div className='offer control-row pull-right'>
                <a onClick={this.handleProceedToOffer}>המשך להצעה</a>
            </div>
        );
    }

    renderHeader() {
        return (
            <div className='controls row' ref="header">
                {this.renderSortPicker()}
                {this.renderTotal()}
                {this.renderProceedToOffer()}
            </div>
        );
    }

    render() {
        return (
            <div className="specLinesBuilder">
                {this.renderHeader()}
                {this.renderCategories()}
            </div>
        );
    }
}
