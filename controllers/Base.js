/**
 * Created by vsubramaney on 12/22/13.
 */

var _ = require("underscore");
module.exports = {
    name: "base",
    extend: function(child) {
        return _.extend({}, this, child);
    },
    run: function(req, res, next) {

    }
}
