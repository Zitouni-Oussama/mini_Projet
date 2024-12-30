import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Home = () => {
    const [transactions, setTransactions] = useState([]);
    const [theme, setTheme] = useState('light');
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [todayIncome, setTodayIncome] = useState(0);
    const [todayExpenses, setTodayExpenses] = useState(0);
    const [chartData, setChartData] = useState({
        labels: [], // Dates for the last 7 days
        datasets: [
            {
                label: 'Income',
                data: [],
                borderColor: '#28a745', // Green color for income
                backgroundColor: 'rgba(40, 167, 69, 0.2)',
                fill: true,
                tension: 0.3,
            },
            {
                label: 'Expenses',
                data: [],
                borderColor: '#dc3545', // Red color for expenses
                backgroundColor: 'rgba(220, 53, 69, 0.2)',
                fill: true,
                tension: 0.3,
            }
        ]
    });

    const chartOptions = {
        plugins: {
            legend: {
                labels: {
                    color: '#f3f3f3', // Legend label color
                    font: {
                        size: 14, // Font size for legend labels
                    }
                }
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#f3f3f3', // X-axis label color
                    font: {
                        size: 12, // Font size for X-axis labels
                    }
                },
                grid: {
                    color: '#686868', // Grid line color for X-axis
                }
            },
            y: {
                ticks: {
                    color: '#f3f3f3', // Y-axis label color
                    font: {
                        size: 12, // Font size for Y-axis labels
                    }
                },
                grid: {
                    color: '#686868', // Grid line color for Y-axis
                }
            }
        }
    };

    const chartOptions_light = {
        plugins: {
            legend: {
                labels: {
                    color: '#000', // Legend label color
                    font: {
                        size: 14, // Font size for legend labels
                    }
                }
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#000', // X-axis label color
                    font: {
                        size: 12, // Font size for X-axis labels
                    }
                },
                grid: {
                    color: '#000', // Grid line color for X-axis
                }
            },
            y: {
                ticks: {
                    color: '#000', // Y-axis label color
                    font: {
                        size: 12, // Font size for Y-axis labels
                    }
                },
                grid: {
                    color: '#000', // Grid line color for Y-axis
                }
            }
        }
    };

    useEffect(() => {
        const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
        setTransactions(storedTransactions);

        // Calculate total income and expenses
        const income = storedTransactions
            .filter((t) => t.type === 'Income')
            .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
        const expenses = storedTransactions
            .filter((t) => t.type === 'Expense')
            .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

        setTotalIncome(income);
        setTotalExpenses(expenses);

        // Calculate today's income and expenses
        const today = new Date().toDateString();
        const todayIncome = storedTransactions
            .filter((t) => t.type === 'Income' && new Date(t.date).toDateString() === today)
            .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
        const todayExpenses = storedTransactions
            .filter((t) => t.type === 'Expense' && new Date(t.date).toDateString() === today)
            .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

        setTodayIncome(todayIncome);
        setTodayExpenses(todayExpenses);

        // Calculate the income and expenses for the last 7 days
        let dailyIncome = new Array(7).fill(0); // Array to hold income data for the last 7 days
        let dailyExpenses = new Array(7).fill(0); // Array to hold expenses data for the last 7 days
        let labels = [];

        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            labels.push(date.toLocaleDateString());

            storedTransactions.forEach((transaction) => {
                const transactionDate = new Date(transaction.date);
                if (transactionDate.toLocaleDateString() === date.toLocaleDateString()) {
                    if (transaction.type === 'Income') {
                        dailyIncome[6 - i] += parseFloat(transaction.amount);
                    } else if (transaction.type === 'Expense') {
                        dailyExpenses[6 - i] += parseFloat(transaction.amount);
                    }
                }
            });
        }

        // Update chart data
        setChartData({
            labels: labels,
            datasets: [
                {
                    label: 'Income',
                    data: dailyIncome,
                    borderColor: '#28a745',
                    backgroundColor: 'rgba(40, 167, 69, 0.5)',
                    fill: true,
                    tension: 0.3,
                },
                {
                    label: 'Expenses',
                    data: dailyExpenses,
                    borderColor: '#dc3545',
                    backgroundColor: 'rgba(220, 53, 69, 0.5)',
                    fill: true,
                    tension: 0.3,
                }
            ]
        });
    }, []);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') || 'light';
        const cssFile = storedTheme === "light" ? "/Css/Home.css" : "/Css/Home2.css"; // Correction du chemin
        setTheme(storedTheme);

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

    return (
        <div className="home-container">
            <h1 className="welcome-message">Welcome to Your Budget Tracker</h1>
            <div className="balance-section">
                <div className="balance-box" id='INCOME'>
                    <p className="total-income">Total Income: {totalIncome} {` ${localStorage.getItem('currency') || 'DZD'}`}</p>
                </div>
                <div className="balance-box" id='EXPENSES'>
                    <p className="total-expenses">Total Expenses: {totalExpenses} {` ${localStorage.getItem('currency') || 'DZD'}`}</p>
                </div>
                <div className="balance-box" id='BALANCE'>
                    <p className="balance">Balance: {totalIncome - totalExpenses} {` ${localStorage.getItem('currency') || 'DZD'}`}</p>
                </div>
            </div>

            <div className="chart-container">
                {/* Chart Section */}
                <div className="chart-section">
                    <h2>Income and Expenses for the Last 7 Days</h2>
                    {
                        theme === "light" ?
                            (
                                <Line data={chartData} options={chartOptions_light} />
                            ) : (
                                <Line data={chartData} options={chartOptions} />
                            )
                    }
                </div>

                <div className="daily-info">
                    <div className="daily-info-box">
                        <h3>Today's Income</h3>
                        <p>{todayIncome} {` ${localStorage.getItem('currency') || 'DZD'}`}</p>
                    </div>
                    <div className="daily-info-box">
                        <h3>Today's Expenses</h3>
                        <p>{todayExpenses} {` ${localStorage.getItem('currency') || 'DZD'}`}</p>
                    </div>
                    <div className="daily-info-box">
                        <h3>Today's Balance</h3>
                        <p>{todayIncome - todayExpenses}{` ${localStorage.getItem('currency') || 'DZD'}`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
