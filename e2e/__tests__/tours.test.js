const request = require('../request');
const db = require('../db');
//const mongoose = require('mongoose');
//const Stop = require('../../lib/models/stop');

describe('tours api', () => {
  beforeEach(() => {
    return db.dropCollection('tours');
  });

  const data = {
    title: 'Don\'t Stop Til You Drop!',
    activities: ['live music', 'food', 'camping', 'butts'],
    launchDate: new Date(),
    stops: []
  };

  function postTour(tour) {
    return request
      .post('/api/tours')
      .send(tour)
      .expect(200)
      .then(({ body }) => body);
  }
  
  it('posts a tour', () => {
    return postTour(data)
      .then(tour => {
        expect(tour).toEqual({
          _id: expect.any(String),
          __v: 0,
          title: expect.any(String),
          activities: ['live music', 'food', 'camping', 'butts'],
          launchDate: expect.any(String),
          stops: []
        });
      });
  });

  it('gets a tour by id', () => {
    return postTour(data)
      .then(tour => {
        return request.get(`/api/tours/${tour._id}`)
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual(tour);
          });
      });
  });
});



