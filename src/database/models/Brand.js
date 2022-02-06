module.exports = (sequelize, dataTypes) => {
    let alias = 'Brand';                                // Definir la var alias de la tabla
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
        //tableName: 'brands',
        timestamps: false
        
    }
    const Brand = sequelize.define(alias,cols,config);

    // Definir las relaciones
    // products N:1
    
    Brand.associate = function (models) {            // asociarse a genres (modelo -> genre)
        
        Brand.hasMany(models.Product, {           // llama al modelo CartDetail 
            as: "product",                           // alias de la relacion -> N:1                                             
            foreignKey: 'id_brand',                  // PK en modelo Product   
            timestamps: false
        })
    }
    return Brand;
};