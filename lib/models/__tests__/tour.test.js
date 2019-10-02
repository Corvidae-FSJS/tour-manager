const Tour = require('../tour');

describe('Tour model', () => {

  it('validates all model properties', () => {
    const data = {
      title: 'Don\'t Stop Til You Drop!',
      activities: ['live music', 'food', 'camping', 'butts'],
      launchDate: new Date(),
      stops: [{
        location: {
          latitude: 45,
          longitude: -122
        },
        weather: { 
          time: new Date(),
          forecast: 'weather is good'
        },
        attendance: 300
      }]
    };

    const tour = new Tour(data);
    const errors = tour.validateSync();
    expect(errors).toBeUndefined();

    const json = tour.toJSON();

    expect(json).toEqual({
      _id: expect.any(Object),
      ...data,
      stops: [{
        _id: expect.any(Object),
        ...data.stops[0]
      }]
    });
  });
});