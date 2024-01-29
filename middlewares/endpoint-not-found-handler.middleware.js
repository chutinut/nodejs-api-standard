export default (req, res) => {
    const { method, path } = req;
    const status = 404;
    const message = `${method} ${path} - endpoint not found`;
    res.status(status).send({ status, message }).end();
};
