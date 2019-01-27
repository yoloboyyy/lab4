function addBlock() {
  let newRectangle = document.createElement('div');
  newRectangle.innerHTML;
  let task3 = document.getElementById('field3');
  task3.appendChild(newRectangle);

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
      'backgroundColor': color,
      'width': widthPX,
      'height': heightPX,
      'left': leftPX,
      'top': topPX,

    },
  });

  newRectangle.setAttribute('class', 'draggable')
}

document.onmousedown = function(e) { //нажали на мышь
  let elem = e.target; //элемент, на который нажали
  if (elem.className && elem.className.indexOf('draggable') >= 0) { //фильтрует эелементы (только с классом draggable)
    elem.ondragstart = function() {
      return false
    }; //убираем перетаскивание от HTML5
    let coor = elem.getBoundingClientRect(); //получаем координыты елемента относительно окна браузера
    let osx = e.offsetX; //получаем смещение по Х указателя мыши относительно начала координат эелемента
    let osy = e.offsetY; // тоже по У
    elem.style.position = 'fixed'; //фиксируем элемент относительно окна
    elem.style.top = coor.top + 'px'; //задаем начальные координаты У
    elem.style.left = coor.left + 'px'; //тоже по Х

    document.onmousemove = function(ev) { //тянем (функция в функции - тянем при нажатой кнопке)
      let x = ev.clientX; //координата Х относительно окна браузера
      let y = ev.clientY; //тоже по Х

      let winX = document.documentElement.clientWidth; //ширина окна браузера
      let winY = document.documentElement.clientHeight; //высота окна браузера

      if (x + coor.width > winX + osx - 520) {
        x = winX - coor.width + osx - 520
      }; //не выдвигать элемент за правый край
      if (x - osx < 72) {
        x = osx + 72
      }; // не выдвигать элемент за левый край
      if (y <= osy + 130) { //если елемент уперся в верх окна браузера
        y = osy + 130; //не выдвигать элемент за верхний край
      };
      if (y >= (winY - coor.height + osy - 67)) { //если елемент уперся в низ окна браузера
        y = winY - coor.hieght - osy - 67; //не выдвигать элемент за нижний край
      }
      elem.style.left = x - osx + 'px'; //задаем координату Х без смещения для движения элемента
      elem.style.top = y - osy + 'px'; // тоже по У
      removeSelect(); //запретить стандартное выделение
    }
  }
}

document.onmouseup = function(e) { //отпустили кнопку
  var elem = e.target; //наш элемент
  document.onmousemove = function() {
    return false
  }; //отменяем перемещение элемента
}

function removeSelect() { //функция - убрать стандартное выделение
  var b = document.body; //по всему документу
  b.style.webkitUserSelect = b.style.mozUserSelect = b.style.msUserSelect = 'none'; //добавляем свойство CSS - запретить выделение
}
