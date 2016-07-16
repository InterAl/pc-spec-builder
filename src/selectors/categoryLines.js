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


        let system = systems[chosenSystem.systemId];

        let tagNames = system.tags ||
                   _.find(system.subsystems,
                          s => s.name === chosenSystem.subsystem).tags;

        let tags = _(tagNames).map(t => _.find(allTags, (c, t2) => t2 === t)).compact().value();
        let relevantCategories = _(tags).map(t => _.filter(categories, c => _.includes(t, c.name))).flatten().value();

        let categoryLines = _.reduce(relevantCategories, (acc, cat) => {
            let productLines = _(chosenProducts)
                .filter(p => p.categoryId === cat.id)
                .sortBy(p => p.time)
                .value();

            let availableProducts = _(products)
                .filter(p => p.categoryId === cat.id &&
                             _.intersection(p.tags, tagNames).length > 0)
                .sortBy(p => p[sortBy])
                .value();

            acc[cat.id] = {...cat, productLines, availableProducts};

            return acc;
        }, {});

        return categoryLines;
});
