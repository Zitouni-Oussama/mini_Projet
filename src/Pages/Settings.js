// import React, { useState, useEffect } from "react";
// import Select from "react-select"; // Import React-Select
// import { useNavigate } from "react-router-dom";
// import Papa from 'papaparse';
// import "./../Settings.css"

// const Settings = () => {
//     const [currency, setCurrency] = useState({ value: "DZD", label: "Algerian Dinar (DZD)" });
//     const [theme, setTheme] = useState("light");
//     const [transactions, setTransactions] = useState([]);
//     const navigate = useNavigate();





//     useEffect(() => {
//         // Récupérer la devise et le thème enregistrés dans localStorage
//         const savedCurrency = localStorage.getItem("currency");
//         if (savedCurrency) {
//             const selected = availableCurrencies.find((cur) => cur.value === savedCurrency);
//             setCurrency(selected || { value: "DZD", label: "Algerian Dinar (DZD)" });
//         }

//         const savedTheme = localStorage.getItem("theme") || "light";
//         setTheme(savedTheme);
//         document.body.setAttribute("data-theme", savedTheme);

//         // Récupérer les transactions depuis le localStorage au démarrage avec la nouvelle clé
//         const savedTransactions = JSON.parse(localStorage.getItem('userTransactions')) || [];
//         setTransactions(savedTransactions);

//     }, []);

//     const handleCurrencyChange = (selectedOption) => {
//         setCurrency(selectedOption);
//         localStorage.setItem("currency", selectedOption.value);
//         setTimeout(() => {
//             navigate(0); // Rafraîchir la page pour appliquer la nouvelle devise
//         }, 100);
//     };

//     const toggleTheme = () => {
//         const newTheme = theme === "light" ? "dark" : "light";
//         setTheme(newTheme);
//         localStorage.setItem("theme", newTheme);
//         document.body.setAttribute("data-theme", newTheme);
//         setTimeout(() => {
//             navigate(0);
//         }, 100);
//     };

//     const exportToCSV = () => {
//         const transactions = JSON.parse(localStorage.getItem('transactions')) || []; // Utiliser la nouvelle clé
//         if (!Array.isArray(transactions) || transactions.length === 0) {
//             alert("No transactions available to export.");
//             return;
//         }

//         const headers = ["NAME", "AMOUNT", "DATE", "CATEGORY", "NOTES", "TYPE"];
//         const csvRows = [headers.join(";")];

//         transactions.forEach((transaction) => {
//             const row = [
//                 transaction.name,
//                 `${transaction.amount}`,
//                 transaction.date,
//                 transaction.category,
//                 transaction.notes,
//                 transaction.type,
//             ];
//             csvRows.push(row.join(";"));
//         });

//         const csvContent = csvRows.join("\n");
//         const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//         const url = URL.createObjectURL(blob);

//         const link = document.createElement("a");
//         link.href = url;
//         link.download = "transactions.csv";
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };


//     const handleFileUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             Papa.parse(file, {
//                 complete: (result) => {
//                     console.log("Parsed CSV:", result);

//                     // Structure attendue des transactions
//                     const importedData = result.data
//                         .filter(row => row.NAME && row.AMOUNT && row.DATE) // Vérifiez les champs essentiels
//                         .map(row => {
//                             // Convertir la date du format DD/MM/YYYY au format YYYY-MM-DD
//                             const dateParts = row.DATE.split("/"); // Diviser par "/"
//                             const formattedDate = dateParts.length === 3
//                                 ? `${dateParts[2]}-${dateParts[1].padStart(2, "0")}-${dateParts[0].padStart(2, "0")}`
//                                 : row.DATE; // Si le format n'est pas valide, conserver tel quel

//                             return {
//                                 name: row.NAME,
//                                 amount: parseFloat(row.AMOUNT), // Convertir le montant en nombre
//                                 date: formattedDate,
//                                 category: row.CATEGORY || "Others", // Catégorie par défaut si absente
//                                 type: row.TYPE || "Expense", // Type par défaut si absent
//                                 notes: row.NOTES || "", // Notes optionnelles
//                             };
//                         });

//                     if (importedData.length === 0) {
//                         alert("No valid transactions found in the uploaded file.");
//                         return;
//                     }

//                     // Récupérer les transactions existantes depuis localStorage
//                     const existingTransactions = JSON.parse(localStorage.getItem('transactions')) || [];

//                     // Ajouter les nouvelles transactions aux existantes
//                     const updatedTransactions = [...existingTransactions, ...importedData];

//                     // Sauvegarder dans localStorage
//                     localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

//                     // Mettre à jour l'état local
//                     setTransactions(updatedTransactions);

