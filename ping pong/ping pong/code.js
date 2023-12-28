var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["0cb0d08e-6bd0-40ed-9ff4-c63ab9887130","a8b7735d-ad49-4369-99f4-3a40ed00959a","8f6cc95c-e36d-467b-bfae-4e63458fb647","9f4c291b-765b-4912-8ea2-e3de0724fc51"],"propsByKey":{"0cb0d08e-6bd0-40ed-9ff4-c63ab9887130":{"name":"naveram","sourceUrl":null,"frameSize":{"x":799,"y":457},"frameCount":6,"looping":true,"frameDelay":12,"version":"I_9d6tD22DtV9Qo9MeWjxmZUSiq8jFDL","categories":[""],"loadedFromSource":true,"saved":true,"sourceSize":{"x":1598,"y":1371},"rootRelativePath":"assets/0cb0d08e-6bd0-40ed-9ff4-c63ab9887130.png"},"a8b7735d-ad49-4369-99f4-3a40ed00959a":{"name":"navejogador","sourceUrl":null,"frameSize":{"x":299,"y":168},"frameCount":5,"looping":true,"frameDelay":12,"version":"mS7VycfZrf1IUgtfGV0NAkpdq2ylGgtc","categories":[""],"loadedFromSource":true,"saved":true,"sourceSize":{"x":598,"y":504},"rootRelativePath":"assets/a8b7735d-ad49-4369-99f4-3a40ed00959a.png"},"8f6cc95c-e36d-467b-bfae-4e63458fb647":{"name":"planeta","sourceUrl":null,"frameSize":{"x":225,"y":225},"frameCount":5,"looping":true,"frameDelay":12,"version":"QKg36jZFu.NeeJ_l9nhe7uxUZv5iS2fK","categories":[""],"loadedFromSource":true,"saved":true,"sourceSize":{"x":450,"y":675},"rootRelativePath":"assets/8f6cc95c-e36d-467b-bfae-4e63458fb647.png"},"9f4c291b-765b-4912-8ea2-e3de0724fc51":{"name":"bg","sourceUrl":null,"frameSize":{"x":400,"y":400},"frameCount":8,"looping":true,"frameDelay":12,"version":"cPBdJ5NDaaq49uf.ajfwRPjZEwNvaloG","categories":["backgrounds"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":1200,"y":1200},"rootRelativePath":"assets/9f4c291b-765b-4912-8ea2-e3de0724fc51.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

// jogo de ping pong. mova o mouse para cima ou para baixo para poder se mover
//e marcar pontos

var bg = createSprite(200, 200);
bg.setAnimation("bg");

var ball = createSprite(200,200,20,20);
ball.setAnimation("planeta");
ball.scale = 0.3;

var paddle = createSprite(330,200,10,80);
paddle.setAnimation("navejogador");
paddle.scale = 0.4;

var paddlecom = createSprite(30,200,10,80);
paddlecom.setAnimation("naveram");
paddlecom.scale = 0.1;




var ps = 0;


var pontosjogador = 0;
var pontoscomputador = 0;

function draw() {
  console.log(gameState);
 //console.log(ball.velocityY)
  
  if (gamestate == "start") {
    var gameState = "start";
    if (keyDown("space")) {
      ball.velocityY = 9;
      ball.velocityX = 9;
      
      if (keyDown("space")&& gameState == "start"){
        
        gameState = "play";
        
      }
      

         ;
    }
    if(ball.x>405) {
      ball.x = 200;
      ball.y = 200;
      ball.velocityX = 0;
      ball.velocityY = 0;
      cs = cs + 1;
      gameState = "start";
    }
    if(ball.x<-5) {
      ball.x = 200;
      ball.y = 200;
      ball.velocityX = 0;
      ball.velocityY = 0;
      ps = ps + 1;
      gameState = "start";
    }
  }
  
  if (gamestate == "play") {
    if ((cs >= 3 ||ps >= 3)&& gameState == "play") {
      gameState = "play";
      
    }
    if (ball.isTouching(leftEdge)) {
      pontosjogador++;
      ball.y = 200;
      ball.x = 200;
    }
    if (ball.isTouching(rightEdge)) {
      pontoscomputador++;
      ball.y = 200;
      ball.x = 200;
    }
    
  }
  
  if (gamestate == "over") {
    if (gameState == "over"){
      
      fill("pink");
      textSize(25);
      text("GAME OVER",150,150);
      if (keyDown("space")) {
      
      ball.velocityX = 0;
      ball.velocityY = 0;
      
  }
      
    }
  }
  
  createEdgeSprites();
  createEdgeSprites();
  
  stroke("blue");

  
   
  drawSprites();
  textSize(40);
  text(pontoscomputador, 150, 45);
  text(pontosjogador, 250, 45);
  
  paddle.y = World.mouseY;
  if ((ball.x) <= 200){
   paddlecom.velocityY = 4;
  }
 
  if (ball.isTouching(paddle)) {
    playSound("assets/category_hits/retro_game_hit_block_3.mp3", false);
  }
  
  if (ball.isTouching(paddlecom)) {
    playSound("assets/category_hits/retro_game_hit_block_4.mp3", false);
  }
  
  ball.bounceOff(bottomEdge);
  ball.bounceOff(topEdge);
  ball.bounceOff(paddle);
  ball.bounceOff(paddlecom);
  

  
  
}
  

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
