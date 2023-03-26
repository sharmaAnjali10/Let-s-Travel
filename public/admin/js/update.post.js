const { response } = require("express");

let articlesBlock = document.querySelector('.articles-list');
let updateBtn = document.querySelector('#v-pills-update-post');
let updateForm=document.querySelector('.update-post-form');
let titleInp = document.querySelector('#update-title');
let textArea = document.querySelector('#update-text');
   
// articlesBlock.addEventListener('click', function(e){
//        if(e.target.classList.contains('.edit-btn')){
//         updateBtn.click();
//        }    
// })


let updateFrm=document.querySelector('.v-pills-update-post');
updateBtn.addEventListener('click',() =>updateFrm.click());
   
 articlesBlock.addEventListener('click',async function editPost(id){

       let postInfo = await fetch('http://localhost:3000/posts/' + id)
       .then((response) => response.json())
       .then((data) => data)
       titleInp.value = postInfo.title;
       textArea.value = postInfo.text;


       updateBtn.click();
})

updateForm.addEventListener('submit' , function(e){
     e.preventDefault();
     fetch('http://localhost:3000/posts/' +id , {
       method:'PUT',
       headers:{
              'Content-Type':'application/json'
       },
       body:JSON.stringify({
              title: titleInp.value,
              text: textArea.value
       })
     }).then((resp) => resp.text()).then(() => window.history.go());
      
})
