# Full-Stack Blog

A full-stack blogging platform built with the MERN stack (MongoDB, Express, React, Node.js). This application provides a complete blogging experience with features for posting articles, reading, commenting, and more.

## Features

- **User Authentication**: Register, login, and manage user accounts.
- **CRUD Operations**: Create, read, update, and delete blog posts.
- **Rich Text Editor**: Write and format blog posts using a rich text editor.
- **Comment System**: Users can comment on posts.
- **Responsive Design**: Fully responsive layout for mobile and desktop devices.
- **Voice Reading**: Read articles and summaries using text-to-speech.

## Technologies Used

- **Frontend**: React, Tailwind CSS, Flowbite
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Text-to-Speech**: Web Speech API

## Installation

To run this project locally, follow these steps:

### Clone the Repository

```bash
git clone https://github.com/CodeChainWizard/Full-Stack-Blog.git
cd Full-Stack-Blog
```

# Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the backend directory and add your environment variables (e.g., MongoDB URI, JWT secret).

4. Start the server:

```bash
npm start
```

# Frontend Setup

1. Navigate to the frontend directory:

```bash
cd ../frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm start
```

## Usage

- **Register/Log in**: Use the authentication features to create an account or log in.
- **Create a Post**: Use the rich text editor to write and publish a new blog post.
- **Read Posts**: Browse and read blog posts.
- **Comment**: Leave comments on blog posts.
- **Read Aloud**: Use the voice buttons to listen to articles and summaries.

## API Endpoints

Here are some of the key API endpoints:

- **`GET /api/posts`** - Get all posts
- **`GET /api/posts/:id`** - Get a single post by ID
- **`POST /api/posts`** - Create a new post
- **`PUT /api/posts/:id`** - Update an existing post
- **`DELETE /api/posts/:id`** - Delete a post
- **`POST /api/comments`** - Add a comment to a post-

## Features in Detail

# Voice Reading

The application includes functionality for reading articles and summaries aloud using the Web Speech API. The following features are supported:

- **Read Summary**: Reads the first few sentences of the article as a summary.
- **Read Article**: Reads the entire article line by line.
- **Pause/Resume**: Controls playback of the reading.

## Responsive Design

The frontend is designed to be fully responsive, ensuring a good user experience on both mobile and desktop devices. Adjustments and optimizations are made using Tailwind CSS.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (**`git checkout -b feature-branch`**).
3. Make your changes.
4. Commit your changes (**`git commit -am 'Add new feature'`**).
5. Push to the branch (**`git push origin feature-branch`**).
6. Create a new Pull Request.

# Contact

For any questions or issues, please reach out to the project maintainers via the GitHub Issues page or at shubhamdancha789@gmail.com
