import axios from 'axios';

export function getBooks() {
  return new Promise(resolve => {
    axios.get('http://localhost:3000/books').then(res => {
      if (res && res.data && res.data.books) {
        resolve(res.data.books);
      }
    });
  });
}
