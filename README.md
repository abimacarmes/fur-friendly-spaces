Fur-Friendly-Spaces
GitHub: https://github.com/abimacarmes/fur-friendly-spaces
Live Link: https://fur-friendly-spaces-abimacarmes.vercel.app/

Summary: Created for my first Bloc capstone, Fur Friendly Spaces is a app for accumulating dog-friendly places of all different kinds in a given city.

The application displays a list of all the dog-friendly places in the database to the user and allows for filtering by location type and/or city. To add a new location, the app leverages the Google Maps API to validate the location and get the correct information (name, address, city). Users can also up-vote and down-vote the existing locations based on their personal experiences to further enrich the value of the app.

Technologies used: React, CSS, Node, Express, and PostgreSQL

Future Goals: Further utilization of the Google Maps API to show a map of the different locations and allow the user to look at a map of all the pinned locations in a given city.

Screenshots:
![image](/src/screenshots/AllSpaces.JPG)

API Documentation: 
GitHub: https://github.com/abimacarmes/fur-friendly-database
Live Link: https://enigmatic-basin-32386.herokuapp.com/api/

- /spaces GET: gets all items in the 'spaces' table
- /spaces POST: adds a new space to the 'spaces' table
	Request Body:
		{
    			"name": String,
        		"address": String,
		        "city": String,
		        "type": String
		}
-/spaces/:id PATCH: updates the upvote or downvote count for the space who's 'id' is provided
	Request Body:
		{
    			"id": Int,
        		"upCount": Int,
		        "downCount": Int
		}
