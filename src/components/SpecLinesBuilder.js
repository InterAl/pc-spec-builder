import './SpecLinesBuilder.less';
import _ from 'lodash';
import React from 'react';
import * as actions from '../actions/chosenProducts';
import SpecLine from './SpecLine';

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
        let categoryProducts = _.filter(this.props.products,
                                        p => p.categoryId === category.id);

        let chosenProducts = _.intersectionWith(categoryProducts,
                                                this.props.chosenProducts,
                                                (a, b) => a.id === b.id);

        chosenProducts = chosenProducts.concat(
             _.filter(this.props.chosenProducts,
                      p => !p.id && p.categoryId === category.id)
        );

        let chosenProductComponents = _.map(chosenProducts,
                  (p, idx) => (
                      <SpecLine key={idx}
                                products={categoryProducts}
                                selectedProductId={p.id}/>
                  ));

        return (
            <div className="categoryLine" key={idx}>
                <div className="title">{category.name}</div>
                <div>
                    {_.isEmpty(chosenProducts) ?
                        <SpecLine products={categoryProducts} /> :
                        chosenProductComponents
                    }
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
        return _.map(this.props.categories, this.renderCategoryLine);
    },

    render() {
        return (
            <div className="specLinesBuilder">
                {this.renderCategories()}
            </div>
        );
    }
});
