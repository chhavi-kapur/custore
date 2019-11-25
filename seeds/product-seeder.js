var Product = require('../models/product');
var mongoose = require('mongoose');

const connectionString = 'mongodb+srv://myuser:abcd1234@custore-authl.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true})
console.log(mongoose.connection.readyState);


var products =  [
    new Product({
        imagePath: 'https://www.cbsnews.com/pictures/auction-of-lord-of-the-rings-props/2/',
        title: 'The One Ring from LOTR',
        description: 'There were many rings made to get to the One Ring to Rule Them All.  Several variants of Sauron\'s ring were developed for Peter Jackson\'s "Lord of the Rings" trilogy, before this master production prototype (by designer Jens Hansen) was approved, from which on-screen rings were created. In sterling silver, with 18 ct. gold plating.',
        price: 80000
    }),

    new Product({
        imagePath: 'https://hips.hearstapps.com/toc.h-cdn.co/assets/cm/14/37/540fe11da84c0_-_forweb4_war.jpg?resize=980:*',
        title: 'The Clarke Sickle Leaf Carpet',
        description: 'Item: The Clark Sickle-Leaf vine scroll and palmette carpet, circa 1700, probably from Kerman Province, in current day Iran. Corcoran Gallery of Art, who received the rug as part of a bequest from William Clark, the mining, banking, and railroad magnate, after his death in 1925.',
        price: 33700000
    }),

    new Product({
        imagePath: 'https://hips.hearstapps.com/toc.h-cdn.co/assets/cm/14/37/540fe0ef12a26_-_3-tnc-design-miami-basel-prologue-by-fredrikson-stallard-swarovski-lg.jpg?resize=980:*',
        title: 'PROLOGUE',
        description: '"Prologue," by Fredrikson Stallard in collaboration with Swarovski, features 8000 golden Swarovski crystals.',
        price: 2000000
    }),

    new Product({
        imagePath: 'https://hips.hearstapps.com/toc.h-cdn.co/assets/cm/14/37/540fe11e1b998_-_forweb7_war.jpg?resize=980:*',
        title: 'THE BAY PSALM BOOK AND THE CODEX LEICESTER',
        description: 'Sotheby\'s holds the record for any printed book with the Bay Pslam Book, the first book printed in the colonies (in 1640) by the Puritans of the Massachusetts Bay Colony.',
        price: 14100000
    }),

    new Product({
        imagePath: 'https://image.invaluable.com/housePhotos/Bonhams/57/657557/H22141-L188537792_original.jpg',
        title: 'Magnificent Beardog Skeleton',
        description: 'The majority of the skeleton is represented by fossil bone elements from two individuals found at the same discovery site. The remaining skeletal elements, including all ribs, both scapulae and most vertebrae have been replaced with modern Ursidae bones of similar size, which have been stained to match the fossil bone.',
        price: 10000
    }),

    new Product({
        imagePath: 'https://images.boredomfiles.com/wp-content/uploads/sites/11/2017/10/valuable-collectible-3.jpg',
        title: '1787 Château Lafite',
        description: 'This isn’t your everyday bottle of 18th century wine. No, this particular bottle was purchased by Thomas Jefferson, who evidently never got around to popping the cork on this Châteaux-of-Bordeaux-produced drink.',
        price: 16000
    }),

    new Product({
        imagePath: 'https://images.boredomfiles.com/wp-content/uploads/sites/11/2017/10/valuable-collectible-8-e1507134313679.jpg',
        title: 'Treskilling yellow stamp',
        description: 'Sweden issued a postage stamp series in 1855 that featured the Swedish coat of arms. This Treskilling—or three units of currency—stamp was normally printed as blue-green, but an error caused a handful to be a yellow color instead.',
        price: 23000
    }),

    new Product({
        imagePath: 'https://images.boredomfiles.com/wp-content/uploads/sites/11/2017/10/valuable-collectible-7.jpg',
        title: 'T-206 Honus Wagner baseball card',
        description: 'The American Tobacco initially printed as many as 200 of these cards, but stopped production when Wagner either wanted more money or didn’t want to be associated with cigarettes.',
        price: 12600
    }),




];

var done = 0;
for (var i=0; i < products.length; i++) {
    products[i].save(function(err, result){
        done++;
        if(done == products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}