const Game = require('../../models/game');

function newModel(model) {
  let record = new model({ isFinished: false });
  record.save(function(err, record) {
    if (err) {
      console.log(err)
    }
  })
  return record.id
};

function getAssign(res, model) {
  return function assign(err, record) {
    if (err) {
      console.error(err);
    } else if (record) {
      record.startQuiz()
      res.json({ id: record.id });
    } else {
      res.json({ id: newModel(model) });
    };
  };
};

function wsConnection(ws, req) {
  console.log('received request');
  let party = parties.get(req.url);
  party.addPlayer(ws);
  ws.on('message', getOnMessage(ws, req));
};

module.exports = wsConnection;

function index(req, res, next, model = Game) {
  let id = model.where({ isFinished: true }).findOne(getAssign(res, model));
};

module.exports = index;
