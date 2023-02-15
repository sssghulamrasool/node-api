// const tryCatchMiddleware = (fn) => (req, res, next) => {
//   Promise.resolve(fn(req, res, next)).catch(next);
// };

const tryCatchMiddleware = (fun) => {
  return (req, res, next) => {
    fun(req, res, next).catch(next);
  };
};

module.exports = tryCatchMiddleware;
