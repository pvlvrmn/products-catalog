import {useState} from "react";

function Images(props: {obj: Array<string>}) {
  const [currimg, setCurrimg] = useState(0)

  const handleClick = (i: number) => {
    setCurrimg(i);
  }

  return (
    <div className='images__wrapper'>
      <div className='images__list'>
        <ul>
          {props.obj && props.obj.map((x: string, i: number) => (
            <li className={currimg === i ? 'active' : ''} key={i}>
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
