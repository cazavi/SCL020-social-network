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
  getPost,
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
  doc,
  firestore,
  collection, } from "../src/firebase/init.js"

//VARIABLES
let email = 
["someone@email.com",
null]

let password = 
["holamundo",
null]

let title =
["Hola",
null]

let description =
[ "cómo están?",
null]

let id =
["JFGm1sEccVhKgv2WUi0C",
null]

let uid =
["cOxlnGlDwkaMxw04gATB0XSomFW2",
null]

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

      collection: jest.fn(),

      doc: jest.fn(),

      getDocs: jest.fn((collection)=> {
        if(!collection) {
            throw new Error('ERROR')
        }

        Promise.resolve({ user: 'admin' })
      }),

      addDoc: jest.fn((email, uid)=> {
        if(!email || !uid ) {
            throw new Error('ERROR')
        }

        Promise.resolve({ user: 'admin' })
      }),

      addDoc: jest.fn((title, description)=> {
        if(!title || !description ) {
            throw new Error('ERROR')
        }

        Promise.resolve({ user: 'admin' })
      }),

      getDoc: jest.fn((id)=> {
        if(!id) {
            throw new Error('ERROR')
        }

        Promise.resolve({ user: 'admin' })
      }),

      updateDoc: jest.fn((id, title, description)=> {
        if(!id || !title || !description) {
            throw new Error('ERROR')
        }

        Promise.resolve({ user: 'admin' })
      }),

      deleteDoc: jest.fn((id)=> {
        if(!id) {
            throw new Error('ERROR')
        }

        Promise.resolve({ user: 'admin' })
      }),

  }
})

//AUTH TESTS
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

//STORE TESTS
describe('Tests for the readData function', ()=> {

  it('Should call getDocs', async()=> {
    await readData(collection)
    expect(getDocs).toHaveBeenCalled()
  })

  it('Should call getDocs with the collection arguments', async()=> {
    await readData(collection)
    expect(getDocs).toHaveBeenCalledWith(collection)
  })

  it('Should throw an error if executed without arguments', async()=> {
    try {
      await readData()
    } catch(error) {
      expect(error).toMatch('ERROR')
    }
  })
})

describe('Tests for the savedUser function', ()=> {

  it('Should call addDoc', async()=> {
    await savedUser(email, uid)
    expect(addDoc).toHaveBeenCalled()
  })

  it('Should call addDoc with the email and uid arguments', async()=> {
    await savedUser(email, uid)
    expect(addDoc).toHaveBeenCalledWith(email, uid)
  })

  it('Should throw an error if executed without arguments', async()=> {
    try {
      await savedUser()
    } catch(error) {
      expect(error).toMatch('ERROR')
    }
  })
})

describe('Tests for the createPost function', ()=> {

  it('Should call addDoc', async()=> {
    await createPost(title, description)
    expect(addDoc).toHaveBeenCalled()
  })

  it('Should call addDoc with title and description arguments', async()=> {
    await createPost(title, description)
    expect(addDoc).toHaveBeenCalledWith(title, description)
  })

  it('Should throw an error if executed without arguments', async()=> {
    try {
      await createPost()
    } catch(error) {
      expect(error).toMatch('ERROR')
    }
  })
})

describe('Tests for the getPost function', ()=> {

  it('Should call getDoc', async()=> {
    await getPost(id)
    expect(getDoc).toHaveBeenCalled()
  })

  it('Should call getDoc with title and description arguments', async()=> {
    await getPost(id)
    expect(getDoc).toHaveBeenCalledWith(id)
  })

  it('Should throw an error if executed without arguments', async()=> {
    try {
      await getPost()
    } catch(error) {
      expect(error).toMatch('ERROR')
    }
  })
})

describe('Tests for the editPost function', ()=> {

  it('Should call updateDoc', async()=> {
    await editPost(id, title, description)
    expect(updateDoc).toHaveBeenCalled()
  })

  it('Should call updateDoc with id, title and description arguments', async()=> {
    await editPost(id, title, description)
    expect(updateDoc).toHaveBeenCalledWith(id)
  })

  it('Should throw an error if executed without arguments', async()=> {
    try {
      await editPost()
    } catch(error) {
      expect(error).toMatch('ERROR')
    }
  })
})

describe('Tests for the deletePost function', ()=> {

  it('Should call deleteDoc', async()=> {
    await deletePost(id)
    expect(deleteDoc).toHaveBeenCalled()
  })

  it('Should call deleteDoc with id', async()=> {
    await deletePost(id)
    expect(deleteDoc).toHaveBeenCalledWith(id)
  })

  it('Should throw an error if executed without arguments', async()=> {
    try {
      await deletePost()
    } catch(error) {
      expect(error).toMatch('ERROR')
    }
  })
})

describe('Tests for the likePost function', ()=> {

  it('Should call doc', async()=> {
    await likePost(id, uid)
    expect(doc).toHaveBeenCalled()
  })

  it('Should call doc with id', async()=> {
    await likePost(id, uid)
    expect(doc).toHaveBeenCalledWith(id, uid)
  })

  it('Should throw an error if executed without arguments', async()=> {
    try {
      await likePost()
    } catch(error) {
      expect(error).toMatch('ERROR')
    }
  })
})