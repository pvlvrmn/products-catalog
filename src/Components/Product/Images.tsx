import {useState} from "react";

function Images(props) {
  const [currimg, setCurrimg] = useState(0)

  const handleClick = (i) => {
    setCurrimg(i);
  }

  return (
    <div className='images__wrapper'>
      <div className='images__list'>
        <ul>
          {props.obj && props.obj.map((x, i) => (
            <li className={currimg === i ? 'active' : ''}>
              <div onClick={() => handleClick(i)}>
                <img key={i} src={x} width='96'/>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='images__preview'>
        <div className='image__background' style={{backgroundImage: `url(${props.obj && props.obj[currimg]})`}}></div>
        <img src={props.obj && props.obj[currimg]}/>
      </div>
    </div>
  )
}

export default Images;
