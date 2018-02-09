import moment from 'moment';

export default [{
    id: '1',
    description: 'Food',
    amount: 4000,
    createdAt: 0
},
{
    id: '2',
    description: 'Rent',
    amount: 50000,
    createdAt: moment(0).subtract(4, 'days').valueOf()
},
{
    id: '3',
    description: 'Credit Card',
    amount: 6500,
    createdAt: moment(0).add(4, 'days').valueOf()
}]