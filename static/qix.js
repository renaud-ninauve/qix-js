    var Qix = function() {

        //  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
        //  Although it will work fine with this tutorial, it's almost certainly not the most current version.
        //  Be sure to replace it with an updated version before you start experimenting with adding your own code.

        let game = new Phaser.Game(800, 600, Phaser.AUTO, '', { 
            preload: preload, 
            create: create,
            update: update});
            
        let diamond;
        
        let leftKey; 
        let rightKey; 
        let upKey; 
        let downKey;
        
        let borders;
        let newBorders = [];
        
        function preload () {            
            game.load.image('diamond', 'diamond.png');
        }

        function create () {            
            diamond = game.add.sprite(0, 0, 'diamond');
            diamond.anchor.setTo(0.5, 0.5);            
            
            leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);                    
            downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);                                
            game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR ]);
            
            borders = new Rectangle(0, 0, 800, 600);
        }
        
        function update() {
            let x = diamond.x;
            let y = diamond.y;
            if (rightKey.isDown) {
                x += 1;
            } else if (leftKey.isDown) {
                x -= 1;
            } else if (downKey.isDown) {
                y += 1;
            } else if (upKey.isDown) {
                y -= 1;
            }
            
            if (borders.edgesContains(x, y)) {
                diamond.x = x;
                diamond.y = y;
            } else if (borders.contains(x, y) && newBorders.length == 0) {            

            }
        }
        
        function HBorder(y, x1, x2) {
            this.x1 = x1;
            this.y1 = y;
            this.x2 = x2;
            this.y2 = y;
            
            HBorder.prototype.contains = function(x, y) {                
                return y == this.y1 && x >= this.x1 && x <= this.x2
            };
                       
        }
        
        function VBorder(x, y1, y2) {
            this.x1 = x;
            this.y1 = y1;
            this.x2 = x;
            this.y2 = y2;
            
            VBorder.prototype.contains = function(x, y) {
                console.log(""+this.y);
                return x == this.x1 && y >= this.y1 && y <= this.y2
            };
        }                               
        
        function Rectangle(x1, y1, x2, y2) {
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
            
            Rectangle.prototype.edges = [
                new HBorder(y1, x1, x2),
                new VBorder(x2, y1, y2),
                new HBorder(y2, x1, x2),
                new VBorder(x1, y1, y2)
            ];
            
            Rectangle.prototype.contains = function(x, y) {
                return x >= this.x1 && x >= this.x2
                    && y >= this.y1 && y <= this.y2;
            };
            
            Rectangle.prototype.edgesContains = function(x, y) {
                const edges = this.edges;
                
                return edges.find(function(element) {                
                    return element.contains(x, y);
                }) !== undefined;
            };            
        }
        
        function BorderInProgress(x1, y1, x2, y2) {
            
        }
    };    