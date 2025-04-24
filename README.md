# Qikberry Task

A React application featuring user authentication, posts listing, and photo gallery using public APIs.

## 📋 Features

- **Authentication System**
  - Login and Sign up pages with form validation
  - Protected routes requiring authentication
  - Context API for auth state management
  
- **Content Pages**
  - Dashboard with statistics overview
  - Posts page displaying data from JSONPlaceholder API
  - Photos gallery with pagination
  
- **State Management**
  - Context API for authentication state
  - Redux for posts and photos data management
  - Local storage persistence

- **UI Features**
  - Modern responsive design with Tailwind CSS
  - Aurora background effect in the footer
  - Modular component architecture

## 🚀 Tech Stack

- **Frontend**: React.js, React Router v6
- **State Management**: Redux Toolkit, Context API
- **Styling**: TailwindCSS
- **Animations**: Aurora effect
- **API Integration**: JSONPlaceholder

## 🛠️ Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd qikberry-task
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Run the development server
   ```
   npm run dev
   ```

4. Access the application at
   ```
   http://localhost:5173/
   ```

## 📱 Usage

### Authentication

- **Login**: Use the following demo credentials
  - Username: `admin`
  - Password: `password`

- **Sign Up**: Complete the form with required fields
  - Name
  - Username
  - Password (minimum 6 characters)
  - Confirm Password

### Navigation

After authentication, you will have access to:

- **Dashboard**: Overview of available posts and photos
- **Posts**: View all posts from JSONPlaceholder API
- **Photos**: Browse photos with pagination

## 📂 Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── common/
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   └── pages/
│       ├── Dashboard.jsx
│       ├── Posts.jsx
│       └── Photos.jsx
├── context/
│   └── AuthContext.jsx
├── redux/
│   ├── slices/
│   │   ├── postsSlice.js
│   │   └── photosSlice.js
│   └── store.js
├── styles/
│   └── Aurora.jsx
├── Routes/
│   └── Index.jsx
├── App.jsx
└── main.jsx
```

## 🔒 Data Sources

- **Posts Data**: Fetched from `https://jsonplaceholder.typicode.com/posts`
- **Photos Data**: Fetched from `https://jsonplaceholder.typicode.com/photos`

## ✨ UI Features

- Responsive design for mobile and desktop
- Modern UI with clean design patterns
- Interactive Aurora background effect in the footer
- Layout structure with proper separation of concerns
- Pagination for photos gallery
- Progress indicators for form completion

## 📝 Implementation Details

- **Authentication**: Simulated using hardcoded credentials and local storage persistence
- **Routing**: React Router v6 with protected routes and layout pattern
- **Component Structure**: Organized into Auth, common, and pages for better maintainability
- **Footer Implementation**: Separate component with Aurora background effect

## 📄 License

This project is licensed under the MIT License.
