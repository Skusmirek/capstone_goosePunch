$(function() {

  // Global Variables
  isRacAttacking = false;
  isRacBlocking = false;
  
  // Get reference to introduction image and image used for the arena
  $introImage = $('#introImageOne');
  $arena = $('#arenaImage');


  $arena.fadeOut(.01);

  $introImage.fadeOut(.01);

  // Set the images to fill the screen
  $introImage.css({
    width: '100%',
    height: '100%',
    position: 'fixed',
    left: 0,
    top: 0
  })

  $arena.css({
    width: '100%',
    height: '100%',
    position: 'fixed',
    left: 0,
    top: 0
  })

  //Fade in and fade out the intro image
  $introImage.fadeIn(1500);

  $introImage.delay(2500).fadeOut(1500);

  //Fade in the arena after the intro image is gone
  $arena.delay(5000).fadeIn(500);


  // Display the default image for Glass Joose

  $glassJoose = $('#glassJoose');
  $glassJoose.delay(5700).fadeIn(500);

  // Position Glass Joose

  $glassJoose.css({
    position: 'absolute',
    left: '47%',
    top: '32%',
    width: '175px',
    height: '200px'
   })

  // Display the default image for Little Rac

   $littleRac = $('#littleRac');
   $littleRac.delay(5700).fadeIn(500);

  // Position Little Rac

  $littleRac.css({
    position: 'absolute',
    left: '47.5%',
    top: '62%',
    width: '150px',
    height: '120px'
})

  // Notify the player that the fight has started
  $fightStart = $('#fightStartImage');
  $fightStart.css({
    width: '100%',
    height: '30%',
    position: 'fixed',
    left: 0,
    top: 0
  })

  // Display fight banner (combat starts after this)
  $fightStart.fadeOut(1).delay(6500).fadeIn(1200).fadeOut(1000, function() {
    // Fight has started

    // Set and display the health
    $health = $('#health');
    $healthAmountElem = $('#healthAmount');
    $health.css({
      position: 'absolute',
      left: '1%',
      top: '.1%',
      fontSize: '4rem',
      fontFamily: "Impact",
      display: 'block'
    })

    $healthAmount = 1000;
    $healthAmountElem.text($healthAmount);

    // Enemy health
    $enemyHealth = 1000;

    // Enemy movement
    function enemyMovement() {
      // Generate a random number between 1 and 10
      const randomNumber = Math.floor(Math.random() * 5) + 1;
    
      // Check if the random number is 1 or 2
      if (randomNumber === 1) {
        // If it's 1, move the enemy up and down and then back to its original position

        // This is the enemy attacking
        $glassJoose.animate({ top: "-=20px" }, 500)
                  .animate({ top: "+=80px" }, 500)
                  .animate({ top: "-=60px" }, 500);
      } else if (randomNumber === 2) {
        // If it's 2, move the enemy up and then back to its original position

        // This is the enemy dodging
        $glassJoose.animate({ top: "-=20px" }, 500, enemyDodging())
        .delay(500)
        .animate({ top: "+=20px" }, 500, enemyStopDodging());
  }
  }
    
    // Run the enemyMovement function every half a second (500 milliseconds)
    setInterval(enemyMovement, 500);
    
    function enemyDodging() {
      $enemyDodging = true;
    }

    function enemyStopDodging() {
      $enemyDodging = false;
    }

    function enemyOverlap() {
            // Get the player and enemy elements
      var $player = $('#glassJoose');
      var $enemy = $('#littleRac');

      // Get the positions of the player and enemy elements
      var playerPos = $player.offset();
      var enemyPos = $enemy.offset();

      // Check if the player and enemy elements overlap
      if (playerPos.left < enemyPos.left + $enemy.width() && 
          playerPos.left + $player.width() > enemyPos.left && 
          playerPos.top < enemyPos.top + $enemy.height() && 
          playerPos.top + $player.height() > enemyPos.top &&
          isRacBlocking == false && isRacAttacking == false) {
        // Player and enemy are overlapping AND isRacAttacking and isRacBlocking are false, player takes damage
        $healthAmount -= 1;
        $healthAmountElem.text($healthAmount);
        if ($healthAmount == 0) {
          window.location.href = "gameOver.html";
        }
      }
        console.log(isRacAttacking);
    }
    // Call enemyOverlap every 50 milliseconds
    setInterval(enemyOverlap, 50);

    
  

    // TODO: Add the player's movements
    // Maybe handle it similarly to the enemy's movements? 
    // Not the random number stuff, but for the structure of animations and when it registers as a hit or dodge?
    // Hoping that works, I'll set up the dodge functions below

    // Feel free to change anything. I don't know if the dodging works well or not, I just hope it does cause it's pretty simple

    
    var originalTop = $littleRac.position().top;

    // Function to move Little Rac
    function moveLittleRac(direction) {
      var currentTop = $littleRac.position().top;
      var moveAmount = 100;
    
      if (direction === "up" && currentTop - moveAmount >= 0) {
        isRacAttacking = true;
        $littleRac.animate({ top: "-=" + moveAmount }, 350, function() {
          $littleRac.animate({ top: originalTop }, 350, function() {
            isRacAttacking = false;
          });
        });
      } else if (direction === "down" && currentTop + $littleRac.height() + moveAmount <= $arena.height()) {
        isRacBlocking = true;
        $littleRac.animate({ top: "+=" + moveAmount }, 350, function() {
          $littleRac.animate({ top: originalTop }, 350, function() {
            isRacBlocking = false;
          });
        });
      }
    }
    
    
    // Set up keydown event listener
    var keyPressed = {};
    $(document).keydown(function(event) {
      var key = event.key;
      if (!keyPressed[key]) {
        keyPressed[key] = true;
        if (key === "ArrowUp") {
          moveLittleRac("up");
          $littleRac.attr("src", "images/littleRac-2.png");
        } else if (key === "ArrowDown") {
          moveLittleRac("down");
        }
        setTimeout(function() {
          keyPressed[key] = false;
        }, 500);
      }
    });


    $(document).keyup(function(event) {
      var key = event.key;
      if (key === "ArrowUp") {
        $littleRac.attr("src", "images/littleRac.png"); 
      }
    });

    // NOTE: The above function may be refactored to only move up for punching and down for ducking

    // Add to other two fights

    


    

  });

});