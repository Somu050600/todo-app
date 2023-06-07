# Documentation: Todo App - React and Django

***Note: The following document provides a summary of a Todo application developed using React and Django, incorporating various features such as sign-in with Google, CRUD operations, task completion tracking, and Django Rest APIs.***

### 1. Introduction:

#### Overview:
The Todo app is a web-based productivity tool developed using React and Django. It allows users to manage their tasks efficiently by providing features such as task creation, reading, updating, and deletion. Additionally, the app offers seamless sign-in with Google, enabling users to access their tasks conveniently.

#### Objectives:
The main goals of the Todo app are as follows:
- Implement one-tap login functionality using Google authentication.
- Provide a user-friendly interface for managing tasks effectively.
- Streamline task creation, retrieval, updating, and deletion processes.
- Enable task completion tracking by allowing users to strike completed tasks.

### 2. System Architecture and Integration:

#### Technical Overview:
The Todo app follows a client-server architecture, where the frontend is built using React, and the backend is powered by Django. The frontend interacts with the Django Rest APIs to perform CRUD operations on tasks. The integration with Google for sign-in functionality is achieved through the Google Sign-In API.

#### Data Flow Diagrams:
The data flow within the Todo app is as follows:
- User interacts with the frontend interface to perform actions such as task creation, update, or deletion.
- The frontend sends requests to the Django backend, which handles these requests.
- The Django Rest APIs process the requests and interact with the database to perform the necessary CRUD operations on tasks.
- The updated task information is returned to the frontend, allowing users to view the changes instantly.

#### DB Schema for the "Task" model:
```
Task
------
id (Primary Key)
title (String)
completed (Boolean)
```

### 3. Non-Functional Requirements:

#### Security:
The Todo app incorporates security measures to protect user data, including:
- Authentication: Users are required to sign in using their Google accounts, ensuring only authorized access to the application.
- Access Controls: The app implements role-based access control, allowing users to access and modify only their own tasks.

### 4. Assumptions and Constraints:

#### Assumptions:
During the development process, the following assumptions were made:
- Users have valid Google accounts for sign-in purposes.
- The app will be primarily used by individual users rather than teams or organizations.
- The user interface will be responsive and compatible with modern web browsers.

#### Constraints:
The Todo app has the following limitations:
1. Lack of Online Functionality: Currently, the app is on my public github repository. But anyone can clone and use it offline on their local computers. To mitigate this limitation, implementing it online and synchronization could enable users to work seamlessly with an internet connection.
2. Limited Task Organization Options: The app currently supports a basic list-based task organization. To enhance task organization capabilities, introducing labels, categories, or tags could provide users with more flexibility in managing their tasks efficiently.
3. Single User Support: Presently, the app supports only a single user per account.


### 5. Additional Features:

The next three features that could be built for the Todo app are:

1. Reminders and Notifications: Implementing a reminder system that allows users to set due dates and receive notifications for upcoming tasks. This feature would enhance task management by ensuring timely completion and reducing the chances of missing deadlines.

2. Task Prioritization: Introducing the ability to assign priority levels to tasks, such as high, medium, or low. This feature would enable users to focus on important tasks and effectively manage their workload based on priority.

3. Task Sharing and Collaboration: Incorporating multi-user support with access controls and collaboration features would be beneficial. Enabling users to share tasks with other app users, facilitating collaboration and task delegation. This feature would be beneficial for teams or individuals working on joint projects.

**🍭Bonus Question: How would you evaluate the success of these features?**

To evaluate the success of the additional features, the following metrics can be considered:
(Assume, if the app is in production stage)
- Feature Adoption: Tracking the number of users utilizing the new features and their frequency of use.
- User Satisfaction: Collecting feedback and ratings specifically related to the newly implemented features to gauge user satisfaction.
- Task Completion Improvement: Analyzing the impact of the features on task completion rates and efficiency.
- User Retention: Monitoring the retention rate of active users after the introduction of the new features, indicating their value and impact on user engagement.

### Final thoughts:

The provided summary document outlines the essential aspects of the Todo app, including its purpose, objectives, system architecture, security measures, assumptions, constraints, and potential additional features. The document demonstrates a clear understanding of the product and its various components. The Todo app aims to provide users with a robust task management solution and promote productivity.

