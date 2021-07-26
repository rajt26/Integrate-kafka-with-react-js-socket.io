import { Layout, } from "antd";
const {  Footer } = Layout;

const FooterComponent = () => {
  return (
    <Layout style={{ minHeight: "0vh"}}>
      <Footer style={{backgroundColor:"whitesmoke",textAlign:"center"}}> copy rights</Footer>
    </Layout>
  );
};

export default FooterComponent;
