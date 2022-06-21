// import { root } from './router/router.js';// Este es el punto de entrada de tu aplicación

import { navigate } from "./router/routes.js";

// navigate("login");
  
const path = window.location.pathname;
switch (path) {
  case "/":
    navigate("login");
    break;
  case "/publications":
    navigate("publications");
    break;
  case "/profile":
    navigate("profile");
    break;
  case "/addPost":
    navigate("addPost");
    break; 
  case "/updatePost":
    let substr =  window.location.search.substr(1)
    navigate("updatePost", substr);
    break; 
  default:
    navigate("login");
    break;
}
 