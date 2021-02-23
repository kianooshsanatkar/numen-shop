const USER_INITIAL_STATE = {
    user: null
}

const userActionType = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT'
}

export function userReducer(currentState = USER_INITIAL_STATE, action) {
    switch (action.type) {
        case userActionType.LOGIN:
            return {
                ...currentState,
                user: action.payload
            }
        case userActionType.LOGOUT:
            return {
                ...currentState,
                user: null
            }
        default:
            return {
                ...currentState
            }
    }
}

export function saveUserStateAction(user) {
    return {
        type: userActionType.LOGIN,
        payload: user
    }
}
function userLogoutAction() {
    return {
        type: userActionType.LOGOUT,
        payload: null
    }
}

export const mapStateToProps = (state) => ({
    user: state.user.user
})

export const mapDispatchToProps = (dispatch) => ({
    login: user => dispatch(saveUserStateAction(user)),
    logout: () => dispatch(userLogoutAction())
})