import axios from 'axios'

export default {

    post(route, params = {}) {
        params.authenticity_token = document.querySelector('meta[name="csrf-token"]').content;
        return axios.post(route, params);
    },

    get(route, params = {}) {
        params.authenticity_token = document.querySelector('meta[name="csrf-token"]').content;
        return axios.get(route, params);
    },

    delete(route, params = {}) {
        params.authenticity_token = document.querySelector('meta[name="csrf-token"]').content;
        return axios.delete(route, {params});
    }
};

