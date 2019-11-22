"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _general = require("../functions/general");

var _humanizeDuration = _interopRequireDefault(require("humanize-duration"));

exports.run =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(client, message, args) {
    var channel, author, cInfo, aInfo, date, diff, bid, end_timestamp, pInfo, pName;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            channel = message.channel;
            author = message.author;

            if (!(args[0] == undefined || args[0] == null)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", channel.send("Please fill-in an id of an auction. ".concat(author)));

          case 4:
            _context.next = 6;
            return (0, _general.getUserClubId)(author.id);

          case 6:
            cInfo = _context.sent;
            _context.next = 9;
            return (0, _general.getAuctionById)(args[0]);

          case 9:
            aInfo = _context.sent;

            if (!(aInfo === null)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", channel.send("Auction has not been found. Try again... ".concat(author)));

          case 12:
            date = new Date().getTime();
            diff = aInfo.end_timestamp - date;

            if (!(aInfo.s_club_id === cInfo.id)) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", channel.send("You can't bid on your own item. ".concat(author)));

          case 16:
            if (!(diff < 300)) {
              _context.next = 18;
              break;
            }

            return _context.abrupt("return", channel.send("Auction has just been expired. ".concat(author)));

          case 18:
            if (!(args[1] == undefined || args[1] == null)) {
              _context.next = 20;
              break;
            }

            return _context.abrupt("return", channel.send("You need to fill-in an amount what you want to bid. ".concat(author)));

          case 20:
            bid = (0, _general.nextCurrentBid)(args[1]);

            if (!(bid === NaN)) {
              _context.next = 23;
              break;
            }

            return _context.abrupt("return", channel.send("You amount can't be converted to an amount. Fill-in a normal number... ".concat(author)));

          case 23:
            if (!(cInfo.coins < bid)) {
              _context.next = 25;
              break;
            }

            return _context.abrupt("return", channel.send("You haven't enough coins to bid(".concat(bid, ") on this player. ").concat(author)));

          case 25:
            if (!(aInfo.b_club_id !== 0 && bid <= aInfo.current_bid)) {
              _context.next = 27;
              break;
            }

            return _context.abrupt("return", channel.send("Your bid must be higher then the current bid ".concat(aInfo.current_bid, ". ").concat(author)));

          case 27:
            if (!(bid < aInfo.start_price)) {
              _context.next = 29;
              break;
            }

            return _context.abrupt("return", channel.send("Your bid must be higher then the start price ".concat(aInfo.start_price, ". ").concat(author)));

          case 29:
            _context.t0 = diff > 28000;
            _context.next = _context.t0 === true ? 32 : _context.t0 === false ? 34 : 36;
            break;

          case 32:
            end_timestamp = aInfo.end_timestamp;
            return _context.abrupt("break", 36);

          case 34:
            end_timestamp = date + 28000;
            return _context.abrupt("break", 36);

          case 36:
            ;

            if (!(bid >= aInfo.buy_now)) {
              _context.next = 55;
              break;
            }

            _context.next = 40;
            return (0, _general.removeCoinsFromClub)(cInfo.id, aInfo.buy_now);

          case 40:
            _context.next = 42;
            return (0, _general.addCoinsToClub)(aInfo.s_club_id, aInfo.buy_now);

          case 42:
            _context.next = 44;
            return (0, _general.auctionBuyNow)(aInfo.id, cInfo.id);

          case 44:
            if (!(aInfo.b_club_id !== 0)) {
              _context.next = 49;
              break;
            }

            _context.next = 47;
            return (0, _general.addCoinsToClub)(aInfo.b_club_id, aInfo.current_bid);

          case 47:
            // Notify other person that has bet.
            if (cInfo.id !== aInfo.b_club_id) (0, _general.notifyPerson)(client, aInfo, 1); // Notify person that sold this player.

            (0, _general.notifyPerson)(client, aInfo, 2);

          case 49:
            _context.next = 51;
            return (0, _general.getPlayerVersionById)(aInfo.player_id);

          case 51:
            pInfo = _context.sent;
            pName = pInfo.meta_info.common_name ? pInfo.meta_info.common_name : "".concat(pInfo.meta_info.first_name, " ").concat(pInfo.meta_info.last_name);
            channel.send("".concat(author, " has bought ").concat(pName, " rated ").concat(pInfo.rating, " for **").concat(aInfo.buy_now, "** coins. The player has been send to your transferpile."));
            return _context.abrupt("return");

          case 55:
            _context.next = 57;
            return (0, _general.removeCoinsFromClub)(cInfo.id, bid);

          case 57:
            _context.next = 59;
            return (0, _general.auctionBid)(aInfo.id, end_timestamp, bid, cInfo.id);

          case 59:
            if (!(aInfo.b_club_id !== 0)) {
              _context.next = 63;
              break;
            }

            _context.next = 62;
            return (0, _general.addCoinsToClub)(aInfo.b_club_id, aInfo.current_bid);

          case 62:
            // Notify other person that has bet.
            if (cInfo.id !== aInfo.b_club_id) (0, _general.notifyPerson)(client, aInfo, 3);

          case 63:
            date = new Date().getTime();
            diff = end_timestamp - date;
            _context.next = 67;
            return (0, _general.getPlayerVersionById)(aInfo.player_id);

          case 67:
            pInfo = _context.sent;
            pName = pInfo.meta_info.common_name ? pInfo.meta_info.common_name : "".concat(pInfo.meta_info.first_name, " ").concat(pInfo.meta_info.last_name);
            channel.send("".concat(author, " has placed a bid on ").concat(pName, " rated ").concat(pInfo.rating, " for **").concat(bid, "** coins. Time remaining: ").concat((0, _humanizeDuration["default"])(diff, {
              round: true,
              largest: 1
            })));
            return _context.abrupt("return");

          case 71:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();