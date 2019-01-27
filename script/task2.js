function addRectangle() {
  let newRectangle = document.createElement('div');
  newRectangle.innerHTML;
  let task2 = document.getElementById('task2');
  task2.appendChild(newRectangle);

  let r = Math.floor(Math.random() * (223));
  let g = Math.floor(Math.random() * (256));
  let b = Math.floor(Math.random() * (256));
  let color = '#' + r.toString(16) + g.toString(16) + b.toString(16);

  let widthNumber = getRandomInt(40, 150);
  let widthPX = widthNumber.toString(10) + 'px';
  let heightNumber = getRandomInt(40, 150);
  let heightPX = heightNumber.toString(10) + 'px';

  let leftNumber = getRandomInt(0, 600);
  let leftPX = leftNumber.toString(10) + 'px';
  let topNumber = getRandomInt(0, 300);
  let topPX = topNumber.toString(10) + 'px';

  Element.prototype.setAttributes = function(attrs) {
    for (var idx in attrs) {
      if ((idx === 'styles' || idx === 'style') && typeof attrs[idx] === 'object') {
        for (var prop in attrs[idx]) {
          this.style[prop] = attrs[idx][prop];
        }
      } else {
        this.setAttribute(idx, attrs[idx]);
      }
    }
  };

  newRectangle.setAttributes({
    'styles': {
      'height': heightPX,
      'width': widthPX,
      'backgroundColor': color,
      'left': leftPX,
      'top': topPX,
    },
  });

  newRectangle.setAttribute('class', 'rectitac');

  task2.onclick = function(event) {
    let target = event.target; // где был клик?
    if (target.className != 'rectitac') return; // не на rectitac? тогда не интересует
    light(target); // подсветить div
    target.style.zIndex = 1000;
  };
}

function moveRect(e) {
  let Rect = document.getElementById("highlight");

  let cs = window.getComputedStyle(Rect); // получаем стиль для blueRect

  let left = parseInt(cs.left);
  let top = parseInt(cs.top);

  switch (e.keyCode) {
    case 37: // если нажата клавиша влево
      if (Rect.offsetLeft > 0)
        Rect.style.left = left - 10 + "px";
      break;
    case 38: // если нажата клавиша вверх
      if (top > 0)
        Rect.style.top = top - 10 + "px";
      break;
    case 39: // если нажата клавиша вправо
      if (left < document.documentElement.clientWidth - 100)
        Rect.style.left = left + 10 + "px";
      break;
    case 40: // если нажата клавиша вниз
      if (top < document.documentElement.clientHeight - 100)
        Rect.style.top = top + 10 + "px";
      break;
  }

  if (Rect.offsetTop < 0) {
    Rect.style.top = 0;
  }
  if (Rect.offsetLeft < 0) {
    Rect.style.left = 0;
  }

  let rightPosition = Rect.offsetLeft;
  let blockPosition = Rect.offsetWidth;
  let sizeBlock = rightPosition + blockPosition;
  if (sizeBlock > 772) {
    Rect.style.left = (774 - Rect.offsetWidth) + 'px';
  }

  let bottomPosition = Rect.offsetTop;
  let heightBlock = Rect.offsetHeight;
  let sizeTopHeight = bottomPosition + heightBlock;
  if (sizeTopHeight > 458) {
    Rect.style.top = (458 - Rect.offsetHeight) + 'px';
  }
}

addEventListener("keydown", moveRect);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let selectedDiv;

function light(node) {
  if (selectedDiv) {
    selectedDiv.removeAttribute('id');
  }
  selectedDiv = node;
  selectedDiv.setAttribute('id', 'highlight');
}
