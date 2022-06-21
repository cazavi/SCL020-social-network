import { login } from '../templates/login.js';
import { profile } from '../templates/profile.js';
import { register } from '../templates/register.js';
import { publications } from '../templates/publications.js'; 
import { addPost } from '../templates/addPost.js';
import { updatePost } from '../templates/updatePost.js';

const routes = {
  login: {
    path: '/',
    template: login(),
  },
  register: {
    path: '/register',
    template: register(),
  },
  publications: {
    path: '/publications',
    template: publications(),
  },
  profile: {
    path: '/profile',
    template: profile(),
  }, 
  addPost: {
    path: '/addPost',
    template: addPost(),
  },
  updatePost: {
    path: '/updatePost',
    dinamic: true,
    template: updatePost(),
  }
};

function navigate(route, substr = "") {
  const template = routes[route].template;
  const path = routes[route].path; 
  history.pushState({}, route, `${path}?${substr}`);
  const root = document.getElementById('root');
  root.innerHTML = ' ';
  root.appendChild(template);
  // console.log(template);
}

export { navigate };
