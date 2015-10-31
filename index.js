"use strict"

var Worker = require("basic-distributed-computation").Worker;
var checksum = require("checksum");

class CheckSum extends Worker {
  constructor(parent){
    super("checksum", parent);
  }

  work(req){
    if(req.body === null || req.body === undefined){
      req.status("No body to checksum").next();
      return;
    } else if(typeof(req.body) === "string"){
      req.body = checksum(req.body);
    } else {
      req.body = checksum(JSON.stringify(req.body));
    }

    req.next();
  }
}

module.exports = CheckSum;
