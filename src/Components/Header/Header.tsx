import {useState, useRef} from "react";
import {Text} from '@gravity-ui/uikit';
import {TextInput} from "@gravity-ui/uikit";
import {List} from "@gravity-ui/uikit";
import {getIdBySearchResults, searchAutocomplete} from "../../api";
import {Bars} from "@gravity-ui/icons"
import {useDispatch} from "react-redux";
import {toggle} from "../../slices/menuSlice.ts";
import {set} from "../../slices/categorySlice.ts";
import {useNavigate} from "react-router-dom";

function Header() {
  const [query, setQuery] = useState<string>('');
  const [suggest, setSuggest] = useState<Array<string>>([]);
  const timerDebounceRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleDebounceSearch(e: React.FormEvent<HTMLInputElement>){
    const input = e.target as HTMLInputElement;
    setQuery(input.value);
    if(input.value !== '') {
      if(timerDebounceRef.current){
        clearTimeout(timerDebounceRef.current);
      }
      timerDebounceRef.current = setTimeout(() => {
        searchAutocomplete(input.value).then(val => {
          const tmp:Array<string> = [];
          val.map((x: {title: string}) => {
            tmp.push(x.title);
          });
          return tmp;
        }).then(val => setSuggest(val));
      }, 100);
    } else {
      setSuggest([]);
    }
  }

  const handleSearchClick = (item: string) => {
    getIdBySearchResults(item)
      .then(id => navigate(`/product/${id}`))
      .then(() => setQuery(''))
      .then(() => setSuggest([]))
  }

  return (
    <header className='header__wrapper'>
      <div className='header__bars' onClick={() => dispatch(toggle())}>
        <Bars/>
      </div>
      <div className='header__title' onClick={() => {navigate('/'); dispatch(set('All'))}}>
        <Text variant="display-1" ellipsis>Products Shop</Text>
      </div>

      <div className='header__search'>
        <TextInput size='xl' placeholder='Search' hasClear={true} onChange={handleDebounceSearch} value={query}/>
      </div>
      {Boolean(suggest.length) &&
      <div className='header__suggest'>
         <List items={suggest} filterable={false} size='xl' virtualized={false} onItemClick={handleSearchClick}/>
      </div>
      }
    </header>
  )
}

export default Header;
