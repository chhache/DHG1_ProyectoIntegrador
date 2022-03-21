window.onload = function(){

    // Capturar los elementos a validar por front-end
    let form = document.querySelector('.form')
    

    // Validaciones del formulario
    form.first_name.focus();

    form.addEventListener('submit', (e) =>{

        let errors = [];

        let first_name = document.querySelector('#first_name');
        let last_name = document.querySelector('#last_name');
        let email = document.querySelector('#email');
        let password = document.querySelector('#password');
        let repassword = document.querySelector('#repassword');
        let image = document.querySelector('#image');

        // Validamos Nombre -> Obligatorio y tener al menos 2 caracteres
        if (first_name.value == '' || first_name.value.length < 3) {
            errors.push('El campo Nombre no puede estar vacío y debe contener mas de 2 caracteres');
            first_name.classList.add('is-invalid');
        } else{
            first_name.classList.add('is-valid');
            first_name.classList.remove('is-invalid');
            form.last_name.focus();
        };
    
        // Validamos Apellido -> Obligatorio y tener al menos 2 caracteres
        if (last_name.value == '' || last_name.value.length < 3) {
            errors.push('El campo Apellido no puede estar vacío y debe contener mas de 2 caracteres');
            last_name.classList.add('is-invalid');
        } else{
            last_name.classList.add('is-valid');
            last_name.classList.remove('is-invalid');
            form.email.focus();
        };

        // Validamos Email -> Usamos expresion regular (re)

        let re=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        if(!re.exec(email.value)){
            errors.push('El campo email ingresado no es válido');
        }
        else {
            email.classList.add('is-valid');
            email.classList.remove('is-invalid');
            form.password.focus()

        };

        // Validamos password -> 1) longitud 2) ER para ver mayusculas minusculas, numero y simbolo 

        if (password.value == '' || password.value.length < 8) {
            errors.push('El campo password no puede estar vacío y debe contener al menos 8 caracteres');
            password.classList.add('is-invalid');
        } else {
            // var erPass=/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/
            var erPass=/[a-zA-Z]+/g
            if(!rePass.exec(password.value)){
                errors.push('El password ingresado no es válido, debes ingresar May y Min ...')
            }
            else {
            password.classList.add('is-valid');
            password.classList.remove('is-invalid');
            form.repassword.focus();
            }
        };

        // Validamos repassword -> 1) longitud 2) ER para ver mayusculas minusculas, numero y simbolo 

        if (repassword.value == '' || repassword.value.length < 8) {
            errors.push('El campo password no puede estar vacío y debe contener al menos 8 caracteres');
            repassword.classList.add('is-invalid');
        } else {
            // var erPass=/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/
            var erPass=/[a-zA-Z]+/g
            if(!rePass.exec(repassword.value)){
                errors.push('El password ingresado no es válido, debes ingresar May y Min ...')
            }
            else {
            repassword.classList.add('is-valid');
            repassword.classList.remove('is-invalid');
            form.repassword.focus();
            }
        };

        // Validamos que el 2do password sea igual al primero   
        //return res.send(req.body.repassword, password.value)

        //if (bcrypt.compareSync(req.body.repassword, password.value, )) {   
        // if (password.value != repassword.value) {
        //     errors.push('Las contraseñas ingresadas deben coincidir');
        //     repassword.classList.add('is-invalid');
        // } else{
        //     repassword.classList.add('is-valid');
        //     repassword.classList.remove('is-invalid');
        // };

        
        // Validamos imagenes -> archivo válido (JPG, JPEG, PNG, GIF)
        // Distingue may y min
        let extensions = /(.jpg|.gif|.jpeg|.png)$/i;
        let archivoRuta = image.value
        console.log(extensions, archivoRuta)

        if(image.value == '' || !extensions.exec(archivoRuta)) {
            errors.push('Debes cargar una imagen con extensión .jpg, .jpeg, .gif o .png');
            image.classList.add('is-invalid');
        } else{
            image.classList.add('is-valid');
            image.classList.remove('is-invalid');                
        }                    


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