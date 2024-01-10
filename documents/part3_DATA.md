# Capstone: Step Three - Source Your Data

You're entering step three of your capstone project. To review the project steps, refer to [this document](https://www.springboard.com/archeio/download/102aef7e57ef4473b238dcd0a0e0d871/).

## Database Management (4-8 Hours)

Depending on the path you have chosen, you will either finalize your API choice or begin the creation of your own API.

### Pre Existing API

If you have not yet chosen an API:

- Please be sure to restrict your search to APIs that are free to access - happily, there are thousands available!
- For this project, do not feel like you have to restrict yourself to an API that has easy-to-use data.
- Check out [this APIs List](https://apilist.fun/) but feel free to explore other resources too.

After you've chosen your API:

- Familiarize yourself with the data it contains.
- Look at how the data is formatted, and whether it is returned in JSON or XML. The code you write to process the API will be slightly different depending on how the API is formatted.
- Think about what data you'll need for your site, and what data in the API may be unnecessary.
- Consider: Does any of the data seem messy to you? Think about how you might have to manipulate it before it's usable.

### Homemade API

If you are making a more advanced Flask/Python app, or if you are feeling like a challenge, then you can create your own API. In order to gather the data you will need to scrape the web, find a CSV that contains data you'd like to use and load it into your API, read the data from a file, or collect user input. If you are collecting user input, you should enter in dummy data to begin with.

Please note that if you scrape the web for data, you will likely have to clean it and manipulate it. This will involve either the use of regular expressions or external libraries like pandas.

## Schema

### Designing Your Schema

- Think about how you want to design the tables in your relational database, based on the API and any other additional data you might be storing, such as user login information.
- What will the primary and foreign keys be? Which tables will relate to each other? What kind of relationships will they have?
- Draw out how you'd like the associations to work in the Crow's Foot notation we taught you. Refer to [this video](https://player.vimeo.com/video/386853603?autopause=0&autoplay=1&loop=0) for a refresher.
- Once you decide on your columns and their data types, tables and their relationships, primary and foreign keys, and constraints that your schema will have, upload a text file containing your schema design or draw it out, take a picture, and upload that.

## Submitting Your Work

1. Add your Schema files to your GitHub repo.
2. Make a file called `README.md` and add the link to your API in there. For right now, that is all the README needs, but in the last step of the project, you will flesh it out with more documentation.
3. Submit your GitHub link to your mentor so they can review your Schema. You do not need approval from your mentor to continue working on the project, but they may have advice on how to improve it.

---

# "Today I Learned" App Documentation

## API

### Chosen API:

https://api.wikimedia.org/wiki/Feed_API/Reference/On_this_day

### Familiarize yourself with the data it contains.

The provided API reference is comprehensive and includes details on how to make requests and what parameters are required. We can use this API to fetch historical events, holidays, births, deaths, and other notable occurrences on a specific date.

Here's a summary of the key information:

- **Endpoint URL:** `https://api.wikimedia.org/feed/v1/wikipedia/{language}/onthisday/{type}/{MM}/{DD}`

  - Replace `{language}` with the desired language code (e.g., "en" for English).
  - Replace `{type}` with one of the following:
    - `all`: Returns all types
    - `selected`: Curated set of events that occurred on the given date
    - `births`: Notable people born on the given date
    - `deaths`: Notable people who died on the given date
    - `holidays`: Fixed holidays celebrated on the given date
    - `events`: Events that occurred on the given date that are not included in another type
  - Replace `{MM}` and `{DD}` with the zero-padded month and day of the month, respectively.

- **Headers:**

  - `'Authorization': 'Bearer YOUR_ACCESS_TOKEN'`: Include your access token in the Authorization header.
  - `'Api-User-Agent': 'YOUR_APP_NAME (YOUR_EMAIL_OR_CONTACT_PAGE)'`: Provide a user-agent header for identification.

- **Example Request (JavaScript):**

  ```javascript
  let today = new Date();
  let month = String(today.getMonth() + 1).padStart(2, "0");
  let day = String(today.getDate()).padStart(2, "0");
  let url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`;

  let response = await fetch(url, {
  	headers: {
  		Authorization: "Bearer YOUR_ACCESS_TOKEN",
  		"Api-User-Agent": "YOUR_APP_NAME (YOUR_EMAIL_OR_CONTACT_PAGE)",
  	},
  });

  response.json().then(console.log).catch(console.error);
  ```

- **Example ALL type Response:**
  The response includes information about selected events, births, deaths, holidays, and events for the specified date.

  ```json
    {
        selected: [
            {
                text: "string",
                pages: [
                    {
                        type: "string",
                        title: "string",
                        displaytitle: "string",
                        namespace: {
                            id: 0000,
                            text: "string",
                        },
                        wikibase_item: "string",
                        titles: {
                            canonical: "string",
                            normalized: "string",
                            display: "string",
                        },
                        pageid: 0000,
                        thumbnail: {
                            source: "URL string",
                            width: 0000,
                            height: 0000,
                        },
                        originalimage: {
                            source: "URL string",
                            width: 0000,
                            height: 0000,
                        },
                        lang: "string",
                        dir: "string",
                        revision: "string",
                        tid: "string",
                        timestamp: "string",
                        description: "string",
                        description_source: "string",
                        content_urls: {
                            desktop: {
                                page: "URL string",
                                revisions: "URL string",
                                edit: "URL string",
                                talk: "URL string",
                            },
                            mobile: {
                                page: "URL string",
                                revisions: "URL string",
                                edit: "URL string",
                                talk: "URL string",
                            },
                        },
                        extract: "string",
                        extract_html: "string",
                        normalizedtitle: "string",
                    }, { ... } , ...
                ],
                year: 0000,
            }, { ... }, ...
        ],
        births: [
            {
                text: "string",
                pages: [
                    { ... }, { ... }
                ],
                year: 0000,
            },
        ],
        deaths: [
            {
                text: "string",
                pages: [ { ... }, ... ],
                year: 0000,
            },
        ],
        holidays: [
            {
                text: "string",
                pages: [ ... ],
                year: 0000,
            },
        ],
        events: [
            {
                text: "string",
                pages: [ ... ],
                year: 0000,
            },
        ],
    };
  ```

### Look at how the data is formatted, and whether it is returned in JSON or XML. The code you write to process the API will be slightly different depending on how the API is formatted.

- It responds in json

### Think about what data you'll need for your site, and what data in the API may be unnecessary.

Everything with a star is what ill take as requiered

- Event Information:

  - ⭐ selected: Historical events curated for the given date.
  - ⭐ events: Other events that occurred on the given date.
  - ⭐ holiday: Holiday celebrated on this given date.
  - ⭐ births: Information about notable people born on the given date.
  - ⭐ deaths: Details about notable people who died on the given date.

- Data for Each Event:
  - ⭐ text: A brief description of the event.
  - ⭐ pages: Additional details about the event, such as associated Wikipedia pages.
    - Content URLs:
      - ⭐ pages.content_urls: URLs for accessing the related Wikipedia pages on both desktop and mobile.
  - ⭐ year: The year in which the event occurred.
  - Wikibase_item: identifier string starting with "Q" for an item in Wikibase

This info may be useful for when we develop the bell and whistles, and preetiffy the app.

- Image Information (for events, births, deaths, holidays):
  thumbnail: URL and dimensions of a thumbnail image related to the event, person, or holiday.
  originalimage: URL and dimensions of the original image.

- Extracted Content (for events, births, deaths, holidays):
  extract: A text-based summary or extract of the content.
  extract_html: The HTML-formatted version of the extract.

### Consider: Does any of the data seem messy to you? Think about how you might have to manipulate it before it's usable.

    Ill have to dig for the data from the api response in two ways depending on what we request from its facts/events types/categories. if we ask for all of them, well have to go down one level further to get the data we need to save into our db, localstorage and hand to our react context states... if we select one of the facts/event types we can then traverse down its parsed response data obj to get the info for title, date, page id, page url, and wikibase_Item

## Database Schema:

### Designing Your Schema

- Think about how you want to design the tables in your relational database, based on the API and any other additional data you might be storing, such as user login information.
- What will the primary and foreign keys be? Which tables will relate to each other? What kind of relationships will they have?
- Draw out how you'd like the associations to work in the Crow's Foot notation.
- Once you decide on your columns and their data types, tables and their relationships, primary and foreign keys, and constraints that your schema will have, upload a text file containing your schema design or draw it out, take a picture, and upload that.

#### The database will consist of Four tables:

- **Users:**

  - id: Integer, Primary Key
  - username: String
  - password: String
  - date_registered: Date
  - is_admin: boolean

- **Favorite**

  - favorite_Id: pair integer of user_id and fact_id, Primary Key
  - user_id: Foreign Key referencing Users table
  - fact_id: Foreign Key referencing Facts table

- **Facts:**

  - id : Integer, Primary Key
  - title : string
  - fact_date : DATE MDY 12/31/2000
  - page_id : Foreign Key referencing Pages table

- **Pages:**
  - page_id : Integer, Primary Key
  - page_URL leading to Wikipedia for more info : URL string
  - wikibase_item : string starting with "Q", can be none

#### Relationships:

Users -> Favorites: One-to-Many. Each user can have multiple favorites.

Facts -> Favorites: One-to-Many. Each fact can be a favorite for multiple users.

Pages -> Facts: One-to-Many. Each page can be a source for multiple facts.

    +-----------------+      +-----------------+
    |      Users      |      |    Favorite     |
    +-----------------+      +-----------------+
    | id: Integer     |  ->  | user_id: Int    |
    | username: Str   |      | fact_id: Int    |
    | password: Str   |      +-----------------+
    | date_reg: DATE  |                ^
    | email: email    |                |
    | is_admin: Bool  |                |
    +-----------------+         +-----------------+
    +--------------------+      |      Facts      |
    |      Pages         |      +-----------------+
    +--------------------+      | id: Integer     |
    | page_id: Integer   |      | title: String   |
    | page_URL: Str      |      | fact_date: DATE |
    | wikibase_item: Str |  --> | page_id: Int    |
    +--------------------+      +-----------------+
