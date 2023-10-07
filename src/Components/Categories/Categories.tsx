import {useState, useRef, useEffect} from "react";
import {getCategories} from "../../api";
import {Menu} from "@gravity-ui/uikit";

function Categories() {
  const [catList, setCatList] = useState([]);

  useEffect(() => {
    const tmpCatList = [];
    getCategories().then(val => setCatList(val));
  }, []);

  return (
    <div>
      <Menu size='xl'>
        {catList.map(val => <Menu.Item>{val}</Menu.Item>)}
      </Menu>
    </div>
  )
}

export default Categories;
