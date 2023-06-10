const calendarUserController = require("./../Controller/calendar-user-controller");
module.exports = (app) =>{
    app.route('/api/calendar-user').get(calendarUserController.get)
    app.route('/api/calendar-user').post(calendarUserController.add)
    app.route('/api/calendar-user/:id').delete(calendarUserController.delete)
}