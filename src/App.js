import './App.css';
import React, { useState } from 'react';
import JobList from './components/JobList.js';
import FilterMenu from './components/FilterMenu.js';
import NavBar from './components/NavBar.js';
import SortBar from './components/SortBar';

import { useData } from './utilities/firebase.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
	// const [sortWage, setSortWage] = useState("")
	const [sortDirection, setSortDirection] = useState("")
	const [filterCategories, setFilterCategories] = useState([])
	const [jobList, loading, error] = useData('/');


	if (error) return <h1>{error}</h1>;
	if (loading) return <h1>Loading your jobs...</h1>

	const jobCategories = Array.from(new Set(Object.values(jobList).map((j) => {
		return (j.category)
	})))

	return (
		<div className="app-body">
			<NavBar />
			<SortBar className = "sortbar" sortDirection={sortDirection} setSortDirection={setSortDirection} />
			<div className="container">
				<div className="filterslist">
					<FilterMenu jobCategories={jobCategories} filterCategories={filterCategories} setFilterCategories={setFilterCategories} />
				</div>
				<div className="cardslist">
					<JobList jobs={Object.values(jobList)} filterCategories={filterCategories} sortDirection={sortDirection} />
				</div>
			</div>
		</div>

	);
}

export default App;
