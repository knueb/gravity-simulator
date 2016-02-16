var ctx = document.querySelector("canvas").getContext("2d");
var dt = 1;
var dx = 1;
var dv = 0.3;
var pi = Math.PI;
var gc = 1;

function Vector(x, y) {
    this.x = x;
    this.y = y;
}


Vector.prototype = {
    add: function (v) {
        return new Vector(this.x + v.x, this.y + v.y);
    },
    
    scale: function (c) {
        return new Vector(c * this.x, c * this.y);
    },
    
    sub: function (v) {
        return this.add(v.scale(-1));
    },
    
    abs: function () {
        return Math.pow(Math.pow(this.x,2)+Math.pow(this.y,2),0.5);
    }
};

function gravAcc(delr, G, M) {
    return delr.scale(G*M/Math.pow(delr.abs(),3));
}

function Ball() {
    this.radius = 10;
    this.color = "navy";
    this.r = new Vector(150, 50);
    this.v = new Vector(1.7, 0);
    this.a = new Vector(0, 0);
    this.mass = 10;
}

Ball.prototype = {
    newr: function () {
        this.r = this.r.add(this.v.scale(dt));
    },
    
    
    newv: function () {
        this.v = this.v.add(this.a.scale(dt));
    },
    
    
    newa: function () {
        //this.a = new Vector(0.03, 0);
        this.a = gravAcc(this.r.sub(new Vector(250,250)),-gc,1000)
    },
    
    drawball: function () {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.r.x, this.r.y, this.radius, 0, 2 * pi);
        ctx.fill();
    }
};


var myball = new Ball();

function drw() {
    ctx.clearRect(0, 0, 500, 500);
    myball.newa();
    myball.newv();
    myball.newr();
    myball.drawball();
    ctx.beginPath();
    ctx.arc(250, 250, 10, 0, 2 * pi);
    ctx.fill();
    requestAnimationFrame(drw);
}


function dostuff() {
    drw();
}


