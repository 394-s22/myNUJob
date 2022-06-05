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
    LOCATION: "Northwestern - Evanston Campus",
    "WORK ARRANGEMENTS": "In person only",
    DEPARTMENT: "Bienen School Concert Management Office",
    "JOB DESCRIPTION":
      "Provides technical and production support for concerts, rehearsals, and other events at the Bienen School of Music, including stage set-up/set-change/strike, stage management, recording engineering, and live sound engineering. Technical staff are expected to become proficient in one or more of the following specialized roles\nStage Manager, PA technician (live sound), and Recording Technician. When not fulfilling the duties associated with these roles, staff operate as Stage Techs.",
    QUALIFICATIONS:
      "Must be a Northwestern undergraduate student with a Federal Work-Study allotment for the 2021-2022 academic year (CAESAR > Financial Aid > View My Financial Aid > [YEAR].)",
    "PAY RATE": [13.0, 17.0],
    "CONTACT NAME": "Laura Nielsen",
    "CONTACT PHONE NUMBER:(847) 491-5441": "",
    "CONTACT EMAIL": "events.music@northwestern.edu",
    TITLE:
      "Bienen School of Music - Concert Management Office: Technical Staff",
    ID: 16,
    URL: "https://undergradaid.northwestern.edu/work-study/jobs/on-campus-jobs/bienen-school-of-music---concert-management-office-technical-staff.html",
    CATEGORY: "Technical",
  },
  {
    "TERM AVAILABLE": "Spring 2022",
    "NUMBER OF POSITIONS AVAILABLE": "4",
    LOCATION: "Northwestern - Evanston Campus",
    "WORK ARRANGEMENTS": "In person only",
    DEPARTMENT: "Football Video Department",
    "JOB DESCRIPTION":
      "Student Video Assistants will aide the Director of Football Video Operations and Assistant Director of Football Video in the filming of all Football spring practices. Students will also aide in the importing of the film to a platform for coaches to view and analyze. No previous camera knowledge necessary, just a passion for Football. A great networking opportunity for those interested in working in sports.",
    QUALIFICATIONS:
      "Must be a Northwestern undergraduate student with a Federal Work-Study allotment for the 2021-2022 academic year (CAESAR > Financial Aid > View My Financial Aid > [YEAR].)",
    "PAY RATE": [13.0],
    "CONTACT NAME": "Alex Knisely",
    "CONTACT PHONE NUMBER": "(847) 467-0884",
    "CONTACT EMAIL": "alexandra.knisely@northwestern.edu",
    TITLE: "Athletics and Recreation: Football Video Assistant",
    ID: 11,
    URL: "https://undergradaid.northwestern.edu/work-study/jobs/on-campus-jobs/athletics-and-recreation-football-video-assistant.html",
    CATEGORY: "Athletics-and-Recreation",
  },
];

// Jordan's Test
test("mock job is filtered out", () => {
  useData.mockReturnValue([mockJobSchedule, false, null]);
  render(<App />);
  const job = screen.getByText(/Newsletter Creation/i);
  expect(job).toBeInTheDocument();

  const filterByTechnicalButton = screen.getByTestId("filterby-technical");
  fireEvent.click(filterByTechnicalButton);
  expect(job).not.toBeInTheDocument();
});

// Bobo's Test
test("filter by technical", () => {
  useData.mockReturnValue([mockJobSchedule, false, null]);
  render(<App />);
  const job = screen.getByText(/Technical Staff/i);
  expect(job).toBeInTheDocument();

  const filterByTechnicalButton = screen.getByTestId("filterby-technical");
  fireEvent.click(filterByTechnicalButton);
  expect(job).toBeInTheDocument();
});

// Grace L's Test
test("filter by technical and athletics", () => {
  useData.mockReturnValue([mockJobSchedule, false, null]);
  render(<App />);
  const adminJob = screen.getByText(/Newsletter Creation/i);
  const techJob = screen.getByText(/Technical Staff/i);
  const athleticsJob = screen.getByText(/Football Video Assistant/i);
  expect(adminJob).toBeInTheDocument();
  expect(techJob).toBeInTheDocument();
  expect(athleticsJob).toBeInTheDocument();

  const filterByAthleticsButton = screen.getByTestId(
    "filterby-athletics-and-recreation"
  );
  userEvent.click(filterByAthleticsButton);

  const filterByTechnicalButton = screen.getByTestId("filterby-technical");
  userEvent.click(filterByTechnicalButton);

  const filteredTechJob = screen.getByText(/Technical Staff/i);

  expect(adminJob).not.toBeInTheDocument();
  expect(athleticsJob).toBeInTheDocument();
  expect(filteredTechJob).toBeInTheDocument();
});

// Roy's Test
test("selecting all filters shows all jobs (filteres are inclusive)", () => {
  useData.mockReturnValue([mockJobSchedule, false, null]);
  render(<App />);
  // check that all three jobs from mock data are rendered
  const adminJob = screen.getByText(/Newsletter Creation/i);
  const techJob = screen.getByText(/Technical Staff/i);
  const athleticsJob = screen.getByText(/Football Video Assistant/i);
  expect(adminJob).toBeInTheDocument();
  expect(techJob).toBeInTheDocument();
  expect(athleticsJob).toBeInTheDocument();

  const filterByAdminButton = screen.getByTestId("filterby-administrative");
  const filterByTechButton = screen.getByTestId('filterby-technical');
  const filterByAthleticsButton = screen.getByTestId('filterby-athletics-and-recreation');

  userEvent.click(filterByAdminButton);
  userEvent.click(filterByTechButton);
  userEvent.click(filterByAthleticsButton);

  const filtered_adminJob = screen.getByText(/Newsletter Creation/i);
  const filtered_techJob = screen.getByText(/Technical Staff/i);
  const filtered_athleticsJob = screen.getByText(/Football Video Assistant/i);
  expect(filtered_adminJob).toBeInTheDocument();
  expect(filtered_techJob).toBeInTheDocument();
  expect(filtered_athleticsJob).toBeInTheDocument();

});