import './SpecLinesBuilder.less';
import _ from 'lodash';
import React from 'react';
import * as actions from '../actions/chosenProducts';
import proceedToOffer from '../actions/proceedToOffer';
import SpecLine from './SpecLine';
import SortPicker from './SortPicker';
import categoryLinesSelector from '../selectors/categoryLines';
import totalSumSelector from '../selectors/totalCalc';
import SystemPicker from './SystemPicker';
import numeral from 'numeral';
import $ from 'jquery';
import config from 'config';
import imageFetcher from '../imageFetcher';
import Q from 'q';

export default class SpecLinesBuilder extends React.Component {
    constructor() {
        super();

        this.state = {
            categoryImages: {}
        };

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

    componentWillReceiveProps(nextProps) {
        let {chosenProducts, categories, systems} = nextProps;
        categories = systems && categoryLinesSelector(nextProps);

        if (chosenProducts !== this.props.chosenProducts || categories !== this.props.categories) {
            let promises = _.map(categories, c => this.getImageUrl(c));

            Q.all(promises).then(results => {
                let categoryImages = _.reduce(results, (dic, r) => {
                    dic[r.category.id] = r.url;
                    return dic;
                }, {...this.state.categoryImages});

                this.setState({
                    categoryImages
                });
            }).catch(err => console.error(err));
        }
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

    addToCategoryImages(id, url) {
        let addition = {
            [id]: url
        };

        return {
            ...this.state.categoryImages,
            ...addition
        };
    }

    getImageUrl(category) {
        let chosenProduct = _.find(category.productLines, p => p.id);
        let chosenSku = _.get(chosenProduct, 'id');
        let defaultUrl = `http://www.plonter.co.il/graphics/plonters/byopc/${category.engdivision}.png`;
        let productUrl = config.productImage.replace('{{sku}}', chosenSku);

        if (chosenSku ) {
            if (productUrl !== this.state.categoryImages[category.id])
                return imageFetcher(productUrl, defaultUrl).then(url => ({category, url}));
            else
                return Q({category, url: productUrl});
        } else {
            return Q({category, url: defaultUrl});
        }
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
                    <div className="col-xs-1 pull-right category-image hidden-xs">
                        <img src={this.state.categoryImages[category.id]} />
                    </div>
                    <div className="col-xs-12 col-md-10 pull-right categoryNameRow">
                        <button onClick={() => this.handleAddLine(category.id)}
                                className="btn btn-link"
                        >
                            +&nbsp;
                            {category.name}
                        </button>
                        <div className="row">
                            <div className="col-md-12 col-xs-12 pull-right">
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
            <div className="categoryLine total col-xs-12 col-md-3 pull-right">
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
            <div className='offer control-row pull-right col-xs-12 col-md-2'>
                <a onClick={this.handleProceedToOffer}>המשך להצעה</a>
            </div>
        );
    }

    renderHeader() {
        return (
            <div className='header'>
                <SystemPicker
                    dispatch={this.props.dispatch}
                    systems={this.props.systems}
                    systemName={this.props.chosenSystem.systemName}
                    subsystem={this.props.chosenSystem.subsystem}
                />

                <div className='controls row' ref="header">
                    {this.renderSortPicker()}
                    {this.renderTotal()}
                    {this.renderProceedToOffer()}
                </div>
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
