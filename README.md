This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Main Application Functions

## Registering an Account

To register a new account, go to the 'Register' tab on the navigation bar. You will be presented with a form to input a username and 
password. Enter any username that isn't already taken, and a password with the required constraints (Minimum 8 characters in length, contain at least one capital letter, contain at least one number). A successful registration will move you back to the main page. 

## Log in into your Account

Proceed to the 'Login' tab on the navigation bar, which will present you with another form for username and password. Use the exact username and password you used in the registration form and click the 'Sign in with Credentials' button. A successful login will move you to the main page once again, but with the following: a Photo upload button, and Post upload form and button, and your Feed (which should be empty if you just registered). Please remember your username and password, as currently there is no recovery system in place to get it back!

## Toggle Light or Space Modes

The entire application has a light or dark (space) mode that can be toggled by clicking the 'Space Mode' (If currently in light mode) or 'Light Mode' (If currently in space mode) button in the navigation bar at the top. Choose whatever mode fits your preference.

## Log Out of your Account

To log out, simply click the 'Log Out' tab on the navigation bar to log out of your account when logged in. You should see the main page with only the welcome message if this was successful.

## Adding a Post

To add a new Post, type anything in the large area for your Post's text content, and click the 'Add Post' button when finished. A successful upload will redirect you to your profile's Posts page with your new Post uploaded.

## Adding a Photo

To add a new Photo, click the 'Choose File' button below 'New Photo' and choose your file when prompted by your system (File must be less than 4MB in size). After a moment, a prompt will appear with the text 'Please enter a brief description for this photo'. Type anything in the text area and click the button for your Photo to complete. A successful upload will redirect you to your profile's Photos page (You may need to refresh the page to see your new Photo).

## Adding a Comment

Any Post or Photo may be commented on by you or by other users. On any Post or Photo click the 'Add a Comment' link (Sometimes it will display as 'View all Comments' if the Comment count exceeds 3) at the bottom and you will go to that Post or Photo's main page, displaying any Comments it may already have. To add a new Comment, type anything in the large area for your Comment's text content, and click the 'Add Comment' button when finished. A successful upload will automatically display your new Comment at the bottom of the Comments list.

## Following another User

You may follow any other user you wish to. Go to the user's profile page and you will see a large 'Follow' button on the right side of the page. Click that and you will now follow the user. Go back to the main page and now any Post or Photo created by this user will now display on your feed. Your profile will also display on that user's 'Followers' tab on their profile page.

## Unfollowing a Followed User

If you wish to unfollow a user for any reason, go to that user's profile page and find the large 'Unfollow' button where the 'Follow' button was at. Click that and your following of that user will cease and their Posts and Photos should no longer display on your feed on the main page. Your profile will also no longer display on that user's 'Followers' tab on their profile page.

## Liking a Post, Photo, or Comment

Anyone's Post, Photo, or Comment can be liked by you or other users. The bottom left of any Post, Photo, or Comment has a button with a thumbs up and a number next to it, which displays the number of likes associated with it. Clicking this button will register a like from you (Liked) and add to the number. Clicking this button again will remove your like and decrease the number.

## Reporting a Post, Photo, or Comment

Any Post, Photo, or Comment that is not yours can be reported and sent to the admins to view and take action if necessary. On the bottom right of any Post, Photo, or Comment, click the link labelled 'Report' and you will be directed to a report form for that entity. Check any box that most closely relates to the report reason, type any additional information under 'Explain briefly why this should be reported', and click the 'Submit' button when finished. A successful submission will redirect you to the main page. Please do not abuse this feature, as repeated misuse will result in action taken against you which may include temporary restriction on creating Posts, Photos, and Comments or outright account removal.

## Deleting your Post, Photo, or Comment

Any Post, Photo, or Comment associated with you can be deleted for any reason. Simply click the 'Delete' button with the trashcan and your entity will be deleted. Please note that any deleted Post or Photo will also delete any associated Comment with it, even other users' Comments.

## Using the General Search

Click the 'Search' tab on the navigation bar to use the search form for any Post, Photo, or user on the application. Clicking any radio button without text will display all Posts, Photos, or users. Adding text will filter results to display only Posts' or Photos' content that matches the text, or users' usernames that matches the text. If any search result has more than 10 items, click the 'Next' button on top to show more results.

## Admin Abilities

Admins are hand picked to keep users and the application as a whole safe. Any user who is found abusing features, not following rules, or any other action deemed inappropriate by an Admin will result in consequences. Typically first or minor offenses will 'restrict' a user from creating Posts, Photos, or Comments for a set amount of time. Please note that a restricted user may still like or unlike Posts, Photos, or Comments. Repeated issues or major problems will result in permanent account deletion.

# Common Questions and Answers

## What are the general rules on here?

Answer: Keep things civil. You may disagree with others but do not threaten anyone on here. For Photos nothing pornographic of any nature is allowed. Content you would find normally on a public beach is fine but anything more is pushing it. Use common sense. These rules are not limited to the above, and may be expanded upon at any Admin's discretion.

## Can I make any Post, Photo, or Comment private? Is there private messaging?

Answer: No. Everything that you create on here is public for everyone to see. If you wish to upload private content, please use another 
application.

## Can I become an Admin?

Answer: Maybe, but most likely no. Additional Admins will only be considered if the app grows and management exceeds that of one person. People who I personally know will also be weighed considerably more so than random people who ask.

## Will you add X feature?

Answer: Additional features may be added at a later time, but is not guaranteed.