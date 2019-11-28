export const { SET_TEXT } = "SET_TEXT";

export const welcomeAction = (data) => {
    return {
        types: SET_TEXT,
        payload: {
            data
        }
    }
}