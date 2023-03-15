$.getJSON(API_VIRTUALWORLDS)
  .done((data)=>{ 
    loadAssets(data.assets);
  })
  .fail(()=>{})
  .always(()=>{})
;

function loadAssets(assets) {
  for (let asset of assets) {
    //if there is a umlclass asset
    if(asset.umlclass){
      // create a-umlclass
      createUmlclassEntity(asset.umlclass);
    //if there is a uml assoiation asset
    }else if(asset.umlassociation){

    }
  }
}

// create an a-umlclass element
function createUmlclassEntity(data) {
  const scene = document.querySelector('a-scene');
  const el = document.createElement('a-umlclass');
  el.setAttribute('id', data.id);
  el.setAttribute('classname', data.classname);
  el.setAttribute('position', data.position);
  el.setAttribute('rotation', data.rotation);
  el.setAttribute('scale', data.scale);
  el.setAttribute('color', data.color);

  scene.append(el);
}