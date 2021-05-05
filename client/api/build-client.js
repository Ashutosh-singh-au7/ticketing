import axios from 'axios';

export default ({ req }) => {
    if (typeof window === 'undefined'){
        //we are on the server

        return axios.create({
            baseURL: 'http://www.ecommerce-ticketing-app.xyz/',
            headers: req.headers
        });
    } else {
        //we are on the browser

        return axios.create({
            baseUrl: '/'
        });
    }
};

//baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local'