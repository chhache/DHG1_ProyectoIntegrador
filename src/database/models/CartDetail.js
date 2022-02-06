module.exports = (sequelize, dataTypes) => {
    let alias = 'CartDetail';                           // Definir la var alias de la tabla
    let cols = {                                        // Definir las columnas de la tabla 
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        quantity: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },        
        total_price: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },
        id_cart: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        } ,
        id_product: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        }  
    };

    let config = {
        //tableName: 'cart_details',
        timestamps: false
        
    }
    const CartDetail = sequelize.define(alias,cols,config);

    // Definir las relaciones
    // products N:1
    
    CartDetail.associate = function (models) {        // asociarse a genres (modelo -> genre)
        
        Cartdetail.belongsTo(models.ShoppingCart, {     // llama al modelo CartDetail 
            as: "shoppingcart",                         // alias de la relacion -> N:1                                             
            foreignKey: 'id_cart',                      // PK en modelo ShoppingCart   
            timestamps: false
        }),

        CartDetail.belongsTo(models.Product, {         // llama al modelo Prodcut 
            as: "product",                          // alias de la relacion -> N:1                                             
            foreignKey: 'id_product',              // PK en modelo Product   
            timestamps: false
        })
    }
    return CartDetail;
};