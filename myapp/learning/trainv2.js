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

  average_add_inbetween(inbetween) {
    //averages into data_inbetween
        for (i = 0; i < inbetween.length; i++ ) {
            var avg = (inbetween[i] + this.data_inbetween[i])/2;
            this.data_inbetween[i] = avg;
        }
  }

  // {input: { r: 0.03, g: 0.7, b: 0.5 }, output: 0},  // black
  trainer(callback){
    console.log("training.... using this datapoint");
    console.log("finished batch");
    return callback();
  }

  classify(press, between){
    console.log("Classifying...");
    //jacardi comparison
    var between_index = jaccard.index(between, this.data_inbetween);
    var new_arr = [];
    var new_login = [];
    for (a = 0; a < press.length; a++) {
        new_arr[a] = press[a][1];
        new_login = this.data_pressdown[a][1];
    }
    var pressdown_index = jaccard.index(new_arr, new_login);
    // 75-25 ratio for jaccari index
    return ((pressdown_index * 0.25) + (between_index * 0.8));
  }
}

module.exports = train;
