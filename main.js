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



        const li=document.createElement('li');
        li.classList.add('lst');
        li.appendChild(document.createTextNode(`${nameInput.value}:${emailInput.value}`));
        li.appendChild(deleteBtn);

        userList.appendChild(li);
        //console.log(li)

        let myObj = {
            nameObj : nameInput.value,
            emailObj : emailInput.value
        };

        let myObj_serialized = JSON.stringify(myObj);
        localStorage.setItem(emailInput.value,myObj_serialized);




        nameInput.value='';
        emailInput.value=''
    }

}

userList.addEventListener('click',delFunc);

function delFunc(e){
    e.preventDefault();
    if(e.target.classList.contains('delete')){
        var li = e.target.parentElement;
        userList.removeChild(li);

        localStorage.removeItem(emailInput.value);
    }
}
