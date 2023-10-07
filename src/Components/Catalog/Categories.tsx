import {useState, useRef, useEffect} from "react";
import {getCategories} from "../../api";
import {Menu} from "@gravity-ui/uikit";
import {useDispatch, useSelector} from "react-redux";
import {set} from "../../slices/categorySlice.ts";

function Categories() {
  const [catList, setCatList] = useState([]);
  const isMenuShow = useSelector((state) => state.menu.isMenuShow);
  const currCategory = useSelector((state) => state.category.category);
  const dispatch = useDispatch();

  useEffect(() => {
    const tmpCatList = [];
    getCategories().then(val => {
      setCatList(val);
    });
  }, []);

  const handleClick = (e) => {
    dispatch(set(e.target.textContent));
    /*setCatList((prev) => {
      console.log(prev);
      return [...prev.map(x => {
        if (x.title === e.target.textContent) {
          x.selected = true;
        } else {
          x.selected = false;
        }
        return x;
      })]
    })*/
  }

  return (
    <div className='categories__wrapper'>
      {isMenuShow && <Menu size='xl'>
        <Menu.Item key='all' onClick={handleClick}>All</Menu.Item>
        {catList.map(val => <Menu.Item key={val.title} onClick={handleClick}>{val.title}</Menu.Item>)}
      </Menu>}
    </div>
  )
}

export default Categories;
