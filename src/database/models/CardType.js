module.exports = (sequelize, dataTypes) => {
    let alias = 'CardType';                                // Definir la var alias de la tabla
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
    const CardType = sequelize.define(alias,cols,config);

    // Definir las relaciones
    // products N:1
    
    CardType.associate = function (models) {            // asociarse a genres (modelo -> genre)
        
        CardType.hasMany(models.CreditCard, {           // llama al modelo CartDetail 
            as: "creditCard",                       // alias de la relacion -> 1:N                                             
            foreignKey: 'id_card_type',                  // PK en modelo creditCart   
            timestamps: false
        })
    }
    return CardType;
};







