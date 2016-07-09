import _ from 'lodash';
require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  renderProducts() {
      return _.map(this.props.specOptions.products, p => {
          return (
              <div>
                  {p.name}
              </div>
          );
      });
  }

  renderSpecOptions() {
      return (
          <div>
              {this.renderProducts()}
          </div>
      );
  }

  render() {
    return (
      <div className="index">
          {this.renderSpecOptions()}
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
