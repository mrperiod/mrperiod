const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            
            // Force reflow to restart animation
            entry.target.offsetHeight; // Trigger reflow

            entry.target.classList.add('animate');
        } else {
            entry.target.classList.remove('animate');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

const blob = document.getElementById("cursor");


    document.body.onpointermove = event => {
        const { clientX, clientY } = event;

    blob.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
      }, { duration: 0, fill: "forwards" });
    }

    const circleElement = document.querySelector('.circle');

    // Create objects to track mouse position and custom cursor position
    const mouse = { x: 0, y: 0 }; // Track current mouse position
    const previousMouse = { x: 0, y: 0 } // Store the previous mouse position
    const circle = { x: 0, y: 0 }; // Track the circle position
    
    // Initialize variables to track scaling and rotation
    let currentScale = 0; // Track current scale value
    let currentAngle = 0; // Track current angle value
    
    // Update mouse position on the 'mousemove' event
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });
    
    // Smoothing factor for cursor movement speed (0 = smoother, 1 = instant)
    const speed = 0.17;
    
    // Start animation
    const tick = () => {
      // MOVE
      // Calculate circle movement based on mouse position and smoothing
      circle.x += (mouse.x - circle.x) * speed;
      circle.y += (mouse.y - circle.y) * speed;
      // Create a transformation string for cursor translation
      const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;
    
      // SQUEEZE
      // 1. Calculate the change in mouse position (deltaMouse)
      const deltaMouseX = mouse.x - previousMouse.x;
      const deltaMouseY = mouse.y - previousMouse.y;
      // Update previous mouse position for the next frame
      previousMouse.x = mouse.x;
      previousMouse.y = mouse.y;
      // 2. Calculate mouse velocity using Pythagorean theorem and adjust speed
      const mouseVelocity = Math.min(Math.sqrt(deltaMouseX**2 + deltaMouseY**2) * 4, 150); 
      // 3. Convert mouse velocity to a value in the range [0, 0.5]
      const scaleValue = (mouseVelocity / 150) * 0.5;
      // 4. Smoothly update the current scale
      currentScale += (scaleValue - currentScale) * speed;
      // 5. Create a transformation string for scaling
      const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;
    
      // ROTATE
      // 1. Calculate the angle using the atan2 function
      const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;
      // 2. Check for a threshold to reduce shakiness at low mouse velocity
      if (mouseVelocity > 20) {
        currentAngle = angle;
      }
      // 3. Create a transformation string for rotation
      const rotateTransform = `rotate(${currentAngle}deg)`;
    
      // Apply all transformations to the circle element in a specific order: translate -> rotate -> scale
      circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;
    
      // Request the next frame to continue the animation
      window.requestAnimationFrame(tick);
    }
    
    // Start the animation loop
    tick();

    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const enhance = id => {
  const element = document.getElementById(id),
        text = element.innerText.split("");
  
  element.innerText = "";
  
  text.forEach((value, index) => {
    const outer = document.createElement("span");
    
    outer.className = "outer";
    
    const inner = document.createElement("span");
    
    inner.className = "inner";
    
    inner.style.animationDelay = `${rand(-5000, 0)}ms`;
    
    const letter = document.createElement("span");
    
    letter.className = "letter";
    
    letter.innerText = value;
    
    letter.style.animationDelay = `${index * 1000 }ms`;
    
    inner.appendChild(letter);    
    
    outer.appendChild(inner);    
    
    element.appendChild(outer);
  });
}

enhance("myname");
enhance("myname2");