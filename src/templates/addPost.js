import { auth } from "../firebase/init.js";
import { createPost } from "../firebase/store.js";
import { navigate } from "../router/routes.js";
import { signOutWithEmail } from "../firebase/auth.js";

function addPost() {
  const html =//html
    `
<div class="background-white">
    <div class="bar">
      <div id="navMenu">
        <div>
          <h4> PlantGram <img src="./assets/flower.png"></h4>
          <ul>
              <li><a href='#' id='linkProfile'> MI PERFIL </a></li>
              <li><a href='#' id='linkPublic'> PUBLICACIONES </a></li>
          </ul>
        </div>
        <ul class="logOutList">
          <li>
            <a href='#' id='signOut'> Cerrar sesión </a>
          </li>
        </ul>
      </div>
      <h5>PlantGram</h5>
    </div>
    <div class="dashboard">
        <h2>NUEVO POST</h2>
  
        <div class="newPost">
        </div>      
        <div class="action-buttons">
          <a class="cancelButton" href="/publications"> Cancelar </a>
          <button id="addNewPost">Agregar nuevo post</button>
        </div>
    </div>
</div>`;
  const container = document.createElement("div");
  container.innerHTML = html;
//  ACTIVE MENU
  const linkProfile = container.querySelector("#linkProfile");
  linkProfile.addEventListener("click", (event) => {
    event.preventDefault();
    navigate("profile");
  });
  const linkPublic = container.querySelector("#linkPublic");
  linkPublic.addEventListener("click", (event) => {
    event.preventDefault();
    navigate("publications");
  });

  //SIGN OUT WITH EMAIL
  const signOut = container.querySelector("#signOut");
  signOut.addEventListener("click", async () => {
    try {
      await signOutWithEmail(auth);
      navigate("login"); 
    } catch (error) {
      throw error.message;
    }
  });
  // CREATE NEW POST
  const writePost = container.querySelector(".newPost");
  const setupPosts = async() => {
    // let post= await createPost()
    // console.log(data);
      let html= '';
        const ul = //html 
        `
          <div class="newPostList"> 
            <label>Ingresa el título de post</label>
            <input id="newPostTitle"/>
            <label>Escribe el contenido de tu post aquí</label>
            <textarea id="newPostDescription"></textarea>
          </div>
        `;
        html += ul;
      writePost.innerHTML = html;
    }
  setupPosts()
  

  const addPost = container.querySelector("#addNewPost");
  if (addPost){
    addPost.addEventListener("click", function() {
      const title = container.querySelector("#newPostTitle").value;
      const description = container.querySelector("#newPostDescription").value;
      if (title && description) {
        createPost(title, description); 
        setTimeout( () =>{
          window.location.href = "/publications"
        }, 1000)
      } else if(!title) {
        alert('Debe ingresar un título para el post');
      } else if(!description){
        alert('Debe ingresar un contenido para el post');
      } else{
        alert('Algo no está bien, inténtalo nuevamente');
      }
  })}

  return container;
}; 
export { addPost };

