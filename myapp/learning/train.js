var jaccard = require('jaccard');

class train {

  constructor() {
    this.data_pressdown = {};
    this.data_inbetween = {};
  }

  addData(pressdown, inbetween) {
      console.log("begin of addData");
    if(this.data_pressdown.length == 0) {
      this.data_pressdown = pressdown;
      console.log("got pushed");
      console.log(pressdown);
    }
    if(this.data_inbetween.length == 0) {
        console.log("got pushed");
       this.data_inbetween = inbetween;
       console.log(inbetween);
    } else if(this.is_same(pressdown)){
        console.log(pressdown)
        console.log(this.data_pressdown);
      for (i = 0; i < pressdown.length; i++ )  {
        var newval = (pressdown[i][1] + this.data_pressdown[i][1])/2;
        this.data_pressdown[i][1] = newval;
      }
      for (i = 0; i < inbetween.length; i++ ) {
          var avg = (inbetween[i] + this.data_inbetween[i])/2;
          this.data_inbetween[i] = avg;
      }
      console.log("is_same");
  } else {
        for (i = 0; i < pressdown.length; i++ )  {
          var newval = (pressdown[i][1] + this.data_pressdown[i][1])/2;
          this.data_pressdown[i][1] = newval;
        }
        for (i = 0; i < inbetween.length; i++ ) {
            var avg = (inbetween[i] + this.data_inbetween[i])/2;
            this.data_inbetween[i] = avg;
        }
        console.log("is_same");
    }
  }

  is_same(pressdown) {
    if(this.data_pressdown.length != pressdown.length){
        console.log(this.data_pressdown.length)
        console.log(pressdown.length);
        console.log("first false");
      return false;
    }
    else{
      for (i in pressdown){
        if(pressdown[i][0] != this.data_pressdown[i][0]){
            console.log("forloop false " + i);
          return false;
        }
      }
      return true;
    }
  }

  classify(press, between){
    console.log("Classifying...");
    //jacardi comparison
    var between_index = jaccard.index(between, this.data_inbetween, function() {
        console.log("ran between index");
    });
    console.log(between_index);
    var new_arr = [];
    var new_login = [];
    for (var a = 0; a < press.length; a++) {
        new_arr[a] = press[a][1];
        new_login = this.data_pressdown[a][1];
    }
    console.log("done classifying, using jaccard");
    var pressdown_index = jaccard.index(new_arr, new_login, function() {
        console.log("jaccard index fine again...returning");
    });
    // 75-25 ratio for jaccari index
    return ((pressdown_index * 0.25) + (between_index * 0.75));
  }
}

module.exports = train;
