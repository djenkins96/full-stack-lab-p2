# Project 2: Angular Blog
##### Covalence
###### Full Stack: Summer 2017

## Info
* You will be creating a blog site using Angular, Express, and MySQL
* You will be writing an express server and API code, so you will need to install express, body-parser, and mysql into your package.json file
* You will be using factories, $resource, and html5Mode

## Objectives - Database
* Create a new database called AngularBlog
* Create a new user for use with that database
* Grant all priveleges to that user for that database
* Log into the database as the new user
* Create a new table called Categories
* Categories should contain the following columns, spelled and capitalized exactly this way:
    * `id INT`
    * `name VARCHAR(40)`
* Additionally, `id` should be the primary key and should auto-increment
* Create a new table called Users
* Users should contain the following columns, spelled and capitalized exactly this way:
    * `id INT`
    * `firstname VARCHAR(20)`
    * `lastname VARCHAR(30)`
    * `email VARCHAR(60)`
* Additionally, `id` should be the primary key and should auto-increment
* Create a new table called Posts
* Posts should contain the following columns, spelled and capitalized exactly this way:
    * `id INT`
    * `title VARCHAR(100)`
    * `userid INT`
    * `categoryid INT`
    * `content TEXT`
    * `createdAt DATETIME` - Can set this in your stored procedure for inserting new Post
* Additionally, `id` should be the primary key and should auto-increment
* Additionally, `userid` should be a foreign key that refers to the `id` column of the Users table
    * When a user is updated, or deleted, the same should happen for all their blog posts
* Additionally, `categoryid` should be a foreign key that refers to the `id` column of the Categories table
    * When a category is updated, it should be updated here too. However, when a category is deleted, we should just make categoryid be NULL here.
* Add several users to your Users table
* Add several categories to your Categories table
* You will need to write stored procedures as the need arises. The API below will give you an idea of what stored procedures will be required.

## Objectives - Server Code
* This server file will reside in the server folder
* Statically serve the client folder of your project
* Add a body parser to your Express app to parse incoming json data
* Connect a mysql pool to the database you created for this project, logging in as the new user you created for this project
* Write code to respond to the following API endpoints, with the specified behavior:
    * Collection `/api/posts`
        * GET: Should respond with all posts including all post columns, the firstname and lastname columns of the associated user as authorfirstname and authorlastname, and the name column of the associated category as categoryname
        * POST: Should store the blog post with the composing user's id and the category id set. Should respond with the id of the inserted blog post and status 201
    * Detail: `/api/posts/:id`
        * GET: Should respond with a single post, including all post columns, and also the firstname and lastname column of the associated user
        * PUT: Should allow updating the title, content, and categoryid of a blog post. Should respond with no data, just code 204
        * DELETE: Should delete the blog post with the given id. Should respond with no data, just code 204
    * Collection: `/api/users`
        * GET: Should respond with all users including the user id, firstname, and lastname (explicitly specify these in your stored procedure. That way if we add something like a password later, we don't accidentally leak it here)
    * Collection: `/api/categories`
        * GET: Should respond with all categories
* Write middleware to enable us to use push-state routing on the front-end

## Objectives - Front-End
* Make an Angular application that uses routing and $resource
* You must use $resource, not $http
* You must enable html5Mode. This project will use state routes, not hash routes.
* This application will reside in the client folder
* Import into index.html angular.js and any other script files necessary to enable routing and $resource
* Import your own script files into index.html as necessary
* Create 3 different factories called `User`, `Category`, and `Post`.
* Each of those factories should return a $resource for interacting with the entities they are named after. Only Post needs to support updating.
* Your Angular blog should consist of the following routes:
    * `/`
        * Shows all blog posts, each one showing the title, author's full name, category, and date formatted MM/DD/YYYY HH:MM AM/PM
        * Each blog post should have a link that says `Read` that should link to the single blog post view
        * Should have a button labeled Compose at the top of the page. Clicking the button should navigate to the compose view
    * `/compose`
        * Contains an input field for title
        * Contains a select box for selecting the category from a list of all the categories
        * Contains a select box for selecting the user from a list of all the users
        * Contains a textarea for typing the content of the blog post
        * Contains a button for saving the blog post
        * Navigates back to the list of posts when successfully saved
    * `/:id/update`
        * Contains an input field for changing the title
        * Contains a select box for changing the category
        * Contains a textarea for changing the content
        * Contains a button that causes the post to be updated
        * The fields above should be initially set to the current values from the blog post we're editing
        * Navigates back to the single post view when the update is successful
    * `/:id`
        * Shows the title, author full name, category, MM/DD/YYYY HH:MM AM/PM date, and content of the single blog post with the given id
        * Should have an edit button that navigates to the update page
        * Should have a delete button that asks for confirmation before deleting, and then navigates back to the post list page when successfully deleted

## Hints/Reminders:
* Time management is key to completing this project. There's a lot going on here, but you've done it all already. Don't wait to the last minute.
* Remember that we rarely create/access/update DOM elements ourselves from code. Use data-binding as much as possible.

## Extending
* Finished early and want a challenge?
    * Add views, API routes, and stored procedures for creating, updating, and deleting categories and users