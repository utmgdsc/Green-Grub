# GreenGrub

**GreenGrub** is a mobile application developed as part of GDSC community project aimed at encouraging sustainable food choices through gamification. The app provides users with sustainability and nutrition scores for food products by scanning barcodes and allows them to track their performance, take quizzes, and compete with friends on a leaderboard. This project aligns with the UN Sustainable Development Goals (SDG #12) for responsible consumption and production. The app is featured in the [University of Toronto students news paper](https://themedium.ca/greengrub-an-app-dedicated-to-food-sustainability-and-healthy-eating/) as its primary focus was to educate students about sustainability.

<img width="529" alt="image" src="https://github.com/user-attachments/assets/67de2cd3-c068-4bc7-a5ed-8d6b1eeaf1a1">


*Illustration by Buket S. Baykal/The Medium news paper for the article about GreenGrub*


## Vision
Our vision is to create an engaging platform that empowers users to make healthier and more sustainable food choices. By leveraging gamification and educational content, GreenGrub aims to raise awareness about the environmental impact of everyday food items and help users form habits that contribute to a more sustainable future.

For the full presentation have a look at the [slides](https://github.com/utmgdsc/Green-Grub/blob/main/GreenGrub%20Presentation.pdf)

### Key Features:
- **Sustainability & Nutrition Scores**: Scan barcodes of food products to retrieve sustainability and health ratings from databases like Open Food Facts.
- **Gamification**: Earn points based on sustainable choices and compete with friends via the leaderboard.
- **Educational Quizzes**: Learn about sustainability topics and earn extra points through quizzes.
- **Cart Creation**: Organize scanned products into carts for specific events or categories.
- **Friends & Leaderboard**: Add friends, accept invitations, and compete on sustainability rankings.

  

<img height="400" alt="image" src="https://github.com/user-attachments/assets/29610964-7547-4bcb-b9f7-ecfa2ede28fc"> 
<img height="400" alt="image" src="https://github.com/user-attachments/assets/1084c780-7dc4-4afd-8d88-5006699ed5b6">
<img height="400" alt="image" src="https://github.com/user-attachments/assets/19c92d5f-03dc-446f-8a84-8e5311c48fe9">



1. The main screen of the application showing the sustainability score with the option to scan items and compete on the leaderboard.


2. Quizzes on different topics which educate the users and provide an option to gain points.

3. Educational quizzes give detailed explanations with links to learn more


---

## Technical Overview

<img width="872" alt="image" src="https://github.com/user-attachments/assets/b0ee5508-ccf7-4ced-8bf4-964143c93883">


This diagram illustrates the architecture of GreenGrub, showing interactions between the backend and frontend systems. Django serves as the backend with PostgreSQL as the database, while the frontend uses React Native, Redux for state management, and RTK Query for efficient data handling between the API and UI.


### Frontend:
- **Framework**: React Native
- **State Management**: Redux and Redux Toolkit
- **Languages**: JavaScript, JSX, CSS
- **Key Features**:
  - **Barcode Scanning**: Use phone cameras to scan product barcodes.
  - **Interactive Dashboard**: Display sustainability scores and leaderboard.
  - **Quizzes**: Interactive quizzes on various sustainability topics.

### Backend:
- **Framework**: Django REST
- **Database**: Postgres
- **Authentication**: JWT (JSON Web Token)
- **Key Endpoints**:
  - **User Authentication**: Handles user registration and login.
  - **Product Scanning**: Retrieves sustainability and nutrition data for scanned items.
  - **Friends & Leaderboard**: Tracks user friendships and leaderboard standings.
  - **Quizzes API**: Handles quiz retrieval and score tracking.

---

## Project Architecture

### Mobile App
- **Multiplatform Development**: Built with React Native to support both Android and iOS.
- **State Management**: Redux is used to manage app state, ensuring consistency across views.

### Backend
- **Django REST Framework**: Handles API requests between the frontend and the database.
- **Requests Library**: Interfaces with third-party APIs like Open Food Facts for retrieving product information.
- **Data Processing**: Sustainability scores and nutrition data are processed and stored in MongoDB.

---

## Development Process

### Timeline:
1. **Month 1**: 
   - Project planning and UI design
   - Initial backend setup, database design, and authentication flow
2. **Month 2**: 
   - Integration of barcode scanning, product information retrieval, and leaderboard
3. **Month 3**: 
   - Development of quiz features, cart creation, and completion of frontend-backend integration
4. **Final Deliverables**: 
   - Fully functional mobile app, database, and API connections

### Tools:
- **Version Control**: Git, GitHub
- **Project Management**: Jira for sprint planning, ticket assignment, and tracking
- **UI Design**: Figma for prototyping
- **Communication**: Discord for team meetings and collaboration

---

## Testing

We ensure the stability and quality of our app through a combination of automated and manual testing methods:
- **Unit Tests**: For backend API endpoints and user authentication.
- **Integration Tests**: Verifying the communication between the frontend and backend.
- **User Testing**: We conduct regular feedback sessions to test usability and improve the user experience.
- **Manual Testing**: Ensuring proper functionality of key features like barcode scanning and quiz interactions.

---

## Contribution Guidelines

We welcome contributions from the community! To get started:
1. Fork the repository and create a new branch for your feature or bug fix.
2. Submit a pull request once your changes are tested and ready for review.
3. Ensure your code adheres to our style guidelines and includes comments where necessary.
4. Be sure to document any new features or changes in functionality in the appropriate files.

---

## Future Features

Our roadmap includes several exciting features to further engage users and integrate with the U of T community:
- **Receipt Scanning**: Automatically track sustainability by scanning grocery receipts.
- **iOS App Development**: Expanding GreenGrub's availability to iOS users.
- **U of T Integration**: Sustainability challenges tailored to U of T students, with possible integration into campus cafeterias.
- **OAuth Support**: Enable sign-in using U of T UTORid or other OAuth providers.

---

## Backend Documentation
For more detailed backend documentation and API usage, refer to the [Backend Documentation](https://wooded-power-d43.notion.site/Green-Grub-Backend-Documentation-7f38e5fbb9344ecf832d8f2a35c1b506).

---

## Contributors
- **Razeen Ali** - Backend Developer (API setup, Friends API, Shopping Cart API)
- **Isha Juneja** - Backend Developer (Quiz API, score calculation, database models)
- **Adel Muursepp** - Frontend Developer (UI/UX design, quizzes, dashboard, score view)
- **Henrik Zimmermann** - Frontend Developer (Login/Register flow, barcode scanning, cart feature)

Thank you for contributing to GreenGrub and helping create a more sustainable future!

