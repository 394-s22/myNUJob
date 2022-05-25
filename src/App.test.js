import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import  { useData } from './utilities/firebase.js';
jest.mock('./utilities/firebase.js');


test('load jobs', () => {
  render(<App />);
  const linkElement = screen.getByText(/Loading your jobs/i);
  expect(linkElement).toBeInTheDocument();
});


const mockJobSchedule = 
{
  "7": {
    "TERM AVAILABLE": "Spring 2022",
    "NUMBER OF POSITIONS AVAILABLE": "1",
    "LOCATION": "Northwestern - Evanston Campus",
    "WORK ARRANGEMENTS": "Remote",
    "DEPARTMENT": "American Studies",
    "JOB DESCRIPTION": "To create a weekly newsletter for the students in the program to keep them informed about upcoming events and other things happening on campus that may be of interest.",
    "QUALIFICATIONS": "Must be a Northwestern undergraduate student with a Federal Work-Study allotment for the 2021-2022 academic year (CAESAR > Financial Aid > View My Financial Aid > [YEAR].)",
    "PAY RATE": [18.0],
    "CONTACT NAME": "Julie Lavin",
    "CONTACT PHONE NUMBER": "(847) 467-2262",
    "CONTACT EMAIL": "julie.lavin@northwestern.edu",
    "TITLE": "American Studies: Newsletter Creation",
    "ID": 7,
    "URL": "https://undergradaid.northwestern.edu/work-study/jobs/on-campus-jobs/american-studies-newsletter-creation.html",
    "CATEGORY": "Administrative"
  }
};

test('title', () => {
  console.log(useData)
  useData.mockReturnValue([mockJobSchedule, false, null]);
  //useUserState.mockReturnValue([null]);
  render(<App />);
  const title = screen.getByText(/myNUJob/i);
  expect(title).toBeInTheDocument();
});



