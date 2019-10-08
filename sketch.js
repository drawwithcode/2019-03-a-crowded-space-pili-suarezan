var misColores = ['#67D0F9', '#97E1F7', '#B9EDF9', '#CAF2F9', '#BFE0E2', '#FFFFFF'];
var coloresDeBurbujas = ['#97E1F7', '#B9EDF9', '#CAF2F9'];
var coloresEspuma = ['#97E1F7', '#B9EDF9', '#CAF2F9'];
var burbujas = [];
var nBurbujas = 20;

function preload() {
  // put preload code here
}

function setup() { //para repetir solo una vez
  createCanvas(windowWidth, windowHeight);
  frameRate(15);

  for (var i = 0; i < nBurbujas; i++) {

    var miBurbuja = new Burburja(random(0, width), random(0, height), random(10, 50));
    burbujas.push(miBurbuja);

  }


}

function draw() {

  background(color(misColores[0]));
  noStroke();

  //espuma fija

  for (var p = windowWidth / 2 - 250; p < windowWidth / 2 + 260; p += 50) {
    for (var i = windowHeight - 290; i < windowHeight - 200; i += 50) {
      {
        var dim = random(50, 90);
        ellipse(p, i, dim);

        var selector = floor(random() * coloresEspuma.length);
        var colores1 = coloresEspuma[selector];

        fill(color(colores1));
      }
    }
  }

  //Bañadera

  fill(color(misColores[5]));
  rect(windowWidth / 2 - 300, windowHeight - 290, 600, 200, 0, 0, 150, 150);

  var a = 50;
  var b = 40;
  ellipse(windowWidth / 2 - 210, windowHeight - 85, a, b);
  ellipse(windowWidth / 2 + 210, windowHeight - 85, a, b);

  fill(color(misColores[4]));
  rect(windowWidth / 2 - 310, windowHeight - 290, 620, 30, 7);


  //Clean up the lather mess
  fill(color(misColores[4]));
  rect(windowWidth - 10000, windowHeight - 65, 80000, 900);

  textFont("Arial");
  noStroke();
  fill(color(misColores[5]));
  textSize(40);
  text('- Clean up the lather mess -', windowWidth / 2 - 250, windowHeight - 20);


  for (var jiji = 0; jiji < burbujas.length; jiji++) {
    burbujas[jiji].move();
    burbujas[jiji].display();

  }

}

function mousePressed() {
  for (var b = 0; b < burbujas.length; b++)
    burbujas[b].click();
}

function Burburja(_x, _y, _diametro, _color) {
  this.size = _diametro;
  this.x = _x;
  this.y = _y;

  var selector = floor(random() * coloresDeBurbujas.length);
  var colores = coloresDeBurbujas[selector];

  this.color = colores;
  this.speed = 1;

  //La dirección de las burbujas(si es negativo empieza de abajo para arriba o de derecha a izquierda, si es 0 alguno de los dos, no se mueve en el eje)

  var xIncrease = 0;
  var yIncrease = -2;


  this.move = function() {
    this.x += xIncrease * this.speed;
    this.y += yIncrease * this.speed;

    if (this.y >= windowHeight || this.y < 0) {

      yIncrease = -yIncrease;
    }

    if (this.x >= windowWidth || this.x < 0) {
      xIncrease = -xIncrease;

    }
    this.display = function() {
      fill(this.color);
      ellipse(this.x, this.y, this.size);
      //burbuja
      //brillo
      push();
      translate(this.x, this.y);
      fill(color(misColores[5]));
      ellipse(-this.size / 4, -this.size / 4, this.size / 5);
      pop();
    }

    this.click = function() {
      var d = dist(mouseX, mouseY, this.x, this.y);
      if (d < 20) {
        this.size = 0; // desaparece
      }
    }
  }
}