//                     alert("Transactions successfully added!");
//                 },
//                 header: true, // Le fichier CSV doit inclure des en-têtes
//                 skipEmptyLines: true,
//             });
//         }
//     };





//     // Effet pour récupérer les transactions de localStorage à chaque fois qu'elles sont mises à jour
//     useEffect(() => {
//         const savedTransactions = JSON.parse(localStorage.getItem('userTransactions')) || [];
//         setTransactions(savedTransactions);
//     }, []); // Utiliser un tableau vide pour ne l'exécuter qu'au montage du composant


//     return (
//         <div id="great_div">
//             <h2>Settings</h2>

//             {/* Section pour changer la devise */}
//             <p>Choose your preferred currency:</p>
//             <Select
//                 value={currency}
//                 onChange={handleCurrencyChange}
//                 options={availableCurrencies}
//                 placeholder="Select a currency..."
//             />

//             {/* Section pour basculer entre les modes clair et sombre */}
//             <div style={{ marginTop: "20px" }}>
//                 <p>Choose your theme:</p>
//                 <button
//                     onClick={toggleTheme}
//                 >
//                     {theme === "light" ? (
//                         <span>🌞 Light Mode</span>
//                     ) : (
//                         <span>🌙 Dark Mode</span>
//                     )}
//                 </button>
//             </div>

//             <div style={{ marginTop: "20px" }}>
//                 <p>Export your transactions:</p>
//                 <button
//                     onClick={exportToCSV}
//                 >
//                     Export to CSV
//                 </button>
//             </div>

//             {/* Section pour importer un fichier CSV */}
//             <div style={{ marginTop: "20px" }}>
//                 <p>Import a CSV file:</p>
//                 <input
//                     id="file-upload"
//                     type="file"
//                     accept=".csv"
//                     onChange={handleFileUpload}
//                 />
//             </div>


//             {transactions.length > 0 && (
//                 <div>
//                     <h3>Imported Transactions</h3>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>NAME</th>
//                                 <th>AMOUNT</th>
//                                 <th>DATE</th>
//                                 <th>CATEGORY</th>
//                                 <th>NOTE</th>
//                                 <th>TYPE</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {/* {transactions.map((transaction, index) => (
//                                 <tr key={index}>
//                                     <td>{transaction.NAME}</td>
//                                     <td>{transaction.AMOUNT}</td>
//                                     <td>{transaction.DATE}</td>
//                                     <td>{transaction.CATEGORY}</td>
//                                     <td>{transaction.NOTES}</td>
//                                     <td>{transaction.TYPE}</td>
//                                 </tr>
//                             ))} */}
//                             {transactions.map((transaction, index) => (
//                                 <tr key={index}>
//                                     <td>{transaction.name}</td>
//                                     <td>{transaction.amount}</td>
//                                     <td>{transaction.date}</td>
//                                     <td>{transaction.category}</td>
//                                     <td>{transaction.notes}</td>
//                                     <td>{transaction.type}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Settings;

import React, { useState, useEffect } from "react";
import Select from "react-select"; // Import React-Select
import { useNavigate } from "react-router-dom";
import Papa from 'papaparse';

