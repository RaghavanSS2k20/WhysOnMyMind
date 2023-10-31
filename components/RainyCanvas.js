import React, { useEffect, useRef } from 'react';
import RainyCanvasStyles from "../styles/rainycanvas.module.css"
const RainyCanvas = () => {
  const canvas1Ref = useRef(null);
  const canvas2Ref = useRef(null);
  const canvas3Ref = useRef(null);

  useEffect(() => {
    const canvas1 = canvas1Ref.current;
    const canvas2 = canvas2Ref.current;
    const canvas3 = canvas3Ref.current;
    const ctx1 = canvas1.getContext('2d');
    const ctx2 = canvas2.getContext('2d');
    const ctx3 = canvas3.getContext('2d');
    
    // ... (Copy the provided JavaScript code here)
    var rainthroughnum = 500;
var speedRainTrough = 15;
var RainTrough = [];

var rainnum = 500;
var rain = [];

var lightning = [];
var lightTimeCurrent = 0;
var lightTimeTotal = 0;

var w = canvas1.width = canvas2.width = canvas3.width = window.innerWidth;
var h = canvas1.height = canvas2.height = canvas3.height = window.innerHeight;
window.addEventListener('resize', function() {
  w = canvas1.width = canvas2.width = canvas3.width = window.innerWidth;
  h = canvas1.height = canvas2.height = canvas3.height = window.innerHeight;
});

function random(min, max) {
  return Math.random() * (max - min + 1) + min;
}

function clearcanvas1() {
  ctx1.clearRect(0, 0, w, h);
}

function clearcanvas2() {
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
}

function clearCanvas3() {
  ctx3.globalCompositeOperation = 'destination-out';
  ctx3.fillStyle = 'rgba(0,0,0,' + random(1, 30) / 100 + ')';
  ctx3.fillRect(0, 0, w, h);
  ctx3.globalCompositeOperation = 'source-over';
};

function createRainTrough() {
  for (var i = 0; i < rainthroughnum; i++) {
    RainTrough[i] = {
      x: random(0, w),
      y: random(0, h),
      length: Math.floor(random(1, 830)),
      opacity: Math.random() * 0.2,
      xs: random(-2, 2),
      ys: random(10, 20)
    };
  }
}

function createRain() {
  for (var i = 0; i < rainnum; i++) {
    rain[i] = {
      x: Math.random() * w,
      y: Math.random() * h,
      l: Math.random() * 1,
      xs: -4 + Math.random() * 4 + 2,
      ys: Math.random() * 10 + 10
    };
  }
}

function createLightning() {
  var x = random(100, w - 100);
  var y = random(0, h / 4);

  var createCount = random(1, 3);
  for (var i = 0; i < createCount; i++) {
   let single = {
      x: x,
      y: y,
      xRange: random(5, 30),
      yRange: random(10, 25),
      path: [{
        x: x,
        y: y
      }],
      pathLimit: random(40, 55)
    };
    lightning.push(single);
  }
};

function drawRainTrough(i) {
  ctx1.beginPath();
  var grd = ctx1.createLinearGradient(0, RainTrough[i].y, 0, RainTrough[i].y + RainTrough[i].length);
  grd.addColorStop(0, "rgba(255,255,255,0)");
  grd.addColorStop(1, "rgba(255,255,255," + RainTrough[i].opacity + ")");

  ctx1.fillStyle = grd;
  ctx1.fillRect(RainTrough[i].x, RainTrough[i].y, 1, RainTrough[i].length);
  ctx1.fill();
}

function drawRain(i) {
  ctx2.beginPath();
  ctx2.moveTo(rain[i].x, rain[i].y);
  ctx2.lineTo(rain[i].x + rain[i].l * rain[i].xs, rain[i].y + rain[i].l * rain[i].ys);
  ctx2.strokeStyle = 'rgba(174,194,224,0.5)';
  ctx2.lineWidth = 1;
  ctx2.lineCap = 'round';
  ctx2.stroke();
}

function drawLightning() {
  for (var i = 0; i < lightning.length; i++) {
    var light = lightning[i];

    light.path.push({
      x: light.path[light.path.length - 1].x + (random(0, light.xRange) - (light.xRange / 2)),
      y: light.path[light.path.length - 1].y + (random(0, light.yRange))
    });

    if (light.path.length > light.pathLimit) {
      lightning.splice(i, 1);
    }

    ctx3.strokeStyle = 'rgba(20, 20, 20, .1)';
    ctx3.lineWidth = 3;
    if (random(0, 15) === 0) {
      ctx3.lineWidth = 6;
    }
    if (random(0, 30) === 0) {
      ctx3.lineWidth = 8;
    }

    ctx3.beginPath();
    ctx3.moveTo(light.x, light.y);
    for (var pc = 0; pc < light.path.length; pc++) {
      ctx3.lineTo(light.path[pc].x, light.path[pc].y);
    }
    if (Math.floor(random(0, 30)) === 1) { //to fos apo piso
      ctx3.fillStyle = 'rgba(173, 158, 158, ' + random(1, 3) / 100 + ')';
      ctx3.fillRect(0, 0, w, h);
    }
    ctx3.lineJoin = 'miter';
    ctx3.stroke();
  }
};

function animateRainTrough() {
  clearcanvas1();
  for (var i = 0; i < rainthroughnum; i++) {
    if (RainTrough[i].y >= h) {
      RainTrough[i].y = h - RainTrough[i].y - RainTrough[i].length * 5;
    } else {
      RainTrough[i].y += speedRainTrough;
    }
    drawRainTrough(i);
  }
}

function animateRain() {
  clearcanvas2();
  for (var i = 0; i < rainnum; i++) {
    rain[i].x += rain[i].xs;
    rain[i].y += rain[i].ys;
    if (rain[i].x > w || rain[i].y > h) {
      rain[i].x = Math.random() * w;
      rain[i].y = -20;
    }
    drawRain(i);
  }
}

function animateLightning() {
  clearCanvas3();
  lightTimeCurrent++;
  if (lightTimeCurrent >= lightTimeTotal) {
    createLightning();
    lightTimeCurrent = 0;
    lightTimeTotal = 200;  //rand(100, 200)
  }
  drawLightning();
}

function init() {
  createRainTrough();
  createRain();
  window.addEventListener('resize', createRainTrough);
}
init();

function animloop() {
  animateRainTrough();
  animateRain();
  animateLightning();
  requestAnimationFrame(animloop);
}
animloop();

    // Replace the existing window resize event listener with React's useEffect
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas1.width = canvas2.width = canvas3.width = w;
      canvas1.height = canvas2.height = canvas3.height = h;
      createRainTrough();
    };

    window.addEventListener('resize', handleResize);
    createRainTrough();

    function animloop() {
      animateRainTrough();
      animateRain();
      animateLightning();
      requestAnimationFrame(animloop);
    }
    animloop();

    // Don't forget to clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
   <> 
   <div className={RainyCanvasStyles.container}>     
   <canvas ref={canvas1Ref} id="canvas1"></canvas>
      <canvas ref={canvas2Ref} id="canvas2"></canvas>
      <canvas ref={canvas3Ref} id="canvas3"></canvas>
      <div className="centered-content">
        <h1>Hero Text</h1>
        <div className="buttons">
          <button className="black-button">Button 1</button>
          <button className="black-button">Button 2</button>
        </div>
      </div>
      </div>
      </>

    
  );
};

export default RainyCanvas;
