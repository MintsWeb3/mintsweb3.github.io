document.addEventListener('DOMContentLoaded', () => {
  const imageSets = {
    bg: ['../assets/bg/flowers.png', '../assets/bg/granite.png', '../assets/bg/hex.png', '../assets/bg/superhex.png', '../assets/bg/peacock.png', '../assets/bg/tapestry.png', '../assets/bg/zag.png'],
    layer2: ['../assets/layer2/brown.png', '../assets/layer2/browngrid.png', '../assets/layer2/brownwave.png', '../assets/layer2/darkred.png', '../assets/layer2/grey.png', '../assets/layer2/orange.png', '../assets/layer2/royalblue.png', '../assets/layer2/yellow.png'],
    layer3: ['../assets/layer3/black.png', '../assets/layer3/bluezag.png', '../assets/layer3/blue.png', '../assets/layer3/darkred.png', '../assets/layer3/reddotted.png', '../assets/layer3/yellow.png'],
    layer4: ['../assets/layer4/branches.png', '../assets/layer4/macaroni.png', '../assets/layer4/rosepetal.png', '../assets/layer4/spider.png', '../assets/layer4/starrynight.png'],
    shadowline: ['../assets/shadowline/black.png', '../assets/shadowline/blue.png', '../assets/shadowline/red.png'],
    lips: ['../assets/lips/pouty.png', '../assets/lips/exhale.png', '../assets/lips/goldteeth.png', '../assets/lips/smile.png'],
    hair: ['../assets/hair/black.png', '../assets/hair/concrete.png', '../assets/hair/glass.png', '../assets/hair/metallic.png'],
    face: ['../assets/face/one.png', '../assets/face/two.png'],
    eyesplus: ['../assets/eyesplus/green.png', '../assets/eyesplus/blue.png', '../assets/eyesplus/colorful.png', '../assets/eyesplus/winking.png'],
    dress: ['../assets/dress/paisley.png', '../assets/dress/black.png', '../assets/dress/diamond.png', '../assets/dress/polkadot.png', '../assets/dress/rose.png', '../assets/dress/spider.png'],
};

  
const layerOrder = {
  bg: 1,
  layer2: 2,
  layer3: 3,
  layer4: 4,
  shadowline: 5,
  face: 6,
  hair: 7,
  lips: 8,
  eyesplus: 9,
  dress: 10
};


  const layerSelector = document.querySelector('.layer-selector');
  const frame = document.getElementById('frame');
  
  for (const layer in imageSets) {
    const btnGroup = document.createElement('div');
    btnGroup.className = 'btn-group';
    
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-black dropdown-toggle';
    button.setAttribute('data-bs-toggle', 'dropdown');
    button.setAttribute('aria-expanded', 'false');
    button.textContent = layer;
    btnGroup.appendChild(button);
    
    const dropdownMenu = document.createElement('ul');
    dropdownMenu.className = 'dropdown-menu';
    
    imageSets[layer].forEach((image) => {
      const listItem = document.createElement('li');
      const anchor = document.createElement('a');
      anchor.className = 'dropdown-item';
      anchor.href = '#';
      anchor.textContent = image.split('/').pop().split('.')[0];
      
      anchor.addEventListener('click', () => {
        console.log('Image clicked:', image); // Log which image was clicked
  let imgElement = frame.querySelector(`img[data-layer=${layer}]`);

  if(!imgElement) {
    imgElement = document.createElement('img');
    imgElement.setAttribute('data-layer', layer);
    imgElement.style.position = 'absolute';
    imgElement.style.zIndex = layerOrder[layer]; // Set the z-index here
    frame.appendChild(imgElement);
  }

  imgElement.src = image;
});


      listItem.appendChild(anchor);
      dropdownMenu.appendChild(listItem);
    });
    
    btnGroup.appendChild(dropdownMenu);
    layerSelector.appendChild(btnGroup);
  }
});
