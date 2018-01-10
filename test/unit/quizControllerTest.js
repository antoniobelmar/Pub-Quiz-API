import {expect} from 'chai';
import {quizController} from 'controllers/quizController';
import {spy, stub} from 'sinon';

describe('quizController', function(){
  const request, res, quizModel

  beforeEach(function(){
    request = {params: {id: 7}}
    quizModel = {
      findById: spy();
    }

  });
});
