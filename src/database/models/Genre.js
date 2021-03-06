module.exports = (sequelize, dataTypes) => {
    let alias = 'Genre';                                // Definir la var alias de la tabla
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
        //tableName: 'genres',
        timestamps: false
        
    }
    const Genre = sequelize.define(alias,cols,config);

    // Definir las relaciones
    // products N:1
    
    Genre.associate = function (models) {            // asociarse a genres (modelo -> genre)
        
        Genre.hasMany(models.Product, {              // llama al modelo Product
            as: "product",                           // alias de la relacion -> N:1                                             
            foreignKey: 'id_genre',                  // PK en modelo Product   
            timestamps: false
        })
    }
    return Genre;
};