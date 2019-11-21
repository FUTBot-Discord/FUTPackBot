"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _asyncRedis = require("async-redis");

var _general = require("../functions/general");

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var redis = (0, _asyncRedis.createClient)({
  host: process.env.R_HOST,
  db: process.env.R_DB,
  retry_strategy: function retry_strategy(options) {
    if (options.error && options.error.code === "ECONNREFUSED") {
      return new Error("The server refused the connection");
    }

    if (options.total_retry_time > 1000 * 60 * 60) {
      return new Error("Retry time exhausted");
    }

    if (options.attempt > 10) {
      return undefined;
    }

    return Math.min(options.attempt * 100, 3000);
  }
});

module.exports =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(client) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            client.user.setActivity("startup process, give me a moment plz ,_,", {
              type: 'PLAYING'
            });
            console.log("Logged in as ".concat(client.user.tag, " and looking at ").concat(getPlayerCount(client.guilds), " users."));
            console.log("====================");
            client.user.setActivity("pack! in #testing", {
              type: 'WATCHING'
            });
            redisStartup(client);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

function redisStartup(_x2) {
  return _redisStartup.apply(this, arguments);
}

function _redisStartup() {
  _redisStartup = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(client) {
    var expired_subKey;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return redis.send_command("config", ["set", "notify-keyspace-events", "Ex"]);

          case 2:
            expired_subKey = "__keyevent@" + process.env.REDIS_DATABASE + "__:expired";
            redis.subscribe(expired_subKey).then(function () {
              return console.log("[i] Subscribed to " + expired_subKey);
            });
            redis.on("message",
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee2(channel, message) {
                var aInfo, pInfo, pName;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (!(channel !== expired_subKey)) {
                          _context2.next = 2;
                          break;
                        }

                        return _context2.abrupt("return");

                      case 2:
                        console.log("[a] [".concat(message, "] Expired."));
                        _context2.prev = 3;
                        _context2.next = 6;
                        return (0, _general.getAuctionById)(message);

                      case 6:
                        aInfo = _context2.sent;
                        _context2.next = 12;
                        break;

                      case 9:
                        _context2.prev = 9;
                        _context2.t0 = _context2["catch"](3);
                        return _context2.abrupt("return");

                      case 12:
                        if (!(aInfo == null)) {
                          _context2.next = 14;
                          break;
                        }

                        return _context2.abrupt("return");

                      case 14:
                        if (!(aInfo.b_club_id == 0)) {
                          _context2.next = 17;
                          break;
                        }

                        console.log("[a] [".concat(message, "] No buyer was found."));
                        return _context2.abrupt("return", (0, _general.resetTransferPlayer)(message));

                      case 17:
                        console.log("[a] [".concat(message, "] Buyer(").concat(aInfo.b_club_id, ") has been found."));
                        _context2.next = 20;
                        return (0, _general.addCoinsToClub)(aInfo.s_club_id, aInfo.current_bid);

                      case 20:
                        _context2.next = 22;
                        return (0, _general.auctionBuyNow)(aInfo.id, aInfo.b_club_id);

                      case 22:
                        _context2.next = 24;
                        return (0, _general.getPlayerVersionById)(aInfo.player_id);

                      case 24:
                        pInfo = _context2.sent;
                        pName = pInfo.meta_info.common_name ? pInfo.meta_info.common_name : "".concat(pInfo.meta_info.first_name, " ").concat(pInfo.meta_info.last_name);
                        _context2.next = 28;
                        return (0, _general.notifyPerson)(client, aInfo, 3);

                      case 28:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, null, [[3, 9]]);
              }));

              return function (_x3, _x4) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _redisStartup.apply(this, arguments);
}

function getPlayerCount(guilds) {
  var usercount = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = guilds.array()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var guild = _step.value;
      usercount += guild.memberCount;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return usercount;
}

;