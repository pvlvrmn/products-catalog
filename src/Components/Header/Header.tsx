import {Text} from '@gravity-ui/uikit';
import {TextInput} from "@gravity-ui/uikit";

function Header() {
  return (
    <header className='header__wrapper'>
      <div className='header__title'>
        <Text variant="display-1" color="inherit" ellipsis>Products Shop</Text>
      </div>
      <div className='header__search'>
        <TextInput size='xl' placeholder='Search' hasClear={true}/>
      </div>
    </header>
  )
}

export default Header;
