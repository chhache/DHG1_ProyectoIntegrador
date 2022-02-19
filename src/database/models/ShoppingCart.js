module.exports = (sequelize, dataTypes) => {
    let alias = 'ShoppingCart';                                // Definir la var alias de la tabla
    let cols = {                                        // Definir las columnas de la tabla 
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },        
        price: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },
        id_user: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        } ,
        id_credit_card: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        }  
    };

    let config = {
        //tableName: 'users',
        timestamps: false
        
    }
    const ShoppingCart = sequelize.define(alias,cols,config);

    // Definir las relaciones
    // products N:1
    
    ShoppingCart.associate = function (models) {        // asociarse a genres (modelo -> genre)
        
        ShoppingCart.belongsTo(models.User, {            // llama al modelo CartDetail 
            as: "userSQL",                                 // alias de la relacion -> N:1                                             
            foreignKey: 'id_user',                      // PK en modelo Product   
            timestamps: false
        }),

        ShoppingCart.belongsTo(models.CreditCard, {         // llama al modelo CartDetail 
            as: "creditCard",                          // alias de la relacion -> N:1                                             
            foreignKey: 'id_credit_card',                 // PK en modelo Product   
            timestamps: false
        })
    }
    return ShoppingCart;
};