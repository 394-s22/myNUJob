import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";
import { useData } from "../utilities/firebase.js";

jest.mock("../utilities/firebase.js");

const mockJobSchedule = [
    {
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
      },
      {
        "TERM AVAILABLE": "Spring 2022",
        "NUMBER OF POSITIONS AVAILABLE": "1",
        "LOCATION": "Northwestern - Evanston Campus",
        "WORK ARRANGEMENTS": "In person only",
        "DEPARTMENT": "Art Theory and Practice",
        "JOB DESCRIPTION": "Position will include creating posters for events and courses; assisting in the planning, set-up/take-down of events (receptions, lectures, etc.); documenting/recording lectures; and working in the department main office, which includes some clerical work.\nIdeal applicant should have experience with Adobe Creative Cloud, specifically Photoshop and inDesign.",
        "QUALIFICATIONS": "Must be a Northwestern undergraduate student with a Federal Work-Study allotment for the 2021-2022 academic year (CAESAR > Financial Aid > View My Financial Aid > [YEAR].)",
        "PAY RATE": [13.5],
        "CONTACT NAME": "Matt Martin",
        "CONTACT PHONE NUMBER": "(847) 491-7346",
        "CONTACT EMAIL": "matthew.martin1@northwestern.edu",
        "TITLE": "Art Theory and Practice: Event Aide",
        "ID": 8,
        "URL": "https://undergradaid.northwestern.edu/work-study/jobs/on-campus-jobs/art-theory-and-practice-event-aide.html",
        "CATEGORY": "Administrative"
      }
  
];

// Grace W's test
test("job list sort descending", () => {
    useData.mockReturnValue([mockJobSchedule, false, null]);
    render(<App />);

    const button = screen.getByText(/Sort by/i);
    userEvent.click(button);

    const descendButton = screen.getByText(/Decreasing Wage/i);
    userEvent.click(descendButton);

    const job = screen.getByText(/Newsletter Creation/i);
    const jobs = screen.getAllByText(/Northwestern - Evanston Campus/i)

    expect(jobs).toHaveLength(2)
    expect(jobs[0]).toEqual(job)
});

// Grace W's test
test("job list sort ascending", () => {
    useData.mockReturnValue([mockJobSchedule, false, null]);
    render(<App />);

    const button = screen.getByText(/Sort by/i);
    userEvent.click(button);

    const ascendButton = screen.getByText(/Decreasing Wage/i);
    userEvent.click(ascendButton);

    const job = screen.getByText(/Event Aide/i);
    const jobs = screen.getAllByText(/Northwestern - Evanston Campus/i)

    expect(jobs).toHaveLength(2)
    expect(jobs[0]).toEqual(job)
});

// Bobo's test
test("job list sort alphabetically", () => {
    useData.mockReturnValue([mockJobSchedule, false, null]);
    render(<App />);

    const button = screen.getByText(/Sort by/i);
    userEvent.click(button);

    const abcButton = screen.getByText(/Alphabetical Order/i);
    userEvent.click(abcButton);

    const job = screen.getByText(/Administrative Aide/i);
    const jobs = screen.getAllByText(/Northwestern - Evanston Campus/i)

    expect(jobs[0]).toEqual(job)
});
