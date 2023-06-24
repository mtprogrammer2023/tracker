export function getUser() {
    const userStr = sessionStorage.getItem('user');
    if (userStr) {
      return userStr;
    }
    return null;
  }
  
  export function getToken() {
    
      return JSON.parse(sessionStorage.getItem('token')) || null;
    
  }
  
  export function removeUserSession() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }
  
  export function setUserSession(token, user) {
     sessionStorage.setItem('token', JSON.stringify(token));
     sessionStorage.setItem('user', user);
  }