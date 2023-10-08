import {useState, useRef, useEffect} from "react";
import {Text} from '@gravity-ui/uikit';
import {TextInput} from "@gravity-ui/uikit";
import {List} from "@gravity-ui/uikit";
import {searchAutocomplete} from "../../api";
import {Bars} from "@gravity-ui/icons"
import {useDispatch, useSelector} from "react-redux";
import {toggle} from "../../slices/menuSlice.ts";
import {set} from "../../slices/categorySlice.ts";
import {useNavigate} from "react-router-dom";

function Header() {
  const [query, setQuery] = useState('');
  const [suggest, setSuggest] = useState([]);
  const timerDebounceRef = useRef();
  const navigate = useNavigate();

  const isMenuShow = useSelector((state) => state.menu.isMenuShow);
  const dispatch = useDispatch();

  function handleDebounceSearch(e: React.ChangeEvent<any>){
    setQuery(e.target.value);
    if(e.target.value !== '') {
      if(timerDebounceRef.current){
        clearTimeout(timerDebounceRef.current);
      }
      timerDebounceRef.current = setTimeout(() => {
        searchAutocomplete(e.target.value).then(val => {
          const tmp = [];
          val.map(x => {
            tmp.push(x.title);
          });
          return tmp;
        }).then(val => setSuggest(val));
      }, 100);
    } else {
      setSuggest([]);
    }
  }

  return (
    <header className='header__wrapper'>
      <div className='header__bars' onClick={() => dispatch(toggle())}>
        <Bars/>
      </div>
      <div className='header__title' onClick={() => {navigate('/'); dispatch(set('All'))}}>
        <Text variant="display-1" color="inherit" ellipsis>Products Shop</Text>
      </div>

      <div className='header__search'>
        <TextInput size='xl' placeholder='Search' hasClear={true} onChange={handleDebounceSearch} value={query}/>
      </div>
      {Boolean(suggest.length) &&
      <div className='header__suggest'>
         <List items={suggest} filterable={false} size='xl' virtualized={false}/>
      </div>
      }
    </header>
  )
}

export default Header;
