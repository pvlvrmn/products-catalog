import {useState, useRef, useEffect} from "react";
import {getCategories} from "../../api";
import {Menu} from "@gravity-ui/uikit";
import {useSelector} from "react-redux";

function Categories() {
  const [catList, setCatList] = useState([]);
  const isMenuShow = useSelector((state) => state.menu.isMenuShow);

  useEffect(() => {
    const tmpCatList = [];
    getCategories().then(val => setCatList(val));
  }, []);

  return (
    <div className='categories__wrapper'>
      {isMenuShow && <Menu size='xl'>
        {catList.map(val => <Menu.Item key={val}>{val}</Menu.Item>)}
      </Menu>}
    </div>
  )
}

export default Categories;
