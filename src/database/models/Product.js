module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';  // Definir la var alias de la tabla
    let cols = {            // Definir las columnas de la tabla 
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },        
        name: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        description: {
            type: dataTypes.STRING(100),
            allowNull: true
        },
        price: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false            
        },
        discount: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: true
        },
        image1: {
            type: dataTypes.STRING(100),
            allowNull: true
        },
        image2: {
            type: dataTypes.STRING(100),
            allowNull: true
        },
        image3: {
            type: dataTypes.STRING(100),
            allowNull: true
        },
        image4: {
            type: dataTypes.STRING(100),
            allowNull: true
        },
        color: {
            type: dataTypes.STRING(50),
            allowNull: true
        },   
        size: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: true
        },
        sale: {
            type: dataTypes.BOOLEAN,
            allowNull: true
        },
        id_category: dataTypes.BIGINT(10),
        id_genre: dataTypes.BIGINT(10),
        id_type: dataTypes.BIGINT(10),
        id_brand: dataTypes.BIGINT(10)        
    };

    let config = {
        //tableName: 'products',
        timestamps: false
        
    }
    const Product = sequelize.define(alias,cols,config);

    // Definir las relaciones
    // genres -> 1:N
    // colors -> 1:N
    // sizes -> 1:N
    // categories -> N:1
    // brands -> 1:N
    // types -> 1:N
    // cart_details 1:N
    
    Product.associate = function (models) {             // asociarse a genres (modelo -> genre)

        Product.belongsTo(models.Genre, {               // modelo Product tiene relacion 1:N modelo Genre (definido en el alias)
            as: "genre",                                // alias de la relación, acceder a los datos en vista y controlador    
            foreignKey: "id_genre"                      // FK en modelo Products
        })

        // Product.belongsTo(models.Color, {               // modelo Product tiene relacion 1:N modelo Genre (definido en el alias)
        //     as: "color",                                // alias de la relación, acceder a los datos en vista y controlador    
        //     foreignKey: "id_color"                      // FK en modelo Products
        // })

        Product.belongsTo(models.Category, {               // modelo Product tiene relacion 1:N modelo Genre (definido en el alias)
            as: "category",                                // alias de la relación, acceder a los datos en vista y controlador    
            foreignKey: "id_category"                      // FK en modelo Products
        })

        Product.belongsTo(models.Brand, {               // modelo Product tiene relacion 1:N modelo Genre (definido en el alias)
            as: "brand",                                // alias de la relación, acceder a los datos en vista y controlador    
            foreignKey: "id_brand"                      // FK en modelo Products
        })   
        
        Product.belongsTo(models.Type, {               // modelo Product tiene relacion 1:N modelo Genre (definido en el alias)
            as: "type",                                // alias de la relación, acceder a los datos en vista y controlador    
            foreignKey: "id_type"                      // FK en modelo Products
        })   

        Product.hasMany(models.CartDetail, {           // llama al modelo CartDetail 
            as: "cartDetails",                         // alias de la relacion -> 1:N                                             
            foreignKey: 'id_product',                  // PK en modelo cartDetail   
            timestamps: false
        })
    }

    return Product;
};