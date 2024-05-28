/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();

    for (let i=0;i<this.words.length; i +=1) {
      let word = this.words[0];
      let nextWord = this.words[0+1] || null; //possible last word in the sentence.

      if(chains.has(word)) {  //if the map has the key 'word' it will return true.
        chains.get(word).push(nextWord); //grab the value array for the key 'word'. push/append the 'nextWord' into the value array.
      }
      else {
        chains.set(word, [nextWord]); //create a key:[value] with 'word' and 'nextWord' in the array. 
      }

      this.chains = chains;
    }

  };


  /** return random text from chains */
  choice(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  makeText(numWords = 100) {
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys)
    let output = [];

    while (output.length < numWords && key !== null) {
      output.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }

    return output.join("");
  }
}

module.exports = MarkovMachine;