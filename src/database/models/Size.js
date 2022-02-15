module.exports = (sequelize, dataTypes) => {
    let alias = 'Size';                                // Definir la var alias de la tabla
    let cols = {                                        // Definir las columnas de la tabla 
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },        
        size: {
            type: dataTypes.STRING(255),
            allowNull: true
        }              
    };

    let config = {
        //tableName: 'genres',
        timestamps: false
        
    }
    const Size = sequelize.define(alias,cols,config);

    // // Definir las relaciones
    // // products N:1
    
    // Size.associate = function (models) {            // asociarse a genres (modelo -> genre)
        
    //     Size.hasMany(models.Product, {              // llama al modelo Product
    //         as: "product",                           // alias de la relacion -> N:1                                             
    //         foreignKey: 'id_size',                  // PK en modelo Product   
    //         timestamps: false
    //     })
    // }
    return Size;
};