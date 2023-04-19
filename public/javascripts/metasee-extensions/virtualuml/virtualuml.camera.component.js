/* global AFRAME, THREE */
// FROM: https://github.com/networked-aframe/networked-aframe/blob/32996226c8b8f4e21be154090844d24e2d182696/examples/js/gun.component.js#L21-L48
AFRAME.registerComponent('virtualuml-camera', {
  schema: {
    bulletTemplate: {default: '#bullet-template'},
    triggerKeyCode: {default: 32} // spacebar
  },

  init: function() {
    var that = this;
    // document.body.onkeyup = function(e){
    //   if(e.keyCode == that.data.triggerKeyCode){
    //     that.shoot();
    //   }
    // }
    
    that.shoot();

  },

  shoot: function() {
    this.createBullet();
  },

  createBullet: function() {
    var el = this.el;
    var tip = document.querySelector('#player');
    el.setAttribute('position', this.getInitialBulletPosition(tip));
    el.setAttribute('rotation', this.getInitialBulletRotation(tip));

  },

  getInitialBulletPosition: function(spawnerEl) {
    var worldPos = new THREE.Vector3();
    worldPos.setFromMatrixPosition(spawnerEl.object3D.matrixWorld);
    // worldPos.x -= 1.5;
    worldPos.z -= 3;
    // console.log('worldPos',worldPos);

    return worldPos;
  },

  getInitialBulletRotation: function(spawnerEl) {
    var worldDirection = new THREE.Vector3();

    spawnerEl.object3D.getWorldDirection(worldDirection);
    worldDirection.multiplyScalar(-1);
    this.vec3RadToDeg(worldDirection);
    worldDirection.x = 0;
    // console.log('worldDirection',worldDirection);
    return worldDirection;
  },

  vec3RadToDeg: function(rad) {
    rad.set(rad.y * 90, -90 + (-THREE.MathUtils.radToDeg(Math.atan2(rad.z, rad.x))), 0);
  }
});