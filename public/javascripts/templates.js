// function onConnect() {
//   console.log('onConnect', new Date());
// }

NAF.schemas.getComponentsOriginal = NAF.schemas.getComponents;
NAF.schemas.getComponents = (template) => {
  const components = NAF.schemas.getComponentsOriginal(template);
  console.log("components in schema: ", components);
  return components;
};

document.addEventListener('DOMContentLoaded', () => {                           
  const scene = document.querySelector('a-scene');
  const sceneLoaded = () => {
    // console.log("scene loaded");
    //document.getElementById("player").setAttribute("networked", "template:#avatar-template;attachTemplateToLocal:false;");
  }
  if (scene.hasLoaded) {                                                         
    sceneLoaded();
  } else {
    scene.addEventListener('loaded', sceneLoaded);
  }
});