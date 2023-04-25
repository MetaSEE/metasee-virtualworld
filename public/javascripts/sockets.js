function getAttributes(el){
  var listAttr = el.attributes;
  var arrayAttr = Array.from(listAttr);
  var attrs = arrayAttr.map(function(attr) {
    return attr.name;
  });

  return attrs;
}

const socket = io();

// UMl class
socket.on('UMLclassUpdated', (data)=>{
  setTimeout(()=>{
    const el = document.getElementById(`naf-${data.id}`);

    if(el != null){

      // return el attributes
      let attrs = getAttributes(el);

      const newumlclass = document.createElement('a-umlclass');

      // add again all attributes dynamically
      for(let attr of attrs){
        if(attr == "id"){
          newumlclass.setAttribute(attr, data.id);
        }else if(attr == "networked"){
          newumlclass.setAttribute(attr, {template:'#umlclass-template', persistent: true, networkId:`naf-${data.id}`, owner:'scene'});
        }else{
          newumlclass.setAttribute(attr, el.getAttribute(attr)); 
        }            
      }       

      newumlclass.setAttribute('position', data.position); 

      el.remove(); // NAF creates an a-entity, so I'm deleting and recreating with a-umlclass component 

      document.querySelector('a-scene').appendChild(newumlclass);          
    }
  },5);
}); 

socket.on('UMLclassNameUpdated' , (data)=>{
  document.getElementById(data.id).setAttribute('classname' , data.classname);
});

socket.on('UMLclassPositionUpdated' , (data)=>{
  document.getElementById(data.id).setAttribute('position' , data.position);
});

socket.on('UMLclassRotationUpdated' , (data)=>{
  const el = document.getElementById(data.id)
  const rotation = el.getAttribute('rotation');
  const newrotation = rotation.x+" "+data.rotation+" "+rotation.z;
  el.setAttribute('rotation' , newrotation);
});

socket.on('UMLclassColorUpdated' , (data)=>{
  const idumlclass = document.getElementById(data.id);
  const box = idumlclass.firstChild;
  box.setAttribute('color' , data.color);
});

socket.on('UMLclassScaleUpdated' , (data)=>{
  document.getElementById(data.id).setAttribute('scale' , data.scale);
});

socket.on('UMLclassDeleted' , (data)=>{
  const umlclass =  document.getElementById(data.id);

  if( umlclass != null){
    umlclass.remove();
  }
});

// /UMl class

// UML association
socket.on('UMLassociationUpdated', (data)=>{
  setTimeout(()=>{
    const el = document.getElementById(data.id);
    const newumlassoc = document.createElement('a-association');

    if (el != null) {     
      newumlassoc.setAttribute('id' , data.id);
      newumlassoc.setAttribute('start' , data.start);
      newumlassoc.setAttribute('end' , data.end);
      newumlassoc.setAttribute('networked', {template:'#umlassociation-template', persistent: true, networkId:data.id, owner:'scene'});

      el.remove();
      
    } else {
      newumlassoc.setAttribute('id' , data.id);
      newumlassoc.setAttribute('start' , data.start);
      newumlassoc.setAttribute('end' , data.end);
      newumlassoc.setAttribute('networked', {template:'#umlassociation-template', persistent: true, networkId:data.id, owner:'scene'});
    }

    document.querySelector('a-scene').appendChild(newumlassoc);
  },5);
});

socket.on('UMLassociationDeleted' , (data)=>{
  const umlassoc =  document.getElementById(data.id);

  if( umlassoc != null){
    umlassoc.remove();
  }
});
// /UML association