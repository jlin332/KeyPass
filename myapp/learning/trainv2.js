var jaccard = require('jaccard');

class train {

  constructor() {
    this.data_pressdown = [];
    this.data_inbetween = [];
  }

  addData(pressdown, inbetween){
    if(this.data_pressdown == undefined){
      this.data_pressdown.push(toadd);
    }

    if(this.data_inbetween == undefined){
      this.data_inbetween == undefined);
    }

    else{
      average_add_pressdown(pressdown);
      average_add_inbetween(inbetween);
    }

  }

  average_add_pressdown(pressdown){
    //averages into data_pressdown
    
  }

  average_add_inbetween(inbetween){
    //averages into data_inbetween

  }

  // {input: { r: 0.03, g: 0.7, b: 0.5 }, output: 0},  // black
  trainer(callback){
    console.log("training.... using this datapoint");
    console.log("finished batch");
    return callback();
  }

  classify(data){
    console.log("Classifying...");
    //jacardi comparison
  }
}

module.exports = train;
