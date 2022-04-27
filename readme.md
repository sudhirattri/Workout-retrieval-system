# Workout Retrieval System

## Team Members
2018326: Aditi Soni
2018378: Aditya Singh
2018329: Anmol Gupta
2018295: Manavjeet Singh
2018307: Sarthak Arora
2018267: Sudhir Attri

## Demo for frontend
https://workout-retrieval-system.sudhirattri1.repl.co/

## Project Structure

- Project Repository - [github.com/sudhirattri/workout-retrieval-system](https://github.com/sudhirattri/workout-retrieval-system) 
- Frontend - React based dynamic webapp.
  - Production build hosted at - [workout-retrieval-system.sudhirattri1.repl.co](https://workout-retrieval-system.sudhirattri1.repl.co/)
- Backend- Flask powered backend server with indexing, query searching and image recognition.
  - Production build hosted at - [workout-retrieval-system.herokuapp.com](https://workout-retrieval-system.herokuapp.com/) 

## Instructions

- Frontend- React based dynamic webapp.
	- Pre-requisite - NodeJs and npm installed.
  - Go to /frontend dir
  - `cd frontend`
  - `npm i`
  - `npm start`

- Backend- Flask powered backend server with indexing, query searching and image recognition.
  - Pre-requisite - python environment.
  - `cd backend`
  - `pip install -r requirements.txt`
  - `python run.py`

## API specifications - 

Assuming server is running at url

- POST - "url/imageRecognize" - Accepts request with image data in body encoded in Base64 encoding scheme. Returns the recognized class.

- Example Query - 
```
curl --location --request POST 'https://workout-retrieval-system.herokuapp.com/imageRecognize' \

--header 'Content-Type: image/jpeg' \

--data-raw '4gIoSUNDX1BST0ZJTE . . . . . . ' 
```
- Example Response - 
```
{

equipment: 'Bench Press',

probs: '0.9656155',

success: true

}
```

- GET - "url/ -" Retrieve the results for the query, accepts json object as body with appropriate content-type header. Returns list of exercises with corresponding muscle groups and equipments.

- Example Query -

```
{

        "equipments": ["Bench Press"],

        "muscle\_groups" : ["Upper Arms"]

}
```
- Example Response - 
```
[

     {

        "description": "Lower weight to upper chest. Press bar until arms are extended. Repeat.",

        "equipment": [

            "Barbell",

            "Bench Press"

        ],

        "muscle\_group": "Chest",

        "name": "Incline Bench Press"

    },

    {

        "description": "Lower weight to upper chest. Press bar until arms are extended. Repeat.",

        "equipment": [

	.

	.

	.

	continues . . .

] 
```




## User Flow

<img width="2204" alt="Mid Report(5)" src="https://user-images.githubusercontent.com/43843585/165586655-f9935fec-b31c-4374-b3ed-f8c93f7121b5.png">

The final output of the project is a web system with backend deployed on Heroku, APIs and ML model hosted on flask and frontend hosted on Repl.it. The landing page gives users the choice to either input equipment or do an image search with the equipment they have. Next, if they prefer to do an image search, the system gives them the feedback if it is able to recognize the equipment from the image. Users can select multiple equipment by repeatedly typing or uploading images.

![WhatsApp Image 2022-04-27 at 10 18 42 PM](https://user-images.githubusercontent.com/43843585/165586854-7f07f597-4b91-437b-a6e8-04bd3537b6c6.jpeg)

Next, the user selects the muscle group. Users can select the muscle group in two ways, either via a text search or via visual muscle selector. This step is not necessary but the user has been given the choice to select one or multiple muscle groups as well.  

![WhatsApp Image 2022-04-27 at 10 18 44 PM](https://user-images.githubusercontent.com/43843585/165586929-aa51ef0b-0c94-4ac3-91ae-d209afb1986f.jpeg)

Then the user is shown the results with exercise ranked according to the input given by the user.


