import './App.css';
import JobList from './components/JobList.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const job_list = [
	{
		"title": "job1",
		"id" : 1,
		"pay" :	15,
		"term" : "Spring 2022",
		"location" : "Remote",
		"description" : "text"
	},
	{
		"title": "job2",
		"id" : 2,
		"pay" :	15,
		"term" : "Spring 2022",
		"location" : "Remote",
		"description" : "text"
	}
]

function App() {

  return (
    <div className="container">

		<JobList jobs={job_list}></JobList>
    </div>
  );
}

export default App;