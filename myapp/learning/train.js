var limdu = require('limdu');

class trainer{

  contructor() {
    this.classifier = new limdu.classifiers.NeuralNetwork();
    this.data = null;
  }

  addData(toadd, bit){
    this.data.push({input: toadd, output: bit});
  }

  // {input: { r: 0.03, g: 0.7, b: 0.5 }, output: 0},  // black
  train(){
    classifier.trainBatch(this.data);
 }

  classify(data, callback){
    classifier.classify(data, function(success){
      callback(success);
    })
  }
}
