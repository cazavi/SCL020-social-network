//TEMPLATES IMPORTS
import {login} from '../src/templates/login.js';
import {register} from '../src/templates/register.js';
import {profile} from '../src/templates/profile.js';
import {publications} from '../src/templates/publications.js';
import {addPost} from '../src/templates/addPost.js';
import {editPost} from '../src/templates/editPost.js';

//FIREBASE IMPORTS
import {
  logIn, 
  redirectResult, 
  createUser,  
  signOutWithEmail, 
  signIn
} from '../src/firebase/auth.js';

import {
  readData,
  savedUser,
  createPost,
  editPost,
  time,
  deletePost,
  likePost
} from '../src/firebase/store.js';

//VARIABLES
let email = 
["cazavi97@gmail.com",
null]

let password = 
["holamundo",
null]

let post =
["title:Hola",
"description: cómo están?",
"null"]

//TEMPLATES TESTS
describe('login must return a Div', () => {
  
  test('login function', () =>{
    let create = login(email, password)
    expect(create instanceof HTMLElement).toBe(true)
  })
})

describe('register must return a Div', () => {
  
  test('register function', () =>{
    let create = register(email, password)
    expect(create instanceof HTMLElement).toBe(true)
  })
})

describe('profile must return a Div', () => {
  
  test('profile function', () =>{
    let create = profile()
    expect(create instanceof HTMLElement).toBe(true)
  })
})

describe('publications must return a Div', () => {
  
  test('publications function', () =>{
    let create = publications(post)
    expect(create instanceof HTMLElement).toBe(true)
  })
})

describe('addPost must return a Div', () => {
  
  test('addPost function', () =>{
    let create = addPost(post)
    expect(create instanceof HTMLElement).toBe(true)
  })
})

describe('editPost must return a Div', () => {
  
  test('editPost function', () =>{
    let create = editPost(post)
    expect(create instanceof HTMLElement).toBe(true)
  })
})

//FIREBASE MOCKS
//AUTH
const logIn = signInWithRedirect.fn(auth, provider).mockReturnThis();

const redirectResult = getRedirectResult.fn(auth).mockReturnThis(result);

const signInWithRed = signInWithRedirect.fn(auth, provider).mockReturnThis();

const createUser = signInWithRedirect.fn(auth, email, password).mockReturnThis(response);

const signOutWithE = signOutWithEmail.fn(auth).mockReturnThis(response);

const signIn = signIn.fn(email, password).mockReturnThis(response);

const signOutWithEmail = signOutWithEmail.fn(auth).mockReturnThis(response);

//STORE
const readData = readData.fn("Posts").mockReturnThis(dataArray);



