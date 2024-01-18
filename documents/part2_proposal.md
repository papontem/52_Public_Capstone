# Project Proposal

PAM: My Idea

      API: https://api.wikimedia.org/wiki/Feed_API/Reference/On_this_day

      I will create a "Today I Learned" app that allows users, including myself, to save and learn historical events provided by the wikimedia feed api. Every day, I'll receive a new historical facts and be able to click to learn more about them by visiting the Wikipedia page. I'll also have the option to save interesting facts for future reference, fostering a daily learning habit.

# "Today I Learned" App Documentation

## 1. Project Overview:

The "Today I Learned" app is designed to provide users with a daily historical fact sourced from the Wikimedia Feed API. Users can click on each fact to learn more about it by accessing the corresponding Wikipedia page. The app encourages a daily learning habit by allowing users to save interesting facts for future reference.

## 2. Scope:

The app will focus on retrieving and displaying historical facts from the Wikimedia Feed API. It will provide a user-friendly interface for users to view and explore these facts. The ability to save and retrieve favorite facts will be included. This project will be an evenly focused full-stack application.

## 3. Objectives:

- Provide a landing page for users opening their browser.
- Serve as a command center for history scholars, enthusiasts, writers, and hobbyists.
- Offer historical facts based on the date the user accesses the website.
- Utilize the Wikimedia API to fetch and display relevant historical information.
- Promote the pursuit of freedom of knowledge by facilitating the spread of historical information and fostering a pursuit of lifelong learning.

## 4. Target Audience:

The target audience includes individuals who are interested in history, ranging from scholars and enthusiasts to writers and hobbyists. The app is designed to serve as a centralized hub for accessing historical facts conveniently and promoting the pursuit of knowledge.

## 5. Requirements:

- Integration with the Wikimedia Feed API.
- User interface for displaying daily facts.
- Ability to navigate to Wikipedia for more information.
- Save and retrieve favorite facts locally on the device.
- Database schema with three tables: Users, Users' Favorite Facts, and Facts.

## 6. Technologies:

- **Frontend:**

  - **Language:** JavaScript
  - **Library:** React
  - **Markup:** HTML/CSS

- **Backend:**

  - **Runtime:** Node.js

- **Development:**
  - **Code Editor Tool:** VSCode
  - **Testing:** Jest.js

## 7. Architecture:

The app will follow a client-server architecture with an even focus on both frontend and backend development.

- **Frontend (Client):**

  - Developed using React for a responsive and interactive user interface.
  - Utilizes HTML/CSS for markup and styling.

- **Backend (Server):**
  - Node.js will be used to handle server-side logic.
  - Manages communication with the Wikimedia Feed API.

## 8. Timeline:

- **Week 1:** Set up the project, create some tests, design the app interface using React components, and establish basic styling with HTML/CSS.
- **Week 2:** Implement API integration testting with Node.js/Jest.js for retrieving and displaying daily facts.
- **Week 3:** Develop and test the functionality to save and retrieve favorite facts using React and Node.js.
- **Week 4:** Conduct live code testing, debug, and prepare for deployment.

## 9. Risks and Mitigations:

- **API Changes:** Regularly check for updates to the Wikimedia Feed API and adjust the app accordingly.
- **Technical Challenges:**
  - **Test Creation:** Designing effective unit tests and integration tests, especially in scenarios where API calls need to be mocked for testing various functionalities.
  - **Data Handling:** Ensuring seamless handling of saved data locally and on the cloud when a user signs in, with a particular focus on data consistency and synchronization between different environments.
  - **Mocking API Calls:** Developing reliable mechanisms to mock API calls from the Wikimedia Feed API during testing to simulate various scenarios and ensure robustness.
  - **Local Storage:** Implementing secure and efficient local storage mechanisms for saving user preferences and favorite facts on the user's device.
  - **Cloud Storage:** Integrating cloud storage solutions for users who sign in, ensuring the secure and reliable storage of user data, including favorite facts, across different sessions and devices.

## 10. Testing and Quality Assurance:

- Perform unit testing for each module.
- Conduct integration testing to ensure seamless interaction between components.
- User acceptance testing to gather feedback from potential users.

## 11. Deployment Plan:

- Deploy the app as a website to serve as a landing page when users open their browsers.
- Ensure compatibility with various devices and screen sizes.

## 12. User Documentation:

- Create a simple user guide explaining how to use the app, save favorite facts, and access additional information on Wikipedia.

## 13. Data Source:

The app will utilize data returned from the "Feed" API provided by Wikimedia. This API supplies information about events that occurred on a given date in history. The data includes notable historical events, international holidays, and details about the births and deaths of notable people. Leveraging this API will ensure a rich and diverse set of historical information for users to explore and learn from.

## 14. Database Schema:

The database will consist of four tables:

- **Users:**

  - id
  - username
  - password
  - date registered
  - '#' of facts favorited

- **Pages:**
  - page id
  - page url
  - wikibase item

- **Facts:**
  - id
  - fact text title
  - fact date 
  - Page id

- **Users' Favorite Facts:**

  - user id
  - fact id


## 15. API Issues:

Potential issues with the API may include:

- Request/response handling issues, dealing with connection and data packages.
- Changes in the structure or availability of data from the "Feed" API.

## 16. Security:

Sensitive information that needs to be secured:

- Users' usernames and passwords.

## 17. Functionality:

The app will include the following functionality:

- Homepage displaying facts, with the ability to input any date, including the current day.
- Page with random facts.
- Page where a user can view their favorite facts.
- **Least Favorite Facts Page:** A page displaying facts from days with the least number of favored facts.

## 18. User Flow:

The user flow will be as follows:

1. Open the website, greeted with a random fact for the current day from the "Feed" API.
2. Each fact is displayed as a card with relevant information: fact text/title summary, times favorited, and a link to its Wikipedia page.
3. A form is available for selecting the date of the facts to retrieve from the API.
4. A navigation bar at the top with icons for user login, homepage, random facts, favorites, and least favorites.
   - Icons: person (user login), house (homepage), dice (random fact page), star (favorites page), thumbs down (least favorites page).
5. User login page with a simple username and password form.
6. After login, the person icon is replaced by the user's username.
7. If the user moves to the favorites page, they can see a list of facts in chronological order of last saved.
8. If the user goes to the least favorites page, they can view facts from days with the least number of favored facts.

## 19. Additional Features and Stretch Goals:

The app goes beyond a CRUD app with the following features and stretch goals:

- **Features:**

  - Homepage with dynamic daily facts.
  - Random fact page for variety.
  - User authentication and login.
  - Favorites page for users to save and view their preferred facts.
  - **Least Favorite Facts Page:** A page displaying facts from days with the least number of favored facts.

- **Stretch Goals:**
  - Enhanced user profiles with additional information.
  - Social sharing capabilities for sharing favorite facts.
  - Notifications for daily facts or user-specific events.
