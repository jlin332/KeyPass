var limdu = require('limdu');

class train {

  constructor() {
    this.classifier = new limdu.classifiers.NeuralNetwork();
    this.data = [];
  }

  addData(toadd, bit){
    var obj = {input: toadd, output: bit}
    this.data.push(obj);
    console.log("datapoint = ", obj);
  }

  // {input: { r: 0.03, g: 0.7, b: 0.5 }, output: 0},  // black
  trainer(callback){
    console.log("training....");
    this.classifier.trainBatch(this.data);
    console.log("finished batch");
    return callback();
  }

  classify(data){
    console.log("Classifying...");
    return this.classifier.classify(data);
  }
}

module.exports = train;
