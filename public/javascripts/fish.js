/**
 * Created by vsubramaney on 12/31/13.
 */

//Environment variables
var sea = {
    width : 500,
    height : 250
};

window.onload = function(){
    enchant();//Load the enchant class that provide gaming facility
    var game = new Core(sea.width, sea.height); // Create a game
    game.preload('image/FishingNet.png','image/Fish.png', 'http://ie.microsoft.com/testdrive/Performance/FishBowl/Video/Water.mp4'); //Load all assets required for this game
    game.onload = function(){//Function that will be executed once the game started

        //Fishing net set up
        var fishingNet = new Sprite(sea.width, sea.height); //Create the fishing net of same size as game stage
        fishingNet.image = game.assets['http://ie.microsoft.com/testdrive/Performance/FishBowl/Video/Water.mp4']; //Assign fishing net image to the net sprite
        game.rootScene.addChild(fishingNet);//Add the fishing net to the game

        game.rootScene.addChild(game.makeLabel('Add A Friend'));

        // Ideally this data should come from the backend
        var stdFish = {
            image: game.assets['image/Fish.png'],
            width: 32,
            height: 32,
            frames: [0,1,2]
        };

        //Fish set up
        game.rootScene.addChild(game.makeFish(stdFish));
    };
    //Frame per second
    game.fps = 8;
    //Start the game
    game.start();

    //
    game.makeLabel = function(msg){
        var label = new Label(msg);
        label.addEventListener(Event.TOUCH_START, function(){
            // Ideally this data should come from the backend
            var stdFish = {
                image: game.assets['image/Fish.png'],
                width: 32,
                height: 32,
                frames: [0,1,2]
            };
            game.rootScene.addChild(game.makeFish(stdFish));
        });
        return label;
    };

    //create the fish with the given fish properties
    game.makeFish = function(fishProp){
        //Creating a fish sprite
        var fish = new Sprite(fishProp.width, fishProp.height);
        fish.image = fishProp.image;
        //Randomly selecting the position of fish at X & Y
        fish.x = Math.floor(Math.random() * sea.width);
        fish.y = Math.floor(Math.random() * sea.height);
        //Handler attached to move the fish
        fish.addEventListener(Event.ENTER_FRAME, function(){
            if(fish.scaleX == 1){
                fish.x += 3;
                if(fish.x > sea.width - fishProp.width) fish.scaleX = -1;
            }else{
                fish.x -= 3;
                if(fish.x < 0) fish.scaleX = 1;
            }
        });
        fish.frame = fishProp.frames;
        return fish;
    }
}

