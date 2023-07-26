import * as THREE from 'three'

export class Points {
  constructor(scene, { size, opacity, range, count, setAnimation, setPosition, url }) {
    this.scene = scene

    this.size = size
    this.opacity = opacity

    // 范围
    this.range = range

    // 个数
    this.count = count

    this.pointsList = []

    this.setAnimation = setAnimation
    this.setPosition = setPosition
    this.url = url

    this.init()
  }

  init() {
    // 粒子和粒子系统  不同three版本实现不同，125版本之前使用PointClud，125之后使用Points

    // 材质
    this.material = new THREE.PointsMaterial({
      size: this.size,
      map: new THREE.TextureLoader().load(this.url),
      transparent: true,
      opacity: this.opacity,
      depthTest: false,
    })

    // 几何对象
    this.geometry = new THREE.BufferGeometry()

    // 添加顶点信息
    for (let i = 0; i < this.count; i++) {
      const position = new THREE.Vector3(
        Math.random() * this.range - this.range / 2,
        Math.random() * this.range,
        Math.random() * this.range - this.range / 2,
      )

      this.setPosition(position)

      // position.speedX = Math.random() - 0.5
      // position.speedY = Math.random() + 0.5
      // position.speedZ = Math.random() - 0.5

      this.pointsList.push(position)
    }

    this.geometry.setFromPoints(this.pointsList)

    this.point = new THREE.Points(this.geometry, this.material)
    this.scene.add(this.point)
  }

  animation() {
    this.pointsList.forEach(position => {
      // position.x -= position.speedX
      // position.y -= position.speedY
      // position.z -= position.speedZ

      // if (position.y <= 0) {
      //   position.y = this.range / 2
      // }
      this.setAnimation(position)


      this.point.geometry.setFromPoints(this.pointsList)
    })
  }
}