var regexp = require('../_regexp')

// lodash alpha numeric, dashes between one and 50 chars
// FIXME this impl is copy/pasted from events
module.exports = function slack(arc/*, raw*/) {
  var errors = []
  if (arc.slack) {
    var isNotString = v=> typeof v != 'string'
    var typesOk = Array.isArray(arc.events) && arc.events.filter(isNotString).length === 0
    if (!typesOk) {
      errors.push(Error(`@slack invalid`))
    }
    else {
      arc.slack.forEach(bot=> {
        if (bot.length > 50) {
          errors.push(Error(`@slack ${bot} greater than 50 characters (it is ${bot.length}!)`))
        }
        if (!regexp.slackname.test(bot)) {
          errors.push(Error(`@slack ${bot} invalid characters (must be lowercase, alphanumeric, dashes)`))
        }
      })
    }
  }
  return errors
}
