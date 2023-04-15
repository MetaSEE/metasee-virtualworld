// DEFAULT SETTINGS

// get current URL
const URL = $(location).attr('href');

// separate URL according /
const decodedURL = URL.split("/"); 

// return the last item, id
const VW_ID = decodedURL[decodedURL.length-1];

const API_URL = `http://localhost:3333`;
const API_VIRTUALWORLDS = `${API_URL}/virtualworld/${VW_ID}`;

// DEFAULT SETTINGS - END


// CREATE UMLCLASS
function APIcreateUMLclass(url, data){
  $.ajax({
    url: url, // URL do endpoint de destino
    type: "POST", // Método HTTP da solicitação
    data: JSON.stringify(data), // Dados a serem enviados no corpo da solicitação, convertidos para JSON
    contentType: "application/json", // Tipo de conteúdo da solicitação
    success: function(response) {
      console.log("Solicitação bem-sucedida!", response);
      // Lógica a ser executada em caso de sucesso na solicitação
    },
    error: function(error) {
      console.error("Erro na solicitação:", error);
      // Lógica a ser executada em caso de erro na solicitação
    }
  });
}
// CREATE UMLCLASS - END