import {useState, useEffect} from "react";
import {getCategories} from "../../api";
import {Menu} from "@gravity-ui/uikit";
import {useDispatch, useSelector} from "react-redux";
import {set} from "../../slices/categorySlice.ts";
import {useNavigate} from "react-router-dom";
import {RootState} from "../../slices";

function Categories() {
  const [catList, setCatList] = useState([]);
  const isMenuShow = useSelector((state: RootState) => state.menu.isMenuShow);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then(val => {
      setCatList(val);
    });
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.textContent != null) {
      dispatch(set(target.textContent));
      navigate('/category/'+(target.textContent).toLowerCase().replace(' ', '-'))
    }
  }

  return (
    <div className='categories__wrapper'>
      {isMenuShow && <Menu size='xl'>
        <Menu.Item key='all' onClick={handleClick}>All</Menu.Item>
        {catList.map((val: {title: string, selected: boolean}) => <Menu.Item key={val.title} onClick={handleClick}>{val.title}</Menu.Item>)}
      </Menu>}
    </div>
  )
}

export default Categories;
