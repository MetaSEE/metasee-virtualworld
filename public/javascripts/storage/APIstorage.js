// DEFAULT SETTINGS
// get current URL
const URL = $(location).attr('href');

// separate URL according /
const decodedURL = URL.split("/"); 

// return the last item, id
const VW_ID = decodedURL[decodedURL.length-1];

const API_URL = `http://localhost:3333`;
// DEFAULT SETTINGS - END


// CREATE UMLCLASS
function APIcreateUMLclass(url, data){
  $.ajax({
    url: url, // URL do endpoint de destino
    type: "POST", // Método HTTP da solicitação
    data: JSON.stringify(data), // Dados a serem enviados no corpo da solicitação, convertidos para JSON
    contentType: "application/json", // Tipo de conteúdo da solicitação
    success: function(response) {
      // console.log("Solicitação bem-sucedida!", response);
      // Lógica a ser executada em caso de sucesso na solicitação
    },
    error: function(error) {
      console.error("Erro na solicitação:", error);
      // Lógica a ser executada em caso de erro na solicitação
    }
  });
}
// CREATE UMLCLASS - END

// UPDATE UMLCLASS 
function APIupdateUMLclass(url, data){
  $.ajax({
    url: url, // URL do endpoint de destino
    type: "PUT", // Método HTTP da solicitação
    data: JSON.stringify(data), // Dados a serem enviados no corpo da solicitação, convertidos para JSON
    contentType: "application/json", // Tipo de conteúdo da solicitação
    success: function(response) {
      // console.log("Solicitação bem-sucedida!", response);
      // Lógica a ser executada em caso de sucesso na solicitação
    },
    error: function(error) {
      console.error("Erro na solicitação:", error);
      // Lógica a ser executada em caso de erro na solicitação
    }
  });
}
// UPDATE UMLCLASS - END

// LOAD UMLCLASS
function APIloadUMclass(url){

  $.getJSON(url)
    .done((data)=>{ 
      // resp = data;
      for(let umlclass of data){
        createUmlclassEntity(umlclass)
      }
    })
    .fail(()=>{})
    .always(()=>{})
  ;
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
// LOAD UMLCLASS - END

// GET UMLCLASS
function APIgetUMLclass(url, callback){
  $.getJSON(url)
    .done((data)=>{ 
      callback(data);
    })
    .fail(()=>{})
    .always(()=>{})
  ;
}
// GET UMLCLASS - END

// DELETE UMLCLASS
function APIdeleteUMLclass(url){
  $.ajax({
    url: url, // URL da API para excluir o item com o ID específico
    type: "DELETE",
    success: function(data){
      // console.log("Item excluído com sucesso!");
      // Aqui você pode adicionar ações adicionais após a exclusão bem-sucedida, se necessário
    },
    error: function(err){
      console.error("Erro ao excluir o item:", err);
    }
  });
}
// DELETE UMLCLASS - END