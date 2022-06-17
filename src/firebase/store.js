import {
  getFirestore,
  firestore,
  addDoc,
  doc,
  getDoc,
  getDocs,
  collection,
  Timestamp,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  where,
  auth

} from "./init.js";

// const docRef = doc(firestore, "cities", "SF");
// const docSnap = await getDoc(docRef);

const readData = async function () {
  let dataArray = [];
  const querySnapshot = await getDocs(collection(firestore, "Posts"));
  querySnapshot.forEach((doc) => { 
    dataArray.push({ id: doc.id, data: doc.data() });
  });
  for (let i = 0; i < dataArray.length; i++) {
    const element = dataArray[i];
    let snap = await getDocs(collection(firestore, "Posts", element.id, 'likes'));
    let likes = 0;
    let id = []
    snap.forEach( child =>{ 
      console.log(child.data(), 'data')
      id.push(child.id)
      likes += Object.values(child.data()).length;
    }) 

    element.likes = likes;
    if(id.includes(auth.currentUser.uid)){
      element.activeLike = true
    }
    else{
      element.activeLike = false
    }

    
  } 
  console.log('lista', dataArray)
  return dataArray;
};

// guarda los usuarios registrados
// firestore genera automáticamente el id
const savedUser = async (email, uid) => {
  await addDoc(collection(firestore, "user"), {
    email,
    uid,
  });
};

//DATA TYPE
const docData = {
  stringExample: "Hello world!",
  booleanExample: true,
  numberExample: 3.14159265,
  dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
  arrayExample: [5, true, "hello"],
  nullExample: null,
  objectExample: {
    a: 5,
    b: {
      nested: "foo",
    },
  },
};

// Add a new document with a generated id.
const createPost = async (title, description) => {
  console.log("ingresé");
  const docRef = await addDoc(collection(firestore, "Posts"), {
    title: title,
    description: description,
  });
  console.log("Document written with ID: ", docRef.id);
};

// Set the "capital" field of the city 'DC'-DOC UPDATE
const editPost = async (title, description) => {
  await updateDoc(docRef, {
    title: true,
    description: true,
  });
};

// Update the timestamp field with the value from the server
const time = async (timestamp) => {
  const updateTimestamp = await updateDoc(docRef, {
    timestamp: serverTimestamp(),
  });
};

//DELETE POST

// const deletePost = async function (id) {
//   // const querySnapshot = await getDoc(doc.id);
//   // querySnapshot((doc) => {
//   //   doc.deleteDoc(doc(firestore, "Posts", "id"));
//   // });
//   const deleteRef = await doc(firestore, "Posts", id);
//   await deleteDoc(deleteRef);
//   // return dataArray;
// };

const deletePost = async (id) => {
  try {
    await deleteDoc(doc(firestore, "Posts", id));
    console.log("Doc deleted");
  } catch (error) {
    console.log(error);
    throw error.message;
  }
};

const likePost = async (id, idUser) => { 
  // Busca el like
  const ref = await  doc(firestore, "Posts", id , "likes" , idUser);
  try {
    const snap = await getDoc(ref) 
    if (snap.exists()) { 
      // Quitar el like
      await deleteDoc(doc(firestore, "Posts", id, 'likes',idUser));
      document.getElementById(`${id}__like`).src = "./assets/dislike.png";
    }
    else{
      // Agregar el like
      const collectionRef = await doc(firestore, "Posts", id, "likes", idUser);
      console.log(collectionRef, "collectionRef");
      const likeRef = await setDoc(collectionRef, { id: idUser });
      document.getElementById(`${id}__like`).src = "./assets/like.png";
    }
 
  } catch (e) {
    throw e.message;
  }
};

export {
  readData,
  savedUser,
  createPost,
  editPost,
  time,
  deletePost,
  likePost,
};
