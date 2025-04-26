# WorkoutTracker

Description:
Basic workout and general health tracking app, used to log workouts and track goals, with
specific exercises able to be chosen and number of reps, etc. for users to be able to track their
progress and repeat workouts easily. For the use of helping users maintain health and general
wellness.

Planned Features
● Goal Tracker: Users can input frequency/progress goals
● Login: Users have an ID and password to store data, workouts and goals
● Log Workouts: Users can log a workout for a specific date by choosing exercises and inputting number of reps/sets and weight used, as well as date and other information

Technical Implementation Plan:
What routes/components will be in React?
- Login UI, input user ID and password into forms
- Goal tracking dashboard (similar to a to-do list or notes app, basically a big form to
journal in)
- Exercise input to choose from a database (MongoDB) of dropdown menus in order to log
a workout
- Typing reps or amount of time spent on workout into a form
- Could also be a more user friendly UI like a slider for reps for example
- Stretch goal: display how many days a week user has worked out this week
What data will be passed through Axios to the Express backend?
- User ID and password
- User logged workouts
- User logged journaling/goals
- Allow the user to input custom workouts to be added to the database
What models and collections will be used in MongoDB?
- Users collection to store username and password, as well as goals
- Exercise collection for each exercise to store Name, category (cardio, legs, etc.), and
possibly instructions or other information
- UserWorkout collection stores the workouts a user has logged with the exercises done,
reps/set/weight, and date
How will CRUD operations be handled?
- Create: Logging workouts, setting goals, creating an account
- Read: Reading/accessing past workouts, past goals/journal
- Update: Updating goal progress
- Delete: Removing logged workouts or goals


Team member roles:
● Frontend (React): Seun, Tori
● Backend (Node/Express): Josh
● Database (MongoDB): Jacob, Tori
● Presentation/Documentation: All
