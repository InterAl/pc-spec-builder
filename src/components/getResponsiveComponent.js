import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bool} from 'prop-types';

export default function getResponsiveComponent(DesktopComponent, MobileComponent) {
    @connect(state => ({isMobile: state.responsive.isMobile}))
    class ResponsiveComponent extends Component {
        static propTypes = {
            isMobile: bool
        }

        render() {
            const Component = this.props.isMobile ? MobileComponent : DesktopComponent;
            return <Component {...this.props}/>;
        }
    }

    return ResponsiveComponent;
}
