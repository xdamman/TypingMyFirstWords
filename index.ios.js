/**
 * WritingMyFirstWords.app
 * https://github.com/xdamman/WritingMyFirstWords.app
 */
'use strict';

var React = require('react-native');
var _ = require('lodash');
var images = require('./images');
var sounds = require('./sounds');
var settings = require('./settings');

// const words = ["papa"];
let wordsLeft = [];

const soundFilesExtension = '.wav';

images['blank'] = require('./images/blank.jpg');

var {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
} = React;

// It would be borring to always hear the same exclamations
// So we only play them with a certain probility (1 = play all the time, 0.5 play half the time)
var sometimes = function(fn, probability=0.5) {
    if(Math.random() <= probability) fn();
}

var playRandomly = function(array_sounds, cb) {
    var index = Math.floor(Math.random()*array_sounds.length);
    return array_sounds[index].play(cb);
}

var TypingMyFirstWords = React.createClass({
    
  fetchData: function() {
    
      console.log("Fetching data");
      return;
      
      const query = "kiwi";
      const url = 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=' + query;
      fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        console.log("responseData:", responseData);
      })
      .done();   
  },
  
  componentDidMount: function() {
    this.fetchData();  
  },
    
  getInitialState: function() {
    const word = this.getWord();
    sounds[word].play();
    this.updateText();
    return {
        word: word,
        firstLetters: word.substr(0,1),
        text: '',        
        image: images.blank,
        success: false
    }    
  },
  
  getWord: function() {
      if(wordsLeft.length == 0)
        wordsLeft = _.clone(settings.words);
        
      const currentWord = wordsLeft[Math.floor(Math.random()*wordsLeft.length)];
      wordsLeft = _.pull(wordsLeft, currentWord);
      return currentWord;
  },
  
  render: function() {
      this.refs = {};
      return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>             
                <Text style={styles.title}>{this.state.firstLetters.toUpperCase()}</Text>
                <TextInput
                    ref={(component) => this.refs.textInput = component}
                    style={styles.textInput}
                    onChangeText={this.handleTextChanged}
                    autoFocus={true}
                    autoCorrect={false}
                    maxLength={30}
                    />
            </View>
            <Image
                source={this.state.image} 
                style={styles.image}    
                />
        </View>  
      );
  },
  
  updateText: function(text='') {
      setTimeout(() => this.refs.textInput.setNativeProps({text:text.toUpperCase()}));
  },
  
  handleTextChanged: function(text) {
      if(!text) return;
      
      text = text.toLowerCase();

      // We normalize the text to upper case
      this.updateText(text);
      
      // setTimeout(() => { this.setState({text: text.toUpperCase()})});
      
      // We play the current letter
      const lastLetter = text[text.length-1].toUpperCase();    
      if(!lastLetter.match(/[A-Z]/)) {
          // Invalid character: we delete it
          return this.updateText(text.substr(0,text.length-1));
          // return setTimeout(() => { this.setState({text: text.substr(0,text.length-1)}); });
      }
      sounds.alphabet.play(lastLetter);

      this.setState({text, success: (sounds[text])});

      setTimeout(() => {
          sounds.alphabet.stop();
            
          if(text != this.state.word.substr(0,text.length)) {
            sounds.wrongLetter.play();
            text = text.substr(0,text.length -1);
            this.updateText(text.toUpperCase());
            return;
          }
          else {
              this.setState({firstLetters: this.state.word.substr(0,text.length+1)})
          }

          if(images[text] || sounds[text]) {
                    
            if(images[text]) this.setState({image: images[text]});
            if(sounds[text]) {
                sounds[text].play(()=> {
                    sometimes(() => {
                        playRandomly([sounds.super, sounds.wellPlayed], () => sometimes(()=>sounds.playAgain.play()));
                    }, 0.75);
                });
            }
            
            setTimeout(() => {
              this.setState(this.getInitialState());  
            }, 5000)
          }         
      }, 1100);
  }
  
});

const borderColor = '#B4CFEC';
const textColor = '#9C8064';
var styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
    paddingBottom: 20,
  },
  leftContainer: {
    flex: 1,  
    flexDirection: 'column',
    marginLeft: 50,
  },
  title: {
    fontSize: 60,
    marginBottom: 8,
    marginTop: 8,
    marginLeft: 3,
    color: textColor,
  },
  textInput: {
      width: 375,
      height: 60,
      fontSize: 60,
      borderColor: borderColor,
      borderRadius: 5,
      borderWidth: 1,
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: 'contain',
    marginTop: 50,
    marginRight: 50,
    marginBottom: 50,
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: borderColor,
  },
  successImage: {
      width: 300,
      height: 150,
      margin: 40,
      opacity: 0
  },
  visible: {
      opacity: 1
  },
});

AppRegistry.registerComponent('TypingMyFirstWords', () => TypingMyFirstWords);
