import axios from 'axios';

import { API_URL } from '../helpers/api';

class BaseRepository {
  constructor({ baseUrl = API_URL, controller = ''}) {
    this.url =  baseUrl + '/' + controller;
  }

  async get(route) {
    axios.get(this.url + "/" + route);
  }

  async post(data, route) {
    return axios.post(this.url + "/" + route, data);
  }

  async put(data, route) {
    axios.put(this.url + "/" + route, data);
  }

  async delete(id, route) {
    axios.delete(this.url+ "/" + route + "/" + id);
  }
}

export default BaseRepository;
