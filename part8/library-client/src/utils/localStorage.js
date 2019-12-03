const tokenItem = 'user-token'

export const readToken = () => localStorage.getItem(tokenItem)
export const saveToken = token => localStorage.setItem(tokenItem, token)
export const clearStorage = () => localStorage.clear()