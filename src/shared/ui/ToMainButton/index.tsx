import Button from 'antd/es/button';
import { useNavigate } from 'react-router-dom';

const ToMainPageButton = () => {
  const navigate = useNavigate();
  return <Button onClick={() => navigate('/')}>main</Button>;
};

export default ToMainPageButton;
