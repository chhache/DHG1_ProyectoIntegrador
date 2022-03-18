// Representación de lo que poseemos en users.json
// Vamos a crear un objeto literal con métodos que se encargarán de realizar:
// 1. Guardar el usuario en la BD
// 2. Buscar al usuario que se quiere loguear pos su mail (antes es necesario saber si existe o nó)
// 3. Buscar a un usuario por su ID
// 4. Editar la información de un usuario
// 5. Eliminar un usuario de la BD
const fs = require('fs');
const path = require('path');

const User = {
	// fileName: './data/users.json',
    fileName: path.join(__dirname, '../data/users.json'),

	getData: function () {
		return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
	},
// *** Generar ID usuario nuevo***
	generateId: function () {
		let allUsers = this.findAll();
		let lastUser = allUsers.pop();
		if (lastUser) {
			return lastUser.id + 1;
		}
		return 1;
	},
// *** Buscar todos los usuario ***
	findAll: function () {
		return this.getData();
	},
// *** Buscar usuario por ID ***
	findByPk: function (id) {
		let allUsers = this.findAll();
		let userFound = allUsers.find(oneUser => oneUser.id === id);
		return userFound;
	},
// *** Buscar usuario por un campo ***
	findByField: function (field, text) {
		let allUsers = this.findAll();
		let userFound = allUsers.find(oneUser => oneUser[field] === text);
		return userFound;
	},
// *** Crear usuario ***
	create: function (userData) {
		let allUsers = this.findAll();
		let newUser = {
			id: this.generateId(),
			...userData
		}
		allUsers.push(newUser);
		//allUsers.push(userData);
		fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null,  ' '));
		return newUser;
	},	
// *** Eliminar usuario ***
	delete: function (id) {
		let allUsers = this.findAll();
		let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
		fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
		return true;
	}
}

module.exports = User;


//console.log(User.delete(84));