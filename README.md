# TypingMyFirstWords iPad app

My 3-year old daughter Laura was sitting on my laps and she was playing with the keyboard of my laptop.
I opened up "TextEdit", set the font size to the maximum, caps lock on, and I started to teach her the keys and how to write her name, "Mommy" and "Daddy". 

Everytime she would press a key, I would say the letter out loud. And whenever the world would be completed, I would say it out loud as well. 

I figured that I could write an app to do just that.

![](http://cl.ly/3X3t1e0P2x2B/Screen%20Shot%202015-12-26%20at%2011.18.30%20PM.png)

I also took the opportunity to give a try to `react-native`.

I welcome `pull requests` to make this app better for our kids :-)

## Installation

Just drag and drop the `/build/TypingMyFirstWords.app` into iTunes and sync your iPad.

## Installation for development

### Requirements

- XCode 7 or higher
- Node, npm

And follow the [React Native Getting Started](http://facebook.github.io/react-native/docs/getting-started.html) guide.

Then:
	
	npm install
    npm install -g rnpm 
    
	# Automatically link the native modules to XCode
    rnpm link react-native-sound
    rnpm link react-native-speech
    
	# Open the XCode project
	open ios/TypingMyFirstWords.xcodeproj
	
Then build and run it in the simulator or directly on your device.

## Personalizing

It's much nicer for your child to learn familiar words (including family names) and to hear them with a familiar voice. This section will show you how you can personalize the app to edit the list of words, change images and the voice.

### Add a word

You can edit the list of words by editing the `words[]` array in the `settings.json` file.
Each word needs to have a corresponding image in the `images/words/` directory. And each image needs to be referenced in the `images.json` file.

### Voice

By default, the app is using the synthesizer voice in English. There are a lot of others languages available, see the full list below. For example, for French, you could change the `voice` value to `fr-FR` in `settings.json`.

If you have more time, I highly encourage you to record your own voice like I did in `sounds/xdamman/`.

To add a new voice, do the following

1. Copy paste the `sounds/xdamman/` directory and rename it (e.g. `daddy`)
1. Override the audio files with your own files (see below some tips to do this easily). Each file in the `sounds/$voice/words/` should be named after a word.
1. In `settings.json`, change the `voice` parameter to that new directory's name

### App icons

You can easily generate all the AppIcons using

    ./generateAppIcons.sh path/to/large_square_icon.jpg
    

### How to easily generate new audio files?

#### Alphabet

To edit the pronunciation of the alphabet: record your voice in a `.m4u` file (default file format when you record a new audio file with `QuickTime` on your Mac). You have to pronounce each letter with a 2s interval (use a stopwatch, at every other second, say the next letter). You may need to crop your file to make sure that it starts without a blank. Then move the file to `sounds/$voice/alphabet.m4u`. 

#### Words

It's easier to records all the words at once. Fire up `QuickTime` and start a new audio recording. Then say all the words that you want to record and make sure to leave a silence of about 1s between each word.

Then you can use the command line utility `sox` to automatically split that audio file into one file per word. To install `sox`, do `brew install sox`.
You will also need `ffmpeg`. To install it on your mac: `brew install ffmpeg --with-fdk-aac --with-faac`

    # Sox does't like the .m4a format, so we first convert it to a .wav file
	ffmpeg -i words.m4a words.wav

	# Now we can split the audio file whenever there is a silence:
	sox -V3 words.wav silence 1 0.1t 0.2% 1 0.3t 0.2% : newfile : restart
	
You may have to play with some of those parameters depending on the quality of your recording ([see man page](http://sox.sourceforge.net/sox.html)):


	# -V3 for verbosity (optional)
	# 0.1t stands for 0.1s at the beginning of the sequence for silence detection
	# 0.3t stands for 0.3s at the end of the sequence for silence detection
	# 0.2% is the threshold to detect a silence
	
Now, you should have a bunch of `output00x.wav` in your working directory. Rename them with the name of the corresponding word, then make sure you move them to the `sounds/$voice/words/` directory and that those words are listed in the `words[]` array in `settings.json`.


---

Available synthetic voices: 
["ar-SA","cs-CZ","da-DK","de-DE","el-GR","en-AU","en-GB","en-IE","en-US","en-ZA","es-ES","es-MX","fi-FI","fr-CA","fr-FR","he-IL","hi-IN","hu-HU","id-ID","it-IT","ja-JP","ko-KR","nl-BE","nl-NL","no-NO","pl-PL","pt-BR","pt-PT","ro-RO","ru-RU","sk-SK","sv-SE","th-TH","tr-TR","zh-CN","zh-HK","zh-TW"]