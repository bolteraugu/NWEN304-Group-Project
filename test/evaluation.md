# Evaluation of performance of database

MongoDB was the database we used which our RESTful web service interacts with.

We are on the free tier and for the most part, development was smooth and we noticed little 
performance limitations. The parts of our web app that relies on calls from the database
being returned would render slightly later, but not enough to affect the user experience.

However, during testing when we used `loadtest` to simulate multiple clients connecting to our
web service simultaneously, we noticed that we started nearing the maximum number of 
connections we are allowed on the free tier, and that the response time increased with the number
of concurrent connections.

Overall, the database did cause some bottlenecking. However, this was a minimal amount during
development, and should the app be deployed to thousands of users, MongoDB offers paid plans
to scale the database both horizontally and vertically.