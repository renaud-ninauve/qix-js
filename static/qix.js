const start = function() {

        let game = new Phaser.Game(800, 600, Phaser.AUTO, '', { 
            preload: preload, 
            create: create,
            update: update});
            
        let diamond;
        
        let leftKey; 
        let rightKey; 
        let upKey; 
        let downKey;
        
        let path;
        let newPath;
        let bounds = new Rectangle(50, 50, 700, 500);
        let backgroundGroup;
        let newPathGroup;
        
        function preload () {            
            game.load.image('diamond', 'diamond.png');
        }

        function create () {            
            diamond = game.add.sprite(50, 50, 'diamond');
            diamond.anchor.setTo(0.5, 0.5);            
            
            leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);                    
            downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);                                
            game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR ]);
            
            path = new Path()
                .moveTo(0, 0)
                .goRight(699)
                .goDown(499)
                .goLeft(699)
                .goUp(499);
            path.updateInsideRects();
                
            console.log(path.points);
            

            // create a group for our graphics
            backgroundGroup = game.add.group();
    
            // create the background
            let backgroundGraphics = game.make.graphics();
            backgroundGraphics.lineStyle(1, 0xFFFFFF, 1);
            backgroundGraphics.drawRect(bounds.x1, bounds.y1, bounds.x2, bounds.y2);
            backgroundGroup.add(backgroundGraphics);
            
            newPathGroup = game.add.group();
            let newPathGraphics = game.make.graphics();
            newPathGraphics.lineStyle(1, 0xFFFFFF, 1);
            //newPathGraphics.drawRect(bounds.x1, bounds.y1, bounds.x2, bounds.y2);
            newPathGroup.add(newPathGraphics);            

            // create an instance of graphics, then add it to a group
            //let graphics2 = this.game.make.graphics();
            //graphics2.lineStyle(2, 0xFFFFFF, 1);
            //graphics2.drawRect(500, 200, 250, 250);
            //group.add(graphics2); // added directly to the group as a child
            
        }
        
        function update() {
            let x = diamond.x - bounds.x1;
            let y = diamond.y - bounds.y1;
            
            var deltaX;
            var deltaY;
            if (rightKey.isDown) {
                deltaX = 1;
                deltaY = 0;                            
            } else if (leftKey.isDown) {
                deltaX = -1;
                deltaY = 0;                            
            } else if (downKey.isDown) {
                deltaX = 0;
                deltaY = 1;
            } else if (upKey.isDown) {
                deltaX = 0;
                deltaY = -1;
            } else {
                return;
            }            
                        
            if (path.isAlong(x + deltaX, y + deltaY)) {
                diamond.x = x + deltaX + bounds.x1;
                diamond.y = y + deltaY + bounds.y1;  
                newPath = undefined;
            } else if (path.isInside(x + deltaX, y + deltaY)) {                            
                if (!newPath) {
                    newPath = new Path();
                    newPath.moveTo(x, y);                    
                    let newPathGraphics = game.make.graphics();
                    newPathGraphics.lineStyle(1, 0xFFFFFF, 1);
                    newPathGroup.add(newPathGraphics);                                
                } 
                
                newPath.goToOffset(deltaX, deltaY);                    
                const previous = newPath.points[newPath.points.length-1];
                
                let newPathGraphics = newPathGroup.getTop();
                newPathGraphics.moveTo(bounds.x1 + previous.x, bounds.y1 + previous.y);
                newPathGraphics.lineTo(bounds.x1 + x, bounds.y1 + y);                
                                
                diamond.x = x + deltaX + bounds.x1;
                diamond.y = y + deltaY + bounds.y1;                
            }
            
        }                       
    };    
                             
        
function Rectangle(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;                        
}
         
const Point = function(x, y) {
    this.x = x;
    this.y = y;
}
     
const Horizontal = function(y, minX, maxX) {
    this.y = y;
    this.minX = minX;
    this.maxX = maxX;
}        

const Vertical = function(x, minY, maxY) {
    this.x = x;
    this.minY = minY;
    this.maxY = maxY;
}

