var jaccard = require('jaccard');

class train {

  constructor() {
    this.data_pressdown = [];
    this.data_inbetween = [];
  }

  addData(pressdown, inbetween){
    console.log("adding");
    console.log("pressdown data = ", this.data_pressdown.length == 0 );
    if(this.data_pressdown.length == 0){
      console.log("undefined", score);
      // this.data_pressdown.push(pressdown);
    }
    if(this.data_inbetween.length == 0){
      console.log("undefined 2", score);
      // this.data_inbetween.push(inbetween);
    }
    else if(is_same(pressdown)){
      console.log("not undefined");
      average_add_pressdown(pressdown);
      average_add_inbetween(inbetween);
    }
    else{
      console.log("else!");
      //donothing
    }
  }

  is_same(pressdown){
    if(this.data_pressdown.length != pressdown.length){
      return false;
    }
    else{
      for(var i in pressdown){
        if(pressdown[i][0] != this.data_pressdown[i][0]){
          return false;
        }
      }
      return true;
    }
  }

  average_add_pressdown(pressdown){
    //averages into data_pressdown
    for(var i in pressdown) {
      var newval = (pressdown[i][1] + this.data_pressdown[i][1])/2;
      this.data_pressdown[i][1] = newval;
    }

  }

  average_add_inbetween(inbetween) {
    //averages into data_inbetween
      for (i = 0; i < inbetween.length; i++ ) {
          var avg = (inbetween[i] + this.data_inbetween[i])/2;
          this.data_inbetween[i] = avg;
      }
  }

  trainer(callback){
    console.log("training.... using this datapoint");
    console.log("finished batch");
    return callback();
  }

  classify(press, between){
    console.log("Classifying...");
    //jacardi comparison
    var between_index = jaccard.index(between, this.data_inbetween);
    console.log("jaccard index fine");
    var new_arr = [];
    var new_login = [];
    for (a = 0; a < press.length; a++) {
        new_arr[a] = press[a][1];
        new_login = this.data_pressdown[a][1];
    }

    console.log("done classifying, using jaccard");
    var pressdown_index = jaccard.index(new_arr, new_login);
    console.log("jaccard index fine again...returning");
    // 75-25 ratio for jaccari index
    return ((pressdown_index * 0.25) + (between_index * 0.75));
  }
}

module.exports = train;
