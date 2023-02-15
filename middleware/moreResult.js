const moreResult =
  (modelname, ...polatedFiled) =>
  async (req, res, next) => {
    let currentQuery;

    let reqQuery = { ...req.query };

    let removeFileds = ["select", "sort", "page", "limit"];

    removeFileds.forEach((p) => delete reqQuery[p]);

    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    // Find the resource from database
    currentQuery = modelname.find(JSON.parse(queryStr));

    // SELECT FILED
    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      currentQuery = currentQuery.select(fields);
    }

    // SORTING
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      currentQuery = currentQuery.sort(sortBy);
    } else {
      currentQuery = currentQuery.sort("title");
    }
    // pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limitPerPage = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limitPerPage; // 0, 10, 20, 30 ....
    const endIndex = page * limitPerPage; // 10, 20, 30, 40 ....
    const total = await modelname.countDocuments(); // 30

    currentQuery = currentQuery.skip(startIndex).limit(limitPerPage);

    if (polatedFiled) {
      polatedFiled.map((p) => (currentQuery = currentQuery.populate(p)));
    }
    const result = await currentQuery;
    const paginationResults = {};
    if (endIndex < total) {
      paginationResults.next = {
        page: page + 1,
        limit: limitPerPage,
      };
    }
    if (startIndex > 0) {
      paginationResults.prev = {
        page: page - 1,
        limit: limitPerPage,
      };
    }
    res.moreResult = {
      success: true,
      count: result.length,
      paginationResults,
      result,
    };
    next();
  };

module.exports = moreResult;
