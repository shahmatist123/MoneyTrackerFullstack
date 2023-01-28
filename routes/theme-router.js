const themeController = require("./../Controller/theme-controller");
module.exports = (app) =>{
    app.route('/api/theme/all').get(themeController.getAllThemes)
}