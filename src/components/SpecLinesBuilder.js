import './SpecLinesBuilder.less';
import _ from 'lodash';
import React from 'react';
import * as actions from '../actions/chosenProducts';
import SpecLine from './SpecLine';
import categoryLinesSelector from '../selectors/categoryLines';
import totalSumSelector from '../selectors/totalCalc';
import $ from 'jquery';
import config from 'config';
import imageFetcher from '../imageFetcher';
import Header from './Header';
import Q from 'q';

export default class SpecLinesBuilder extends React.Component {
    constructor() {
        super();

        this.state = {
            categoryImages: {}
        };

        this.handleAddLine = this.handleAddLine.bind(this);
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
        this.fixHeaderPosition();
    }

    componentDidUpdate() {
        if (!$('.specLinesBuilder').hasClass('fixed-header'))
            this.originHeaderTop = $('.controls.row').offset().top;
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
        let defaultUrl = config.categoryImage.replace('{{engdivision}}', category.engdivision);
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

    renderHeader() {
        return (
            <Header
                dispatch={this.props.dispatch}
                sortBy={this.props.sortBy}
                systems={this.props.systems}
                chosenSystem={this.props.chosenSystem}
                totalPrice={this.getTotalPrice()}
            />
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
