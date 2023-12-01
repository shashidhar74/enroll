const { DataTypes }=require('sequelize')
const { sequelize } = require('.')

module.exports=(sequelize)=>{
    const Books=sequelize.define('Books',{
        bookname:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        authour_id:{
             type:DataTypes.STRING,
             allowNull:false,
        },
        authour_name:{
            type:DataTypes.STRING,
            allowNull:false,
       }
    });
    return Books;
}