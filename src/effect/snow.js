import * as THREE from 'three'
import { Points } from './points'

export class Snow {
  constructor(scene) {
    this.points = new Points(scene, {
      size: 30,
      opacity: 0.8,
      range: 1000,
      count: 600,
      setAnimation(position) {
        position.x -= position.speedX
        position.y -= position.speedY
        position.z -= position.speedZ
  
        if (position.y <= 0) {
          position.y = this.range / 2
        }
      },
      setPosition(position) {
        position.speedX = Math.random() - 0.5
        position.speedY = Math.random() + 0.5
        position.speedZ = Math.random() - 0.5
      },
      url: '../../src/assets/snow.png'
    })
    // this.scene = scene

    // // 雪花飘落的范围
    // this.range = 1000
    // // 雪花的个数
    // this.count = 600

    // this.pointList = []

    // this.point = null

    // this.init()
  }

  init() {
    // 粒子和粒子系统  不同three版本实现不同，125版本之前使用PointClud，125之后使用Points

    // 材质
    this.material = new THREE.PointsMaterial({
      size: 20,
      map: new THREE.TextureLoader().load('../../src/assets/snow.png'),
      transparent: true,
      opacity: 0.8,
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

      position.speedX = Math.random() - 0.5
      position.speedY = Math.random() + 0.5
      position.speedZ = Math.random() - 0.5

      this.pointList.push(position)
    }

    this.geometry.setFromPoints(this.pointList)

    this.point = new THREE.Points(this.geometry, this.material)
    this.scene.add(this.point)
  }

  animation() {
    this.points.animation()
    // this.pointList.forEach(position => {
    //   position.x -= position.speedX
    //   position.y -= position.speedY
    //   position.z -= position.speedZ

    //   if (position.y <= 0) {
    //     position.y = this.range / 2
    //   }

    //   this.point.geometry.setFromPoints(this.pointList)
    // })
  }
}