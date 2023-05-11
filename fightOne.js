$(function() {
  
  // Get reference to introduction image and image used for the arena
  $introImage = $('#introImageOne');
  $arena = $('#arenaImage');


  $arena.fadeOut(.01)

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
    top: '45%',
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
    top: '65%',
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

    $healthAmount = 5;
    $healthAmountElem.text($healthAmount);

   

    

    // Enemy health
    $enemyHealth = 5;


    // Enemy movement
    function enemyMovement() {
      // Generate a random number between 1 and 10
      const randomNumber = Math.floor(Math.random() * 10) + 1;
    
      // Check if the random number is 1 or 2
      if (randomNumber === 1) {
        // If it's 1, move the enemy up and down and then back to its original position

        // This is the enemy attacking
        $glassJoose.animate({ top: "-=20px" }, 500)
                  .animate({ top: "+=80px" }, 500)
                  .animate({ top: "-=60px" }, 500, function() {
                    // If the player isn't dodging, they take damage
                    if (!$playerDodging) {
                      $healthAmount -= 1;
                    }
                  });
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
        $littleRac.animate({ top: "-=" + moveAmount }, 100, function() {
          $littleRac.animate({ top: originalTop }, 100);
        });
      } else if (direction === "down" && currentTop + $littleRac.height() + moveAmount <= $arena.height()) {
        $littleRac.animate({ top: "+=" + moveAmount }, 100, function() {
          $littleRac.animate({ top: originalTop }, 100);
        });
      }
    }
    
    // Set up keydown event listener
    var keyPressed = {};
    $(document).keydown(function(event) {
      var key = event.key;
      if (!keyPressed[key]) {
        keyPressed[key] = true;
        if (key === "w") {
          moveLittleRac("up");
          $littleRac.attr("src", "images/littleRac-2.png");
        } else if (key === "s") {
          moveLittleRac("down");
        }
        setTimeout(function() {
          keyPressed[key] = false;
        }, 500);
      }
    });


    $(document).keyup(function(event) {
      var key = event.key;
      if (key === "w") {
        $littleRac.attr("src", "images/littleRac.png"); 
      }
    });

    // NOTE: The above function may be refactored to only move up for punching and down for ducking

    // Add to other two fights

    function playerDodging() {
      $playerDodging = true;
    }
    
    function playerStopDodging() {
      $playerDodging = false;
    }


  });

});