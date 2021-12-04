const {override,fixBabelImports,addLessLoader} = require("customize-cra")
// 暴露一个对象，override加载
module.exports = override(
    fixBabelImports("import",{
        libraryName:"antd",
        libraryDirectory:"es",
        style:true  //允许less文件
    }),
    addLessLoader({
        modifyVars:{"@primary-color":"#6da372"},
        javascriptEnabled:true
    })
)