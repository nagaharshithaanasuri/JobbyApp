import './index.css'

const SkillCard=(props)=>{
  const {skillDetails}=props
  const{imageUrl,name}=skillDetails

  return (
    <li className="skillItem">
    <img src={imageUrl} alt={name} className="img"/>
    <p className="para">{name}</p>
    </li>
  )
}
export default SkillCard