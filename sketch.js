function preload(){
    var PLAY = 1;
    var END = 0;
    var gameState = PLAY;
    
    var mario
    var ground, invisibleGround, groundImage;
    
    
    var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
    
    var MarioPoints;
    var gameOverImg,restartImg
    var jumpSound , checkPointSound, dieSound
    
    function preload(){
      mario = loadImage("mario.png");
      
      
      groundImage = loadImage("ground2.png");
      
     
      obstacle1 = loadImage("tubo2.png");
      obstacle2 = loadImage("tubo2.png");
      obstacle3 = loadImage("tubo2.png");
      obstacle4 = loadImage("tubo2.png");
      obstacle5 = loadImage("tubo2.png");
      obstacle6 = loadImage("tubo2.png");
      
      restartImg = loadImage("restart.png")
      gameOverImg = loadImage("gameOver.png")
      
      jumpSound = loadSound("jump.mp3")
      dieSound = loadSound("die.mp3")
      checkPointSound = loadSound("checkPoint.mp3")
    }
    
}

function setup() {
    createCanvas(600, 200);

    var message = "Esta é uma mensagem";
   console.log(message)
    
    mario = createSprite(50,160,20,50);
    mario.addAnimation(mario);
    
    
  
    mario.scale = 0.5;
    
    cenario = createSprite(600,200);
    cenario.addImage("cenario.png");
    cenario.x = cenario.width /2;
    
    gameOver = createSprite(300,100);
    gameOver.addImage(gameOverImg);
    
    restart = createSprite(300,140);
    restart.addImage(restartImg);
    
   
    gameOver.scale = 0.5;
    restart.scale = 0.5;
    
    invisibleGround = createSprite(200,190,400,10);
    invisibleGround.visible = false;
    
    //criar Grupos de Obstáculos e Nuvens
    obstaclesGroup = createGroup();

  
    
    mario.setCollider("rectangle",0,0,trex.width,trex.height);
    mario.debug = false
    
    MarioPoints = 0;
    
  }
  


function draw() {
 
    background("cenario.png");
    //exibir pontuação
    text("MarioPoints: "+ MarioPoints, 500,50);
    
    
    if(gameState === PLAY){
  
      gameOver.visible = false;
      restart.visible = false;
      
      invisibleGround.velocityX = -(4 + 3* score/100)
      //pontuação
      MarioPoints = MarioPoints + Math.round(frameCount /60);
      
      if(MarioPoints>0 && MarioPoints%100 === 0){
         checkPointSound.play() 
      }
      
      if (invisibleGround.x < 0){
        invisibleGround.x = invisibleGround.width/2;
      }
      
      //pular quando barra de espaço é pressionada
      if(keyDown("space")&& mario.y >= 100) {
          mario.velocityY = -12;
          jumpSound.play();
      }
      
      //adicionar gravidade
      mario.velocityY = mario.velocityY + 0.8
    
      //gerar as nuvens
 
    
      //gerar obstáculos no chão
      spawnObstacles();
      
      if(obstaclesGroup.isTouching(mario)){
          //trex.velocityY = -12;
          jumpSound.play();
          gameState = END;
          dieSound.play()
        
      }
    }
     else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;
       
       //mudar a animação de trex
       
      
       
       
        invisibleground.velocityX = 0;
        mario.velocityY = 0
        
       
        //definir tempo de vida dos objetos do jogo para que eles nunca sejam destruídos
      obstaclesGroup.setLifetimeEach(-1);
      
       
       obstaclesGroup.setVelocityXEach(0);
        
     }
    
   
    //impedir que trex caia
    mario.collide(invisibleGround);
    
    if(mousePressedOver(restart)) {
        reset();
      }
  
  
    drawSprites();
  }
  
  function reset(){
    
  
  }
  
  
  function spawnObstacles(){
   if (frameCount % 60 === 0){
     var obstacle = createSprite(600,165,10,40);
     obstacle.velocityX = -(6 + score/100);
     
      //gerar obstáculos aleatórios
      var rand = Math.round(random(1,6));
      switch(rand) {
        case 1: obstacle.addImage(obstacle);
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        case 3: obstacle.addImage(obstacle3);
                break;
        case 4: obstacle.addImage(obstacle4);
                break;
        case 5: obstacle.addImage(obstacle5);
                break;
        case 6: obstacle.addImage(obstacle6);
                break;
        default: break;
      }
     
      //atribuir dimensão e tempo de vida ao obstáculo           
      obstacle.scale = 0.5;
      obstacle.lifetime = 300;
     
     //acrescentar cada obstáculo ao grupo
      obstaclesGroup.add(obstacle);
   }
  }
  
  
  function reset(){
    
    gameState = PLAY;
    
    obstaclesGroup.destroyEach();
    MarioPoints = 0;
 
}