
const urls = [
  'https://media2.giphy.com/media/xThta458hXUetKTfvW/source.gif',
  'https://thumbs.gfycat.com/AntiqueSillyBeardedcollie-size_restricted.gif',
  'http://66.media.tumblr.com/88dbca5386d8067106151ecefb76bc3d/tumblr_molr2jZhUt1s5jjtzo1_500.gif',
  'https://i.giphy.com/media/l1J9AS7rcsFgTYH28/giphy.webp',
  'https://coolguy.website/aesthetic/assets/tulips.gif',
  'https://gifimage.net/wp-content/uploads/2017/08/transparent-gif-tumblr-26.gif',
  'https://sitejerk.com/images/gif-or-png-9.gif',
  'https://66.media.tumblr.com/d77c9a14634054b6406d4a3adf2c33b6/tumblr_oqxccq1ryo1uf5tbgo1_r3_500.gif',
  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5a0a8df1-1e56-47fd-b834-6e0fa80ecbdb/d80voyd-9a1976cc-3d63-4b97-8fa6-468df6d466f1.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzVhMGE4ZGYxLTFlNTYtNDdmZC1iODM0LTZlMGZhODBlY2JkYlwvZDgwdm95ZC05YTE5NzZjYy0zZDYzLTRiOTctOGZhNi00NjhkZjZkNDY2ZjEuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.FVTABjZiX9Hv8JvLj1tRyqDZzW4KVOK5-_wISGjpMLo',
  'https://unixtitan.net/images/nature-transparent-pixel-4.gif',
  'http://www.this-magic-sea.com/IMAGES/TREEANM.GIF'

];

function randomUrl() {
  let index = Math.floor(Math.random() * urls.length);
  return urls[index];
}

function randomHeight() {
  let maxHeight = document.documentElement.clientHeight;
  let randomHeight = Math.floor(Math.random() * maxHeight) + 'px';
  return randomHeight;
}

function randomWidth() {
  let maxWidth = document.documentElement.clientWidth;
  let randomWidth = Math.floor(Math.random() * maxWidth) + 'px';
  return randomWidth;
}


function createPlant() {
  let src = randomUrl();
  let plants = JSON.parse(localStorage.getItem('flowers'));
  plants.push({
    top: randomHeight(),
    left: randomWidth(),
    src: src,
    index: plants.length
  });
  localStorage.setItem('flowers', JSON.stringify(plants));
}

if (!localStorage.getItem('flowers')) {
  localStorage.setItem('flowers', JSON.stringify([]));
  createPlant();
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;


  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement(e) {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    let array = JSON.parse(localStorage.getItem('flowers'));
    let index = e.target.dataset.index;
    array[index].left = e.target.style.left;
    array[index].top = e.target.style.top;
    localStorage.setItem('flowers', JSON.stringify(array));
  }
}

window.onload = function() {
  let images = JSON.parse(localStorage.getItem('flowers'));
    images.forEach(value => {
    if (value === '') {
      return;
    }
    let img = document.createElement('img');
    img.setAttribute('src', value.src);
    img.style.left = value.left;
    img.style.top = value.top;
    img.classList.add('floating-plant');
    img.dataset.index = value.index;
    // img.addEventListener('click', (e) => {
    //   e.target.style.height = String(parseInt(e.target.height) * 1.1) + 'px';
    //   e.target.style.width = String(parseInt(e.target.width) * 1.1) + 'px';
    // })
    img.addEventListener('dblclick', (e) => {
      e.target.parentNode.removeChild(e.target);
      let array = JSON.parse(localStorage.getItem('flowers'));
      array.splice(e.target.dataset.index, 1, '');
      localStorage.setItem('flowers', JSON.stringify(array));
    });
    dragElement(img);
    document.body.appendChild(img);
  });
  createPlant();
  // make a new plant and store it in local storage
  // put on images object
  // setitem local storage to stringified images object
};
