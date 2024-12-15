export function validateAndCleanLocalStorage() {
  const accessToken = localStorage.getItem('accessToken');
  const name = localStorage.getItem('name');

  if (!accessToken || accessToken === 'undefined') {
    console.warn('Invalid accessToken detected. Clearing localStorage.');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('name');
  }
}



