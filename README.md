# Udagram Image Filtering Microservice

<a href="http://image-filter-udagram-dev2.us-east-1.elasticbeanstalk.com/" target="_blank">http://image-filter-udagram-dev2.us-east-1.elasticbeanstalk.com/</a>

# Note

We have slightly customized the default api page<br>
We change also `filterImageFromURL from './util/util'` as this helper function do not work for some large image link. New version are in util file. It use axios and source is mentioned. 

# Deployment screenshoot

<img scr="./deployment_screenshots/deploy_success.png" alt="deployment image screenshoot">

# Description 

Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

### Run api

run `npm run dev` to start server