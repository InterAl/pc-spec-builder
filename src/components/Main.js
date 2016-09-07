require('normalize.css/normalize.css');
require('styles/App.css');
import _ from 'lodash';
import React from 'react';
import SpecLinesBuilder from './SpecLinesBuilder';
import './Main.css';

class AppComponent extends React.Component {
    render() {
        return (
            <div className="index">
                <SpecLinesBuilder
                    dispatch={this.props.dispatch}
                    categories={this.props.state.specOptions.categories}
                    systems={this.props.state.specOptions.systems}
                    tags={this.props.state.specOptions.tags}
                    products={this.props.state.specOptions.products}
                    chosenProducts={this.props.state.chosenProducts}
                    chosenSystem={this.props.state.chosenSystem}
                    sortBy={this.props.state.sortBy}
                />
            </div>
        );
    }
}

AppComponent.defaultProps = {
};

export default AppComponent;