const Path = function() {
    this.points = [new Point(0, 0)];     
    this.insideRects = [];
    
    Path.prototype.moveTo = function(x, y) {
        const current = this.points[this.points.length-1];
        current.x = x;
        current.y = y;
        return this;
    };
    
    Path.prototype.goUp = function(h) {    
        const current = this.points[this.points.length-1];
        this.points.push(new Point(current.x, current.y-h));
        return this;
    };
    
    Path.prototype.goDown = function(h) {
        const current = this.points[this.points.length-1];
        this.points.push(new Point(current.x, current.y+h));
        return this;
    };   
    
    Path.prototype.goLeft = function(w) {
        const current = this.points[this.points.length-1];
        this.points.push(new Point(current.x-w, current.y));        
        return this;
    };
    
    Path.prototype.goRight = function(w) {
        const current = this.points[this.points.length-1];
        this.points.push(new Point(current.x+w, current.y));
        return this;
    };           
    
    Path.prototype.goToOffset = function(offsetX, offsetY) {
        const current = this.points[this.points.length-1];
        const newPoint = new Point(current.x+offsetX, current.y+offsetY);
        if (this.points.length < 2) {
            this.points.push(newPoint);
            return;
        }
        
        const line = [this.points[this.points.length-2], current];
        if (line[0].x == line[1].x && line[0].y < line[1].y && offsetY > 0
            || line[0].x == line[1].x && line[0].y > line[1].y && offsetY < 0) {
            current.y += offsetY;
        } else if (line[0].y == line[1].y && line[0].x < line[1].x && offsetX > 0
            || line[0].y == line[1].y && line[0].x > line[1].x && offsetX < 0) {
            current.x += offsetX;
        } else {
            this.points.push(newPoint);
        }
        return this;
    }
    
    Path.prototype.isInside = function(x, y) {
        return !this.insideRects.every(function(r){
            return !(x >= r.x1 && x <= r.x2
                && y >= r.y1 && y <= r.y2);
        });
    };

    Path.prototype.isAlong = function(x, y) {        
        return !this.lines().every(function(l){
            if (l instanceof Horizontal) {
                return !(y==l.y && x >= l.minX && x <= l.maxX);
            }
            return !(x==l.x && y >= l.minY && y <= l.maxY);
        });
    };
    
    Path.prototype.lines = function() {
        return this.points.reduce(function(acc, p, index, points){
            if (index == 0) {
                return acc;
            }
            const origin = points[index-1];
            const minX = Math.min(origin.x, p.x);
            const maxX = Math.max(origin.x, p.x);
            const minY = Math.min(origin.y, p.y);
            const maxY = Math.max(origin.y, p.y);
            if (minY == maxY) {
                acc.push(new Horizontal(minY, minX, maxX));                
            } else {
                acc.push(new Vertical(minX, minY, maxY));                
            }
            return acc;
        }, []);    
    }
    
    Path.prototype.area = function() {
        return this.insideRects.reduce(function(acc, r){
            const width = r.x2 - r.x1;
            const height = r.y2 - r.y1;
            return acc + width * height;
        }, 0);
    };
    
    Path.prototype.updateInsideRects = function() {
        const byValueAsc = function(a, b) {
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        };
        const xyValues = this.points.reduce(function(acc, p){
            acc[0].add(p.x);
            acc[1].add(p.y);
            return acc;
        }, [new Set(), new Set()]);
        
        console.log(xyValues);
        
        // create arrays from sets
        const xValues = [];
        const yValues = [];        
        xyValues[0].forEach(function(x){
            xValues.push(x);
        });
        xyValues[1].forEach(function(y){
            yValues.push(y);
        });               
        
        // sort arrays
        const sortedX = xValues.sort(byValueAsc);
        const sortedY = yValues.sort(byValueAsc);
        console.log(sortedX);
        console.log(sortedY);
        
        // generate rectangles
        const rects = [];
        for(let yEntry of sortedY.entries()) {
            const yIndex = yEntry[0];
            if (yIndex == 0) {
                continue;
            }        
            for(let xEntry of sortedX.entries()) {
                const xIndex = xEntry[0];                
                if (xIndex == 0) {
                    continue;
                }
                const minX = sortedX[xIndex-1];
                const minY = sortedY[yIndex-1];
                const maxX = xEntry[1];
                const maxY = yEntry[1];
                
                rects.push(new Rectangle(minX, minY, maxX, maxY));
            }
        }
        console.log(rects);        
        console.log(rects.length);        
        
        // extract horizontals and verticals
        const hvLines = this.points.reduce(function(acc, p, index, points){
            if (index == 0) {
                return acc;
            }
            const origin = points[index-1];
            const minX = Math.min(origin.x, p.x);
            const maxX = Math.max(origin.x, p.x);
            const minY = Math.min(origin.y, p.y);
            const maxY = Math.max(origin.y, p.y);
            if (minY == maxY) {
                acc[0].push(new Horizontal(minY, minX, maxX));                
            } else {
                acc[1].push(new Vertical(minX, minY, maxY));                
            }
            return acc;
        }, [[], []]);
        const horizontals = hvLines[0];
        const verticals = hvLines[1];
        console.log(hvLines);
        
        // filter inside rectangles
        this.insideRects = rects.filter(function(r){
            const midX = (r.x1+r.x2)/2;
            const midY = (r.y1+r.y2)/2;
            
            const nbAboveAndBellow = horizontals.reduce(function(acc, h){
                if (!(midX > h.minX && midX < h.maxX)) {
                    return acc;
                }
                if (midY < h.y) {
                    acc[0] += 1;
                    return acc;
                }
                if (midY > h.y) {
                    acc[1] += 1;
                    return acc;
                }                
            }, [0, 0]);
            
            const nbLeftAndRight = verticals.reduce(function(acc, v){
                if (!(midY > v.minY && midY < v.maxY)) {
                    return acc;
                }
                if (midX < v.x) {
                    acc[0] += 1;
                    return acc;
                }
                if (midX > v.x) {
                    acc[1] += 1;
                    return acc;
                }                
            }, [0, 0]);
            
            return nbAboveAndBellow[0] % 2 != 0
                    && nbAboveAndBellow[1] % 2 != 0
                    && nbLeftAndRight[0] % 2 != 0
                    && nbLeftAndRight[1] % 2 != 0
        });

        
        console.log(this.insideRects.length);
    };
};

exports.Path = Path;
exports.start = start;
