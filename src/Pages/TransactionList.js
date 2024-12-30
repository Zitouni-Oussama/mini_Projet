// 

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'; // Importer le hook de traduction

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [theme, setTheme] = useState('light');
    const [filter, setFilter] = useState('all'); // Filtre par type (all, income, expense)
    const [minPrice, setMinPrice] = useState(0); // Valeur minimale pour le filtre par prix
    const [maxPrice, setMaxPrice] = useState(Infinity); // Valeur maximale pour le filtre par prix
    const [startDate, setStartDate] = useState(''); // Date de début pour le filtre par date
    const [endDate, setEndDate] = useState(''); // Date de fin pour le filtre par date
    const [nameFilter, setNameFilter] = useState(''); // Filtre par nom
    const { t } = useTranslation(); // Hook pour accéder aux traductions

    useEffect(() => {
        const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
        setTransactions(storedTransactions);
        setFilteredTransactions(storedTransactions); // Initialiser les transactions filtrées
    }, []);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') || 'light';
        setTheme(storedTheme);

        const cssFile = storedTheme === "light" ? "/Css/List.css" : "/Css/List2.css"; // Correction du chemin

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

    useEffect(() => {
        let filtered = transactions;

        // Filtrage par nom
        if (nameFilter) {
            filtered = filtered.filter(transaction =>
                transaction.name.toLowerCase().includes(nameFilter.toLowerCase())
            );
        }

        // Filtrage par type (Income ou Expense)
        if (filter !== 'all') {
            filtered = filtered.filter(transaction => transaction.type.toLowerCase() === filter);
        }

        // Filtrage par prix (plage entre minPrice et maxPrice)
        filtered = filtered.filter(transaction => {
            return transaction.amount >= minPrice && transaction.amount <= maxPrice;
        });

        // Filtrage par date
        if (startDate) {
            filtered = filtered.filter(transaction => new Date(transaction.date) >= new Date(startDate));
        }
        if (endDate) {
            filtered = filtered.filter(transaction => new Date(transaction.date) <= new Date(endDate));
        }

        setFilteredTransactions(filtered); // Mettre à jour les transactions filtrées
    }, [filter, minPrice, maxPrice, startDate, endDate, transactions, nameFilter]);

    const handleDelete = (index) => {
        const updatedTransactions = [...transactions];
        updatedTransactions.splice(index, 1);
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
        setTransactions(updatedTransactions);
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value); // Mettre à jour le filtre de type
    };

    const handleMinPriceChange = (e) => {
        setMinPrice(Number(e.target.value)); // Mettre à jour la valeur minimale
    };

    const handleMaxPriceChange = (e) => {
        setMaxPrice(Number(e.target.value)); // Mettre à jour la valeur maximale
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value); // Mettre à jour la date de début
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value); // Mettre à jour la date de fin
    };

    const handleNameFilterChange = (e) => {
        setNameFilter(e.target.value); // Mettre à jour le filtre par nom
    };

    return (
        <div className='div-list'>
            <h2>{t('TRANSACTION_LIST')}</h2> {/* Traduction du titre */}

            {/* Sélecteur de filtre par nom */}
            {/* <div>
                <label htmlFor="nameFilter">{t('FILTER_BY_NAME')}:</label>
                <input
                    type="text"
                    id="nameFilter"
                    value={nameFilter}
                    onChange={handleNameFilterChange}
                    placeholder={t('SEARCH_BY_NAME')}
                />
            </div> */}

            {/* Sélecteur de filtre par type */}
            {/* <div>
                <label htmlFor="filter">{t('FILTER_BY_TYPE')}:</label>
                <select id="filter" value={filter} onChange={handleFilterChange}>
                    <option value="all">{t('ALL')}</option>
                    <option value="income">{t('INCOME')}</option>
                    <option value="expense">{t('EXPENSE')}</option>
                </select>
            </div> */}

            {/* Sélecteur de filtre par prix */}
            {/* <div>
                <label htmlFor="minPrice">{t('MIN_PRICE')}:</label>
                <input
                    type="number"
                    id="minPrice"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    placeholder="0"
                />
                <label htmlFor="maxPrice">{t('MAX_PRICE')}:</label>
                <input
                    type="number"
                    id="maxPrice"
                    value={maxPrice === Infinity ? '' : maxPrice}
                    onChange={handleMaxPriceChange}
                    placeholder="No limit"
                />
            </div> */}

            {/* Sélecteurs de filtre par date */}
            {/* <div>
                <label htmlFor="startDate">{t('START_DATE')}:</label>
                <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={handleStartDateChange}
                />
                <label htmlFor="endDate">{t('END_DATE')}:</label>
                <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={handleEndDateChange}
                />
            </div> */}

            {/* Section des filtres */}
            <div className="filters">
                {/* Filtre par nom */}
                <div>
                    <label htmlFor="nameFilter">{t('FILTER_BY_NAME')}:</label>
                    <input
                        type="text"
                        id="nameFilter"
                        value={nameFilter}
                        onChange={handleNameFilterChange}
                        placeholder={t('SEARCH_BY_NAME')}
                    />
                </div>

                {/* Filtre par type */}
                <div>
                    <label htmlFor="filter">{t('FILTER_BY_TYPE')}:</label>
                    <select id="filter" value={filter} onChange={handleFilterChange}>
                        <option value="all">{t('ALL')}</option>
                        <option value="income">{t('INCOME')}</option>
                        <option value="expense">{t('EXPENSE')}</option>
                    </select>
                </div>

                {/* Filtre par prix */}
                <div>
                    <label htmlFor="minPrice">{t('MIN_PRICE')}:</label>
                    <input
                        type="number"
                        id="minPrice"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        placeholder="0"
                    />
                    <label htmlFor="maxPrice">{t('MAX_PRICE')}:</label>
                    <input
                        type="number"
                        id="maxPrice"
                        value={maxPrice === Infinity ? '' : maxPrice}
                        onChange={handleMaxPriceChange}
                        placeholder="No limit"
                    />
                </div>

                {/* Filtre par date */}
                <div>
                    <label htmlFor="startDate">{t('START_DATE')}:</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={handleStartDateChange}
                    />
                    <label htmlFor="endDate">{t('END_DATE')}:</label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                </div>
            </div>


            <ul>
                {filteredTransactions.map((transaction, index) => (
                    <li
                        key={index}
                        className={transaction.type === 'Income' ? 'income' : 'expense'}
                    >
                        <p>{t('NAME')}: {transaction.name}</p> {/* Traduction du nom */}
                        <p>{t('AMOUNT')}: {transaction.amount} {` ${localStorage.getItem('currency') || 'DZD'}`}</p> {/* Traduction du montant */}
                        <p>{t('DATE')}: {transaction.date}</p> {/* Traduction de la date */}
                        <p>{t('CATEGORY')}: {transaction.category}</p> {/* Traduction de la catégorie */}

                        {/* Affichage des notes, si elles existent */}
                        {transaction.notes && <p>{t('NOTES')}: {transaction.notes}</p>}

                        <button onClick={() => handleDelete(index)}>{t('DELETE')}</button> {/* Traduction du bouton */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;
