window.onload = function() {
  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      const target = event.target.getAttribute('data-target');
      loadCarousel(target);
    });
  });
};

function loadCarousel(target) {
  const imageSets = {
    bg: ['bg/flowers.png', 'bg/granite.png', 'bg/hex.png', 'bg/superhex.png', 'bg/peacock.png', 'bg/tapestry.png', 'bg/zag.png'],
    layer2: ['layer2/brown.png', 'layer2/browngrid.png', 'layer2/brownwave.png', 'layer2/darkred.png', 'layer2/grey.png', 'layer2/orange.png', 'layer2/royalblue.png', 'layer2/yellow.png'],
    layer3: ['layer3/black.png', 'layer3/bluezag.png', 'layer3/blue.png', 'layer3/darkred.png', 'layer3/reddotted.png', 'layer3/yellow.png'],
    layer4: ['layer4/branches.png', 'layer4/macaroni.png', 'layer4/rosepetal.png', 'layer4/spider.png', 'layer4/starrynight.png'],
    shadowline: ['shadowline/black.png', 'shadowline/blue.png', 'shadowline/red.png'],
    lips: ['lips/pouty.png', 'lips/exhale.png', 'lips/goldteeth.png', 'lips/smile.png'],
    hair: ['hair/black.png', 'hair/concrete.png', 'hair/glass.png', 'hair/metallic.png'],
    face: ['face/one.png', 'face/two.png'],
    eyesplus: ['eyesplus/green.png', 'eyesplus/blue.png', 'eyesplus/colorful.png', 'eyesplus/winking.png'],
    dress: ['dress/paisley.png', 'dress/black.png', 'dress/diamond.png', 'dress/polkadot.png', 'dress/rose.png', 'dress/spider.png']
  };

  const selectedSet = imageSets[target];
  if (!selectedSet) return;

  changeCarousel(target, selectedSet);
}

function changeCarousel(folder, images) {
  var carouselInner = document.getElementById('carouselInner');
  carouselInner.innerHTML = '';

  images.forEach(function(src, index) {
    var div = document.createElement('div');
    div.className = 'carousel-item' + (index === 0 ? ' active' : '');
    var img = document.createElement('img');
    img.src = 'assets/' + src;  // Make sure this path is correct
    img.className = 'img-fluid rounded-3 shadow-lg d-block w-100';
    img.alt = 'Image Description';
    div.appendChild(img);
    carouselInner.appendChild(div);
  });
}
