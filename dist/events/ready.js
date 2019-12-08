"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _asyncRedis = require("async-redis");

var _general = require("../functions/general");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _dblapi = _interopRequireDefault(require("dblapi.js"));

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
    var dbl;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dbl = new _dblapi["default"]('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzI1MTQ1MTYyNTYwMzA4MiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc1ODIxOTcxfQ.H8ykXP9lKeSRUM2OJ69bpcStxSdzaqLSCJKeW7hg8tA', client);
            dbl.postStats("".concat(client.guilds.size));
            client.user.setActivity("startup process, give me a moment plz ,_,", {
              type: 'PLAYING'
            });
            console.log("Logged in as ".concat(client.user.tag, " and looking at ").concat(getPlayerCount(client.guilds), " users."));
            console.log("====================");
            client.user.setActivity("".concat(client.guilds.size, " servers"), {
              type: 'WATCHING'
            });
            setInterval(function () {
              client.user.setActivity("".concat(client.guilds.size, " servers"), {
                type: 'WATCHING'
              });
              dbl.postStats("".concat(client.guilds.size));
            }, 360000);
            redis.subscribe("auctionEnd");
            redis.on("message", function (channel, message) {
              if (channel !== "auctionEnd") return;
              var aInfo = JSON.parse(message);
              (0, _general.notifyPerson)(aInfo, 3);
              (0, _general.notifyPerson)(aInfo, 4);
            });

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}(); // async function redisStartup(client) {
//     await redis.send_command("config", ["set", "notify-keyspace-events", "Ex"]);
//     const expired_subKey =
//         "__keyevent@" + process.env.R_DB + "__:expired";
//     redis
//         .subscribe(expired_subKey)
//         .then(() => console.log("[i] Subscribed to " + expired_subKey));
//     redis.on("message", async (channel, message) => {
//         if (channel !== expired_subKey) return;
//         console.log(`[a] [${message}] Expired.`);
//         let aInfo = await getAuctionById(message);
//         if (aInfo == null) return;
//         if (aInfo.b_club_id == 0) {
//             console.log(`[a] [${message}] No buyer was found.`);
//             return resetTransferPlayer(message);
//         }
//         console.log(`[a] [${message}] Buyer(${aInfo.b_club_id}) has been found.`);
//         await addCoinsToClub(aInfo.s_club_id, aInfo.current_bid);
//         await auctionBuyNow(aInfo.id, aInfo.b_club_id);
//         const pInfo = await getPlayerVersionById(aInfo.player_id);
//         const pName = pInfo.meta_info.common_name ? pInfo.meta_info.common_name : `${pInfo.meta_info.first_name} ${pInfo.meta_info.last_name}`;
//         await notifyPerson(client, aInfo, 3);
//         await notifyPerson(client, aInfo, 4);
//     });
// }


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