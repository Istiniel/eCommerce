import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const AntIcon = ({ size, type }: { size: number, type: 'white' | 'black' }) => <LoadingOutlined style={{ fontSize: size, color: type }} spin />;

const LoadingSpinner = ({ size = 56, type = 'black' }: { size?: number, type?: 'white' | 'black' }) => (
  <Spin indicator={<AntIcon size={size} type={type} />} />
);

export default LoadingSpinner;
