import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import { Link } from 'react-router-dom';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <Link to="/products">Products</Link>,
  },
  {
    key: '2',
    label: <Link to="/signin">Sign in</Link>,
  },
  {
    key: '3',
    label: <Link to="/signup">Sign up</Link>,
  },
];

const NavDrop = () => {
  return (
    <nav>
      <Dropdown menu={{ items }} placement="bottomLeft">
        <Button>navigation</Button>
      </Dropdown>
    </nav>
  );
};

export default NavDrop;
