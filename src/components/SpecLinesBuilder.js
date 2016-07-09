import './SpecLinesBuilder.less';
import _ from 'lodash';
import React from 'react';
import SpecLine from './SpecLine';

export default React.createClass({
    PropTypes: {
        categories: React.PropTypes.array.isRequired,
        products: React.PropTypes.array.isRequired,
        chosenProducts: React.PropTypes.array.isRequired
    },

    renderCategoryLine(category, idx) {
        let categoryProducts = _.filter(this.props.products,
                                        p => p.categoryId === category.id);

        let chosenProducts = _.intersectionWith(categoryProducts,
                                                this.props.chosenProducts,
                                                (a, b) => a.id === b.id);

        return (
            <div className="categoryLine" key={idx}>
                <div className="title">{category.name}</div>
                <div>
                    <SpecLine products={categoryProducts}
                        chosenProducts={chosenProducts}/>
                </div>
                <div className="addLineBtn">
                    <button onClick={this.handleAddLine}>+</button>
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
