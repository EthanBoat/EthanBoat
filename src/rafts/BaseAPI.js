'use strict';

const axios = require('axios');
const { Collection } = require('discord.js');
const router = require('../util/APIRouter');

/**
 * Represents an api handler
 * @abstract
 */
class BaseAPI {
  constructor(raft, options) {
    /**
     * The boat that handles this commands raft
     * @name BaseAPI#boat
     * @type {boat}
     */
    Object.defineProperty(this, 'boat', { value: raft.boat });

    /**
     * The raft that handles this command
     * @name BaseAPI#raft
     * @type {Raft}
     */
    Object.defineProperty(this, 'raft', { value: raft });

    /**
     * The cache for this api
     * @type {Collection<string, *>}
     */
    this.cache = new Collection();

    /**
     * The driver that handles this API
     * @type {axios}
     */
    this.driver = axios.create(options);
  }

  /**
   * API request shortcut
   * @type {Requester}
   * @readonly
   */
  get api() {
    return router(this);
  }

  /**
   * API Request handler
   * @param {HTTPMethod} method The HTTP  method used to make this request
   * @param {string} uri The uri of the desired endpoint
   * @param {Object} data The data to pass to the request
   * @returns {Promise<Object>}
   * @private
   */
  _request(method, uri, data) {
    return this.driver.request({
      method,
      url: uri,
      ...data,
    });
  }
}

module.exports = BaseAPI;
