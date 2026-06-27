// CSS box-shadow pixel art cat — orange/brown like the reference image
interface Props { size?: number; className?: string }

export default function PixelCat({ size = 4, className = '' }: Props) {
  const u = size
  const orange = '#c8622a'
  const dark = '#7a3510'
  const cream = '#f5c89a'
  // [col, row, color]
  const px: [number, number, string][] = [
    // Ears
    [2,0,dark],[3,0,orange],[10,0,orange],[11,0,dark],
    [2,1,orange],[3,1,orange],[4,1,orange],[9,1,orange],[10,1,orange],[11,1,orange],
    // Head
    [1,2,orange],[2,2,orange],[3,2,cream],[4,2,orange],[5,2,orange],[6,2,orange],[7,2,orange],[8,2,orange],[9,2,cream],[10,2,orange],[11,2,orange],[12,2,orange],
    [1,3,orange],[2,3,cream],[3,3,cream],[4,3,orange],[5,3,orange],[6,3,orange],[7,3,orange],[8,3,orange],[9,3,cream],[10,3,cream],[11,3,orange],[12,3,orange],
    // Eyes
    [1,4,orange],[2,4,orange],[3,4,dark],[4,4,dark],[5,4,orange],[6,4,orange],[7,4,orange],[8,4,orange],[9,4,dark],[10,4,dark],[11,4,orange],[12,4,orange],
    [1,5,orange],[2,5,orange],[3,5,dark],[4,5,dark],[5,5,orange],[6,5,orange],[7,5,orange],[8,5,orange],[9,5,dark],[10,5,dark],[11,5,orange],[12,5,orange],
    // Nose/mouth
    [3,6,orange],[4,6,orange],[5,6,cream],[6,6,dark],[7,6,cream],[8,6,orange],[9,6,orange],
    [4,7,cream],[5,7,cream],[6,7,orange],[7,7,cream],[8,7,cream],
    // Body (sitting)
    [2,8,orange],[3,8,orange],[4,8,orange],[5,8,orange],[6,8,orange],[7,8,orange],[8,8,orange],[9,8,orange],[10,8,orange],[11,8,orange],
    [1,9,orange],[2,9,cream],[3,9,cream],[4,9,orange],[5,9,orange],[6,9,orange],[7,9,orange],[8,9,cream],[9,9,cream],[10,9,orange],[11,9,orange],[12,9,orange],
    [1,10,orange],[2,10,cream],[3,10,cream],[4,10,orange],[5,10,orange],[6,10,orange],[7,10,orange],[8,10,cream],[9,10,cream],[10,10,orange],[11,10,orange],[12,10,orange],
    [2,11,orange],[3,11,orange],[4,11,orange],[5,11,orange],[6,11,orange],[7,11,orange],[8,11,orange],[9,11,orange],[10,11,orange],[11,11,orange],
    // Paws
    [2,12,orange],[3,12,orange],[4,12,dark],[5,12,orange],[6,12,orange],[7,12,orange],[8,12,dark],[9,12,orange],[10,12,orange],
    // Tail
    [11,9,dark],[12,9,dark],[12,10,dark],[11,10,dark],[11,11,dark],[10,11,dark],
  ]

  const shadows = px.map(([c,r,col]) => `${c*u}px ${r*u}px 0 ${col}`).join(',')

  return (
    <div className={className} style={{ position:'relative', width:`${14*u}px`, height:`${14*u}px` }}>
      <div style={{ width:`${u}px`, height:`${u}px`, boxShadow:shadows, position:'absolute', top:0, left:0 }} />
    </div>
  )
}
