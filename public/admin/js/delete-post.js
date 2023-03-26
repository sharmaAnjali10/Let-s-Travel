
let articlesBlock = document.querySelector('.articles-list');

let updateBtn = document.querySelector('#v-pills-update-post-tab');


function remove(id){
       console.log(id)
       fetch('http://localhost:3000/posts/' + id, {
              method:'DELETE'
  
          }).then((response) => response.text()) 
          .then(() => window.history.go())
          .catch(e=>{

                 console.log(e);
          });
         } 

       