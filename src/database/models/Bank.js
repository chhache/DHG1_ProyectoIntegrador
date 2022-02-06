module.exports = (sequelize, dataTypes) => {
    let alias = 'Bank';                                // Definir la var alias de la tabla
    let cols = {                                        // Definir las columnas de la tabla 
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },        
        name: {
            type: dataTypes.STRING(255),
            allowNull: true
        }              
    };

    let config = {
        //tableName: 'banks',
        timestamps: false
        
    }
    const Bank = sequelize.define(alias,cols,config);

    // Definir las relaciones
    // products N:1
    
    Bank.associate = function (models) {            // asociarse a genres (modelo -> genre)
        
        Bank.hasMany(models.CreditCard, {           // llama al modelo CartDetail 
            as: "creditCard",                       // alias de la relacion -> 1:N                                             
            foreignKey: 'id_bank',                  // PK en modelo creditCart   
            timestamps: false
        })
    }
    return Bank;
};






