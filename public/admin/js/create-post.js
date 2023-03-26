let createForm=document.querySelector('.create-post-form');
let title=document.querySelector('#title');
let country=document.querySelector('#country');
let imageUrl=document.querySelector('#imageUrl');
let text=document.querySelector('#text');
let imageFile=document.querySelector('#image-file');
createForm.addEventListener('submit', function(e) {
      e.preventDefault();
    let createText=text.value;
    let createDes;
    if(createText.indexOf('.') === -1){
         createDes= createText;

    }
    else{
        createDes=createText.substring(0, createText.indexOf('.') + 1);
    }
    let data=new FormData();
        data.append('title',title.value);
        data.append('country',country.value);
        data.append('imageUrl',imageUrl.value);
        data.append('text',createText);
        data.append('description',createDes);
        data.append('imageFile',imageFile.files[0]);
    fetch('http://localhost:3000/posts', {
        method:'POST',
        body:data
    }).then((response) => response.text()).then((data) => window.history.go());
})

 function disableInput(input1,input2){
    if(input1.value){
        input2.disabled =true;
    }
    else{
        input2.disabled=false; 
    }
 }
 imageUrl.addEventListener('change', () => disableInput(imageUrl,imageFile));
 imageFile.addEventListener('chnage',() =>disableInput(imageFile,imageUrl));