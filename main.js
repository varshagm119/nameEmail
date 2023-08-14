const myForm=document.querySelector('#my-form');
const nameInput=document.querySelector('#name');
const emailInput=document.querySelector('#email');
const msg=document.querySelector('.msg');
const userList=document.querySelector('#users');
const submitBtn = document.querySelector('#submit');



window.addEventListener("DOMContentLoaded", () => {
    
    axios.get("https://crudcrud.com/api/6876f8bce5ed473aa5f7f3c0784d0ad8/AppointData")
         .then((res) => {
            console.log(res);
            for(var i=0; i<res.data.length;i++){
                showUserOnScreen(res.data[i]);
            }
         })
});




myForm.addEventListener('submit',onSubmit);


function onSubmit(e){
    e.preventDefault();
    if(nameInput.value==='' || emailInput.value===''){

        msg.classList.add('error');
        msg.innerHTML='Please enter all fields';
        setTimeout(() => msg.remove(),3000);

    }
    else{

        let myObj = {
            nameObj : nameInput.value,
            emailObj : emailInput.value
        };
        console.log(e);
        
        axios.post("https://crudcrud.com/api/6876f8bce5ed473aa5f7f3c0784d0ad8/AppointData",myObj)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong</h4>"
                console.log(error);
            })
        showUserOnScreen(myObj);
        nameInput.value='';
        emailInput.value='';
    }

}

function showUserOnScreen(user){
  //  console.log(user._id)
    let parentNode = document.querySelector('#users');
    let childHTML = `<li id=${user.emailObj}>${user.nameObj}--${user.emailObj}<button onclick = deleteUser('${user._id}','${user.emailObj}')>Delete</button><button onclick = editUser('${user.nameObj}','${user.emailObj}','${user._id}')>Edit</button></li>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
};

function deleteUser(id,email){
    let parentNode = document.querySelector('#users');
    let childToBeRemoved = document.getElementById(email);
    parentNode.removeChild(childToBeRemoved);
    axios.delete(`https://crudcrud.com/api/6876f8bce5ed473aa5f7f3c0784d0ad8/AppointData/${id}`)
         .then()
         .catch(err => console.log(err))
};

function editUser(name, email, id){
    nameInput.value = name;
    emailInput.value = email;
    deleteUser(id,email);
    // submitBtn.onSubmit = () =>{
    //     let myObj = {
    //         nameObj : nameInput.value,
    //         emailObj : emailInput.value
    //     };
    //     showUserOnScreen(myObj);
    //     axios.put(`https://crudcrud.com/api/6876f8bce5ed473aa5f7f3c0784d0ad8/AppointData/${id}`,myObj)
    //          .then()
    //          .catch(err => {
    //             console.log(err);
    //          })
    // }
};


