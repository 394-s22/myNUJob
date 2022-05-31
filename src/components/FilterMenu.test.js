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
    LOCATION: "Northwestern - Evanston Campus",
    "WORK ARRANGEMENTS": "Remote",
    DEPARTMENT: "American Studies",
    "JOB DESCRIPTION":
      "To create a weekly newsletter for the students in the program to keep them informed about upcoming events and other things happening on campus that may be of interest.",
    QUALIFICATIONS:
      "Must be a Northwestern undergraduate student with a Federal Work-Study allotment for the 2021-2022 academic year (CAESAR > Financial Aid > View My Financial Aid > [YEAR].)",
    "PAY RATE": [18.0],
    "CONTACT NAME": "Julie Lavin",
    "CONTACT PHONE NUMBER": "(847) 467-2262",
    "CONTACT EMAIL": "julie.lavin@northwestern.edu",
    TITLE: "American Studies: Newsletter Creation",
    ID: 7,
    URL: "https://undergradaid.northwestern.edu/work-study/jobs/on-campus-jobs/american-studies-newsletter-creation.html",
    CATEGORY: "Administrative",
  },
  {
    "TERM AVAILABLE": "Spring 2022",
    "NUMBER OF POSITIONS AVAILABLE": "10",
    "LOCATION": "Northwestern - Evanston Campus",
    "WORK ARRANGEMENTS": "In person only",
    "DEPARTMENT": "Bienen School Concert Management Office",
    "JOB DESCRIPTION": "Provides technical and production support for concerts, rehearsals, and other events at the Bienen School of Music, including stage set-up/set-change/strike, stage management, recording engineering, and live sound engineering. Technical staff are expected to become proficient in one or more of the following specialized roles\nStage Manager, PA technician (live sound), and Recording Technician. When not fulfilling the duties associated with these roles, staff operate as Stage Techs.",
    "QUALIFICATIONS": "Must be a Northwestern undergraduate student with a Federal Work-Study allotment for the 2021-2022 academic year (CAESAR > Financial Aid > View My Financial Aid > [YEAR].)",
    "PAY RATE": [13.0, 17.0],
    "CONTACT NAME": "Laura Nielsen",
    "CONTACT PHONE NUMBER:(847) 491-5441": "",
    "CONTACT EMAIL": "events.music@northwestern.edu",
    "TITLE": "Bienen School of Music - Concert Management Office: Technical Staff",
    "ID": 16,
    "URL": "https://undergradaid.northwestern.edu/work-study/jobs/on-campus-jobs/bienen-school-of-music---concert-management-office-technical-staff.html",
    "CATEGORY": "Technical"
  }
];

// Jordan's Test
test("mock job is filtered out", () => {
  useData.mockReturnValue([mockJobSchedule, false, null]);
  render(<App />);
  const job = screen.getByText(/Newsletter Creation/i);
  expect(job).toBeInTheDocument();

  const filterByTechnicalButton = screen.getByTestId('filterby-technical');
  fireEvent.click(filterByTechnicalButton);
  expect(job).not.toBeInTheDocument();
});