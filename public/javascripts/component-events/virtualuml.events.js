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

/////////////////////////////////////////////////////////////////////////////////////
// 3D INTERFACE
/////////////////////////////////////////////////////////////////////////////////////


// ADD UML CLASS IN THE SCENE /////////////////////////////////////////////
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
});


// CLEAR THE CLASS NAME INPUT TYPE TEXT /////////////////////////////////////////////
$("#offcanvasScrolling").on('hidden.bs.offcanvas	', function(){
  $("#aumlclass-class-name").val('');
});


// ADD CLASSSES IN THE SELECTS OF THE EDIT ASSOCIATION PANEL  /////////////////////////////////////////////
$("#offcanvasScrolling").on('hidden.bs.offcanvas	', function(){
  $("#aumlclass-ass-start-select").remove();
  $("#aumlclass-ass-end-select").remove();

  if( storageGetUMLclasses().length >= 1 ){
    const selectstart = '<select id="aumlclass-ass-start-select" aria-label="" class="form-select"><option value=""></option></select>';
    $("#aumlclass-section-ass-start .card-body").append(selectstart);

    const selectend = '<select id="aumlclass-ass-end-select" aria-label="" class="form-select"><option value=""></option></select>';
    $("#aumlclass-section-ass-end .card-body").append(selectend);

    for(var umlclass of storageGetUMLclasses()){
      var option = '<option value="'+umlclass.id+'">'+umlclass.classname+'</option>'; 
      $("#aumlclass-ass-start-select").append(option); // association start
      $("#aumlclass-ass-end-select").append(option);   // association end
    }
  }
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
    
    // create a-association element
    $("a-scene").append(association_3d);

    // LOCAL STORAGE
    storageSetUMLassociation(idassociation, idumlclass_start, idumlclass_end);   
  }
});



// EVENTS TO SHOW AND HIDDEN MENUS
// when addclass and addassociation are clicked
$('#addclass, #addassociation').click(function(){
  $('#mainmenu').attr('style','display:none');    //hidden
  $('#classmenu').attr('style','display:block');  //show
});

// when offcanvas are closed
$("#offcanvasScrolling, #offcanvasEditAssociationPanel, #offcanvasEdit3DModelPanel").on('hide.bs.offcanvas', function(){
  $('#mainmenu').attr('style','display:block');     //show
  $('#classmenu').attr('style','display:none');     //hidden
});

$("#offcanvasScrolling, #offcanvasEditAssociationPanel, #offcanvasEdit3DModelPanel").on('shown.bs.offcanvas', function(){
  $('#mainmenu').attr('style','display:none');     //show
  $('#classmenu').attr('style','display:block');     //hidden
});



// CHANGE VALUES FROM X,Y,Z POSITION, ROTATION, AND SCALE
// X
$('#pos_x_range').on('input change', function(){
  // change input type text
  $('#pos_x_text').val($(this).val());

  // update 3d element position
  edit3Dmodel("position","x",$(this).val(),storageGetEditingAsset().id);
});

// Y
$('#pos_y_range').on('input change', function(){
  // change input type text
  $('#pos_y_text').val($(this).val());

  // update 3d element position
  edit3Dmodel("position","y",$(this).val(),storageGetEditingAsset().id);
});

// Z
$('#pos_z_range').on('input change', function(){
  // change input type text
  $('#pos_z_text').val($(this).val());

  // update 3d element position
  edit3Dmodel("position","z",$(this).val(),storageGetEditingAsset().id);  
});

// Rotation
$('#rotation_range').on('input change', function(){
  // change input type text
  $('#rotation_text').val($(this).val());

  // update 3d element position
  edit3Dmodel("rotation","",$(this).val(),storageGetEditingAsset().id);  
});

// Scale
$('#scale_range').on('input change', function(){
  // change input type text
  $('#scale_text').val($(this).val());

  // update 3d element position
  edit3Dmodel("scale","",$(this).val(),storageGetEditingAsset().id);  
});


// CHANGE UML CLASS COLOR
$('#umlClassColor').on('input change', function(){
  const editingasset = storageGetEditingAsset();        // get 3d model from storage
  const element = $("#"+editingasset.id+" a-box");      // select a-box
  element.attr('color',$(this).val());                  // change color
});


// DELETE UMLCLASS
$("#bt-deleteumlclass").click(function(){
  const idumlclass = storageGetEditingAsset().id;
  const umlclass = storageFindUMLclassById(idumlclass);

  const resp = confirm('Are you sure delete "'+umlclass.classname+'"?');

  if(resp){
    // CLOSE EDIT UML CLASS PANEL
    var myOffcanvas = document.getElementById('offcanvasScrolling');
    var bsOffcanvas = bootstrap.Offcanvas.getInstance(myOffcanvas);
    bsOffcanvas.hide();

    // SHOW TOAST
    //change content
    $("#UMLclassDeletedToast .toast-body").html("<b>"+umlclass.classname+"</b> deleted successfully!");

    // show toast
    const toast = new bootstrap.Toast($("#UMLclassDeletedToast"));
    toast.show();

    // DELETE ASSOCIATION
    const deleteAssociations = [];
    const umlassociations = storageGetUMLassociation();

    for(var ass of umlassociations){
      if(ass.startumlclass == idumlclass || ass.endumlclass == idumlclass){
        $("#"+ass.id).remove();
        deleteAssociations.push(ass.id);
      }
    }

    for(var del of deleteAssociations){
      storageDeleteUMLassociationById(del.id);
    }

    // DELETE UML CLASS FROM VIRTUAL WORLD
    $("#"+idumlclass).remove();

    // LOCAL STORAGE
    // delete umlclass
    storageDeleteUMLclassById(idumlclass);
  }
});

// $("#exampleModal")
//   // .click().addClass('modal-open')

//   .on('shown.bs.modal', function () {
//     // $("body").removeClass("modal-open");
//     // $("body").removeAttr("style");
//     // $("body").addClass("modal-dialog");		
//   });
//   // .on('hidden.bs.modal', function () {
//   //   $("body").removeClass("modal-dialog");
//   // });

// $("#addclass")
//   .click(function(){
//     $('#exampleModal')
//       .removeClass("show")
//       .removeAttr('style')
//       .attr('style','display:none')
//       .removeAttr('aria-modal')
//       .removeAttr('role')
//       .attr('aria-hidden','true');
      
//     $("body")
//       .removeClass("modal-open")
//       .removeAttr('style');
//   });


// $("#offcanvasScrolling")
//   .on('shown.bs.offcanvas', function(){
//     // alert('offcanvasScrolling');
//     // $("body").removeAttr("style");
//   })

