import React, { useState, useEffect } from 'react';

const AddTransaction = () => {
    const [transaction, setTransaction] = useState({
        name: '',
        amount: '',
        date: '',
        category: '',
        type: '',
        notes: '', // optional notes field
    });
    const [theme, setTheme] = useState('light'); 

    // Categories based on transaction type
    const incomeCategories = [
        "Salary",
        "Freelance",
        "Investments",
        "Business",
        "Rental Income",
        "Gifts",
        "Others"
    ];

    const expenseCategories = [
        "Groceries",
        "Transportation",
        "Entertainment",
        "Utilities",
        "Rent",
        "Dining Out",
        "Healthcare",
        "Education",
        "Others"
    ];

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') || 'light';

        const cssFile = storedTheme === "light" ? "/Css/AddTransaction.css" : "/Css/AddTransaction2.css"; // Correction du chemin
    
        // Vérifiez si un lien avec ce href existe déjà
        const existingLink = document.querySelector(`link[href="${cssFile}"]`);
        if (!existingLink) {
          // Dynamically add the CSS file to the document
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = cssFile;
          document.head.appendChild(link);
    
          // Cleanup function to remove the CSS file if the component unmounts
          return () => {
            document.head.removeChild(link);
          };
        }
      }, []);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation check before submitting
        if (!transaction.name || !transaction.amount || !transaction.date || !transaction.type || !transaction.category) {
            alert('Please fill in all required fields!');
            return;
        }

        const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
        storedTransactions.push(transaction);
        localStorage.setItem('transactions', JSON.stringify(storedTransactions));

        alert('Transaction added successfully!');
        window.location.href = '/';
    };

    // Handle radio button change
    const handleTypeChange = (type) => {
        setTransaction({
            ...transaction,
            type: type,
            category: '', // Reset category selection when type changes
        });
    };

    return (
        <div className="home-container-add">
            <form onSubmit={handleSubmit}>
                <h2>Add Transaction</h2>

                {/* Transaction Name */}
                <input
                    type="text"
                    placeholder="Transaction Name"
                    value={transaction.name}
                    onChange={(e) => setTransaction({ ...transaction, name: e.target.value })}
                    required
                />

                {/* Amount */}
                <input
                    type="number"
                    placeholder={`Amount (${localStorage.getItem('currency') || 'DZD'})`}
                    value={transaction.amount}
                    onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })}
                    required
                />

                {/* Date */}
                <input
                    type="date"
                    value={transaction.date}
                    onChange={(e) => setTransaction({ ...transaction, date: e.target.value })}
                    required
                />

                {/* Radio Buttons for Transaction Type */}
                <div>
                    <label>
                        <input
                            type="radio"
                            value="Income"
                            checked={transaction.type === 'Income'}
                            onChange={() => handleTypeChange('Income')}
                            required
                        />
                        Income
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Expense"
                            checked={transaction.type === 'Expense'}
                            onChange={() => handleTypeChange('Expense')}
                        />
                        Expense
                    </label>
                </div>

                {/* Category Dropdown */}
                {transaction.type && (
                    <select
                        value={transaction.category}
                        onChange={(e) => setTransaction({ ...transaction, category: e.target.value })}
                        required
                    >
                        <option value="">Select Category</option>
                        {(transaction.type === 'Income' ? incomeCategories : expenseCategories).map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                )}

                {/* Optional Notes */}
                <textarea
                    placeholder="Optional Notes"
                    value={transaction.notes}
                    onChange={(e) => setTransaction({ ...transaction, notes: e.target.value })}
                    rows="4"
                    cols="50"
                />

                {/* Submit Button */}
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddTransaction;
