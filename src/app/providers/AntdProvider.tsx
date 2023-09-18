import { ConfigProvider } from 'antd';

function AntdProvider({ children }: { children?: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#000000',
          colorErrorOutline: 'tomato',
          borderRadius: 0,
          colorBorder: 'hsl(0, 0%, 17.5%);',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default AntdProvider;
