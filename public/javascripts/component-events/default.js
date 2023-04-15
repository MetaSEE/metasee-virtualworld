// get current URL
const URL = $(location).attr('href');

// separate URL according /
const decodedURL = URL.split("/"); 

// return the last item, id
const id_vw = decodedURL[decodedURL.length-1];

const API_URL = `http://localhost:3333`;
const API_VIRTUALWORLDS = `${API_URL}/virtualworld/${id_vw}`;

$.getJSON(API_VIRTUALWORLDS)
  .done((data)=>{ 
    setEnvironment(data.environment);
  })
  .fail(()=>{})
  .always(()=>{})
;

function setEnvironment(env) {
  $('#environment').attr('environment' , `preset: ${env}; groundColor: #445`)
}