module.exports = (sequelize, dataTypes) => {
    let alias = 'User';                                // Definir la var alias de la tabla
    let cols = {                                        // Definir las columnas de la tabla 
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },        
        first_name: {
            type: dataTypes.STRING(255),
            allowNull: true
        },
        last_name: {
            type: dataTypes.STRING(255),
            allowNull: true
        },
        email: {
            type: dataTypes.STRING(255),
            allowNull: true
        },
        password: {
            type: dataTypes.STRING(255),
            allowNull: true
        },
        repassword: {
            type: dataTypes.STRING(255),
            allowNull: true
        },
        image: {
            type: dataTypes.STRING(100),
            allowNull: true
        },                 
    };

    let config = {
        //tableName: 'users',
        timestamps: false
        
    }
    const User = sequelize.define(alias,cols,config);

    // Definir las relaciones
    // products N:1
    
    // User.associate = function (models) {            // asociarse a genres (modelo -> genre)
        
    //     User.hasMany(models.ShoppingCart, {         // llama al modelo CartDetail 
    //         as: "shoppingCart",                          // alias de la relacion -> N:1                                             
    //         foreignKey: 'id_user',                 // PK en modelo Product   
    //         timestamps: false
    //     }),

    //     User.hasMany(models.CreditCard, {         // llama al modelo CartDetail 
    //         as: "creditCard",                          // alias de la relacion -> N:1                                             
    //         foreignKey: 'id_user',                 // PK en modelo Product   
    //         timestamps: false
    //     })
    // }
    return User;
};