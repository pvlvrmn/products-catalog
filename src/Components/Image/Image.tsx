import {useState} from 'react';
import {Skeleton} from '@gravity-ui/uikit';

function Image(props: {src: string}) {
  const [loaded, setLoaded] = useState(false);
  const { src } = props;

  function handleImageLoaded() {
    setLoaded(true);
  }

  return (
    <div className="card__img">
      {!loaded && <Skeleton style={{height: '100%', width: '100%'}}/>}
      <img
        alt="Dog"
        src={src}
        style={!loaded ? { opacity: 0 } : { opacity: 1 }}
        onLoad={handleImageLoaded}
      />
    </div>
  );
}

export default Image;
