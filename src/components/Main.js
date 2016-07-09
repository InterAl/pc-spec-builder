require('normalize.css/normalize.css');
require('styles/App.css');
import _ from 'lodash';
import React from 'react';
import SpecLinesBuilder from './SpecLinesBuilder';

class AppComponent extends React.Component {
    render() {
        return (
            <div className="index">
                <SpecLinesBuilder
                    dispatch={this.props.dispatch}
                    categories={this.props.state.specOptions.categories}
                    products={this.props.state.specOptions.products}
                    chosenProducts={this.props.state.chosenProducts}
                />
            </div>
        );
    }
}

AppComponent.defaultProps = {
};

export default AppComponent;
