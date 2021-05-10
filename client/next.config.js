module.exports = {
    webpackDevMiddleware: config =>{
        config.watchOptions.poll = 300;
        return config;
    }
};

// module.exports = {
//     images: {
//         path: "/images/backg.jpg"
//     },
// };