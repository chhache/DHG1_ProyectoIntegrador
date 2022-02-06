module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';                             // Definir la var alias de la tabla
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
        // tableName: 'categories',
        timestamps: false
        
    }
    const Category = sequelize.define(alias,cols,config);

    // Definir las relaciones
    // products N:1
    
    Category.associate = function (models) {            // asociarse a genres (modelo -> genre)
        
        Category.hasMany(models.Product, {           // llama al modelo CartDetail 
            as: "product",                           // alias de la relacion -> N:1                                             
            foreignKey: 'id_category',                  // PK en modelo Product   
            timestamps: false
        })
    }
    
    return Category;
};