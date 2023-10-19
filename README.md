[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/8ndPp79U)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12183453&assignment_repo_type=AssignmentRepo)
# React + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Report: 

Ada:

During the project period, I was responsible for and accomplished the following tasks:

Development:
Created addposts.jsx and fetchposts.jsx components to manage the post functionality.
Corrected and enhanced the event handlers associated with the postform.
Design:
I took the initiative to develop the initial design layout. However, it's worth noting that this initial design was subsequently not adopted.
Ongoing Tasks:
Began the development of PUT, DELETE, and SEARCH functions. However, progress was hindered due to challenges encountered with the API.
Team Communication:
I maintained transparency with the team regarding the difficulties I faced, particularly with the API. It is important to highlight that my concerns were escalated and duly addressed at 19:40 on Monday.

I remain committed to resolving outstanding tasks and continue to collaborate closely with the team for a successful project completion.

Ridwan:

I implemented the login, registration, and user profiles features, as well as the edit, update, and delete functions. I utilized Tailwind CSS for styling and React for frontend development. I aimed to make the login and registration forms resemble the aesthetic of our post cards. Specifically, the registration form has fields for name, email, and password. If these fields are not completed correctly, error messages appear directly below the respective input field. Once registered, users can seamlessly log in; however, an incorrect password will trigger a 'wrong password' notification.

The user profiles adopt the same visual design as the post cards, with each user represented by their own card showcasing their name and email. This card design also offers 'follow' and 'unfollow' options.

Though initially not part of my responsibilities, I took on the task of creating the edit, update, and delete functions after a teammate encountered challenges. Despite the time constraints, I ensured these features were functional, although I acknowledge there's room for improvement in their design. Now, users can easily modify their posts.

Additionally, I addressed a bug in the fetch-utils index.jsx, which produced an error related to the trim function. After rectifying this, the website resumed its normal operation.

Alex:

I coded the Navbar, Profile page, home/explore page, single post page, managed netlify, github and did the create new post form at the explore page. I also added daisyUi as a tool to boost our tailwind experience. I did all of the design in the final product as we steered away from the initial design pretty early on due to wanting something else when we had started. I also made a custom theme with colors that I felt was very neat, not the usual white or dark theme but a greenish one with clean glass cards. Unfortunately the light/dark mode does not work. I did not figure out how to show the Author in the home/explore, but it's showing in the single post page. We were going to have a feed inside the profile-page with that user's posts so the user could edit/delete all their posts - but we could not make it in time. We had multiple issues at netlify where the project works locally, no error in builds but when building locally and through netlify and the checks on github, but when the site is deployed we get error 500. I tried to fix it by changing how the api key works in the project, but it only made things worse. At the end - staging was working perfectly with the build, so we merged with main, without conflicts. Main then gave us error 500 again and we were out of time as it was 2355 Monday. I had unsplash random photos for filler photos, I should have made it random but did not have time to implement it.

Usually my task was debugging every challenge and cleaning up messy commits from me included. I always helped and gave support to my teammates and other teams when needed. 
 
What I have learned from this is to give people and myself specific time-range for when components and pages have to be completed.  As much as skill in coding and web-development is vital for a team project to work, so is that the team supports each other and communicates well with each other. . We got help from team Zeus on the profile-page since we were so far behind, to understand how to fetch it correctly. 


Production deploy: [https://main--thriving-torrone-c43b10.netlify.app/](https://main--thriving-torrone-c43b10.netlify.app/)