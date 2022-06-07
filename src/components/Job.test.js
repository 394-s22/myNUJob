import { render, screen, window, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";
import Job from "./Job";
import { useData } from "../utilities/firebase.js";
import userEvent from "@testing-library/user-event";

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
];

// Roy's Test
test("button for mock job is rendered", () => {
  useData.mockReturnValue([mockJobSchedule, false, null]);
  render(<Job job={mockJobSchedule[0]} />);
  const button = screen.getByText(/More Info/i);
  expect(button).toBeInTheDocument();
});

// Grace W's Test
test("clicking outside dialog takes you back to main page", () => {
  useData.mockReturnValue([mockJobSchedule, false, null]);
  render(<Job job={mockJobSchedule[0]} />);

  // click more info
  const button = screen.getByText(/More Info/i);
  fireEvent.click(button);

  const modalScreen = document.querySelector("[data-testid=mui-modal]");
  expect(modalScreen).toBeInTheDocument();

  // then click outside dialog
  fireEvent.mouseDown(document.body);

  // ensure we are back
  const buttonBack = screen.getByText(/More Info/i);
  expect(buttonBack).toBeInTheDocument();

});

// Grace L's Test
test("find contact name", () => {
  useData.mockReturnValue([mockJobSchedule, false, null]);
  render(<Job job={mockJobSchedule[0]} />);

  // click more info
  const button = screen.getByText(/More Info/i);
  userEvent.click(button);

  const contactName = screen.getByText(/Julie Lavin/i);
  expect(contactName).toBeInTheDocument();
});

// Jaz's Test
test("location on job card", () => {
  useData.mockReturnValue([mockJobSchedule, false, null]);
  render(<Job job={mockJobSchedule[0]} />);

  //check that term exists
  const location = screen.getByText(/Northwestern - Evanston Campus/i);
  expect(location).toBeInTheDocument();

});

// Bobo's test
test("job description is shown in modal", () => {
  useData.mockReturnValue([mockJobSchedule, false, null]);
  render(<Job job={mockJobSchedule[0]} />);

  // click more info
  const button = screen.getByText(/More Info/i);
  userEvent.click(button);

  const description = screen.getByText(/Julie Lavin/i);
  expect(description).toBeInTheDocument();
});

//Arhan's test #2
test("DEPARTMENT on job card", () => {
  useData.mockReturnValue([mockJobSchedule, false, null]);
  render(<Job job={mockJobSchedule[0]} />);

  //check that term exists
  const dept = screen.getByText(/American Studies/i);
  expect(dept).toBeInTheDocument();

});
