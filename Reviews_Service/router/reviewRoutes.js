module.exports = function(app) {
    var jsonku = require('../controller/reviewController.js');

    app.route('/')
        .get(jsonku.index);

    app.route('/reviews')
        .get(jsonku.showAllReview);

    app.route('/reviews/:id')
        .get(jsonku.showReviewProduct);
}