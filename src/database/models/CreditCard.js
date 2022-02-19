module.exports = (sequelize, dataTypes) => {
    let alias = 'CreditCard';                           // Definir la var alias de la tabla
    let cols = {                                        // Definir las columnas de la tabla 
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },        
        number: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        expire_date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        document: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        id_user: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        } ,
        id_card_type: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },
        id_bank: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        }   
    };

    let config = {
        //tableName: 'credit_cards',
        timestamps: false
        
    }
    const CreditCard = sequelize.define(alias,cols,config);

    // Definir las relaciones
    // products N:1
    
    CreditCard.associate = function (models) {        // asociarse a genres (modelo -> genre)
        
        CreditCard.belongsTo(models.User, {         // llama al modelo User 
            as: "userSQL",                             // alias de la relacion -> N:1                                             
            foreignKey: 'id_user',                  // PK en modelo Product   
            timestamps: false
        }),

        CreditCard.belongsTo(models.Bank, {         // llama al modelo CartDetail 
            as: "bank",                             // alias de la relacion -> N:1                                             
            foreignKey: 'id_bank',                  // PK en modelo Product   
            timestamps: false
        }),

        CreditCard.belongsTo(models.CardType, {      // llama al modelo CartDetail 
            as: "cardType",                          // alias de la relacion -> N:1                                             
            foreignKey: 'id_card_type',              // PK en modelo Product   
            timestamps: false
        }),

        CreditCard.hasMany(models.ShoppingCart, {     // llama al modelo CartDetail 
            as: "shoppingCart",                       // alias de la relacion -> 1:N                                             
            foreignKey: 'id_credit_card',             // PK en modelo creditCart   
            timestamps: false
        })

    }
    return CreditCard;
};