$(function() {
  
  // Get reference to introduction image and image used for the arena
  $introImage = $('#introImageTwo');
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


  // Display the default image for Macho 

  $superMachoGoose = $('#superMachoGoose');
  $superMachoGoose.delay(5700).fadeIn(500);

  // Position Macho

  $superMachoGoose.css({
    position: 'absolute',
    left: '47%',
    top: '45%',
    width: '6%',
    height: '13%'
   })



  // Display the default image for Little Rac

   $littleRac = $('#littleRac');
   $littleRac.delay(5700).fadeIn(500);

  // Position Little Rac

  $littleRac.css({
    position: 'absolute',
    left: '47%',
    top: '65%',
    width: '6%',
    height: '13%'
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
    $health.css({
      position: 'absolute',
      left: '1%',
      top: '.1%',
      fontSize: '4rem',
      fontFamily: "Impact",
      display: 'block'
    })

    $healthAmount = 5;
    $healthAmountElem = $('#healthAmount');
    $healthAmountElem.text($healthAmount).css({
      position: 'absolute',
      left: '10.75%',
      top: '.1%',
      fontSize: '4rem',
      fontFamily: "Impact",
      display: 'block'
    })

    

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
        $superMachoGoose.animate({ top: "-=20px" }, 500)
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
        $superMachoGoose.animate({ top: "-=20px" }, 500, enemyDodging())
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
  

    
    
    function playerDodging() {
      $playerDodging = true;
    }

    function playerStopDodging() {
      $playerDodging = false;
    }
    








  });

});