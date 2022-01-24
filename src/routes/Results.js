import React from 'react'
import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'

export default function Results() {
    const [results, setResults] = useState([])

    /*
      Retrieve session storage and filter into fizzbuzz categories.
      Set state to the filtred map and display in corresponding tables.
      Filtering logic could be extracted to simplify.
    */
    useEffect(() => {
        let filteredResults = [];
        let storage = (JSON.parse(sessionStorage.getItem('results')));
        filteredResults.push(storage.filter((item) => {
            let int = parseInt(item.chosenInt);
            if (int % 3 === 0 && int % 5 !== 0) {
                item.category = 'fizz';
                return item; 
            }
            return;   
        }));
        filteredResults.push(storage.filter((item) => {
            let int = parseInt(item.chosenInt);
            if (int % 5 === 0 && int % 3 !== 0) {
                item.category = 'buzz';
                return item;
            }
            return;
        }));
        filteredResults.push(storage.filter((item) => {
            let int = parseInt(item.chosenInt);
            if (int % 15 === 0) {
                item.category = 'fizzbuzz';
                return item;
            }
            return;
        }));
        filteredResults.push(storage.filter((item) => {
            let int = parseInt(item.chosenInt);
            if (int % 3 !== 0 && int % 5 !== 0) {
                item.category = 'integer';
                return item;
            }
            return;
        }))

        setResults(filteredResults);
    }, []);
    return (
        <>
            {results.map((result, index) => {
                return (
                    <Table striped bordered key={index}>
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            {item.firstName + ' ' + item.lastName}
                                        </td>
                                        <td>
                                            {item.category}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                )
            })}
        </>
    )
}
