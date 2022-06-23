// //TEMPLATES IMPORTS
// import {login} from '../src/templates/login.js';
// import {register} from '../src/templates/register.js';
// import {profile} from '../src/templates/profile.js';
// import {publications} from '../src/templates/publications.js';
// import {addPost} from '../src/templates/addPost.js';
// import {editPost} from '../src/templates/editPost.js';

//FIREBASE IMPORTS
import { 
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

import {auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  addDoc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  doc, } from "../src/firebase/init.js"

//VARIABLES
let email = 
["someone@email.com",
null]

let password = 
["holamundo",
null]

let post =
["title:Hola",
"description: cómo están?",
"null"]

// //TEMPLATES TESTS
// describe('login must return a Div', () => {
  
//   test('login function', () =>{
//     let create = login(email, password)
//     expect(create instanceof HTMLElement).toBe(true)
//   })
// })

// describe('register must return a Div', () => {
  
//   test('register function', () =>{
//     let create = register(email, password)
//     expect(create instanceof HTMLElement).toBe(true)
//   })
// })

// describe('profile must return a Div', () => {
  
//   test('profile function', () =>{
//     let create = profile()
//     expect(create instanceof HTMLElement).toBe(true)
//   })
// })

// describe('publications must return a Div', () => {
  
//   test('publications function', () =>{
//     let create = publications(post)
//     expect(create instanceof HTMLElement).toBe(true)
//   })
// })

// describe('addPost must return a Div', () => {
  
//   test('addPost function', () =>{
//     let create = addPost(post)
//     expect(create instanceof HTMLElement).toBe(true)
//   })
// })

// describe('editPost must return a Div', () => {
  
//   test('editPost function', () =>{
//     let create = editPost(post)
//     expect(create instanceof HTMLElement).toBe(true)
//   })
// })

//FIREBASE MOCKS
//AUTH

// jest.mock("'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js'");
// signInWithRedirect.get.mockReturnThis(auth, provider);

jest.mock('../src/firebase/init.js', ()=> {
  return {
      auth: jest.fn(()=> { // La funcion jest.fn <- Crea una funcion interceptada por JEST
          return { auth: 'TEST' }
      }),

      signInWithEmailAndPassword: jest.fn((auth, email, password)=> {
          if(!email || !password) {
              throw new Error('ERROR')
          }

          Promise.resolve({ user: 'admin' })
      }),

      createUserWithEmailAndPassword: jest.fn((auth, email, password)=> {
        if(!email || !password) {
            throw new Error('ERROR')
        }

        Promise.resolve({ user: 'admin' })
      }),

      signOut: jest.fn((auth)=> {
        if(!auth) {
            throw new Error('ERROR')
        }

        Promise.resolve({ user: 'admin' })
      }),

      
  }
})

describe('Tests for the signIn function', ()=> {

  // toHaveBeenCalled y toHaveBennCalledWith solo sirven para funcion Mock
  it('Should call signInWithEmailAndPassword', async()=> {
      await signIn(email, password)
      // Revisamos si durante la ejecucion de login se invoco la funcion singInWithEmailAndPassword
      expect(signInWithEmailAndPassword).toHaveBeenCalled()
  })
  it('Should call signInWithEmailAndPassword with the auth, email and pass arguments', async()=> {
    await signIn(email, password)
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password)
  })

  it('Should throw an error if executed without arguments', async()=> {
      try {
          await signIn()
      } catch(error) {
          expect(error).toMatch('ERROR')
      }
  })
})

describe('Tests for the createUser function', ()=> {

  it('Should call createUserWithEmailAndPassword', async()=> {
    await createUser(auth, email, password)
    expect(createUserWithEmailAndPassword).toHaveBeenCalled()
  })

  it('Should call createUserWithEmailAndPassword with the auth, email and pass arguments', async()=> {
    await createUser(auth, email, password)
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password)
  })

  it('Should throw an error if executed without arguments', async()=> {
    try {
      await createUser()
    } catch(error) {
      expect(error).toMatch('ERROR')
    }
  })
})

describe('Tests for the signOutWithEmail function', ()=> {

  it('Should call signOut', async()=> {
    await signOutWithEmail(auth)
    expect(signOut).toHaveBeenCalled()
  })

  it('Should call signOut with the auth arguments', async()=> {
    await signOutWithEmail(auth)
    expect(signOut).toHaveBeenCalledWith(auth)
  })

  it('Should throw an error if executed without arguments', async()=> {
    try {
      await signOutWithEmail()
    } catch(error) {
      expect(error).toMatch('ERROR')
    }
  })
})

// describe('Tests for the logIn function', ()=> {

//   it('Should call signInWithRedirect', async()=> {
//     await logIn(auth, provider)
//     expect(signInWithRedirect).toHaveBeenCalled()
//   })

//   it('Should call signInWithRedirect with the auth, email and pass arguments', async()=> {
//     await logIn(auth, provider)
//     expect(signInWithRedirect).toHaveBeenCalledWith(auth, provider)
//   })

//   it('Should throw an error if executed without arguments', async()=> {
//     try {
//       await logIn()
//     } catch(error) {
//       expect(error).toMatch('ERROR')
//     }
//   })
// })

