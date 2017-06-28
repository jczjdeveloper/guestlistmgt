/**
 * GET /
 * Home/index page.
 */
exports.index = (req, res) => {
  res.render('index', {
    title: 'Index'
  });
};
