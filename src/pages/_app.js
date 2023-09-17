import Template from "@/components/layout/Templete";
import "@/styles/globals.css";
import { ConfigProvider } from "antd";

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#2A539A",
          borderRadius: 2,
          fontFamily:"Lucida Grande",
          // Alias Token
          colorBgContainer: "#d3d3d3",
        },
      }}
    >
      {
              Component.getLayout ? (
                Component.getLayout(<Component {...pageProps} />)
              ) : (
                <>
                  <Template>
                    <Component {...pageProps} />
                  </Template>
                </>
              )
            }
    </ConfigProvider>
  );
}
