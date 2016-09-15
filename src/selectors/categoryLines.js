import _ from 'lodash';
import {createSelector} from 'reselect';

export default createSelector(
    state => state.products,
    state => state.systems,
    state => state.tags,
    state => state.categories,
    state => state.chosenSystem,
    state => state.chosenProducts,
    state => state.sortBy,
    (products, systems, allTags, categories, chosenSystem, chosenProducts, sortBy) => {
        chosenProducts = _.map(chosenProducts, cp => ({
            ...cp,
            ..._.find(products, p => p.id === cp.productId)
        }));


        let system = systems[chosenSystem.systemName];

        let tagNames = system.tags ||
                   _.find(system.subsystems,
                          (s, subName) => subName === chosenSystem.subsystem);

        tagNames = _.sortBy(tagNames, t => t);

        let tags = _(tagNames)
            .map(t => _.find(allTags, (c, t2) => t2 === t))
            .compact()
            .value();

        let relevantCategories = _(tags)
            .map(t => _.filter(categories, c => _.includes(t, c.name)))
            .flatten()
            .uniqBy(c => c.id)
            .value();

        let categoryLines = _.map(relevantCategories, cat => {
            let productLines = _(chosenProducts)
                .filter(p => p.categoryId === cat.id)
                .sortBy(p => p.time)
                .value();

            let availableProducts = _(products)
                .filter(p => p.categoryId === cat.id &&
                             _.some(p.tags, t => _.some(tagNames, tag => t.indexOf(tag) !== -1)))
                .sortBy([sortBy, 'price'])
                .value();

            return {...cat, productLines, availableProducts};
        });

        return categoryLines;
});