const Settings = () => {
    const [currency, setCurrency] = useState({ value: "DZD", label: "Algerian Dinar (DZD)" });
    const [theme, setTheme] = useState("light");
    const [importedTransactions, setImportedTransactions] = useState([]); // État pour les transactions du fichier CSV importé
    const navigate = useNavigate();

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') || 'light';
        const cssFile = storedTheme === "light" ? "/Css/Settings2.css" : "/Css/Settings.css"; // Correction du chemin
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

    const availableCurrencies = [
        { value: 'AED', label: 'United Arab Emirates Dirham' },
        { value: 'AFN', label: 'Afghan Afghani' },
        { value: 'ALL', label: 'Albanian Lek' },
        { value: 'AMD', label: 'Armenian Dram' },
        { value: 'ANG', label: 'Netherlands Antillean Guilder' },
        { value: 'AOA', label: 'Angolan Kwanza' },
        { value: 'ARS', label: 'Argentine Peso' },
        { value: 'AUD', label: 'Australian Dollar' },
        { value: 'AWG', label: 'Aruban Florin' },
        { value: 'AZN', label: 'Azerbaijani Manat' },
        { value: 'BAM', label: 'Bosnia-Herzegovina Convertible Mark' },
        { value: 'BBD', label: 'Barbadian Dollar' },
        { value: 'BDT', label: 'Bangladeshi Taka' },
        { value: 'BGN', label: 'Bulgarian Lev' },
        { value: 'BHD', label: 'Bahraini Dinar' },
        { value: 'BIF', label: 'Burundian Franc' },
        { value: 'BMD', label: 'Bermudian Dollar' },
        { value: 'BND', label: 'Brunei Dollar' },
        { value: 'BOB', label: 'Bolivian Boliviano' },
        { value: 'BRL', label: 'Brazilian Real' },
        { value: 'BSD', label: 'Bahamian Dollar' },
        { value: 'BTN', label: 'Bhutanese Ngultrum' },
        { value: 'BWP', label: 'Botswana Pula' },
        { value: 'BYN', label: 'Belarusian Ruble' },
        { value: 'BZD', label: 'Belize Dollar' },
        { value: 'CDF', label: 'Congolese Franc' },
        { value: 'CHF', label: 'Swiss Franc' },
        { value: 'CLP', label: 'Chilean Peso' },
        { value: 'CNY', label: 'Chinese Yuan' },
        { value: 'COP', label: 'Colombian Peso' },
        { value: 'CRC', label: 'Costa Rican Colón' },
        { value: 'CUP', label: 'Cuban Peso' },
        { value: 'CVE', label: 'Cape Verdean Escudo' },
        { value: 'CZK', label: 'Czech Koruna' },
        { value: 'DJF', label: 'Djiboutian Franc' },
        { value: 'DKK', label: 'Danish Krone' },
        { value: 'DOP', label: 'Dominican Peso' },
        { value: 'DZD', label: 'Algerian Dinar' },
        { value: 'EGP', label: 'Egyptian Pound' },
        { value: 'ERN', label: 'Eritrean Nakfa' },
        { value: 'ETB', label: 'Ethiopian Birr' },
        { value: 'EUR', label: 'Euro' },
        { value: 'FJD', label: 'Fijian Dollar' },
        { value: 'FKP', label: 'Falkland Islands Pound' },
        { value: 'FOK', label: 'Faroese Króna' },
        { value: 'GBP', label: 'British Pound' },
        { value: 'GEL', label: 'Georgian Lari' },
        { value: 'GGP', label: 'Guernsey Pound' },
        { value: 'GHS', label: 'Ghanaian Cedi' },
        { value: 'GIP', label: 'Gibraltar Pound' },
        { value: 'GMD', label: 'Gambian Dalasi' },
        { value: 'GNF', label: 'Guinean Franc' },
        { value: 'GTQ', label: 'Guatemalan Quetzal' },
        { value: 'GYD', label: 'Guyanese Dollar' },
        { value: 'HKD', label: 'Hong Kong Dollar' },
        { value: 'HNL', label: 'Honduran Lempira' },
        { value: 'HRK', label: 'Croatian Kuna' },
        { value: 'HTG', label: 'Haitian Gourde' },
        { value: 'HUF', label: 'Hungarian Forint' },
        { value: 'IDR', label: 'Indonesian Rupiah' },
        { value: 'ILS', label: 'Israeli New Shekel' },
        { value: 'IMP', label: 'Isle of Man Pound' },
        { value: 'INR', label: 'Indian Rupee' },
        { value: 'IQD', label: 'Iraqi Dinar' },
        { value: 'IRR', label: 'Iranian Rial' },
        { value: 'ISK', label: 'Icelandic Króna' },
        { value: 'JEP', label: 'Jersey Pound' },
        { value: 'JMD', label: 'Jamaican Dollar' },
        { value: 'JPY', label: 'Japanese Yen' },
        { value: 'KES', label: 'Kenyan Shilling' },
        { value: 'KGS', label: 'Kyrgyzstani Som' },
        { value: 'KHR', label: 'Cambodian Riel' },
        { value: 'KID', label: 'Kiribati Dollar' },
        { value: 'KMF', label: 'Comorian Franc' },
        { value: 'KRW', label: 'South Korean Won' },
        { value: 'KWD', label: 'Kuwaiti Dinar' },
        { value: 'KYD', label: 'Cayman Islands Dollar' },
        { value: 'KZT', label: 'Kazakhstani Tenge' },
        { value: 'LAK', label: 'Lao Kip' },
        { value: 'LBP', label: 'Lebanese Pound' },
        { value: 'LKR', label: 'Sri Lankan Rupee' },
        { value: 'LRD', label: 'Liberian Dollar' },
        { value: 'LSL', label: 'Lesotho Loti' },
        { value: 'LYD', label: 'Libyan Dinar' },
        { value: 'MAD', label: 'Moroccan Dirham' },
        { value: 'MDL', label: 'Moldovan Leu' },
        { value: 'MGA', label: 'Malagasy Ariary' },
        { value: 'MKD', label: 'Macedonian Denar' },
        { value: 'MMK', label: 'Burmese Kyat' },
        { value: 'MNT', label: 'Mongolian Tögrög' },
        { value: 'MOP', label: 'Macanese Pataca' },
        { value: 'MRU', label: 'Mauritanian Ouguiya' },
        { value: 'MUR', label: 'Mauritian Rupee' },
        { value: 'MVR', label: 'Maldivian Rufiyaa' },
        { value: 'MWK', label: 'Malawian Kwacha' },
        { value: 'MXN', label: 'Mexican Peso' },
        { value: 'MYR', label: 'Malaysian Ringgit' },
        { value: 'MZN', label: 'Mozambican Metical' },
        { value: 'NAD', label: 'Namibian Dollar' },
        { value: 'NGN', label: 'Nigerian Naira' },
        { value: 'NIO', label: 'Nicaraguan Córdoba' },
        { value: 'NOK', label: 'Norwegian Krone' },
        { value: 'NPR', label: 'Nepalese Rupee' },
        { value: 'NZD', label: 'New Zealand Dollar' },
        { value: 'OMR', label: 'Omani Rial' },
        { value: 'PAB', label: 'Panamanian Balboa' },
        { value: 'PEN', label: 'Peruvian Sol' },
        { value: 'PGK', label: 'Papua New Guinean Kina' },
        { value: 'PHP', label: 'Philippine Peso' },
        { value: 'PKR', label: 'Pakistani Rupee' },
        { value: 'PLN', label: 'Polish Złoty' },
        { value: 'PYG', label: 'Paraguayan Guaraní' },
        { value: 'QAR', label: 'Qatari Riyal' },
        { value: 'RON', label: 'Romanian Leu' },
        { value: 'RSD', label: 'Serbian Dinar' },
        { value: 'RUB', label: 'Russian Ruble' },
        { value: 'RWF', label: 'Rwandan Franc' },
        { value: 'SAR', label: 'Saudi Riyal' },
        { value: 'SBD', label: 'Solomon Islands Dollar' },
        { value: 'SCR', label: 'Seychellois Rupee' },
        { value: 'SDG', label: 'Sudanese Pound' },
        { value: 'SEK', label: 'Swedish Krona' },
        { value: 'SGD', label: 'Singapore Dollar' },
        { value: 'SHP', label: 'Saint Helena Pound' },
        { value: 'SLL', label: 'Sierra Leonean Leone' },
        { value: 'SOS', label: 'Somali Shilling' },
        { value: 'SRD', label: 'Surilabelse Dollar' },
        { value: 'SSP', label: 'South Sudanese Pound' },
        { value: 'STN', label: 'São Tomé and Príncipe Dobra' },
        { value: 'SYP', label: 'Syrian Pound' },
        { value: 'SZL', label: 'Eswatini Lilangeni' },
        { value: 'THB', label: 'Thai Baht' },
        { value: 'TJS', label: 'Tajikistani Somoni' },
        { value: 'TMT', label: 'Turkmenistani Manat' },
        { value: 'TND', label: 'Tunisian Dinar' },
        { value: 'TOP', label: 'Tongan Paʻanga' },
        { value: 'TRY', label: 'Turkish Lira' },
        { value: 'TTD', label: 'Trinidad and Tobago Dollar' },
        { value: 'TVD', label: 'Tuvaluan Dollar' },
        { value: 'TZS', label: 'Tanzanian Shilling' },
        { value: 'UAH', label: 'Ukrainian Hryvnia' },
        { value: 'UGX', label: 'Ugandan Shilling' },
        { value: 'USD', label: 'US Dollar' },
        { value: 'UYU', label: 'Uruguayan Peso' },
        { value: 'UZS', label: 'Uzbekistani Soʻm' },
        { value: 'VES', label: 'Venezuelan Bolívar' },
        { value: 'VND', label: 'Vietlabelse Đồng' },
        { value: 'VUV', label: 'Vanuatu Vatu' },
        { value: 'WST', label: 'Samoan Tālā' },
        { value: 'XAF', label: 'Central African CFA Franc' },
        { value: 'XCD', label: 'East Caribbean Dollar' },
        { value: 'XOF', label: 'West African CFA Franc' },
        { value: 'XPF', label: 'CFP Franc' },
        { value: 'YER', label: 'Yemeni Rial' },
        { value: 'ZAR', label: 'South African Rand' },
        { value: 'ZMW', label: 'Zambian Kwacha' },
        { value: 'ZWL', label: 'Zimbabwean Dollar' },
    ];


    useEffect(() => {
        // Récupérer la devise et le thème enregistrés dans localStorage
        const savedCurrency = localStorage.getItem("currency");
        if (savedCurrency) {
            const selected = availableCurrencies.find((cur) => cur.value === savedCurrency);
            setCurrency(selected || { value: "DZD", label: "Algerian Dinar (DZD)" });
        }

        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.body.setAttribute("data-theme", savedTheme);
    }, []);

    const handleCurrencyChange = (selectedOption) => {
        setCurrency(selectedOption);
        localStorage.setItem("currency", selectedOption.value);
        setTimeout(() => {
            navigate(0); // Rafraîchir la page pour appliquer la nouvelle devise
        }, 100);
    };

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.body.setAttribute("data-theme", newTheme);
        setTimeout(() => {
            navigate(0);
        }, 100);
    };

    const exportToCSV = () => {
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        if (!Array.isArray(transactions) || transactions.length === 0) {
            alert("No transactions available to export.");
            return;
        }

        const headers = ["NAME", "AMOUNT", "DATE", "CATEGORY", "NOTES", "TYPE"];
        const csvRows = [headers.join(";")];

        transactions.forEach((transaction) => {
            const row = [
                transaction.name,
                `${transaction.amount}`,
                transaction.date,
                transaction.category,
                transaction.notes,
                transaction.type,
            ];
            csvRows.push(row.join(";"));
        });

        const csvContent = csvRows.join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "transactions.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            Papa.parse(file, {
                complete: (result) => {
                    console.log("Parsed CSV:", result);

                    // Vérifier la structure des données dans le fichier CSV
                    const importedData = result.data
                        .filter(row => row.NAME && row.AMOUNT && row.DATE) // Filtrer pour s'assurer que les champs essentiels sont présents
                        .map(row => {
                            // Convertir la date du format DD/MM/YYYY au format YYYY-MM-DD
                            const dateParts = row.DATE.split("/"); // Diviser par "/"
                            const formattedDate = dateParts.length === 3
                                ? `${dateParts[2]}-${dateParts[1].padStart(2, "0")}-${dateParts[0].padStart(2, "0")}` // Formatage de la date
                                : row.DATE; // Si le format n'est pas valide, conserver tel quel

                            return {
                                name: row.NAME,
                                amount: parseFloat(row.AMOUNT), // Convertir le montant en nombre
                                date: formattedDate,
                                category: row.CATEGORY || "Others", // Catégorie par défaut si absente
                                type: row.TYPE || "Expense", // Type par défaut si absent
                                notes: row.NOTES || "", // Notes optionnelles
                            };
                        });

                    if (importedData.length === 0) {
                        alert("No valid transactions found in the uploaded file.");
                        return;
                    }

                    // Mettre à jour l'état local pour afficher uniquement les transactions importées
                    setImportedTransactions(importedData);

                    const existingTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
                    const updatedTransactions = [...existingTransactions, ...importedData];

                    // Sauvegarder les nouvelles transactions dans localStorage
                    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));

                    alert("Transactions successfully imported!");
                },
                header: true, // Le fichier CSV doit inclure des en-têtes
                skipEmptyLines: true,
            });
        }
    };

    return (
        <div id="great_div">
            <h2>Settings</h2>

            {/* Section pour changer la devise */}
            <p>Choose your preferred currency:</p>
            <Select
                value={currency}
                onChange={handleCurrencyChange}
                options={availableCurrencies}
                placeholder="Select a currency..."
            />

            {/* Section pour basculer entre les modes clair et sombre */}
            <div style={{ marginTop: "20px" }}>
                <p>Choose your theme:</p>
                <button
                    onClick={toggleTheme}
                >
                    {theme === "light" ? (
                        <span>🌞 Light Mode</span>
                    ) : (
                        <span>🌙 Dark Mode</span>
                    )}
                </button>
            </div>

            <div style={{ marginTop: "20px" }}>
                <p>Export your transactions:</p>
                <button
                    onClick={exportToCSV}
                >
                    Export to CSV
                </button>
            </div>

            {/* Section pour importer un fichier CSV */}
            <div style={{ marginTop: "20px" }}>
                <p>Import a CSV file:</p>
                <input
                    id="file-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                />
            </div>

            {importedTransactions.length > 0 && (
                <div>
                    <h3>Imported Transactions</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>AMOUNT</th>
                                <th>DATE</th>
                                <th>CATEGORY</th>
                                <th>NOTE</th>
                                <th>TYPE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {importedTransactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td>{transaction.name}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.category}</td>
                                    <td>{transaction.notes}</td>
                                    <td>{transaction.type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
};

export default Settings;
