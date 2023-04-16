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

// THIS FUNCTION IS TO SET Position, Rotation, and Scale FROM RANGE INPUT OF EDID 3D MODEL PANEL
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

