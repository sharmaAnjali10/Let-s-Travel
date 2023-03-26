// const { response } = require("express");

async function getPosts(){
 return await fetch('http://localhost:3000/posts')
 .then((response) => response.json())
 .then((data) =>data);
}
async function getCallbackRequests(){
    return await fetch('http://localhost:3000/callback-requests')
    .then((response) => response.json())
    .then((data) =>data);
   }


   async function getEmails(){
    return await fetch('http://localhost:3000/emails')
    .then((response) => response.json())
    .then((data) =>data);
   }
document.addEventListener('DOMContentLoaded', async function(){
 
     addPosts();
     addCallbackRequests();
     addEmails();



    //CREATE POST
    let addPostBtn=document.querySelector('.add-post');
    let createPost=document.querySelector('#v-pills-add-post-tab');
    addPostBtn.addEventListener('click',() => createPost.click());


    
})
async function addPosts(){
    let posts = await getPosts();
     let articles=document.querySelector('.articles-list tbody');
     articles.innerHtml = ' ';
     let i=1;
   posts.forEach((post) =>{
      let postHTML=
         `
         <tr>
                             <td>${i++}<input class="id" type="hidden" value="${post.id}"></td>
                             <td class="title">${post.title}</td>
                             <td class="date">${post.date}</td>
                             <td class="country">${post.country}</td>
                             <td><button class="edit-btn btn btn-link p-0 text-decoration-none" onclick = "editPost('${post.id}')">Edit</button></td>
                         <td><button onclick = "remove('${post.id}')" class="remove-btn btn btn-link p-0 text-decoration-none">X</button></td>
                       </tr>
       `;
        articles.insertAdjacentHTML('beforeend',postHTML);
    
    
    
})
}



async function addCallbackRequests(){
    let requests = await getCallbackRequests();
     let requestsBlock=document.querySelector('#v-pills-requests tbody');
     requestsBlock.innerHtml = ' ';
     let i=1;
     requests.forEach((request) =>{
      let requestHTML=
         `
         <tr>
                             <td>${i++}<input class="id" type="hidden" value="${request.id}"></td>
                             <td class="title">${request.phoneNumber}</td>
                             <td class="date">${request.date}</td>
                         <td><button onclick = "rem('${request.id}')"class="remove-btn btn btn-link p-0 text-decoration-none">X</button></td>
                       </tr>
       `;
       requestsBlock.insertAdjacentHTML('beforeend',requestHTML);
    
    
    
})
}

let requestBlock = document.querySelector('#v-pills-requests');

// let updateBtn = document.querySelector('#v-pills-update-post-tab');



function rem(id){
       console.log(id)
       fetch('http://localhost:3000/callback-requests/' + id, {
              method:'DELETE'
  
          }).then((response) => response.text()) 
          .then(() => window.history.go())
          .catch(e=>{

                 console.log(e);
          });
         }
         
async function addEmails(){
            let emails = await getEmails();
             let emailsBlock=document.querySelector('#v-pills-mails tbody');
             emailsBlock.innerHtml = ' ';
             let i=1;
             emails.forEach((email) =>{
              let emailHTML=
                 `
                 <tr>
                                     <td>${i++}<input class="id" type="hidden" value="${email.id}"></td>
                                     <td class="name">${email.name}</td>
                                     <td class="email">${email.email}</td>
                                     <td class="date">${email.date}</td>
                                     
                                 <td><button onclick = "rem('${email.id}')"class="remove-btn btn btn-link p-0 text-decoration-none">X</button></td>
                                 
                                 </tr>
                                 <tr>
                                 <td colspan="5" class="text">${email.text}</td>
                                 </tr>

               `;
               emailsBlock.insertAdjacentHTML('beforeend',emailHTML);
            
            
            
        })
        }

        let emailsBlock = document.querySelector('#v-pills-mails');

        function rem(id){
            console.log(id)
            fetch('http://localhost:3000/emails/' + id, {
                   method:'DELETE'
       
               }).then((response) => response.text()) 
               .then(() => window.history.go())
               .catch(e=>{
     
                      console.log(e);
               });
              }
              

let logOutBtn= document.querySelector('.log-out-btn');
logOutBtn.addEventListener('click', function(){
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    window.location.href='/';
})
        
