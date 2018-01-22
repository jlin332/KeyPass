var jaccard = require('jaccard');
var distance = require('euclidean-distance');

class train {

  constructor() {
    this.data_pressdown = [];
    this.data_inbetween = [];
  }

  addData(pressdown, inbetween) {
      console.log("begin of addData");
      console.log(this.data_pressdown);
      console.log(pressdown);
    if(this.data_pressdown.length == 0) {
      this.data_pressdown = pressdown;
      console.log("got pushed");
    }
    if (this.data_inbetween.length == 0) {
        console.log("got pushed");
       this.data_inbetween = inbetween;
    }
    else {
        for (let i = 0; i < pressdown.length; i = i + 1 )  {
          var newval = (pressdown[i] + this.data_pressdown[i])/2;
          this.data_pressdown[i] = newval;
          console.log("made it here");
        }
        for (let i = 0; i < inbetween.length; i = i + 1 ) {
            var avg = (inbetween[i] + this.data_inbetween[i])/2;
            this.data_inbetween[i] = avg;
        }
        console.log("is_same");
    }
    console.log("size of" + this.data_pressdown);
  }

  is_same(pressdown) {
    if(this.data_pressdown.length != pressdown.length){
        console.log(this.data_pressdown.length)
        console.log(pressdown.length);
        console.log("first false");
      return false;
    }
    else//std:cout<<""<<std::endl;
      for (i in pressdown){
        if(pressdown[i] != this.data_pressdown[i]){
            console.log("forloop false " + i);
          return false;
        }
      }
      return true;
    }


  classify(press, between) {
    console.log("Classifying...");
    //jacardi comparison
     console.log("between valuies");
     console.log(between);
     console.log(this.data_inbetween);
    // var between_index = jaccard.index(between, this.data_inbetween);
    // console.log("between index " +  between_index);
     console.log("press values");
     console.log(press);
     console.log(this.data_pressdown);
     var between_sum = 0;
     for (let a = 0; a < this.data_inbetween.length; a++) {
        between_sum += this.data_inbetween[a];
     }
     var press_sum = 0;
     for (let a = 0; a < this.data_pressdown.length; a++) {
         press_sum += this.data_pressdown[a];
     }
    // var pressdown_index = jaccard.index(press, this.data_pressdown);
    // console.log(pressdown_index);
    // 75-25 ratio for jaccari index
    var score1 = Math.abs(distance(press, this.data_pressdown))/press_sum;
    var score2 = Math.abs(distance(between, this.data_inbetween))/Math.abs(between_sum);
    return (score1 + score2);
  }
}
module.exports = train;
