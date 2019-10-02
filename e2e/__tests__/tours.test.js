jest.mock('../../lib/services/maps-api');
const request = require('../request');
const db = require('../db');
const { matchMongoId } = require('../match-helpers');
const getLocation = require('../../lib/services/maps-api');
const getWeather = require('../../lib/services/weather-api');

getLocation.mockResolvedValue({
  latitude: 45.5266975,
  longitude: -122.6880503
});

getWeather.mockResolvedValue({
  time: new Date(1569999600 * 1000).toISOString(),
  summary: 'Weather is good.'
});


describe('tours api', () => {
  beforeEach(() => {
    return db.dropCollection('tours');
  });

  const data = {
    title: "Don't Stop Til You Drop!",
    activities: ['live music', 'food', 'camping', 'butts'],
    launchDate: new Date(),
    stops: [{}]
  };

  const location1 = {
    name: 'Test Location 1',
    address: '97209'
  };

  const attend1 = {
    attendance: 20
  };

  function postTour(data) {
    return request
      .post('/api/tours')
      .send(data)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts a tour', () => {
    return postTour(data)
      .then(tour => {
        expect(tour)
          .toMatchInlineSnapshot({
            _id: expect.any(String),
            launchDate: expect.any(String),
            stops: [{ _id: expect.any(String) }]
          },
          );
      });
  });

  // const stop1 = [
  //   {
  //     location: {
  //       latitude: 45.5266975,
  //       longitude: -122.6880503
  //     },
  //     weather: {
  //       time: new Date(),
  //       forecast: 'weather is good'
  //     },
  //     attendance: 300
  //   }
  // ];

  // function postTourWithStop(tour, stop) {
  //   return postTour(tour).then(tour => {
  //     return request
  //       .post(`/api/tours/${tour.id}/stops`)
  //       .send(stop)
  //       .expect(200)
  //       .then(({ body }) => [tour, body]);
  //   });
  // }

  it('adds a stop to a tour', () => {
    return postTourWithStop(data, stop1).then(([, stops]) => {
      expect(stops[0]).toEqual({
        ...matchMongoId,
        ...stop1,
        date: expect.any(String)
      });
    });
  });

  it('removes a stop', () => {
    return postTourWithStop(data, stop1)
      .then(([tour, stops]) => {
        return request
          .delete(`/api/tours/${tour._id}/stops/${stops[0]._id}`)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(0);
      });
  });
});
