import { auth } from '../firebase/init.js';
import { readData, deletePost, likePost } from '../firebase/store.js';
// eslint-disable-next-line import/no-cycle
import { navigate } from '../router/routes.js';
import { signOutWithEmail } from '../firebase/auth.js';

function publications() {
  // eslint-disable-next-line operator-linebreak
  const html =
    // html
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
        <button id="btnCreatePost">Nuevo post</button>
        <div class="createPost">
          
        </div>
    </div>
</div>`;
  const container = document.createElement('div');
  container.innerHTML = html;
  //  ACTIVE MENU
  const linkProfile = container.querySelector('#linkProfile');
  linkProfile.addEventListener('click', (event) => {
    event.preventDefault();
    navigate('profile');
  });
  const linkPublic = container.querySelector('#linkPublic');
  linkPublic.addEventListener('click', (event) => {
    event.preventDefault();
    navigate('publications');
  });
  // SIGN OUT WITH EMAIL
  const signOut = container.querySelector('#signOut');
  signOut.addEventListener('click', async () => {
    try {
      await signOutWithEmail(auth);
      navigate('login');
    } catch (error) {
      throw error.message;
    }
  });
  // DISPLAY POSTS WITH LIKES
  const postList = container.querySelector('.createPost');
  const setupPosts = async () => {
    const data = await readData();
    if (data) {
      let html = '';
      data.forEach((doc) => {
        const post = doc.data;
        let activeLike = '';
        const imageTemp = 'https://st.depositphotos.com/1743476/1262/i/450/depositphotos_12621249-stock-photo-new-life.jpg';
        if (doc.activeLike) {
          activeLike = `<img id="${doc.id}__like" width="25" src="./assets/like.png">`;
        } else {
          activeLike = `<img id="${doc.id}__like" width="25" src="./assets/dislike.png">`;
        }

        const likes = doc.likes || 0;
        const ul =
          // html
          `
          <div class="postList">
            <h3 class="postTitle"> ${post.title} </h3>
            <p class="postBody"> ${post.description} </p>
            <img width="400" src="${post.image ? post.image : imageTemp}">
            <div class="postLikes">
            
            <div class="modal" data-animation="modalAnimation" id="modal1">
              <div class="modal-dialog">
                <header class="modal-header">
                ELIMINAR POST
                </header>
                <section class="modal-content">¿De verdad quieres eliminar este post?</section>
                <footer class="modal-footer">
                <button class="btnDeletePost" id="${doc.id}">Eliminar</button>
                <button class="close-modal" aria-label="close modal" data-close>Cancelar</button>
                </footer>
              </div>
            </div> 
            <div class="like"> 
              <span>
                ${likes}
              </span>
              <picture class="toggleLike"  id="${doc.id}">
                ${activeLike}
              </picture>
            </div>
            <a class="btnUpdatePost" id="${doc.id}" href="/updatePost?id=${doc.id}"><img width="18" class="editButton" src="../assets/edit.png"></a>
            <button  class="open-modal btnDeletePost" data-open="modal1" class="btnDeletePost" id="${doc.id}"><img width="20" class="deleteButton" src="../assets/delete.png"></button>
            </div>
          </div>
        `;
        html += ul;
      });
      postList.innerHTML = html;
      const openEls = container.querySelectorAll('[data-open]');
      const closeEls = container.querySelectorAll('[data-close]');
      const isVisible = 'is-visible';
      // eslint-disable-next-line no-restricted-syntax
      for (const el of openEls) {
        // eslint-disable-next-line func-names
        el.addEventListener('click', function () {
          const modalId = this.dataset.open;
          document.getElementById(modalId).classList.add(isVisible);
        });
      }
      const btnDeletePost = container.querySelectorAll('.btnDeletePost');
      btnDeletePost.forEach((btnDelete) => {
      btnDelete.addEventListener("click", function (event) {
        deletePost(btnDelete.id);
          // navigate('');
        });
      });
      // eslint-disable-next-line no-restricted-syntax
      for (const el of closeEls) {
        // eslint-disable-next-line func-names
        el.addEventListener('click', function () {
          this.parentElement.parentElement.parentElement.classList.remove(
            isVisible,
          );
        });
      }

      // BUTTON UPDATE
      const btnUpdatePost = container.querySelectorAll('.btnUpdatePost');
      btnUpdatePost.forEach((btnUpdate) => {
        btnUpdate.addEventListener('click', (event) => {
          const btnUpdate = window.location.pathname;
          if (btnUpdate) {
            navigate('updatePost');
          }
        });
      });
      // BUTTON LIKE FUNCTIONALITY
      const toggleLike = container.querySelectorAll('.toggleLike');
      toggleLike.forEach((child) => {
        // eslint-disable-next-line func-names
        child.addEventListener('click', function () {
          likePost(this.id, auth.currentUser.uid);
          setupPosts();
        });
      });
    } else {
      postList.innerHTML = '<p>Ingresa para ver tus posts</p>';
    }
  };
  setupPosts();
  // BUTTON ADD NEW POST
  const addPost = container.querySelector('#btnCreatePost');
  if (addPost) {
    addPost.addEventListener('click', () => {
      navigate('addPost');
    });
  }
  return container;
}
export { publications };
