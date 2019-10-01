Tour Manager
===

Create a server for tracking travelling tours, including stops. 

On this tours the stops are not known until they happen, so
the API needs to be able to add, update and remove stops.

## Use Common Setup

Refer to in-class example, or create a template!

## Basic CRUD

The `/api/tours` API should offer CRUD for `GET` and `POST`. These need to 
be E2E tested. 

Feel free to add more routes, but not required for this lab. 

Model unit testing is optional.

The schema structure of a tours looks like:

path | type info
---|---
title | required title of the tour
activities | array of string activities that will happen during the show
launchDate | date tour will start. default to now
stops | array of stop objects, see stop schema below

## Stops

In addition there are the following APIs for managing tour stops:

* `POST` `/tours/:id/stops` - add a stop to this tour format is:
    ```json
    {
      "address": "123 Main St"
    }
    ```
* `DELETE` `/tours/:id/stops/:stopId` - remove a stop that got cancelled
* `PUT` `/tours/:id/stops/:stopId/attendance` - update a stop (after complete) with number of attendees (NOTE: this should _only_ update the attendance field of the stop, no other document updates allowed)

These need to be E2E tested.

The schema structure of a stop looks like:

path | type info
---|---
location | geolocation object
weather | object with weather conditions (see demo, choose some fields)
attendance | number with min of 1 (not required as will not be available initially)

## Middlewares

When adding a stop, the API takes an address search, but needs to look up additional information. There are services in the starter code, you'll need to get your own api keys.

Create middleware for both geolocation and weather api (will need to be chained). This would allow geolocation to return lat, lng for weather api.


## Rubric **15pts**

* Tour E2E Testing and API **2pts**
* Weather Middleware **3pts**
* Stop E2E Testing and API **5pts**