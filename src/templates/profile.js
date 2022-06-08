import { navigate } from "../router/routes.js";

function profile() {
  const html = //html
    `
    <div class="background-white">
    <div class="bar">
      <div id="navMenu">
        <h4> PlantGram <img src="./assets/flower (1).png"></h4>
        <ul>
          <li><a href='#' id='linkNews'> NOTICIAS </a></li>
          <li><a href='#' id='linkProfile'> MI PERFIL </a></li>
          <li><a href='#' id='linkGroups'> GRUPOS </a></li>
          <li><a href='#' id='linkPublic'> PUBLICACIONES </a></li>
        </ul>
      </div>
      <h5>PlantGram</h5>
    </div>
    <div class="image-perfil">
      <img src="assets/perfil.jpg" id="img-perfil" alt="">
    </div>
    <div class="profileName">
      <h3 id="nameProfile">Nombre del usuario</h3>
      <h4 id="emailProfile">correo@email.com</h4>
    </div>
    <div class="profileData">
      <p>Mis Intereses</p>
      <hr>
      <p>Mis Plantas</p>
      <hr>
      <p>Mis Grupos</p>
      <hr>
      <p>Mis Likes</p>
      <hr>
    </div>
  </div>
  </div>
`;
  const container = document.createElement("div");
  container.innerHTML = html;
  const linkNews = container.querySelector("#linkNews");
  linkNews.addEventListener("click", (event) => {
    event.preventDefault();
    navigate("news");
  });
  const linkProfile = container.querySelector("#linkProfile");
  linkProfile.addEventListener("click", (event) => {
    event.preventDefault();
    navigate("profile");
  });
  const linkGroups = container.querySelector("#linkGroups");
  linkGroups.addEventListener("click", (event) => {
    event.preventDefault();
    navigate("groups");
  });
  const linkPublic = container.querySelector("#linkPublic");
  linkPublic.addEventListener("click", (event) => {
    event.preventDefault();
    navigate("publications");
  });
  return container;
}

export { profile };