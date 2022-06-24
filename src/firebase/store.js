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
  auth,
} from "./init.js";

const readData = async  () => {
  try{
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
    if(id.includes(auth.currentUser.idUser)){
      element.activeLike = true
    }
    else{
      element.activeLike = false
    }
  } 
  console.log('lista', dataArray)
  return dataArray;
  }
  catch (error){
    throw error.message
  }
};

// guarda los usuarios registrados
// firestore genera automáticamente el id
const savedUser = async (email, uid) => {
  try{
    await addDoc(collection(firestore, "user"), {
    email,
    uid,
  })}
  catch (error){
    throw error.message
  }
};

//DATA TYPE
// const docData = {
//   stringExample: "Hello world!",
//   booleanExample: true,
//   numberExample: 3.14159265,
//   dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
//   arrayExample: [5, true, "hello"],
//   nullExample: null,
//   objectExample: {
//     a: 5,
//     b: {
//       nested: "foo",
//     },
//   },
// };

// Add a new document with a generated id.
const createPost = async (title, description) => {
  // console.log("creando post");
  try{
    const docRef = await addDoc(collection(firestore, "Posts"), {
    title: title,
    description: description,
  })}
  catch (error){
  throw error.message
}
  // console.log("Document written with ID: ", docRef.id);
};

// obtener el post que se va a editar
const getPost = async (id) => {
  try {
    const docRef = doc(firestore, 'Posts', id);
    const postResult = await getDoc(docRef);
    return postResult.data();
  } catch (error) {
    throw error.message;
  }

}                                                                                                                                                                                                         

// editar el post que se va a editar
const editPost = async (id, title, description) => {
  const docRef = doc(firestore, 'Posts', id)
  try{
    await updateDoc(docRef, {
    title,
    description,
  })}
  catch (error){
    throw error.message
  }
};

// Update the timestamp field with the value from the server
const time = async (timestamp) => {
  try{
    const updateTimestamp = await updateDoc(docRef, {
    timestamp: serverTimestamp(),
  })}
  catch (error){
    throw error.message
  }
};

//DELETE POST
const deletePost = async (id) => {
  try {
    await deleteDoc(doc(firestore, "Posts", id));
    console.log("Doc deleted");
  } catch (error) {
    console.log(error);
    throw error.message;
  }
};


const likePost = async (id, uid) => { 
  // Busca el like
  const ref = await  doc(firestore, "Posts", id , "likes" , uid);
  try {
    const snap = await getDoc(ref) 
    if (snap.exists()) { 
      // Quitar el like
      await deleteDoc(doc(firestore, "Posts", id, 'likes',uid));
      document.getElementById(`${id}__like`).src = "./assets/dislike.png";
    }
    else{
      // Agregar el like
      const collectionRef = await doc(firestore, "Posts", id, "likes", uid);
      console.log(collectionRef, "collectionRef");
      const likeRef = await setDoc(collectionRef, { id: uid });
      document.getElementById(`${id}__like`).src = "./assets/like.png";
    }
  } catch (error) {
    throw error.message;
  }
};

export {
  readData,
  savedUser,
  createPost,
  getPost,
  editPost,
  time,
  deletePost,
  likePost,
};
