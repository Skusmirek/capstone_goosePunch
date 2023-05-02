var image = document.getElementById('myImage');
var originalSrc = image.src;
var newSrc = '/img/punchA.jpg';
var newSrc2 = '/img/punchD.jpg';
var currentPosition = 0;
var originalPosition = 0;
var maxLeftPosition = -10;
var maxRightPosition = 10;

document.addEventListener('keydown', function(event) {
  if (event.code === 'KeyA') {
    if (image.src !== originalSrc) {
      image.src = originalSrc;
      clearTimeout(image.timerId);
    } else {
      image.src = newSrc;
    }
  }

  if (event.code === 'KeyD') {
    if (image.src !== originalSrc) {
      image.src = originalSrc;
      clearTimeout(image.timerId);
    } else {
      image.src = newSrc2;
      image.timerId = setTimeout(function() {
        image.src = originalSrc;
      }, 5000);
    }
  }


  if (event.code === 'KeyQ') {
    currentPosition -= 10;
    if (currentPosition < maxLeftPosition) {
      currentPosition = maxLeftPosition;
    }
    image.style.left = currentPosition + 'px';
  }

  if (event.code === 'KeyE') {
    currentPosition += 10;
    if (currentPosition > maxRightPosition) {
      currentPosition = maxRightPosition;
    }
    image.style.left = currentPosition + 'px';
  }
});



document.addEventListener('keyup', function(event) {
  if (event.code === 'KeyA') {
    image.src = originalSrc;
    clearTimeout(image.timerId);
  }

  if (event.code === 'KeyD') {
    image.src = originalSrc;
    clearTimeout(image.timerId);

  }

    if (event.code === 'KeyQ') {
      image.style.left = originalPosition + 'px';
      currentPosition = originalPosition;
    }
  
    if (event.code === 'KeyE') {
      image.style.left = originalPosition + 'px';
      currentPosition = originalPosition;
    }
  });


image.addEventListener('load', function() {
  clearTimeout(image.timerId);
});


document.addEventListener('keyup', function(event) {
  if (event.code === 'KeyD') {
    image.src = originalSrc;
    clearTimeout(image.timerId);
  }
});

image.addEventListener('load', function() {
  clearTimeout(image.timerId);
});