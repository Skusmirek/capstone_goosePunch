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
});