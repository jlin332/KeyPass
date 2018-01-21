var jaccard = require('jaccard');

class train {

  constructor() {
    this.data_pressdown = [];
    this.data_inbetween = [];
  }

  addData(pressdown, inbetween){
    if(this.data_pressdown == undefined){
      this.data_pressdown.push(pressdown);
    }
    if(this.data_inbetween == undefined){
      this.data_inbetween.push(inbetween);
    }
    else if(is_same(pressdown)){
      average_add_pressdown(pressdown);
      average_add_inbetween(inbetween);
    }
    else{

    }
  }

  is_same(pressdown){
    if(this.data_pressdown.length != pressdown.length){
      return false;
    }
    else{
      for(var i in pressdown){
        if(pressdown[i] != this.data_pressdown[i]){
          return false;
        }
      }
      return true;
    }
  }

  average_add_pressdown(pressdown){
    //averages into data_pressdown
    for(var i in pressdown) {
      var newval = (pressdown[i] + this.data_pressdown[i])/2;
      this.data_pressdown[i] = newval;
    }

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
