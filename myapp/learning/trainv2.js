var limdu = require('limdu');

class trainv2 {

  constructor() {
    this.classifier = new limdu.classifiers.NeuralNetwork();
    this.data = [];
    this.classifier.learningRate = 0.7;
  }

  addData(toadd, bit){
    var obj = {input: toadd, output: bit}
    this.data.push(obj);
    console.log("VERSION2");
    //console.log("datapoint = ", obj);
  }

  // {input: { r: 0.03, g: 0.7, b: 0.5 }, output: 0},  // black
  trainer(callback){
    //console.log("training....");
    console.log(this.data);
    this.classifier.trainBatch(this.data);
    console.log(this.classifier.learningRate);
    return callback();
  }

  classify(data){
    //console.log("Classifying...");
    return this.classifier.classify(data);
  }
}
