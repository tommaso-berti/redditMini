const ROUTES = {
    home: '/',
    authors: (author = ':author') => `/authors/${author}`
};

export default ROUTES;