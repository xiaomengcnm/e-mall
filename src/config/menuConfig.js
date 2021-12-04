import { UserOutlined, UsergroupAddOutlined,HomeOutlined,ShopOutlined,AccountBookOutlined,FileDoneOutlined,LaptopOutlined,ApartmentOutlined,PropertySafetyOutlined,UnorderedListOutlined} from '@ant-design/icons';
const menuConfig = [
    {
        key: "/home",
        title: "首页",
        icon: <HomeOutlined />
    },
    {
        key: "/home/user",
        title: "用户管理",
        icon: <UserOutlined />
    },
    {
        key: "/home/role",
        title: "角色管理",
        icon: <UsergroupAddOutlined />
    },
    {
        key: "/home/shop",
        title: "店铺管理",
        icon: <ShopOutlined />
    },
    {
        key: "/home/product",
        title: "商品管理",
        icon: <LaptopOutlined />,
        children: [
            {
                key: "/home/product/category",
                title: "商品分类",
                icon: <ApartmentOutlined />
            },
            {
                key: "/home/product/list",
                title: "商品列表",
                icon: <UnorderedListOutlined />,
            }
        ]
    },
    {
        key: "/home/datav",
        title: "财务管理",
        icon: <PropertySafetyOutlined />,
        children: [
            {
                key: "/home/datav/deal",
                title: "交易流水",
                icon: <FileDoneOutlined />,
            },
            {
                key: "/home/datav/sale",
                title: "销售业绩",
                icon: <AccountBookOutlined />,
            }
        ]
    },
]

export default menuConfig