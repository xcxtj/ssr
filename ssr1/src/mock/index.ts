import Mock from "mockjs";
import login from "./modules/user";
const { mock } = Mock;
mock("/mock/api/login", "post", login);
mock('/mock/roomList','get',{
    code:'000000',
    success:true,
    data:[{
        id:1,
        name:'room1',
        price:100
    },{
        id:2,
        name:'room2',
        price:200
    },{
        id:3,
        name:'room3',
        price:300
    }]
})
