var vm = new Vue({
    el: '#app',
    data: {
        baseURL: 'SERVER_BASE_URL',
        initListData: [],
        initCouponListData: [{id: 11}],
        backShow: true
    },
    created() {
        this.getProductList();
        this.getSelectCouponList();
    },
    methods: {
        getProductList: function () {//获取初始化商品数据
            var sParams = {
                specialId: 806,
                page: 1,
                pageSize: 100
            };
            util.ajax_execute(this.baseURL + '/product/product/v2/getList', sParams, {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "token": getQueryString("token")
                },
                function (oJson) {
                    console.log('商品数据', oJson);
                    console.log('商品数据-length', oJson.body.rows.length);
                    if (oJson.resultFlag === 'success') {
                        vm.initListData = oJson.body.rows;
                        console.log(vm.initListData);
                    } else {
                        console.log(oJson.body.message)
                    }
                });
        },
        getSelectCouponList: function () { //获取优惠券
            let sParams = {};
            util.ajax_execute(this.baseURL + '/coupon/activeCoupon/selectCouponList', sParams, {
                    "Content-Type": "application/json",
                    "token": getQueryString("token")
                },
                function (oJson) {
                    console.log('优惠券列表', oJson);
                    if (oJson.resultFlag === 'success') {
                        vm.initCouponListData = oJson.body;
                    } else {
                        console.log(oJson.body.message)
                    }
                });
        },
        getCouponSingle: function (id) { // 单券领取
            vm.backShow = false;
            const sParams = {
                position: 7,
                schemaId: id
            };
            util.ajax_execute(this.baseURL + '/coupon/activeCoupon/receiveCouponSingle', sParams, {
                    "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8',
                    "token": getQueryString("token")
                },
                function (oJson) {
                    console.log('单券领取', oJson);
                    if (oJson.resultFlag === 'success') {
                        layer.open({
                            content: '领取成功',
                            skin: 'msg',
                            time: 2 //2秒后自动关闭
                        });
                        vm.backShow = true;
                        console.log(oJson.body);
                    } else {
                        vm.backShow = true;
                        layer.open({
                            content: oJson.body,
                            skin: 'msg',
                            time: 2 //2秒后自动关闭
                        });
                    }
                });
        },
        goToProductDetails: function (itme) {
            console.log(itme)
            wx.miniProgram.getEnv(function (res) {
                console.log(res.miniprogram) // true
                if (res.miniprogram) {
                    wx.miniProgram.navigateTo({url: '/page/shop/productdetails/productdetails?productId=' + itme.productId})
                }
            });
        }
    }
})