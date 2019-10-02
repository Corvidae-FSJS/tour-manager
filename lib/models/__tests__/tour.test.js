const Tour = require('../tour');

describe('Tour model', () => {

  it('validates all model properties', () => {
    const tour1 = {
      title: 'Don\'t Stop Til You Drop!',
      activities: ['live music', 'food', 'camping', 'butts'],
      launchDate: new Date(),
      stops: [{
        location: {
          latitude: 45.5266975,
          longitude: -122.6880503
        },
        weather: { 
          time: new Date(),
          forecast: 'weather is good'
        },
        attendance: 300
      }]
    };

    const tour = new Tour(tour1);
    const errors = tour.validateSync();
    expect(errors).toBeUndefined();

    const json = tour.toJSON();

    expect(json).toEqual({
      _id: expect.any(Object),
      ...tour1,
      stops: [{
        _id: expect.any(Object),
        ...tour1.stops[0]
      }]
    });
  });
});