// Basic Functions
// Return a random unique number
function unique_number() {
  return Math.floor(Date.now() / 1000);
}

// Return a random number float
function random_3d_position(min,max,decimals){
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
}

// Convert HTML position to Array
function htmlPositionToArray(htmlposition){
  const text = htmlposition.toString();
  const positions = text.split(' ');
  return positions;
}
// Basic Functions End

// I DONT KNOW WAHT IS THIS BELOW !!!
// Edit Position, Rotation, and Scale
function edit3Dmodel(type, axis, value, id){
  const asset = id;
  const element = $("#"+asset);

  if(type === "position"){
    var oldposition = element.attr('position');
    var newposition;
  
    if(axis==="x"){
      newposition = value+" "+oldposition.y+" "+oldposition.z;
    }else if(axis==="y"){
      newposition = oldposition.x+" "+value+" "+oldposition.z;
    }else if (axis==="z"){
      newposition = oldposition.x+" "+oldposition.y+" "+value;
    }
    element.attr('position',newposition)

    // CHANGE ASSOCIATION STORAGED
    // get associations storaged
    const umlassociations = storageGetUMLassociation();
    // find the association by uml class
    for(var ass of umlassociations){
    // change asssociation position
      if(id == ass.startumlclass){
        $("#"+ass.id).attr('start_pos',newposition);
      }else if(id == ass.endumlclass){
        $("#"+ass.id).attr('end_pos',newposition);
      }
    }

  }else if(type === "rotation"){
    var oldrotation = element.attr('rotation');
    var newposition = oldrotation.x+" "+value+" "+oldrotation.z;
    element.attr('rotation',newposition)
  }else if(type === "scale"){
    var newscale = value+" "+value+" "+value;
    element.attr('scale',newscale)
  } 
  // console.log('scale', element.attr('scale'));
  // console.log('rotation', element.attr('rotation'));
}
// Edit Position, Rotation, and Scale End

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
    // storageSetUMLclass(idclass,'Class name');
  });


// 3D Iterface End