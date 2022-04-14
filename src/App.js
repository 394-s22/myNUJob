import './App.css';
import React, { useState } from 'react';
import JobList from './components/JobList.js';
import FilterMenu from './components/FilterMenu.js';
import NavBar from './components/NavBar.js';

import { useData } from './utilities/firebase.js';
import 'bootstrap/dist/css/bootstrap.min.css';

// const job_list = [
// 	{
// 		"title": "Medill: Research Aide 2",
// 		"id": 1,
// 		"pay": "$13",
// 		"term": "Spring 2022",
// 		"location": "Evanston Campus",
// 		"description": "text",
// 		"link": "https://undergradaid.northwestern.edu/work-study/jobs/on-campus-jobs/medill-research-aide-21.html",
// 		"category": "Research"
// 	},
// 	{
// 		"title": "FUSE STEAM Education Program-SESP: Research Aide",
// 		"id": 2,
// 		"pay": "$13.50",
// 		"term": "Spring 2022",
// 		"location": "Evanston Campus",
// 		"description": "text",
// 		"link": "https://undergradaid.northwestern.edu/work-study/jobs/on-campus-jobs/fuse-steam-education-program-sesp-research-aide.html",
// 		"category": "Research"
// 	},
// 	{
// 		"title": "Learning Sciences: Research Aide",
// 		"id": 3,
// 		"pay": "$13.50",
// 		"term": "Spring 2022",
// 		"location": "Remote",
// 		"description": "text",
// 		"link": "https://undergradaid.northwestern.edu/work-study/jobs/on-campus-jobs/learning-sciences-research-aide-21.html",
// 		"category": "Research"
// 	},
// 	{
// 		"title": "Medill: Multimedia Production Aide",
// 		"id": 4,
// 		"pay": "$13",
// 		"term": "Spring 2022",
// 		"location": "Evanston Campus",
// 		"description": "text",
// 		"link": "https://undergradaid.northwestern.edu/work-study/jobs/on-campus-jobs/medill-multimedia-production-aide.html",
// 		"category": "Research"
// 	},
// 	{
// 		"title": "Women's Basketball: Team Manager",
// 		"id": 5,
// 		"pay": "$13",
// 		"term": "Spring 2022",
// 		"location": "Evanston Campus",
// 		"description": "text",
// 		"link": "https://undergradaid.northwestern.edu/work-study/jobs/on-campus-jobs/athletics-and-recreation---womens-basketball-team-manager1.html",
// 		"category": "Athletics and Recreation"
// 	},
// 	{
// 		"title": "Football Video Assistant",
// 		"id": 6,
// 		"pay": "$14",
// 		"term": "Spring 2022",
// 		"location": "Evanston Campus",
// 		"description": "text",
// 		"link": "https://undergradaid.northwestern.edu/work-study/jobs/on-campus-jobs/athletics-and-recreation-football-video-assistant.html",
// 		"category": "Athletics and Recreation"
// 	},
// 	{
// 		"title": "Lifeguard",
// 		"id": 7,
// 		"pay": "$13.25",
// 		"term": "Spring 2022",
// 		"location": "Evanston Campus",
// 		"description": "text",
// 		"link": "https://undergradaid.northwestern.edu/work-study/jobs/on-campus-jobs/athletics-and-recreation-lifeguard.html",
// 		"category": "Athletics and Recreation"
// 	},
// 	{
// 		"title": "Student Equipment Manager",
// 		"id": 8,
// 		"pay": "$13",
// 		"term": "Spring 2022",
// 		"location": "Evanston Campus",
// 		"description": "text",
// 		"link": "https://undergradaid.northwestern.edu/work-study/jobs/on-campus-jobs/athletics-and-recreation-student-equipment-manager.html",
// 		"category": "Athletics and Recreation"
// 	},
// 	{
// 		"title": "Swim Instructor",
// 		"id": 9,
// 		"pay": "$13",
// 		"term": "Spring 2022",
// 		"location": "Evanston Campus",
// 		"description": "text",
// 		"link": "https://undergradaid.northwestern.edu/work-study/jobs/on-campus-jobs/athletics-and-recreation-swim-instructor.html",
// 		"category": "Athletics and Recreation"
// 	},
// 	{
// 		"title": "Performance Nutrition Aide",
// 		"id": 10,
// 		"pay": "$13",
// 		"term": "Spring 2022",
// 		"location": "Evanston Campus",
// 		"description": "text",
// 		"link": "https://undergradaid.northwestern.edu/work-study/jobs/on-campus-jobs/athletics-performance-nutrition-performance-nutrition-aide.html",
// 		"category": "Athletics and Recreation"
// 	}

// ]

const App = () => {
	/*
	  const [selectedFilters, setSelectedFilters] = useState({
		  "category": []
	  })
	*/

	const [filterCategories, setFilterCategories] = useState([])

	const [jobList, loading, error] = useData('/');


	if (error) return <h1>{error}</h1>;
	if (loading) return <h1>Loading your jobs...</h1>

	console.log(Object.entries(jobList))
	const jobCategories = Array.from(new Set(Object.values(jobList).map((j) => {
		return (j.category)
	})))
	console.log(jobCategories)


	return (
		<div className="app-body">
			<NavBar />
			<div className="container">
				<div className = "filterslist">
					<FilterMenu jobCategories={jobCategories} filterCategories={filterCategories} setFilterCategories={setFilterCategories} />
				</div>
				<div className = "cardslist">
					<JobList jobs={Object.values(jobList)} filterCategories={filterCategories} />
				</div>
			</div>
		</div>

	);
}

export default App;
