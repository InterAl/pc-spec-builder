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
                    categories={this.props.specOptions.categories}
                    products={this.props.specOptions.products}
                />
            </div>
        );
    }
}

AppComponent.defaultProps = {
};

export default AppComponent;
