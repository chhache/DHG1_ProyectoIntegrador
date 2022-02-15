module.exports = (sequelize, dataTypes) => {
    let alias = 'Color';                                // Definir la var alias de la tabla
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
        //tableName: 'colors',
        timestamps: false
        
    }
    const Color = sequelize.define(alias,cols,config);

    // Definir las relaciones
    // products N:1
    
    // Color.associate = function (models) {            // asociarse a genres (modelo -> genre)
        
    //     Color.hasMany(models.Product, {           // llama al modelo CartDetail 
    //         as: "product",                           // alias de la relacion -> N:1                                             
    //         foreignKey: 'id_color',                  // PK en modelo Product   
    //         timestamps: false
    //     })
    // }
    return Color;
};