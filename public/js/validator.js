window.onload = function(){

    // Capturar los elementos a validar por front-end
    let form = document.querySelector('.form')
    

    // Validaciones del formulario
    form.firstName.focus();

    form.addEventListener('submit', (e) =>{

        let errors = [];

    let firstName = document.querySelector('#firstName');
    let lastName = document.querySelector('#lastName');
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');
    let repassword = document.querySelector('#repassword');
    let image = document.querySelector('#image');

    // Validamos Nombre -> Obligatorio y tener al menos 2 caracteres
    if (firstName.value == '' || firstName.value.length < 3) {
        errors.push('El campo Nombre no puede estar vacío y debe contener mas de 2 caracteres');
        firstName.classList.add('is-invalid');
    } else{
        firstName.classList.add('is-valid');
        firstName.classList.remove('is-invalid');
        form.lastName.focus();
    };


        // Control de errores, si hay imprimir sino submit
        if (errors.length > 0 ){
        e.preventDefault();
        
        let ulErrors = document.querySelector('.errores');
        ulErrors.classList.add('alert-warning');
        ulErrors.innerHTML = '';
        
        for(let i= 0; i < errors.length; i++){
            ulErrors.innerHTML += `<li> ${errors[i]}  </li>`;
        };

        } else {
            alert('Validación exitosa');
            form.submit();
        }   
    });
}