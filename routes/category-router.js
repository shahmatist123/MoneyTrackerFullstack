const categoryController = require("./../Controller/category-controller");
module.exports = (app) =>{
    app.route('/api/categories').get(categoryController.get)
    app.route('/api/categories').post(categoryController.add)
    app.route('/api/categories/:id').delete(categoryController.delete)
}