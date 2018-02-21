import React from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

/* *******TODO******* */
/* ****************** */
/*  1. Animate on filter change?
    2. Hyperlink graph points? https://stackoverflow.com/questions/45980436/chart-js-link-to-other-page-when-click-on-specific-section-in-chart
    
/* ****************** */

const data = {
    datasets: [
    {
        borderColor: '#ffb931',
        fill: false,
        label: 'Expenses',
        pointBorderColor: '#364051',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#364051',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 10,
        showLine: true,
    }
    ]
};

const timeAxis = [{
    type: 'time',
    distribution: 'linear',
    time: {
        displayFormats: {
            day: 'D MMM YY'
        },
        unit: 'day'
    }
}]

const amountAxis = [{
    ticks: {
        callback: (value, index, values) => {
            return '$' + value.toFixed(2);
        }
    }
}]

const options  = {
    legend: {
        display: false,
    },
    scales: {
        xAxes: [{
            ticks: {
                autoSkip: false,
            }
        }],
        yAxes: amountAxis
    }
};

const truncator = (str) => {
    const length = 25;
    str = str.length > length ? str.substring(0, length) + '...' : str;
    return str;
}

export class ExpenseGraph extends React.Component {

    // For some insane reason, if I declare this in expenseParser(), the only place it's used,
    // it breaks the graph when sortBy is date (changes the x-axis from time to description labels).
    isSortByDate = () => this.props.filters.sortBy === 'date' ? true : false;

    // Yeah, I could have put this in expenseParser, but that boy was getting big
    strip = (expenses) => {
        let xy = [];
        let title = [];
        for (const i in expenses) {
                xy.push({x: expenses[i].createdAt, y: (expenses[i].amount / 100).toFixed(2)});
                title.push(truncator(expenses[i].description));
            }
        return [xy, title];
    }

    // Wears the pants in this class. Basically takes the data from props and grooms it to fit the
    // chartjs datastructe requirements. Handles whether the user has sorted by date or amount.
    expenseParser = (props) => {
        const arr = this.strip(props.expenses);
        const tooltips = {
            displayColors: false,
            callbacks: { 
                title: (tooltipItem, data) => {
                    // if sortBy is 'amount', reverse title array
                    const title = this.isSortByDate() ? 
                        arr[1][tooltipItem[0].index] :
                        arr[1][arr[1].length - 1 - tooltipItem[0].index]
                    return title;
                },
                label: (tooltipItem, data) => {
                    const createdAt = moment(arr[0][tooltipItem.index].x).format('D MMM YY')
                    const amount = arr[0][tooltipItem.index].y
                    return '$' + amount + ' - ' + createdAt;
                }
            }
        }
        // if sortBy is 'amount', set labels and reverse expense array
        let labels = {};
        if (!this.isSortByDate()) {
            let labelArray = [];
            for (const i in arr[1]) labelArray.push(arr[1][i]);
            labels = { labels: labelArray.reverse() };
            arr[0] = arr[0].reverse();
        }
        // if sortBy is 'date', set axis scales
        const scales = this.isSortByDate() && { scales: { xAxes: timeAxis, yAxes: amountAxis }};
        // apply padding for single value datasets/overlapping datasets that appear as a single value
        const whether = (array) => {
            const len = array.length;
            let isSame = false;
            for (let i = 1; i < len; i++) {
                // I put the arbitrary value of a 12 hour difference here.
                if (array[0].x - array[i].x >= 43200000) {
                    isSame = false;
                    break;
                } else {
                    isSame = true;
                }
            }
            return isSame;
        }
        if (arr[0].length === 1 || whether(arr[0])) {
            const arrCopy = Object.assign({}, arr);
            arr[0].unshift({x: arrCopy[0][0].x - 86400000, y: null});
            arr[0].push({x: arrCopy[0][0].x + 2 * 86400000, y: null});
        }
        // combine all the data into the very specific chartjs data structure
        const dataCombine = {...labels, datasets: [{...data.datasets[0], data: arr[0]}]};
        return [
            dataCombine, 
            {...options, ...scales, tooltips: tooltips}
        ];
    }

    render() {
        const parsedData = this.expenseParser(this.props);
        const Chart = <Line data={ parsedData[0] } options={parsedData[1] } redraw />;
        return (
            <div>
                {(() => {
                    /*This addresses the cases when the user tries to graph 0 or 1 expenses*/
                    switch (this.props.expenses.length){
                        case 0:
                            return (
                                <p className="list-item list-item--graph-message">
                                    You honestly want me to graph nothing? I'm a computer, not a philosopher.
                                </p>
                            );
                        case 1:
                            return (
                                <div>
                                    <p className="list-item list-item--graph-message">
                                        A graph of a single point. Fancy.
                                    </p>
                                    {Chart}
                                </div>
                            );
                        default:
                            return Chart;
                    }
                })()}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ filters: state.filters });
export default connect(mapStateToProps)(ExpenseGraph);