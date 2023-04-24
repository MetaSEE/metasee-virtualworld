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
        'rotation',
        'scale',
        {
          selector: '.umlclass-box',
          component: 'color'
        },
        {
          selector: '.umlclass-box',
          component: 'rotation'
        },
        {
          selector: '.umlclass-box',
          component: 'scale'
        },
        {
          selector: '.umlclass-classname',
          component: 'value'
        }
      ]
    });
  }

  //uml association
  if (!NAF.schemas.hasTemplate('#umlassociation-template')) {
    NAF.schemas.add({
      template: '#umlassociation-template',
      components: [
        'position',
        'rotation',
        'meshline'
      ]
    });
  }