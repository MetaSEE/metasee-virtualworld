function onConnect() {
  console.log('onConnect', new Date());
}

NAF.schemas.getComponentsOriginal = NAF.schemas.getComponents;
NAF.schemas.getComponents = (template) => {

  //template
  if (!NAF.schemas.hasTemplate('#avatar-template')) {
    NAF.schemas.add({
      template: '#avatar-template',
      components: [
        'position',
        'rotation',
        {
          selector: '.head',
          component: 'material',
          property: 'color'
        }
      ]
    });
  }

  //umlclass
  if (!NAF.schemas.hasTemplate('#umlclass-template')) {
    NAF.schemas.add({
      template: '#umlclass-template',
      components: [
        'position',
        'color',
        {
          selector: '.umlclass-box',
          component: 'color'
        },
        {
          selector: '.umlclass-classname',
          component: 'value'
        }
      ]
    });
  }

  const components = NAF.schemas.getComponentsOriginal(template);
  return components;
};