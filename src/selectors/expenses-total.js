export default (expenses) => {
    const nums = expenses.map((expense) => { return expense.amount });
    return nums.reduce((total, amount) => total + amount, 0);
}