var Sound = require('react-native-sound');
var Speech = require('react-native-speech');
var settings = require('./settings.json');
  
class SpeechSound {
    constructor(text) {
        this.text = text;
    }
    
    play(cb) {
      Speech.speak({text:this.text, voice: settings.voice}).then(() => {
        if(cb) setTimeout(cb, 750);
      }).catch(err=>console.log("error trying to say \""+this.text+"\"", err));
    }
}

const sounds = {};

Speech.supportedVoices()
  .then(locales => {
    console.log(JSON.stringify(locales)); // ["ar-SA", "en-ZA", "nl-BE", "en-AU", "th-TH", ...]
  });

console.log("Loading "+settings.voice+ " sounds");

switch(settings.voice) {
    case 'en-US':
    case 'fr-FR':
      
      sounds.alphabet = { 
        play: function(letter, cb) {
          (new SpeechSound(letter.toLowerCase())).play(cb);
        },
        stop: () => {}
      };
    
      for(let i in settings.words) {
          let word = settings.words[i];
          sounds[word] = new SpeechSound(word)
      }
      sounds.wrongLetter = new SpeechSound('Wrong letter');
      sounds.super = new SpeechSound('Super!');
      sounds.wellPlayed = new SpeechSound('Well played!');
      sounds.playAgain = new SpeechSound('Play again');
      break;
  
    default: 

      const alphabetSound = new Sound('sounds/'+settings.voice+'/alphabet.m4a', Sound.MAIN_BUNDLE, (e)=>{console.log(e)});

      sounds.alphabet = { 
        play: function(letter, cb) {
          const seekTo = (letter.charCodeAt(0) - 64) * 2 - 2;
          alphabetSound.setCurrentTime(seekTo + settings.AlphabetSyncDelay).play(cb);
        },
        stop: function() {
          alphabetSound.stop();
        }
      };

      for(let i in settings.words) {
        let word = settings.words[i];
        let soundFile = 'sounds/'+settings.voice+'/words/'+word+settings.WordsSoundFilesExtension;
        sounds[word] = new Sound(soundFile, Sound.MAIN_BUNDLE, (error) => {});
      }
      
      sounds.wrongLetter = new Sound(settings.voice+'/mauvaiselettre.wav', Sound.MAIN_BUNDLE, ()=>{});
      sounds.super = new Sound(settings.voice+'/super.wav', Sound.MAIN_BUNDLE, ()=>{});
      sounds.wellPlayed = new Sound(settings.voice+'/bienjoue.wav', Sound.MAIN_BUNDLE, ()=>{});
      sounds.playAgain = new Sound(settings.voice+'/onjoueencore.wav', Sound.MAIN_BUNDLE, ()=>{});    
      break;
}

module.exports = sounds;