import { actions, setFavorite, loginRequest, logoutRequest } from '../index';
import movieMock from '../../__mocks__/movieMock';

describe('Actions Test', () => {
  it('It should create and action to setFavorite', () => {
    const payload = movieMock;
    const expected = {
      type: actions.setFavorites,
      payload,
    };
    expect(setFavorite(payload)).toEqual(expected);
  });

  it('It should create and action to loginRequest', () => {
    const payload = {
      email: 'test@test.com',
      password: 'thisisnotasecuredpassword',
    };
    const expected = {
      type: actions.loginRequest,
      payload,
    };
    expect(loginRequest(payload)).toEqual(expected);
  });

  it('It should create and action to logoutRequest', () => {
    const expected = {
      type: actions.logoutRequest,
    };
    expect(logoutRequest()).toEqual(expected);
  });
});
