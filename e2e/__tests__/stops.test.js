const request = require('../request');
const db = require('../db');
//const { matchMongoId } = require('../match-helpers');
//const getLocation = require('../../lib/services/maps-api');

describe('stops api', () => {
  beforeEach(() => {
    return db.dropCollection('stops');
  });

  const data = {
    location: {
      latitude: 45.5266975,
      longitude: -122.6880503
    },
    weather: {
      any: 'object', //will get from weather api 
    },
    attendance: 420
  };
  
  function postStop(stop) {
    return request
      .post('/api/stops')
      .send(stop)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts a stop', () => {
    return postStop(data)
      .then(stop => {
        expect(stop).toEqual({
          _id: expect.any(String),
          __v: 0,
          location: {
            latitude: 45.5266975,
            longitude: -122.6880503
          },
          weather: {
            any: 'object', //will get from weather api 
          },
          attendance: 420
        });
      });
  });

  it('gets a stop by id', () => {
    return postStop(data)
      .then(stop => {
        return request.get(`/api/stops/${stop._id}`)
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual(stop);
          });
      });
  });
});