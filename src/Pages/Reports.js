import React, { useEffect, useState } from 'react';
import { Line, Pie, Doughnut, Bar } from 'react-chartjs-2';
import Chart, { scales } from 'chart.js/auto';
import moment from 'moment';

const Reports = () => {
    const [currency, setCurrency] = useState(null);
    const [theme, setTheme] = useState('light');
    const [lineChartData, setLineChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Income',
                data: [],
                borderColor: '#36A2EB',
                fill: false,
                backgroundColor: '#36A2EB',
            },
            {
                label: 'Expense',
                data: [],
                borderColor: '#FF6384',
                fill: false,
                backgroundColor: '#FF6384',
            },
        ],
    });

    useEffect(() => {
        const storedCurrency = localStorage.getItem("currency");
        setCurrency(storedCurrency); // Set the currency state
        const storedTheme = localStorage.getItem('theme') || 'light';
        setTheme(storedTheme);


        const cssFile = storedTheme === "light" ? "/Css/Reports.css" : "/Css/Reports2.css"; // Correction du chemin

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

    const chartOptions = {
        plugins: {
            title: {
                display: true,
                text: '', // Title for the chart
                font: {
                    size: 18, // Title font size
                    family: 'Arial', // Title font family
                    weight: 'bold', // Title font weight
                },
                color: '#ffffff', // Title color
            },
            legend: {
                labels: {
                    color: '#f3f3f3', // Color of legend labels
                    font: {
                        size: 14, // Font size of legend labels
                    }
                }
            }
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
            title: {
                display: true,
                text: '', // Title for the chart
                font: {
                    size: 18, // Title font size
                    family: 'Arial', // Title font family
                    weight: 'bold', // Title font weight
                },
                color: '#000', // Title color
            },
            legend: {
                labels: {
                    color: '#000', // Color of legend labels
                    font: {
                        size: 14, // Font size of legend labels
                    }
                }
            }
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

    const chartOptions_1 = {
        plugins: {
            title: {
                display: true,
                text: '', // Title for the chart
                font: {
                    size: 18, // Title font size
                    family: 'Arial', // Title font family
                    weight: 'bold', // Title font weight
                },
                color: '#ffffff', // Title color
            },
            legend: {
                labels: {
                    color: '#f3f3f3', // Color of legend labels
                    font: {
                        size: 14, // Font size of legend labels
                    }
                }
            }
        },
    };

    const chartOptions_1_light = {
        plugins: {
            title: {
                display: true,
                text: '', // Title for the chart
                font: {
                    size: 18, // Title font size
                    family: 'Arial', // Title font family
                    weight: 'bold', // Title font weight
                },
                color: '#000', // Title color
            },
            legend: {
                labels: {
                    color: '#000', // Color of legend labels
                    font: {
                        size: 14, // Font size of legend labels
                    }
                }
            }
        },
    };

    const [incomePieChartData, setIncomePieChartData] = useState({
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40',
                    '#FFCD56', '#FFB6C1', '#8A2BE2', '#98FB98', '#20B2AA',
                    '#FFD700', '#F0E68C', '#FF1493', '#FF6347', '#32CD32',
                    '#8A2BE2', '#00CED1', '#F08080', '#D2691E', '#7FFF00'
                ],
            },
        ],
    });

    const [expensePieChartData, setExpensePieChartData] = useState({
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40',
                    '#FFCD56', '#FFB6C1', '#8A2BE2', '#98FB98', '#20B2AA',
                    '#FFD700', '#F0E68C', '#FF1493', '#FF6347', '#32CD32',
                    '#8A2BE2', '#00CED1', '#F08080', '#D2691E', '#7FFF00'
                ],
            },
        ],
    });

    const [monthlyBarChartData, setMonthlyBarChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Income',
                data: [],
                backgroundColor: '#36A2EB',
            },
            {
                label: 'Expense',
                data: [],
                backgroundColor: '#FF6384',
            },
        ],
    });

    useEffect(() => {
        // Récupération des transactions stockées dans le localStorage
        const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    
        // Validation pour vérifier que les transactions sont bien un tableau
        if (!Array.isArray(storedTransactions)) {
            console.error('Transactions is not an array');
            return;
        }
    
        // ---------------------- 1. Données pour le graphique des 7 derniers jours ----------------------
        const daysLabels = []; // Labels pour les 7 derniers jours
        const today = moment().startOf('day'); // Date actuelle (début de la journée)
        const incomeDataLast7Days = Array(7).fill(0); // Données de revenus pour 7 jours
        const expenseDataLast7Days = Array(7).fill(0); // Données de dépenses pour 7 jours
    
        // Générer les labels pour les 7 derniers jours
        for (let i = 6; i >= 0; i--) {
            daysLabels.push(moment(today).subtract(i, 'days').format('DD MMM')); // Format: Jour Mois
        }
    
        // Parcourir les transactions pour remplir les données des 7 derniers jours
        storedTransactions.forEach((transaction) => {
            const transactionDate = moment(transaction.date).startOf('day'); // Normaliser la date
            const diffDays = today.diff(transactionDate, 'days'); // Calcul de la différence en jours
    
            if (diffDays >= 0 && diffDays < 7) {
                const index = 6 - diffDays; // Trouver l'index correspondant pour le tableau
                if (transaction.type === 'Income') {
                    incomeDataLast7Days[index] += parseFloat(transaction.amount); // Ajouter aux revenus
                } else if (transaction.type === 'Expense') {
                    expenseDataLast7Days[index] += parseFloat(transaction.amount); // Ajouter aux dépenses
                }
            }
        });
    
        // Mettre à jour les données pour le graphique linéaire
        setLineChartData({
            labels: daysLabels,
            datasets: [
                {
                    label: 'Income',
                    data: incomeDataLast7Days,
                    borderColor: '#36A2EB',
                    backgroundColor: '#36A2EB',
                    fill: false,
                },
                {
                    label: 'Expense',
                    data: expenseDataLast7Days,
                    borderColor: '#FF6384',
                    backgroundColor: '#FF6384',
                    fill: false,
                },
            ],
        });
    
        // ---------------------- 2. Données pour le graphique des 12 derniers mois ----------------------
        const monthlyLabels = []; // Labels pour les 12 derniers mois
        const incomeDataLast12Months = Array(12).fill(0); // Données pour les revenus mensuels
        const expenseDataLast12Months = Array(12).fill(0); // Données pour les dépenses mensuelles
    
        const todayMonth = moment().startOf('month'); // Début du mois courant
    
        // Générer les labels pour les 12 derniers mois
        for (let i = 11; i >= 0; i--) {
            monthlyLabels.push(moment(todayMonth).subtract(i, 'months').format('MMM YYYY'));
        }
    
        // Parcourir les transactions pour remplir les données des 12 derniers mois
        storedTransactions.forEach((transaction) => {
            const transactionDate = moment(transaction.date).startOf('month'); // Normaliser la date
            const diffMonths = todayMonth.diff(transactionDate, 'months'); // Calcul de la différence en mois
    
            if (diffMonths >= 0 && diffMonths < 12) {
                const index = 11 - diffMonths; // Trouver l'index correspondant pour le tableau
                if (transaction.type === 'Income') {
                    incomeDataLast12Months[index] += parseFloat(transaction.amount);
                } else if (transaction.type === 'Expense') {
                    expenseDataLast12Months[index] += parseFloat(transaction.amount);
                }
            }
        });
    
        // Mettre à jour les données pour le graphique des 12 mois
        setMonthlyBarChartData({
            labels: monthlyLabels,
            datasets: [
                {
                    label: 'Income',
                    data: incomeDataLast12Months,
                    backgroundColor: '#36A2EB',
                },
                {
                    label: 'Expense',
                    data: expenseDataLast12Months,
                    backgroundColor: '#FF6384',
                },
            ],
        });
    
        // ---------------------- 3. Données pour les graphiques circulaires (catégories) ----------------------
        const incomeCategories = {};
        const expenseCategories = {};
    
        // Parcourir les transactions pour regrouper les montants par catégorie
        storedTransactions.forEach((transaction) => {
            if (transaction.type === 'Income') {
                incomeCategories[transaction.category] =
                    (incomeCategories[transaction.category] || 0) + parseFloat(transaction.amount);
            } else if (transaction.type === 'Expense') {
                expenseCategories[transaction.category] =
                    (expenseCategories[transaction.category] || 0) + parseFloat(transaction.amount);
            }
        });
    
        // Mettre à jour les données pour le graphique des catégories de revenus
        setIncomePieChartData({
            labels: Object.keys(incomeCategories),
            datasets: [
                {
                    data: Object.values(incomeCategories),
                    backgroundColor: [
                        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40', '#8A2BE2', '#00CED1',
                    ],
                },
            ],
        });
    
        // Mettre à jour les données pour le graphique des catégories de dépenses
        setExpensePieChartData({
            labels: Object.keys(expenseCategories),
            datasets: [
                {
                    data: Object.values(expenseCategories),
                    backgroundColor: [
                        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40', '#8A2BE2', '#00CED1',
                    ],
                },
            ],
        });
    }, []); // Dépendance vide pour exécuter une seule fois au chargement

    return (
        <div className="reports-container">
            <h2>Visual Reports</h2>

            <div className="charts-container">
                <div className="chart-item">
                    <h3>Income vs Expense (Last 7 Days)</h3>
                    {theme === "light" ? (
                        <Line data={lineChartData} options={chartOptions_light} />
                    ) : (
                        <Line data={lineChartData} options={chartOptions} />
                    )}
                </div>

                <div className="chart-item">
                    <h3>Income vs Expense (Last 12 Months)</h3>
                    {theme === "light" ?
                        (
                            <Bar data={monthlyBarChartData} options={chartOptions_light} />
                        ) : (
                            <Bar data={monthlyBarChartData} options={chartOptions} />
                        )}
                </div>

                <div className="chart-item">
                    <h3>Income Categories</h3>
                    {
                        theme === "light" ?
                            (
                                <Doughnut data={incomePieChartData} options={chartOptions_1_light} />
                            ) : (
                                <Doughnut data={incomePieChartData} options={chartOptions_1} />
                            )
                    }
                </div>

                <div className="chart-item">
                    <h3>Expense Categories</h3>
                    {
                        theme === "light" ?
                            (
                                <Pie data={expensePieChartData} options={chartOptions_1_light} />
                            ) : (
                                <Pie data={expensePieChartData} options={chartOptions_1} />
                            )
                    }
                </div>

            </div>
        </div>
    );
};

export default Reports;