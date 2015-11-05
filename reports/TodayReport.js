/**
 * @jsx React.DOM
 */

var React = require('react');
var Moment = require('moment');
var _ = require('lodash');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var ReactBootStrap = require('react-bootstrap');
var numeral = require('numeral');
var Pie = require('../components/charts/Pie');

var config = require('../conf/config');
/** components */
var LoadingMask = require('../components/LoadingMask');
var PieDetail = require('../components/PieDetail');
var TimeConsumeRanking = require('../components/TimeConsumeRanking');
var DatePicker = require('../components/DatePicker');

/** Utils */
var DataAPI = require('../utils/DataAPI');


module.exports = React.createClass({

    getDefaultProps: function () {
        return {
            showDatePicker : true
        };
    },

    getInitialState: function () {
        var date = this.props.date || this.props.query.date;
        return {
            date: new Moment(date)
        };
    },

    render: function () {
        var date = this.state.date;
        return (
            <div className="ltt_c-report ltt_c-report-TodayReport">
                {
                this.props.showDatePicker ?
                <div className="Grid Grid--gutters">
                    <div className="Grid-cell u-1of4">
                        <DatePicker date={date} onChange={this.onDateChange}/>
                    </div>
                </div>
                :
                null
                }
                <div className="Grid Grid--gutters Grid--stretch ltt_c-report-TodayReport-header">
                    <div className="Grid-cell">
                        <PieDetail className="chart" date={date} type="classes"/>
                    </div>
                </div>
                <div className="Grid Grid--gutters Grid--stretch">
                    <div className="Grid-cell u-1of2">
                        <TimeConsumeRanking className="chart"
                            params={{
                                start: Moment(date).startOf('day').toDate(),
                                end: Moment(date).endOf('day').toDate()
                            }}/>
                    </div>
                    <div className="Grid-cell u-1of2">
                        <div className="chart"></div>
                    </div>
                </div>
            </div>
        );
    },


    onDateChange: function (date) {
        this.setState({
            date: date
        });
    }
});