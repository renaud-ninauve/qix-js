const Qix = require("./Qix");
const assert = require("assert");

describe('Path', function() {
    
    describe('#isInside()', function() {
    it('returns true when inside', function() {
        let path = new Qix.Path()
            .moveTo(0, 2)
            .goRight(1)
            .goUp(1)
            .goRight(1)
            .goUp(1)
            .goRight(1)
            .goDown(3)
            .goLeft(1)
            .goDown(1)
            .goRight(2)
            .goDown(1)
            .goLeft(3)
            .goUp(1)
            .goLeft(1)
            .goUp(2);
        path.updateInsideRects();
        assert(path.isInside(1, 3));
    });        
    });      
    
    describe('#isInside()', function() {
    it('returns true when on path', function() {
        let path = new Qix.Path()
            .moveTo(0, 2)
            .goRight(1)
            .goUp(1)
            .goRight(1)
            .goUp(1)
            .goRight(1)
            .goDown(3)
            .goLeft(1)
            .goDown(1)
            .goRight(2)
            .goDown(1)
            .goLeft(3)
            .goUp(1)
            .goLeft(1)
            .goUp(2);
        path.updateInsideRects();
        assert(path.isInside(1, 2));
    });        
    });      

    describe('#isInside()', function() {
    it('returns false when outside', function() {
        let path = new Qix.Path()
            .moveTo(0, 2)
            .goRight(1)
            .goUp(1)
            .goRight(1)
            .goUp(1)
            .goRight(1)
            .goDown(3)
            .goLeft(1)
            .goDown(1)
            .goRight(2)
            .goDown(1)
            .goLeft(3)
            .goUp(1)
            .goLeft(1)
            .goUp(2);
        path.updateInsideRects();
        assert(!path.isInside(0.5, 0.5));
    });        
    });      
    
    describe('#isInside()', function() {
    it('returns false when outside', function() {
        let path = new Qix.Path()
            .moveTo(0, 2)
            .goRight(1)
            .goUp(1)
            .goRight(1)
            .goUp(1)
            .goRight(1)
            .goDown(3)
            .goLeft(1)
            .goDown(1)
            .goRight(2)
            .goDown(1)
            .goLeft(3)
            .goUp(1)
            .goLeft(1)
            .goUp(2);
        path.updateInsideRects();
        assert(!path.isInside(2.5, 3.5));
    });        
    });      
    
    
    describe('#isAlong()', function() {
    it('returns true when along path', function() {
        let path = new Qix.Path()
            .moveTo(0, 2)
            .goRight(1)
            .goUp(1)
            .goRight(1)
            .goUp(1)
            .goRight(1)
            .goDown(3)
            .goLeft(1)
            .goDown(1)
            .goRight(2)
            .goDown(1)
            .goLeft(3)
            .goUp(1)
            .goLeft(1)
            .goUp(2);
        path.updateInsideRects();
        assert(path.isAlong(0.5, 2));
    });        
    });       

    describe('#isAlong()', function() {
    it('returns false when along path', function() {
        let path = new Qix.Path()
            .moveTo(0, 2)
            .goRight(1)
            .goUp(1)
            .goRight(1)
            .goUp(1)
            .goRight(1)
            .goDown(3)
            .goLeft(1)
            .goDown(1)
            .goRight(2)
            .goDown(1)
            .goLeft(3)
            .goUp(1)
            .goLeft(1)
            .goUp(2);
        path.updateInsideRects();
        assert(path.isAlong(0, 2));
    });        
    });       
    
    describe('#isAlong()', function() {
    it('returns false when inside path', function() {
        let path = new Qix.Path()
            .moveTo(0, 2)
            .goRight(1)
            .goUp(1)
            .goRight(1)
            .goUp(1)
            .goRight(1)
            .goDown(3)
            .goLeft(1)
            .goDown(1)
            .goRight(2)
            .goDown(1)
            .goLeft(3)
            .goUp(1)
            .goLeft(1)
            .goUp(2);
        path.updateInsideRects();
        assert(!path.isAlong(1, 3));
    });        
    });           
});    


