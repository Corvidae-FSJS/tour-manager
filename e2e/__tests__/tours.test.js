jest.mock('../../lib/services/maps-api');
const request = require('../request');
const db = require('../db');
//const mongoose = require('mongoose');
//const Stop = require('../../lib/models/stop');

// const stop1 = {
//   location: {
//     latitude: 45.5266975,
//     longitude: -122.6880503
//   },
//   weather: {
//     any: 'object', //will get from weather api 
//   },
//   attendance: 420
// };

// function postStop(stop) {
//   return request
//     .post('/api/stops')
//     .send(stop)
//     .expect(200)
//     .then(({ body }) => body);
// }

describe('tours api', () => {
  beforeEach(() => {
    return Promise.all([
      db.dropCollection('tours'),
      db.dropCollection('stops'),
    ]);
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

//   it('gets a tour by id', () => {
//     return postStop(stop1)
//       .then(postedStop => {
//         data[0] = postedStop._id; 
//         console.log(data[0]);
//         return postTour(data)
//           .then(tour => {
//             return request
//               .get(`/api/tours/${tour._id}`)
//               .expect(200)
//               .then(({ body }) => {
//                 expect(body).toMatchInlineSnapshot(
//                   {
//                     _id: expect.any(String),
//                     title: expect.any(String),
//                     activities: [ 
//                       expect.any(String)
//                     ],
//                     launchDate: expect.any(String),
//                     stops: [{ 
//                       _id: expect.any(String),
//                     }]
//                   },
//                 );
//               });
//           });
//       });
//   });
// });
});