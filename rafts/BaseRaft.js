'use strict';

class BaseRaft {
  constructor(boat) {
    /**
     * The boat that handles this raft
     * @name BaseRaft#boat
     * @type {Boat}
     */
    Object.defineProperty(this, 'boat', { value: boat });

    /**
     * Whether this raft is currently active
     * @type {boolean}
     */
    this.active = true;
  }
}

module.exports = BaseRaft;
