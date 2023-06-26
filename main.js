const myForm=document.querySelector('#my-form');
const nameInput=document.querySelector('#name');
const emailInput=document.querySelector('#email');
const msg=document.querySelector('.msg');
const userList=document.querySelector('#users');
//console.log('hi')
myForm.addEventListener('submit',onSubmit);

function onSubmit(e){
    e.preventDefault();
    if(nameInput.value==='' || emailInput.value===''){

        msg.classList.add('error');
        msg.innerHTML='Please enter all fields';
        setTimeout(() => msg.remove(),3000);

    }
    else{

        const li=document.createElement('li');
        li.appendChild(document.createTextNode(`${nameInput.value}:${emailInput.value}`));
        userList.appendChild(li);
        console.log(li)

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
