var Sound = require('react-native-sound');
var Speech = require('react-native-speech');
var settings = require('./settings.json');
  
const SOUNDS_PATH = 'sounds/' + settings.voice + '/';

class SpeechSound {
    constructor(text, soundFile) {
      this.text = text;
      this.audio = null;

      if(soundFile) {
        this.audio = new Sound(soundFile, Sound.MAIN_BUNDLE, (e) => {
          if(e) {
            this.audio = null; 
          }
        });
        debugger;
      }
    }
    
    play(cb) {
      if(this.audio) return this.audio.play(cb);

      Speech.speak({text:this.text, voice: settings.synthesizer}).then(() => {
        if(cb) setTimeout(cb, 750);
      }).catch(err=>console.log("error trying to say \""+this.text+"\"", err));
    }

    stop(cb) {
      if(cb) return cb();
    }
}

const sounds = {};

Speech.supportedVoices()
  .then(locales => {
    console.log(JSON.stringify(locales)); // ["ar-SA", "en-ZA", "nl-BE", "en-AU", "th-TH", ...]
  });

console.log("Loading "+settings.voice+ " sounds");

const alphabetSound = new Sound(SOUNDS_PATH + 'alphabet.m4a', Sound.MAIN_BUNDLE, (e)=>{
  if(e) {
    console.log("No alphabet track found, using the " + settings.synthesizer + " synthesizer");
    sounds.alphabet = { 
      play: function(letter, cb) {
        (new SpeechSound(letter.toLowerCase())).play(cb);
      },
      stop: () => {}
    };
  }
  else {
    sounds.alphabet = { 
      play: function(letter, cb) {
        const seekTo = (letter.charCodeAt(0) - 64) * 2 - 2;
        alphabetSound.setCurrentTime(seekTo + settings.AlphabetSyncDelay).play(cb);
      },
      stop: function() {
        alphabetSound.stop();
      }
    };
  }
});


for(let i in settings.words) {
  let word = settings.words[i];
  let soundFile = SOUNDS_PATH + 'words/'+word+settings.WordsSoundFilesExtension;
  sounds[word] = new SpeechSound(word, soundFile);
}

sounds.wrongLetter = new SpeechSound('Wrong letter', SOUNDS_PATH + 'wrongLetter.wav');
sounds.super = new SpeechSound('Super!', SOUNDS_PATH + 'super.wav');
sounds.wellPlayed = new SpeechSound('Well played!', SOUNDS_PATH + '/wellPlayed.wav');
sounds.playAgain = new SpeechSound('Play again!', SOUNDS_PATH + '/playAgain.wav');

module.exports = sounds;
