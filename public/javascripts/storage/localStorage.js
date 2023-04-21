localStorage.removeItem('umlclasses');           // DELETE umlclasses IF IT EXISTS
localStorage.removeItem('umlassociations');      // DELETE umlassociations IF IT EXISTS
// localStorage.removeItem('editingasset');         // DELETE editingasset IF IT EXISTS


let UMLCLASSES = [];         // CREATE UML CLASS ARRAY
let UMLASSOCIATIONS = [];    // CREATE UML ASSOCIATION ARRAY
// let EDITINGASSET = [];            // STORE WHICH UML ASSET IS BEING EDITED >>> Model: {'type':'[umlclass OR umlassociation ...]','id':[id]}

///////////////////////////////////////////////////////////////////////////////
// FUNCTIONS //////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


// CLASSES  ////////////

// CREATE UML CLASS
function storageSetUMLclassOnlyLocalStorage(id, classname){
  UMLCLASSES.push( {'id':id,'classname':classname} );
  localStorage.setItem('umlclasses',JSON.stringify(UMLCLASSES));
}

function storageSetUMLclass(id, classname, position){
  storageSetUMLclassOnlyLocalStorage(id, classname);

  let umlclassdata = {
    "id":id,
    "classname": classname,
    "owner":"6442a07b9426fb47e3c009a8", //CHANGE THIS
    "virtualworld": VW_ID,
    "color":"#FFA500",
    "position": position
  }

  console.log(umlclassdata);

  APIcreateUMLclass(`${API_URL}/umlclass` , umlclassdata);
}

// RETURN UML CLASSES
function storageGetUMLclasses(){
  return UMLCLASSES;
}

// RENAME UML CLASS
function storageRenameUMLclass(id, classname){
  // // find uml class by id
  // var umlclass = storageFindUMLclassById(id);

  // delete it from UMLCLASSES
  storageDeleteUMLclassByIdOnlyLocalStorage(id);

  // add it with new data in UMLCLASSES
  storageSetUMLclassOnlyLocalStorage(id, classname);

  APIupdateUMLclass(`${API_URL}/umlclass/id/${id}` , {"classname":classname});
}

// FIND UML CLASS BY ID
function storageFindUMLclassById(id){
  var r;

  for(var umlclass of UMLCLASSES){
    if(id === umlclass.id){
      r = umlclass;
    }
  }

  return r;
}

// DELETE UML CLASS
function storageDeleteUMLclassByIdOnlyLocalStorage(id){
  var index;

  for(var i=0; i<UMLCLASSES.length; i++){
    if(id === UMLCLASSES[i].id){
      index = i;
    }
  }

  UMLCLASSES.splice(index, 1);
}

function storageDeleteUMLclassById(id){
  APIdeleteUMLclass(`${API_URL}/umlclass/id/${id}`);
}



// ASSOCIATIONS ///////

// CREATE UML ASSOCIATION
function storageSetUMLassociationOnlyLocalStorage(id, startumlclass, endumlclass){
  UMLASSOCIATIONS.push( {'id':id,'startumlclass':startumlclass, 'endumlclass':endumlclass} );
  localStorage.setItem('umlassociations',JSON.stringify(UMLASSOCIATIONS));
}

function storageSetUMLassociation(id, idumlclass_start, idumlclass_end, id_umlclass_start_mongodb, id_umlclass_end_mongodb){
  storageSetUMLassociationOnlyLocalStorage(id, idumlclass_start, idumlclass_end);

  let data = {
    "id": id,
    "umlclass_start": id_umlclass_start_mongodb,
    "umlclass_end": id_umlclass_end_mongodb,
    "virtualworld": VW_ID
  }

  APIcreateUMLassociation(`${API_URL}/umlassociation` , data);
}

// GET UML ASSOCIATIONS
function storageGetUMLassociation(){
  return UMLASSOCIATIONS;
}

// RENAME UML ASSOCIATION
function storageRenameUMLassociation(id, startumlclass, endumlclass){
  // delete it from UMLCLASSES
  storageDeleteUMLassociationByIdOnlyLocalStorage(id);

  // add it with new data in UMLCLASSES
  storageSetUMLassociationOnlyLocalStorage(id, startumlclass, endumlclass);
}

// FIND UML ASSOCIATION BY ID
function storageFindUMLassociationById(id){
  var r;

  for(var umlass of UMLASSOCIATIONS){
    if(id === umlass.id){
      r = umlass;
    }
  }

  return r;
}

// DELETE UML ASSOCIATION BY ID
function storageDeleteUMLassociationById(id){
  APIdeleteUMLclass(`${API_URL}/umlassociation/id/${id}`);
}

function storageDeleteUMLassociationByIdOnlyLocalStorage(id){
  var index;

  for(var i=0; i<UMLASSOCIATIONS.length; i++){
    if(id === UMLASSOCIATIONS[i].id){
      index = i;
    }
  }

  UMLASSOCIATIONS.splice(index, 1);
}



// EDTING ASSET //////
function storageSetEditingAsset(type, id){  // Model: {'type':'[umlclass OR umlassociation ...]','id':[id]}
  localStorage.setItem('editingasset',JSON.stringify({'type':type,'id':id}));
}

function storageGetEditingAsset(){
  return JSON.parse(localStorage.getItem('editingasset'));
}