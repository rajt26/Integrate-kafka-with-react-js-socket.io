import { PageHeader,Select,Button } from "antd";
import { useHistory } from "react-router-dom";
import './style.css'
const user = JSON.parse(localStorage.getItem("user"));
const { Option } = Select;

const Header = () => {
  const history = useHistory();
  const logout =  () => {
     localStorage.removeItem("user");
     localStorage.removeItem("token");
    history.push("/login");
  };
  return (
    <PageHeader
      className="site-page-header"
      title="React Feed App"
      subTitle="React Feed App"
      extra={[
        user && user.name && <Select defaultValue={user.name} style={{ width: 120 }} bordered={false} onChange={logout}>
           <Option>Logout</Option>
      </Select>
      ]}
    />
  );
};

export default Header;
