// React-native doesn't support loading local images programmatically :-(
// So we need to require them manually here below

const images = {};

// en-US
images['mommy'] = require('./images/words/mommy.jpg');
images['daddy'] = require('./images/words/daddy.jpg');
images['tiger'] = require('./images/words/tiger.jpg');
images['house'] = require('./images/words/house.jpg');
images['olive'] = require('./images/words/olive.jpg');
images['kiwi'] = require('./images/words/kiwi.jpg');
images['kaki'] = require('./images/words/kaki.jpg');
images['chocolate'] = require('./images/words/chocolate.jpg');
images['biscuit'] = require('./images/words/biscuit.jpg');
images['baby'] = require('./images/words/baby.jpg');

// fr-FR
images['maman'] = require('./images/words/maman.jpg');
images['caroline'] = require('./images/words/caroline.jpg');
images['xavier'] = require('./images/words/xavier.jpg');
images['balle'] = require('./images/words/balle.jpg');
images['banane'] = require('./images/words/banane.jpg');
images['bateau'] = require('./images/words/bateau.jpg');
images['train'] = require('./images/words/train.jpg');
images['papa'] = require('./images/words/papa.jpg');
images['laura'] = require('./images/words/laura.jpg');
images['papinou'] = require('./images/words/papinou.jpg');
images['maminou'] = require('./images/words/maminou.jpg');
images['maison'] = require('./images/words/maison.jpg');
images['tigre'] = require('./images/words/tigre.jpg');
images['chocolat'] = require('./images/words/chocolat.jpg');
images['bebe'] = require('./images/words/bebe.jpg');

module.exports = images;
