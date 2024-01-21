import axios from 'axios';

export function storeExpense(expenseData) {
    axios.post(
        'https://react-native-course-8a8ff-default-rtdb.europe-west1.firebasedatabase.app/expenses.json',
        expenseData,
    );
}
