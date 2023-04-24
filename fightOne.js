$(function() {
  
  // Get reference to introduction image and image used for the arena
  $introImage = $('#introImageOne');
  $arena = $('#arenaImage');


  $arena.fadeOut(.01)

  $introImage.fadeOut(.01);

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

  $introImage.fadeIn(1500);


  $introImage.delay(2500).fadeOut(1500);

  $arena.delay(5000).fadeIn(500);
});