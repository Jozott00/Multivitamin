document.addEventListener('DOMContentLoaded', () => {
  const numberfield = document.querySelector('#numberfield');
  const foregroundVideo = document.querySelector('#foreground');
  const backgroundVideo = document.querySelector('#background');
  const elem = document.documentElement;


  if (elem.requestFullscreen) {
      console.log("hier her komm ich");
      elem.requestFullscreen();
    }
  else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    console.log("und auch hier her komm ich");
    elem.webkitRequestFullscreen();
  }

  backgroundVideo.currentTime = 0;

  const promise = backgroundVideo.play();



  let numbers = [];
  let timeout;
  const animations = {
    10: {
      timestamp: 0,
      duration: 4
    },
    11: {
      timestamp: 5,
      duration: 4
    },
    12: {
      timestamp: 10,
      duration: 4
    },
    13: {
      timestamp: 15,
      duration: 4
    },
    14: {
      timestamp: 25,
      duration: 4
    },
    15: {
      timestamp: 20,
      duration: 4
    },
    16: {
      timestamp: 25,
      duration: 4
    },
    17: {
      timestamp: 30,
      duration: 4
    },
    18: {
      timestamp: 35,
      duration: 4
    },
    19: {
      timestamp: 40,
      duration: 4
    },
    20: {
      timestamp: 45,
      duration: 4
    },
    21: {
      timestamp: 2000,
      duration: 10
    },
    22: {
      timestamp: 3400,
      duration: 20
    }
  };

  document.addEventListener('keydown', e => {
    // * IF NOT NUMBER
    if (isNaN(e.key)) { return; }

    // * IF NO FIRST-NUMBER
    if (!numbers[0]) {
      numbers[0] = e.key;

      // UPDATE NUMBER-FIELD
      updateNumberfield();

    // * IF NO SECOND-NUMBER
    } else {
      numbers[1] = e.key;

      // NUMBER
      const number = numbers[0] + numbers[1];

      // UPDATE NUMBER-FIELD
      updateNumberfield();

      // ANIMATION
      const animation = animations[number];

      // * IF NO ANIMATION
      if (!animation) { return; }

      // NAVIGATE VIDEO
      navigateVideo(animation)
    }
  });

  const updateNumberfield = () => {
    numberfield.querySelector('.number:nth-of-type(1)').innerHTML = numbers[0] || '_';
    numberfield.querySelector('.number:nth-of-type(2)').innerHTML = numbers[1] || '_';

    if (numbers[0] && !numbers[1]) {
      // SHOW NUMBERFIELD
      numberfield.classList.add('active');
    } else if (numbers[0] && numbers[1]) {
      // RESET NUMBERS
      numbers = [];

      setTimeout(() => {
        // HIDE NUMBERFIELD
        numberfield.classList.remove('active');
      }, 500);
    }
  }

  const navigateVideo = animation => {
    // CLEAR TIMEOUT
    clearTimeout(timeout);

    // JUMP TO TIMESTAMP
    foregroundVideo.currentTime = animation.timestamp || 0;

    // PLAY
    foregroundVideo.play();

    timeout = setTimeout(() => {
      // JUMP TO START
      foregroundVideo.currentTime = 0;

      // PAUSE VIDEO
      foregroundVideo.pause();
    }, animation.duration * 1000);
  }
});
