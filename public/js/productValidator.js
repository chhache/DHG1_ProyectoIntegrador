window.onload = function(){

    // Capturar los elementos a validar por front-end
    let form = document.querySelector('.form')
    

    // Validaciones del formulario
    form.name.focus();

    form.addEventListener('submit', (e) =>{

        let errors = [];

        let name = document.querySelector('#name');
        let description = document.querySelector('#description');
        let price = document.querySelector('#price');       
        let image1 = document.querySelector('#image1');

        // Validamos Nombre del producto -> Obligatorio y tener al menos 6 caracteres
        if (name.value == '' || name.value.length < 7) {
            errors.push('El campo Nombre del Producto no puede estar vacío y debe contener más de 6 caracteres');
            name.classList.add('is-invalid');
        } else{
            name.classList.add('is-valid');
            name.classList.remove('is-invalid');
            form.description.focus();
        };
    
        // Validamos Descripción del Producto -> Obligatorio y tener al menos 15 caracteres
        if (description.value == '' || description.value.length < 16) {
            errors.push('El campo Descripción del Producto no puede estar vacío y debe contener mas de 15 caracteres');
            description.classList.add('is-invalid');
        } else{
            description.classList.add('is-valid');
            description.classList.remove('is-invalid');
            form.price.focus();
        };

        // Validamos Precio -> Usamos expresion regular (re)

        // let re=/^([\d0-9]{2,6})$/
        // if(!re.exec(price.value)){
        //     errors.push('El campo Precio ingresado no es válido');
        // }
        // else {
        //     price.classList.add('is-valid');
        //     price.classList.remove('is-invalid');
        // };        
        // distingue may y min
        // let extensions = /(.jpg|.gif|.jpeg|.png)$/i;
        // let archivoRuta = image1.value
        // console.log(extensions, archivoRuta)

        // if(image1.value == '' || !extensions.exec(archivoRuta)) {
        //     errors.push('Debes cargar una imagen con extensión .jpg, .jpeg, .gif o .png');
        //     image1.classList.add('is-invalid');
        // } else{
        //     image1.classList.add('is-valid');
        //     image1.classList.remove('is-invalid');                
        // }   

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