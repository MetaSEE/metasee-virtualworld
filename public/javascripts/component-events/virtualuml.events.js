// $.getJSON(API_VIRTUALWORLDS)
//   .done((data)=>{ 
//     loadAssets(data.assets);
//   })
//   .fail(()=>{})
//   .always(()=>{})
// ;

// function loadAssets(assets) {
//   for (let asset of assets) {
//     //if there is a umlclass asset
//     if(asset.umlclass){
//       // create a-umlclass
//       createUmlclassEntity(asset.umlclass);
//     //if there is a uml assoiation asset
//     }else if(asset.umlassociation){

//     }
//   }
// }

// // create an a-umlclass element
// function createUmlclassEntity(data) {
//   const scene = document.querySelector('a-scene');
//   const el = document.createElement('a-umlclass');
//   el.setAttribute('id', data.id);
//   el.setAttribute('classname', data.classname);
//   el.setAttribute('position', data.position);
//   el.setAttribute('rotation', data.rotation);
//   el.setAttribute('scale', data.scale);
//   el.setAttribute('color', data.color);

//   scene.append(el);
// }

// 3D Interface 
// Add UML class in the scene
$("#addclass")  
  .click(function(){ 
  
    const min = -3;
    const max = 3;
    const dec = 2;
    let pos_x = random_3d_position(min,max,dec);
    let pos_y = random_3d_position(0,max,dec);
    let pos_z = random_3d_position(min,max,dec);
    let position = {x:pos_x, y:pos_y, z:pos_z}
    
    // generate an id
    const idclass = "umlclass-"+unique_number();

    // generate an a-umlclass element
    const aumlclass = "<a-umlclass id='"+idclass+"' classname='Class name' position='"+pos_x+" "+pos_y+" "+pos_z+"'></a-umlclass>";
    
    // add a-umlclass element
    $("a-scene").append(aumlclass); 
  
    // attribute id to data-aumlclass-class-name and open offcanvas
    $('#aumlclass-class-name')
      .attr('data-aumlclass-class-name',idclass);

    // LOCAL STORAGE - ADD CLASS
    storageSetUMLclass(idclass,'Class name', position);
  });


// 3D Iterface End