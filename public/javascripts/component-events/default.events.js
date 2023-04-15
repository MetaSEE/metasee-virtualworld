// LOAD AND SET ENVIRONMENT (BACKGROUND)
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
// LOAD AND SET ENVIRONMENT (BACKGROUND) - END