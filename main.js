const myForm=document.querySelector('#my-form');
const nameInput=document.querySelector('#name');
const emailInput=document.querySelector('#email');
const msg=document.querySelector('.msg');
const userList=document.querySelector('#users');


myForm.addEventListener('submit',onSubmit);

function onSubmit(e){
    e.preventDefault();
    if(nameInput.value==='' || emailInput.value===''){

        msg.classList.add('error');
        msg.innerHTML='Please enter all fields';
        setTimeout(() => msg.remove(),3000);

    }
    else{

        //adding the delete button
        var deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
        deleteBtn.style.width='2px'
        deleteBtn.appendChild(document.createTextNode('X'));


        //adding edit button
        var editBtn = document.createElement('button');
        editBtn.className = 'edit btn btn-sm float-right';
        editBtn.style.width = '50px';
        editBtn.appendChild(document.createTextNode('Edit'));

        const li=document.createElement('li');
        li.classList.add('lst');
        li.appendChild(document.createTextNode(`${nameInput.value}:${emailInput.value}`));
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);

        userList.appendChild(li);
        //console.log(li)

        let myObj = {
            nameObj : nameInput.value,
            emailObj : emailInput.value
        };

        let myObj_serialized = JSON.stringify(myObj);
       // localStorage.setItem(emailInput.value,myObj_serialized);
       //to store in crud and passing http request instead of local storage
       axios.post("https://crudcrud.com/api/6876f8bce5ed473aa5f7f3c0784d0ad8/AppointData",myObj)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong</h4>"
                console.error(error);
            })

          
          deleteBtn.onclick= () => {
              localStorage.removeItem(myObj.emailObj);
              userList.removeChild(li);
          }

          editBtn.onclick = () => {
            nameInput.value = myObj.nameObj;
            emailInput.value = myObj.emailObj; 
            localStorage.removeItem(myObj.emailObj);
              userList.removeChild(li);
          }

        nameInput.value='';
        emailInput.value='';

    }

}

