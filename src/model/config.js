var apiUrl = 'http://a.itying.com/';

var config = {
    api: apiUrl,
    uid: 'gqf123',
    //菜品列表
    api_foods: apiUrl + 'api/productlist',
    //菜品详情
    api_detail: apiUrl + 'api/productcontent',
    //加入购物车
    api_addcart: apiUrl + 'api/addcart',
    //购物车数量
    api_cartnum: apiUrl + 'api/cartCount',
    //购物车列表
    api_cartlist: apiUrl + 'api/cartlist',
    //增加购物车数量
    api_incCart: apiUrl + 'api/incCart',
    //减少购物车数量
    api_decCart: apiUrl + 'api/decCart',
    //提交餐桌信息
    api_addPeopleInfo: apiUrl + 'api/addPeopleInfo',
    //获取餐桌信息
    api_peopleInfoList: apiUrl + 'api/peopleInfoList'

}
export default config;