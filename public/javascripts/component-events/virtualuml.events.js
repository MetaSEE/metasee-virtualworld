// LOAD UMLCLASS
APIloadUMclass(`${API_URL}/umlclass/vw?id=${VW_ID}` , (data_umlclass)=>{
  for(let umlclass of data_umlclass){
    createUMLclassEntity(umlclass);
  }
});

// create an a-umlclass element
function createUMLclassEntity(data) {
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
// LOAD UMLCLASS - END

// LOAD UML ASSOCIATIONS
setTimeout(() => {
  APIloadUMLassociation(`${API_URL}/umlassociation/search?vw=${VW_ID}` , (data_umlassociation)=>{
    createUMLassociationEntity(data_umlassociation);
  });
}, 10);


function createUMLassociationEntity(data){
  for(let umlassociation of data){
    const scene = document.querySelector('a-scene');
    const el = document.createElement('a-association');
    el.setAttribute('id', umlassociation.id);
    el.setAttribute('start', `#${umlassociation.umlclass_start.id}`);
    el.setAttribute('end', `#${umlassociation.umlclass_end.id}`);

    scene.append(el);
  }
}
// LOAD UML ASSOCIATIONS - END  


/////////////////////////////////////////////////////////////////////////////////////
// 3D INTERFACE
/////////////////////////////////////////////////////////////////////////////////////

// ADD UML CLASS IN THE SCENE /////////////////////////////////////////////
$("#addclass")  
  .click(function(){      
    
    // generate an id
    const idclass = "umlclass-"+unique_number();

    // generate an a-umlclass element
    // const aumlclass = "<a-umlclass id='"+idclass+"' classname='Class name' position='"+pos_x+" "+pos_y+" "+pos_z+"' ></a-umlclass>";
    const aumlclass = "<a-umlclass id='"+idclass+"' classname='Class name' virtualuml-camera></a-umlclass>";
    
    // add a-umlclass element
    $("a-scene").append(aumlclass); 
  
    // attribute id to data-aumlclass-class-name and open offcanvas
    $('#aumlclass-class-name')
      .attr('data-aumlclass-class-name',idclass);

    setTimeout(()=>{
      let position = $("#"+idclass).attr('position');

      // LOCAL STORAGE - ADD CLASS
      storageSetUMLclass(idclass,'Class name', position);
    },10);
  });


// CHANGE 3D UML CLASS NAME FROM EDIT CLASS PANEL /////////////////////////////////////////////
$('#aumlclass-class-name')
  .keyup(function(){ // from input type text
    const aumlclass_target = $(this).attr('data-aumlclass-class-name'); // get aumlclass id
    $("#"+aumlclass_target).attr('classname',$(this).val()); // change 3d uml class name
  })
  .on('keypress',function(evt) { // call the DONE button when pressing ENTER 
    const aumlclass_target = $(this).attr('data-aumlclass-class-name'); // get aumlclass id
    
    if(evt.which == 13) {
        // CLOSE OFFCANVAS      
        var myOffcanvas = document.getElementById('offcanvasScrolling');
        var bsOffcanvas = bootstrap.Offcanvas.getInstance(myOffcanvas);
        bsOffcanvas.hide();

        // LOCAL STORAGE - RENAME CLASS
        storageRenameUMLclass(aumlclass_target, $(this).val());
    }    
  });








/////////////////////////////////////////////////////////////////////////////////////
// 2D INTERFACE
/////////////////////////////////////////////////////////////////////////////////////


// ADD ONE ATTRIBUTE INPUT TYPE TEXT /////////////////////////////////////////////

const aumlclass_add_attr = '<div class="row mb-2" id="aumlclass-attr-row"><div class="col col-md-8"><input type="text" class="form-control aumlclass-attr-name" aria-describedby="textHelp" name="attr[]" placeholder="Enter attribute name"></div><div class="col col-md-4"><button type="button" class="btn btn-danger" style="width:100%" id="aumlclass-bt-remove-attr-row">Remove</button></div></div>'; 

// add 
$("#aumlclass-bt-add-attr")
  .click(function(){
    $("#aumlclass-attr-row").append(aumlclass_add_attr);
  });

// remove
$(document).on('click', '#aumlclass-bt-remove-attr-row', function () {
    $(this).closest('.row').remove();
});


// ADD ONE OPERATION INPUT TYPE TEXT /////////////////////////////////////////////

const aumlclass_add_oper = '<div class="row mb-2"><div class="col col-md-8"><input type="text" class="form-control aumlclass-oper-name" aria-describedby="textHelp" name="oper[]" placeholder="Enter operation name"></div><div class="col col-md-4"><button type="button" class="btn btn-danger" style="width:100%" id="aumlclass-bt-remove-oper-row">Remove</button></div></div>';

// add 
$("#aumlclass-bt-add-oper")
  .click(function(){
    $("#aumlclass-oper-row").append(aumlclass_add_oper);
  });

// remove
$(document).on('click', '#aumlclass-bt-remove-oper-row', function () {
    $(this).closest('.row').remove();
});


// FOCUS ON CLASS NAME INPUT TYPE TEXT /////////////////////////////////////////////
$("#offcanvasScrolling").on('shown.bs.offcanvas	', function(){
  $('#aumlclass-class-name').trigger('focus');

  // set uml classname value
  // get id from localstorage
  const idumlclass = storageGetEditingAsset().id;

  // get the classname from API
  APIgetUMLclass(`${API_URL}/umlclass/id/${idumlclass}` , (data)=>{
      // set the uml classname
      for(let umlclass of data){
        $('#aumlclass-class-name').val(umlclass.classname);
      }
  });
});

// HIDE RENAME AND DELETE AND SHOW COLOR & POSITION /////////////////////////////////////////////
$("#offcanvasScrolling").on('show.bs.offcanvas	', function(){
  // none to hidde and block to show
  $('#bt-menu-rename').attr('style','display:none');
  $('#bt-menu-delete').attr('style','display:none');
  $('#bt-menu-color-position').attr('style','display:block');
});

// SHOW RENAME AND DELETE AND HIDDE COLOR & POSITION /////////////////////////////////////////////
$("#offcanvasEdit3DModelPanel").on('show.bs.offcanvas	', function(){
  // none to hidde and block to show
  $('#bt-menu-rename').attr('style','display:block');
  $('#bt-menu-delete').attr('style','display:block');
  $('#bt-menu-color-position').attr('style','display:none');

  // show classname on the panel
  const idumlclass = storageGetEditingAsset().id;
  APIgetUMLclass(`${API_URL}/umlclass/id/${idumlclass}` , (data)=>{
    for(let umlclass of data){
      $('#offcanvasEdit3DModelPanelLabel').text(`${umlclass.classname}`);
    }
  });
});


// CLEAR THE CLASS NAME INPUT TYPE TEXT /////////////////////////////////////////////
$("#offcanvasScrolling").on('hidden.bs.offcanvas	', function(){
  $("#aumlclass-class-name").val('');
});


// ADD CLASSSES IN THE SELECTS OF THE EDIT ASSOCIATION PANEL  /////////////////////////////////////////////
$("#offcanvasScrolling").on('hidden.bs.offcanvas	', function(){
  // $("#aumlclass-ass-start-select").remove();
  // $("#aumlclass-ass-end-select").remove();

  // if( storageGetUMLclasses().length >= 1 ){
  //   const selectstart = '<select id="aumlclass-ass-start-select" aria-label="" class="form-select"><option value=""></option></select>';
  //   $("#aumlclass-section-ass-start .card-body").append(selectstart);

  //   const selectend = '<select id="aumlclass-ass-end-select" aria-label="" class="form-select"><option value=""></option></select>';
  //   $("#aumlclass-section-ass-end .card-body").append(selectend);

  //   for(var umlclass of storageGetUMLclasses()){
  //     var option = '<option value="'+umlclass.id+'">'+umlclass.classname+'</option>'; 
  //     $("#aumlclass-ass-start-select").append(option); // association start
  //     $("#aumlclass-ass-end-select").append(option);   // association end
  //   }
  // }
});


// CLEAR DATAS FROM EDIT ASSOCIATION PANEL /////////////////////////////////////////////
$("#offcanvasEditAssociationPanel").on('hidden.bs.offcanvas	', function(){
  $("#aumlclass-ass-start-select").val('');
  $("#aumlclass-ass-end-select").val('');
});


// ADD 3D ASSOCIATION AFTER "DONE" BUTTON CLICKED FROM EDIT ASSOCIATION PANEL /////////////////////////////////////////////
$("#offcanvasEditAssociationPanel").on('hide.bs.offcanvas', function(){
  const editingasset = storageGetEditingAsset();                            // return a json object
  const umlassociation = storageFindUMLassociationById(editingasset.id);    // return a json object or false
  
  // verify if there is a new association filled out from edit associations panel
  // if there is no, create
  if(!umlassociation){
    // create id uml association
    const idassociation = "association-"+unique_number();
    
    // get id uml class from association start
    const idumlclass_start = $("#aumlclass-ass-start-select").find(":selected").val();
    
    // get id uml class from association end
    const idumlclass_end = $("#aumlclass-ass-end-select").find(":selected").val();
    
    // create association with uml class start and end
    const association_3d = "<a-association id='"+idassociation+"' start='#"+idumlclass_start+"' end='#"+idumlclass_end+"'></a-association>";

    // GET _ID UMLCLASS
    APIgetUMLclass(`${API_URL}/umlclass/id/${idumlclass_start}`, (data_start)=>{
      id_umlclass_start_mongodb = data_start[0]._id; // from _id umlclasses
      
      APIgetUMLclass(`${API_URL}/umlclass/id/${idumlclass_end}`, (data_end)=>{
        id_umlclass_end_mongodb = data_end[0]._id; // from _id umlclasses

        // first, verify if a-association exists
        // if yes, dot not create it
        // if not, create it
        // $("a-scene").append(association_3d);
        if(storageGetEditingAsset().type == "umlassociation"){
          const idassociation_editing = storageGetEditingAsset().id;
          APIloadUMLassociation(`${API_URL}/umlassociation/id/${idassociation_editing}` , (data)=>{
            for(let umlassoc of data){
              if(idumlclass_start == umlassoc.umlclass_start.id && idumlclass_end == umlassoc.umlclass_end.id){
                console.log('tem associação');
              }else{
                // CREATE A-ASSOCIATION ELEMENT
                $("a-scene").append(association_3d);

                // LOCAL AND API STORAGE
                storageSetUMLassociation(idassociation, idumlclass_start, idumlclass_end, id_umlclass_start_mongodb, id_umlclass_end_mongodb);

                console.log('saving');
              }
            }
          });
        }else{
          // CREATE A-ASSOCIATION ELEMENT
          $("a-scene").append(association_3d);

          // LOCAL AND API STORAGE
          storageSetUMLassociation(idassociation, idumlclass_start, idumlclass_end, id_umlclass_start_mongodb, id_umlclass_end_mongodb);
        }
      });
    });       
  }
});



// EVENTS TO SHOW AND HIDDEN MENUS
// when addclass and addassociation are clicked
$('#addclass, #addassociation').click(function(){
  $('#mainmenu').attr('style','display:none');    //hidden
  $('#classmenu').attr('style','display:block');  //show
});

// when offcanvas is closed
$("#offcanvasScrolling, #offcanvasEditAssociationPanel, #offcanvasEdit3DModelPanel").on('hide.bs.offcanvas', function(){
  $('#mainmenu').attr('style','display:block');     //show
  $('#classmenu').attr('style','display:none');     //hidden
});

// when offcanvas is opened 
$("#offcanvasScrolling, #offcanvasEditAssociationPanel, #offcanvasEdit3DModelPanel").on('shown.bs.offcanvas', function(){ 
  $('#mainmenu').attr('style','display:none');     //show
  $('#classmenu').attr('style','display:block');     //hidden  
});

// when offcanvasEdit3DModelPanel is opened 
$("#offcanvasEdit3DModelPanel").on('shown.bs.offcanvas', function(){
  const idumlclass = storageGetEditingAsset().id;

  APIgetUMLclass(`${API_URL}/umlclass/id/${idumlclass}` , function(data){
    // COLOR
    $("#umlClassColor").val(data[0].color);

    // POSITION
    //change input type=range and type=text
    // X
    $("#pos_x_text").val(data[0].position.x);
    $("#pos_x_range").val(data[0].position.x);
    // Y
    $("#pos_y_text").val(data[0].position.y);
    $("#pos_y_range").val(data[0].position.y);
    // Z
    $("#pos_z_text").val(data[0].position.z);
    $("#pos_z_range").val(data[0].position.z);

    // ROTATION
    //change input type=range and type=text
    $("#rotation_text").val(data[0].position.y);
    $("#rotation_range").val(data[0].position.y);

    // SCALE
    //change input type=range and type=text
    $("#scale_text").val(data[0].position.x);
    $("#scale_range").val(data[0].position.x);
  });
  
});

// when offcanvasScrolling is opened 
$("#offcanvasEditAssociationPanel").on('shown.bs.offcanvas', function(){
  $("#aumlclass-ass-start-select").remove();
  $("#aumlclass-ass-end-select").remove();

  // List the uml associations
  APIgetUMLclass(`${API_URL}/umlclass/vw?id=${VW_ID}` , function(data){
    if(data.length > 0){
      const selectstart = '<select id="aumlclass-ass-start-select" aria-label="" class="form-select"><option value=""></option></select>';
      $("#aumlclass-section-ass-start .card-body").append(selectstart);

      const selectend = '<select id="aumlclass-ass-end-select" aria-label="" class="form-select"><option value=""></option></select>';
      $("#aumlclass-section-ass-end .card-body").append(selectend);

      for(let umlclass of data){
        var option = '<option value="'+umlclass.id+'">'+umlclass.classname+'</option>'; 
        $("#aumlclass-ass-start-select").append(option); // association start
        $("#aumlclass-ass-end-select").append(option);   // association end
      }
    }
  });

  // verify if some uml assocition is editing
  // in the case yes, show the uml classes
  if(storageGetEditingAsset().type=="umlassociation"){
    const id_assoc = storageGetEditingAsset().id;

    // UPDATE OFFCANVAS WITH UML ASSOCIATION DATA  
    const ass_classstart_select = document.querySelector("#aumlclass-ass-start-select");
    const ass_classsend_select = document.querySelector("#aumlclass-ass-end-select");

    APIloadUMLassociation(`${API_URL}/umlassociation/id/${id_assoc}` , (data)=>{
      for(let assoc of data){
        setTimeout(()=>{
          $("#aumlclass-ass-start-select").val(assoc.umlclass_start.id);
          $("#aumlclass-ass-end-select").val(assoc.umlclass_end.id);
        }, 5);
      }
    });
  }
  
});


// CHANGE VALUES FROM X,Y,Z POSITION, ROTATION, AND SCALE
// X
$('#pos_x_range').on('input change', function(){
  // change input type text
  $('#pos_x_text').val($(this).val());

  // update 3d element position
  edit3Dmodel("position","x",$(this).val(),storageGetEditingAsset().id);

  // change position
  const idumlclass = storageGetEditingAsset().id;
  const position = $("#"+idumlclass).attr('position');
  const newposition = {
    "x":$(this).val(),
    "y":position.y,
    "z":position.z
  }
  APIupdateUMLclass(`${API_URL}/umlclass/id/${idumlclass}` , {"position":newposition}); //change position.x
});

// Y
$('#pos_y_range').on('input change', function(){
  // change input type text
  $('#pos_y_text').val($(this).val());

  // update 3d element position
  edit3Dmodel("position","y",$(this).val(),storageGetEditingAsset().id);

  // change position
  const idumlclass = storageGetEditingAsset().id;
  const position = $("#"+idumlclass).attr('position');
  const newposition = {
    "x":position.x,
    "y":$(this).val(),
    "z":position.z
  }
  APIupdateUMLclass(`${API_URL}/umlclass/id/${idumlclass}` , {"position":newposition}); //change position.y
});

// Z
$('#pos_z_range').on('input change', function(){
  // change input type text
  $('#pos_z_text').val($(this).val());

  // update 3d element position
  edit3Dmodel("position","z",$(this).val(),storageGetEditingAsset().id);  

  // change position
  const idumlclass = storageGetEditingAsset().id;
  const position = $("#"+idumlclass).attr('position');
  const newposition = {
    "x":position.x,
    "y":position.y,
    "z":$(this).val()
  }
  APIupdateUMLclass(`${API_URL}/umlclass/id/${idumlclass}` , {"position":newposition}); //change position.z
});

// Rotation
$('#rotation_range').on('input change', function(){
  // change input type text
  $('#rotation_text').val($(this).val());

  // update 3d element position
  edit3Dmodel("rotation","",$(this).val(),storageGetEditingAsset().id); 
  
  // change rotation
  const idumlclass = storageGetEditingAsset().id;
  APIupdateUMLclass(`${API_URL}/umlclass/id/${idumlclass}` , {"rotation":{"y":$(this).val()}});
});

// Scale
$('#scale_range').on('input change', function(){
  // change input type text
  $('#scale_text').val($(this).val());

  // update 3d element position
  edit3Dmodel("scale","",$(this).val(),storageGetEditingAsset().id);  

  // change scale
  const idumlclass = storageGetEditingAsset().id;
  const data = {"x":$(this).val(), "y":$(this).val(), "z":$(this).val()};
  APIupdateUMLclass(`${API_URL}/umlclass/id/${idumlclass}` , {"scale":data});
});


// CHANGE UML CLASS COLOR
$('#umlClassColor').on('input change', function(){
  const editingasset = storageGetEditingAsset();        // get 3d model from storage
  const element = $("#"+editingasset.id+" a-box");      // select a-box
  element.attr('color',$(this).val());                  // change color

  // change color
  APIupdateUMLclass(`${API_URL}/umlclass/id/${editingasset.id}` , {"color":$(this).val()});
});

// DONE BUTTON
$("#bt-offcanvas-done").click(()=>{
  const field = $("#aumlclass-class-name");
  const newclassname = field.val();
  const idumlclass = field.attr('data-aumlclass-class-name');

  storageRenameUMLclass(idumlclass, newclassname);
});

// DELETE UMLCLASS
$("#bt-deleteumlclass").click(function(){
  const idumlclass = storageGetEditingAsset().id;
  const classname = $("#"+idumlclass).attr('classname');

  // console.log('idumlclass' , idumlclass);
  // console.log('umlclass' , classname);

  const resp = confirm('Are you sure delete "'+classname+'"?');

  if(resp){
    // CLOSE EDIT UML CLASS PANEL
    var myOffcanvas = document.getElementById('offcanvasScrolling');
    var bsOffcanvas = bootstrap.Offcanvas.getInstance(myOffcanvas);
    bsOffcanvas.hide();

    // SHOW TOAST
    //change content
    $("#UMLclassDeletedToast .toast-body").html("<b>"+classname+"</b> deleted successfully!");

    // show toast
    const toast = new bootstrap.Toast($("#UMLclassDeletedToast"));
    toast.show();

    // DELETE ASSOCIATION
    // select if has startclass_start
    // select if has startclass_end
    // if yes, remove uml association
    //PAREI AQUI
    APIloadUMLassociation(`${API_URL}/umlassociation/search?vw=${VW_ID}` , (umlassociations)=>{
      for(let umlassoc of umlassociations){
        if(umlassoc.umlclass_start.id == idumlclass || umlassoc.umlclass_end.id == idumlclass){
          storageDeleteUMLassociationById(umlassoc.id);
          $("#"+umlassoc.id).remove();

          // DELETE UML CLASS FROM VIRTUAL WORLD
          $("#"+idumlclass).remove();

          // LOCAL STORAGE
          // delete umlclass
          storageDeleteUMLclassById(idumlclass);          
        }
      }
    });
  }
});

// DELETE UML ASSOCIATION
$("#bt-deleteumlassociation").click(function(){
  const idumlassociation = storageGetEditingAsset().id;
  // const classname = $("#"+idumlclass).attr('classname');

  const resp = confirm('Are you sure delete this association?');

  if(resp){
    // CLOSE EDIT UML CLASS PANEL
    var myOffcanvas = document.getElementById('offcanvasEditAssociationPanel');
    var bsOffcanvas = bootstrap.Offcanvas.getInstance(myOffcanvas);
    bsOffcanvas.hide();

    // SHOW TOAST
    //change content
    $("#UMLassociationDeletedToast .toast-body").html("<b>Association</b> deleted successfully!");

    // show toast
    const toast = new bootstrap.Toast($("#UMLassociationDeletedToast"));
    toast.show();

    // DELETE UML CLASS FROM VIRTUAL WORLD
    $("#"+idumlassociation).remove();

    // LOCAL STORAGE
    // delete umlassociation
    storageDeleteUMLassociationById(idumlassociation);
  }
});
