import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const AntIcon = ({ size }: { size: number }) => <LoadingOutlined style={{ fontSize: size }} spin />;

const LoadingSpinner = ({ size = 56 }: { size?: number }) => (
  <Spin indicator={<AntIcon size={size} />} />
);

export default LoadingSpinner;
