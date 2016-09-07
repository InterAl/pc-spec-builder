import _ from 'lodash';
import React from 'react';
import Select from 'react-select';
import * as actions from '../actions/chosenSystem';
import './SystemPicker.less';

export default class SystemPicker extends React.Component {
    static PropTypes = {
        dispatch: React.PropTypes.func.isRequired,
        systems: React.PropTypes.object.isRequired,
        systemName: React.PropTypes.number.isRequired,
        subsystem: React.PropTypes.string
    }

    constructor(props) {
        super();

        this.state = {};

        this.handleChooseSystem = this.handleChooseSystem.bind(this);
        this.handleClickSystem = this.handleClickSystem.bind(this);
        this.handleClickSubsystem = this.handleClickSubsystem.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            systemName: nextProps.systemName,
            subsystem: nextProps.subsystem
        });
    }

    handleChooseSystem() {
        let {systemName, subsystem} = this.state;
        this.props.dispatch(actions.chooseSystem(systemName, subsystem));
    }

    handleClickSystem(systemName) {
        if (systemName !== this.state.systemName) {
            let system = _.find(this.props.systems, (s, name) => name === systemName);
            let subsystemName = Object.keys(system.subsystems)[0];
            let subsystem = system.subsystems[subsystemName];
            this.setState({ subsystem: subsystem && subsystemName });
        }

        this.setState({
            systemName
        });
    }

    handleClickSubsystem(systemName, subsystem) {
        this.state.systemName === systemName &&
        this.setState({subsystem: _.get(subsystem, 'value')});
    }

    getSubsystems() {
        let system = _.find(this.props.systems,
                      (s, name) => name === this.state.systemName);

        return {
            subsystems: _.get(system, 'subsystems'),
            systemName: this.state.systemName
        };
    }

    isDirty() {
        return this.state.systemName !== this.props.systemName ||
               this.state.subsystem !== this.props.subsystem;
    }

    renderSubsystems() {
        const {subsystems, systemName} = this.getSubsystems();

        const options = _.map(subsystems, (subsystem, subsystemName) => ({
            value: subsystemName,
            label: subsystemName
        }));

        return (
            <Select onChange={
                subsystem => this.handleClickSubsystem(systemName, subsystem)
            }
                    value={this.state.subsystem}
                    className="select col-sm-10 pull-right system"
                    clearable={false}
                    dir="ltr"
                    options={options}
                />
        );
    }

    renderSystems() {
        const options = _.map(this.props.systems, (system, name) => ({
            value: name,
            label: name
        }));

        return (
            <Select onChange={({value}) => this.handleClickSystem(value)}
                    value={this.state.systemName}
                    className="select col-sm-10 pull-right system"
                    clearable={false}
                    dir="ltr"
                    options={options}
                />
        );
    }

    render() {
        return (
            <div className="systemPicker">
                <div className="systems row">
                    <div className="col-xs-12 col-sm-6 pull-right">
                        <div className="col-xs-1 col-sm-2 pull-right">
                            סוג מערכת:
                        </div>
                        <div className="col-xs-11 col-sm-10 pull-right">
                            {this.renderSystems()}
                        </div>
                    </div>
                    {_.get(this.getSubsystems(), 'subsystems') &&
                    <div className="col-xs-10 offset-xs-1 col-sm-3 pull-right">
                        {this.renderSubsystems()}
                    </div>
                    }
                </div>
                {this.isDirty() &&
                    <div className='row'>
                        <div className='col-xs-4 col-xs-offset-4 button-row'>
                            <button onClick={this.handleChooseSystem}
                                    className='chooseBtn btn btn-link'>
                                    שנה סוג מערכת
                            </button>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
