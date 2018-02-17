import authReducer from '../../reducers/auth';

test('should login', () => {
    const action = { type: 'LOGIN', uid: '123456' };
    const state = authReducer({}, action);
    expect(state.uid).toBe(action.uid)
});

test('should logout', () => {
    const action = { type: 'LOGOUT' };
    const initialState = { uid: '123456' };
    const state = authReducer(initialState, action);
    expect(state).toEqual({});
});