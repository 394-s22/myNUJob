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
		return (j.CATEGORY)
	})))

	return (
		<div className="app-body">
			<NavBar />
			<div className="container">
				<div className="sort-bar">
					<SortBar sortDirection={sortDirection} setSortDirection={setSortDirection} />
				</div>
				<div className="filters-and-jobs">
					<div className="filters-list">
						<FilterMenu jobCategories={jobCategories} filterCategories={filterCategories} setFilterCategories={setFilterCategories} />
					</div>
					<div className="cards-list">
						<JobList jobs={jobList} filterCategories={filterCategories} sortDirection={sortDirection} />
					</div>
				</div>
			</div>
		</div>

	);
}

export default App;
