<template>
    <div class="app-container">
        <BiuPage
            v-model="form"
            :loading="loading"
            :columns="columns"
            :tableData="tableData"
            :operationOptions="operationOptions"
            :tablePostfixOptions="tablePostfixOptions"
            :pagination.sync="pagination"
            @search="() => handleFilter(true)"
            @reset="reset"
            @pagination="() => handleFilter()"
        >
            <template slot="table-workCode" slot-scope="{ col, row }">
                <span class="collookcss" @click="showDetail(row)">{{
                    row[col.id]
                }}</span>
                <i
                    class="table-td-copy el-icon-document-copy"
                    @click="copy(row[col.id])"
                ></i>
            </template>
        </BiuPage>
    </div>
</template>

<script lang="jsx">
import dayjs from 'dayjs'
import { Vue, Component } from 'vue-property-decorator'
// import { exportExcel } from '@src/index';

@Component({
    name: 'Order'
})
export default class Order extends Vue {
    form = {}

    get columns() {
        return [
            {
                formType: 'input',
                label: '订单号',
                id: 'workCode',
                width: 140,
                sort: 3
            },
            {
                formType: 'dicSelect',
                label: '订单状态',
                id: 'workState',
                sort: 4,
                formAttr: {
                    dicType: '订单状态',
                    options: []
                }
            },
            {
                formType: 'input',
                label: '出库单号',
                id: 'clientOrderCode',
                noSearch: true
            },
            {
                formType: 'input',
                label: '经销商名称',
                id: 'distributorName',
                sort: 5
            },
            {
                formType: 'input',
                label: '工厂ID',
                id: 'factoryinfoId',
                noSearch: true
            },
            {
                formType: 'input',
                label: '工厂名称',
                id: 'factoryName',
                sort: 6
            },
            {
                label: '工艺线路',
                id: 'craftRouteId',
                noSearch: true
            },
            {
                formType: 'input',
                label: '总件数',
                id: 'totalNum',
                noSearch: true
            },
            {
                formType: 'input',
                label: '总重量',
                id: 'totalWeight',
                noSearch: true
            },
            {
                formType: 'input',
                label: '总体积',
                id: 'totalVolume',
                noSearch: true
            },
            {
                label: '录单时间',
                id: 'writeTime',
                noSearch: true,
                width: 140
            },
            {
                label: '修改时间',
                id: 'updateTime',
                noSearch: true,
                width: 140
            },
            {
                formType: 'area',
                label: '始发城市',
                id: 'deliverCity',
                noSearch: true,
                width: 150,
                formAttr: {
                    areaType: 'city'
                }
            },
            {
                formType: 'area',
                label: '目的城市',
                id: 'receiveCity',
                noSearch: true,
                width: 150,
                formAttr: {
                    areaType: 'city'
                }
            },
            {
                formType: 'input',
                label: '收货方',
                id: 'receiveCom',
                noSearch: true
            },
            {
                formType: 'input',
                label: '收货人',
                id: 'receiveMan',
                noSearch: true
            },
            {
                formType: 'input',
                label: '收货人联系方式',
                id: 'receivePhone',
                noSearch: true
            },
            {
                formType: 'input',
                label: '收货地址',
                id: 'receiveAddress',
                noSearch: true,
                width: 300
            },
            {
                formType: 'input',
                label: '发货方',
                id: 'Shipper',
                noSearch: true
            },
            {
                formType: 'input',
                label: '发货人',
                id: 'deliverMan',
                noSearch: true
            },
            {
                formType: 'input',
                label: '发货人联系方式',
                id: 'deliverPhone',
                noSearch: true
            },
            {
                formType: 'input',
                label: '发货地址',
                id: 'deliverAddress',
                noSearch: true,
                width: 300
            },
            {
                label: '发货时间',
                id: 'deliverTime',
                noSearch: true,
                width: 140
            },
            {
                formType: 'dicSelect',
                label: '结算方式',
                id: 'payType',
                noSearch: true,
                formAttr: {
                    dicType: '结算方式',
                    options: []
                }
            },
            {
                formType: 'dicSelect',
                label: '签收类型',
                id: 'signType',
                noSearch: true,
                formAttr: {
                    dicType: '签收类型',
                    options: []
                }
            },
            {
                formType: 'input',
                label: '签收人',
                id: 'signUser',
                noSearch: true
            },
            {
                label: '签收时间',
                id: 'signTime',
                noSearch: true,
                width: 140
            },
            {
                formType: 'dicSelect',
                label: '回单类型',
                id: 'returnBIllType',
                noSearch: true,
                formAttr: {
                    dicType: '回单类型',
                    options: []
                }
            },
            {
                formType: 'input',
                label: '回单份数',
                id: 'returnBIllNum',
                noSearch: true
            },
            {
                formType: 'dicSelect',
                label: '回单要求',
                id: 'returnBillReplace',
                noSearch: true,
                formAttr: {
                    dicType: '回单要求',
                    options: []
                }
            },
            {
                formType: 'dicSelect',
                label: '配送要求',
                id: 'receiveRemark',
                noSearch: true,
                formAttr: {
                    dicType: '配送要求',
                    options: []
                }
            },
            {
                formType: 'input',
                label: '录单人',
                id: 'writeUserName',
                noSearch: true
            },
            {
                formType: 'input',
                label: '修改人',
                id: 'updateUserName',
                noSearch: true
            },
            {
                formType: 'select',
                label: '时间筛选',
                id: 'timeType',
                noShow: true,
                sort: 1,
                formAttr: {
                    options: [
                        {
                            label: '按录单时间',
                            value: '1'
                        },
                        {
                            label: '按签收时间',
                            value: '2'
                        }
                    ]
                }
            },
            {
                formType: 'date',
                id: 'time',
                noShow: true,
                sort: 2,
                formAttr: {
                    dateType: 'daterange'
                }
            },
            {
                formType: 'select',
                label: '业务类型',
                id: 'businessType',
                noShow: true,
                sort: 7
            }
        ]
    }

    tableData = []

    loading = false

    detail = {
        show: false,
        payload: null
    }

    get operationOptions() {
        return [
            {
                title: '添加',
                hidden: false,
                callback: () => {
                    this.add.show = true
                    this.add.payload = null
                },
                btnProps: {
                    loading: this.loading
                }
            },
            // {
            //     title: '导入',
            //     id: 'btn28',
            //     callback: () => {
            //         this.add.show = true
            //         this.add.payload = null
            //     }
            // },
            {
                title: '导出',
                hidden: true,
                callback: () => {}
            },
            {
                title: '导出全部',
                hidden: false,
                callback: () => {
                    // exportExcel(this.columns, this.tableData.slice(0, -1), '订单中心数据导出');
                }
            }
        ]
    }

    // 表格右侧操作
    tablePostfixOptions = [
        {
            title: '编辑',
            hidden: false,
            icon: 'el-icon-edit-outline',
            onLinkClick: (scope) => {
                this.add.show = true
                this.add.payload = { ...scope.row }
            }
        },
        {
            title: '作废',
            hidden: false,
            icon: 'el-icon-delete',
            onLinkClick: (scope) => {
                this.handleDelete(scope.row)
            }
        }
    ]

    pagination = {
        page: 1,
        size: 20,
        total: 0
    }

    add = {
        show: false,
        payload: null
    }

    created() {
        this.handleFilter()
    }

    /**
     * 返回查询条件
     */
    queryCriteria() {
        const form = {
            ...this.form,
            page: this.pagination.page,
            size: this.pagination.size
        }
        // 时间筛选
        if (this.form.time) {
            form.timeStart = dayjs(this.form.time[0]).format(
                'YYYY-MM-DD 00:00:00'
            )
            form.timeEnd = dayjs(this.form.time[1]).format(
                'YYYY-MM-DD 23:59:59'
            )
            delete form.time
        }
        return form
    }

    /**
     * 查询数据
     */
    handleFilter(clear = false) {
        if (clear) {
            this.pagination.page = 1
        }

        console.log(this.queryCriteria())

        const result = {
            success: true,
            msg: '调用成功',
            code: 0,
            result: {
                total: 60611,
                pager: {
                    size: 20,
                    page: 1,
                    class: 'com.bbyb.core.db.relation.bean.pager.Pager'
                },
                size: 20,
                totalPage: 3031,
                page: 1,
                rows: [
                    {
                        totalVolume: 0.0,
                        shipper: '沈阳飞远达-鞍山/XBK',
                        clientName: '苏州市品诺食品贸易有限公司',
                        deliverMan: '高红',
                        deliverAddress:
                            '辽宁省鞍山市铁西区永乐公园北（永乐嘉园小区）',
                        returnBillReplace: null,
                        clientOrderCode: '#S5757797#',
                        receiveMan: '杨科',
                        distributorName: null,
                        payType: '2',
                        workCode: 'CP190901000001',
                        workState: '5',
                        deliverCity: '铁西区',
                        signType: '0',
                        class: 'com.bbyb.fcp.dto.WorkCodeDto',
                        writeTime: null,
                        deliverTime: null,
                        receivePhone: '0412-2903206',
                        clientId: '219',
                        returnBIllNum: 1,
                        deliverPhone: '15841275158',
                        signTime: '2021-06-29 14:25:59',
                        receiveAddress:
                            '鞍山市铁东区胜利南街42号新玛特商场一楼',
                        receiveCom: 'S19601/XBKPN',
                        updateUserName: '黄燕',
                        signUser: '草签',
                        updateTime: '2019-09-01 12:00:07',
                        workId: '1',
                        totalNum: 2.0,
                        receiveCity: '铁东区',
                        totalWeight: 0.0,
                        writeUserName: '黄燕',
                        receiveRemark: null,
                        craftRouteId: null,
                        returnBIllType: '3'
                    },
                    {
                        totalVolume: 0.0,
                        shipper: '上海诺尔物流有限公司（北京分公司）/XBK',
                        clientName: '苏州市品诺食品贸易有限公司',
                        deliverMan: '洪娟',
                        deliverAddress:
                            '北京市顺义区高丽营镇前渠河村顺六环汽修厂院内（上海诺尔国际物流）',
                        returnBillReplace: null,
                        clientOrderCode: '#45002718-355#',
                        receiveMan: '沈小伶',
                        distributorName: null,
                        payType: '2',
                        workCode: 'CP190901000002',
                        workState: '5',
                        deliverCity: '顺义区',
                        signType: '0',
                        class: 'com.bbyb.fcp.dto.WorkCodeDto',
                        writeTime: null,
                        deliverTime: null,
                        receivePhone: '010-6781 1602',
                        clientId: '219',
                        returnBIllNum: 1,
                        deliverPhone: '13261182628',
                        signTime: '2019-09-03 16:30:00',
                        receiveAddress: '北京顺义区普洛斯物流园15号院',
                        receiveCom: '北京DHL/XBKPN',
                        updateUserName: '黄燕',
                        signUser: '草签',
                        updateTime: '2019-09-01 12:00:07',
                        workId: '2',
                        totalNum: 162.0,
                        receiveCity: '顺义区',
                        totalWeight: 0.0,
                        writeUserName: '黄燕',
                        receiveRemark: null,
                        craftRouteId: null,
                        returnBIllType: '3'
                    },
                    {
                        totalVolume: 0.0,
                        shipper: '包头吉瑞通/XBK',
                        clientName: '苏州市品诺食品贸易有限公司',
                        deliverMan: '高颖',
                        deliverAddress:
                            '包头市九原区哈囤高勒路（黄河大街）龙燕停车场院内',
                        returnBillReplace: null,
                        clientOrderCode: '#S5756767#',
                        receiveMan: '毛鑫',
                        distributorName: null,
                        payType: '2',
                        workCode: 'CP190901000003',
                        workState: '1',
                        deliverCity: '九原区',
                        signType: '0',
                        class: 'com.bbyb.fcp.dto.WorkCodeDto',
                        writeTime: null,
                        deliverTime: null,
                        receivePhone: '0472-5198199',
                        clientId: '219',
                        returnBIllNum: 1,
                        deliverPhone: '0472-7107134',
                        signTime: '2019-09-03 16:30:00',
                        receiveAddress:
                            '包头市青山区青年路26号万达广场1层173B和175号',
                        receiveCom: 'S22756/XBKPN',
                        updateUserName: '黄燕',
                        signUser: '草签',
                        updateTime: '2019-09-01 12:00:07',
                        workId: '3',
                        totalNum: 2.0,
                        receiveCity: '青山区',
                        totalWeight: 0.0,
                        writeUserName: '黄燕',
                        receiveRemark: null,
                        craftRouteId: null,
                        returnBIllType: '3'
                    },
                    {
                        totalVolume: 0.0,
                        shipper: '长春星火/XBK',
                        clientName: '苏州市品诺食品贸易有限公司',
                        deliverMan: '小张',
                        deliverAddress:
                            '长春市经开区世纪大街888号 吉佳机械院内',
                        returnBillReplace: null,
                        clientOrderCode: '#S5757597#',
                        receiveMan: '马明哲',
                        distributorName: null,
                        payType: '2',
                        workCode: 'CP190901000004',
                        workState: '1',
                        deliverCity: '二道区',
                        signType: '0',
                        class: 'com.bbyb.fcp.dto.WorkCodeDto',
                        writeTime: null,
                        deliverTime: null,
                        receivePhone: '18704312309',
                        clientId: '219',
                        returnBIllNum: 1,
                        deliverPhone: '0431-82684188',
                        signTime: '2019-09-03 16:30:00',
                        receiveAddress: '长春市朝阳区前进大街996号力旺广场一层',
                        receiveCom: 'S52813/XBKPN',
                        updateUserName: '黄燕',
                        signUser: '草签',
                        updateTime: '2019-09-01 12:00:07',
                        workId: '4',
                        totalNum: 2.0,
                        receiveCity: '朝阳区',
                        totalWeight: 0.0,
                        writeUserName: '黄燕',
                        receiveRemark: null,
                        craftRouteId: null,
                        returnBIllType: '3'
                    },
                    {
                        totalVolume: 0.0,
                        shipper: '长春星火/XBK',
                        clientName: '苏州市品诺食品贸易有限公司',
                        deliverMan: '小张',
                        deliverAddress:
                            '长春市经开区世纪大街888号 吉佳机械院内',
                        returnBillReplace: null,
                        clientOrderCode: '#S5756563#',
                        receiveMan: '郭微',
                        distributorName: null,
                        payType: '2',
                        workCode: 'CP190901000005',
                        workState: '1',
                        deliverCity: '二道区',
                        signType: '0',
                        class: 'com.bbyb.fcp.dto.WorkCodeDto',
                        writeTime: null,
                        deliverTime: null,
                        receivePhone: '0432-68196424',
                        clientId: '219',
                        returnBIllNum: 1,
                        deliverPhone: '0431-82684188',
                        signTime: '2019-09-03 16:30:00',
                        receiveAddress:
                            '吉林省吉林市昌邑区重庆路1367号44-48网点',
                        receiveCom: 'S23856/XBKPN',
                        updateUserName: '黄燕',
                        signUser: '草签',
                        updateTime: '2019-09-01 12:00:07',
                        workId: '5',
                        totalNum: 2.0,
                        receiveCity: '昌邑区',
                        totalWeight: 0.0,
                        writeUserName: '黄燕',
                        receiveRemark: null,
                        craftRouteId: null,
                        returnBIllType: '3'
                    },
                    {
                        totalVolume: 0.0,
                        shipper: '长春星火/XBK',
                        clientName: '苏州市品诺食品贸易有限公司',
                        deliverMan: '小张',
                        deliverAddress:
                            '长春市经开区世纪大街888号 吉佳机械院内',
                        returnBillReplace: null,
                        clientOrderCode: '#S5758869#',
                        receiveMan: '高悦',
                        distributorName: null,
                        payType: '2',
                        workCode: 'CP190901000006',
                        workState: '1',
                        deliverCity: '二道区',
                        signType: '0',
                        class: 'com.bbyb.fcp.dto.WorkCodeDto',
                        writeTime: null,
                        deliverTime: null,
                        receivePhone: '0431-88760366',
                        clientId: '219',
                        returnBIllNum: 1,
                        deliverPhone: '0431-82684188',
                        signTime: '2019-09-03 16:30:00',
                        receiveAddress:
                            '长春市南关区亚泰大街1138号一层B185单元及二层B203单元',
                        receiveCom: 'S19934/XBKPN',
                        updateUserName: '黄燕',
                        signUser: '草签',
                        updateTime: '2019-09-01 12:00:07',
                        workId: '6',
                        totalNum: 2.0,
                        receiveCity: '南关区',
                        totalWeight: 0.0,
                        writeUserName: '黄燕',
                        receiveRemark: null,
                        craftRouteId: null,
                        returnBIllType: '3'
                    },
                    {
                        totalVolume: 0.0,
                        shipper: '长春星火/XBK',
                        clientName: '苏州市品诺食品贸易有限公司',
                        deliverMan: '小张',
                        deliverAddress:
                            '长春市经开区世纪大街888号 吉佳机械院内',
                        returnBillReplace: null,
                        clientOrderCode: '#S5758469#',
                        receiveMan: '郝丽丽',
                        distributorName: null,
                        payType: '2',
                        workCode: 'CP190901000007',
                        workState: '1',
                        deliverCity: '二道区',
                        signType: '0',
                        class: 'com.bbyb.fcp.dto.WorkCodeDto',
                        writeTime: null,
                        deliverTime: null,
                        receivePhone: '13180744737',
                        clientId: '219',
                        returnBIllNum: 1,
                        deliverPhone: '0431-82684188',
                        signTime: '2019-09-03 16:30:00',
                        receiveAddress: '长春市朝阳区红旗街616号',
                        receiveCom: 'S52551/XBKPN',
                        updateUserName: '黄燕',
                        signUser: '草签',
                        updateTime: '2019-09-01 12:00:07',
                        workId: '7',
                        totalNum: 2.0,
                        receiveCity: '朝阳区',
                        totalWeight: 0.0,
                        writeUserName: '黄燕',
                        receiveRemark: null,
                        craftRouteId: null,
                        returnBIllType: '3'
                    },
                    {
                        totalVolume: 0.0,
                        shipper: '长春星火/XBK',
                        clientName: '苏州市品诺食品贸易有限公司',
                        deliverMan: '小张',
                        deliverAddress:
                            '长春市经开区世纪大街888号 吉佳机械院内',
                        returnBillReplace: null,
                        clientOrderCode: '#S5757327#',
                        receiveMan: '秦鉴',
                        distributorName: null,
                        payType: '2',
                        workCode: 'CP190901000008',
                        workState: '1',
                        deliverCity: '二道区',
                        signType: '0',
                        class: 'com.bbyb.fcp.dto.WorkCodeDto',
                        writeTime: null,
                        deliverTime: null,
                        receivePhone: '0431-89568631',
                        clientId: '219',
                        returnBIllNum: 1,
                        deliverPhone: '0431-82684188',
                        signTime: '2019-09-03 16:30:00',
                        receiveAddress: '长春市朝阳区同志街2288号一层、二层',
                        receiveCom: 'S20199/XBKPN',
                        updateUserName: '黄燕',
                        signUser: '草签',
                        updateTime: '2019-09-01 12:00:07',
                        workId: '8',
                        totalNum: 2.0,
                        receiveCity: '朝阳区',
                        totalWeight: 0.0,
                        writeUserName: '黄燕',
                        receiveRemark: null,
                        craftRouteId: null,
                        returnBIllType: '3'
                    },
                    {
                        totalVolume: 0.0,
                        shipper: '大连骏航货运/XBK',
                        clientName: '苏州市品诺食品贸易有限公司',
                        deliverMan: '安华',
                        deliverAddress:
                            '大连市甘井子区新水泥路8号（赛楠木业院内）',
                        returnBillReplace: null,
                        clientOrderCode: '#S5759093#',
                        receiveMan: '单文龙',
                        distributorName: null,
                        payType: '2',
                        workCode: 'CP190901000009',
                        workState: '1',
                        deliverCity: '甘井子区',
                        signType: '0',
                        class: 'com.bbyb.fcp.dto.WorkCodeDto',
                        writeTime: null,
                        deliverTime: null,
                        receivePhone: '0411-39579125',
                        clientId: '219',
                        returnBIllNum: 1,
                        deliverPhone: '0411-86333700',
                        signTime: '2019-09-03 16:30:00',
                        receiveAddress:
                            '大连市沙河口区西安路139号1号大连罗斯福广场一层1105B和二层21002单元',
                        receiveCom: 'S28159/XBKPN',
                        updateUserName: '黄燕',
                        signUser: '草签',
                        updateTime: '2019-09-01 12:00:07',
                        workId: '9',
                        totalNum: 10.0,
                        receiveCity: '沙河口区',
                        totalWeight: 0.0,
                        writeUserName: '黄燕',
                        receiveRemark: null,
                        craftRouteId: null,
                        returnBIllType: '3'
                    },
                    {
                        totalVolume: 0.0,
                        shipper: '大连骏航货运/XBK',
                        clientName: '苏州市品诺食品贸易有限公司',
                        deliverMan: '安华',
                        deliverAddress:
                            '大连市甘井子区新水泥路8号（赛楠木业院内）',
                        returnBillReplace: null,
                        clientOrderCode: '#S5759300#',
                        receiveMan: '于英业',
                        distributorName: null,
                        payType: '2',
                        workCode: 'CP190901000010',
                        workState: '1',
                        deliverCity: '甘井子区',
                        signType: '0',
                        class: 'com.bbyb.fcp.dto.WorkCodeDto',
                        writeTime: null,
                        deliverTime: null,
                        receivePhone: '0411-83794709',
                        clientId: '219',
                        returnBIllNum: 1,
                        deliverPhone: '0411-86333700',
                        signTime: '2019-09-03 16:30:00',
                        receiveAddress:
                            '大连市中山区中山路129-3号柏威年大连购物中心地下一层',
                        receiveCom: 'S24435/XBKPN',
                        updateUserName: '黄燕',
                        signUser: '草签',
                        updateTime: '2019-09-01 12:00:07',
                        workId: '10',
                        totalNum: 2.0,
                        receiveCity: '中山区',
                        totalWeight: 0.0,
                        writeUserName: '黄燕',
                        receiveRemark: null,
                        craftRouteId: null,
                        returnBIllType: '3'
                    },
                    {
                        totalVolume: 0.0,
                        shipper: '大连骏航货运/XBK',
                        clientName: '苏州市品诺食品贸易有限公司',
                        deliverMan: '安华',
                        deliverAddress:
                            '大连市甘井子区新水泥路8号（赛楠木业院内）',
                        returnBillReplace: null,
                        clientOrderCode: '#S5756926#',
                        receiveMan: '姜风',
                        distributorName: null,
                        payType: '2',
                        workCode: 'CP190901000012',
                        workState: '1',
                        deliverCity: '甘井子区',
                        signType: '0',
                        class: 'com.bbyb.fcp.dto.WorkCodeDto',
                        writeTime: null,
                        deliverTime: null,
                        receivePhone: '0411-83794809',
                        clientId: '219',
                        returnBIllNum: 1,
                        deliverPhone: '0411-86333700',
                        signTime: '2019-09-03 16:30:00',
                        receiveAddress:
                            '大连市中山区中山路129-3号柏威年大连购物中心地上一层',
                        receiveCom: 'S25928/XBKPN',
                        updateUserName: '黄燕',
                        signUser: '草签',
                        updateTime: '2019-09-01 12:00:07',
                        workId: '12',
                        totalNum: 2.0,
                        receiveCity: '中山区',
                        totalWeight: 0.0,
                        writeUserName: '黄燕',
                        receiveRemark: null,
                        craftRouteId: null,
                        returnBIllType: '3'
                    },
                    {
                        totalVolume: 0.0,
                        shipper: '大连骏航货运/XBK',
                        clientName: '苏州市品诺食品贸易有限公司',
                        deliverMan: '安华',
                        deliverAddress:
                            '大连市甘井子区新水泥路8号（赛楠木业院内）',
                        returnBillReplace: null,
                        clientOrderCode: '#S5760861#',
                        receiveMan: '宫程',
                        distributorName: null,
                        payType: '2',
                        workCode: 'CP190901000013',
                        workState: '1',
                        deliverCity: '甘井子区',
                        signType: '0',
                        class: 'com.bbyb.fcp.dto.WorkCodeDto',
                        writeTime: null,
                        deliverTime: null,
                        receivePhone: '0411-66165656',
                        clientId: '219',
                        returnBIllNum: 1,
                        deliverPhone: '0411-86333700',
                        signTime: '2019-09-03 16:30:00',
                        receiveAddress:
                            '大连市经济技术开发区辽河西路 117号一层 1031，1032，1033号',
                        receiveCom: 'S27410/XBKPN',
                        updateUserName: '黄燕',
                        signUser: '草签',
                        updateTime: '2019-09-01 12:00:07',
                        workId: '13',
                        totalNum: 2.0,
                        receiveCity: '金州区',
                        totalWeight: 0.0,
                        writeUserName: '黄燕',
                        receiveRemark: null,
                        craftRouteId: null,
                        returnBIllType: '3'
                    },
                    {
                        totalVolume: 0.0,
                        shipper: '大连骏航货运/XBK',
                        clientName: '苏州市品诺食品贸易有限公司',
                        deliverMan: '安华',
                        deliverAddress:
                            '大连市甘井子区新水泥路8号（赛楠木业院内）',
                        returnBillReplace: null,
                        clientOrderCode: '#S5760999#',
                        receiveMan: '赵伟博',
                        distributorName: null,
                        payType: '2',
                        workCode: 'CP190901000014',
                        workState: '1',
                        deliverCity: '甘井子区',
                        signType: '0',
                        class: 'com.bbyb.fcp.dto.WorkCodeDto',
                        writeTime: null,
                        deliverTime: null,
                        receivePhone: '0416-3346051',
                        clientId: '219',
                        returnBIllNum: 1,
                        deliverPhone: '0411-86333700',
                        signTime: '2019-09-03 16:30:00',
                        receiveAddress:
                            '辽宁省锦州市松山新区科技路21号万达广场一楼星巴克',
                        receiveCom: 'S52558/XBKPN',
                        updateUserName: '黄燕',
                        signUser: '草签',
                        updateTime: '2019-09-01 12:00:07',
                        workId: '14',
                        totalNum: 5.0,
                        receiveCity: '太和区',
                        totalWeight: 0.0,
                        writeUserName: '黄燕',
                        receiveRemark: null,
                        craftRouteId: null,
                        returnBIllType: '3'
                    },
                    {
                        totalVolume: 0.0,
                        shipper: '大连骏航货运/XBK',
                        clientName: '苏州市品诺食品贸易有限公司',
                        deliverMan: '安华',
                        deliverAddress:
                            '大连市甘井子区新水泥路8号（赛楠木业院内）',
                        returnBillReplace: null,
                        clientOrderCode: '#S5756891#',
                        receiveMan: '刘畅',
                        distributorName: null,
                        payType: '2',
                        workCode: 'CP190901000015',
                        workState: '1',
                        deliverCity: '甘井子区',
                        signType: '0',
                        class: 'com.bbyb.fcp.dto.WorkCodeDto',
                        writeTime: null,
                        deliverTime: null,
                        receivePhone: '0411-84311679',
                        clientId: '219',
                        returnBIllNum: 1,
                        deliverPhone: '0411-86333700',
                        signTime: '2019-09-03 16:30:00',
                        receiveAddress:
                            '大连市沙河口区高尔基路687号1层6号01-58号',
                        receiveCom: 'S01533/XBKPN',
                        updateUserName: '黄燕',
                        signUser: '草签',
                        updateTime: '2019-09-01 12:00:07',
                        workId: '15',
                        totalNum: 2.0,
                        receiveCity: '沙河口区',
                        totalWeight: 0.0,
                        writeUserName: '黄燕',
                        receiveRemark: null,
                        craftRouteId: null,
                        returnBIllType: '3'
                    },
                    {
                        totalVolume: 0.0,
                        shipper: '大连骏航货运/XBK',
                        clientName: '苏州市品诺食品贸易有限公司',
                        deliverMan: '安华',
                        deliverAddress:
                            '大连市甘井子区新水泥路8号（赛楠木业院内）',
                        returnBillReplace: null,
                        clientOrderCode: '#S5759839#',
                        receiveMan: '敖光宇',
                        distributorName: null,
                        payType: '2',
                        workCode: 'CP190901000016',
                        workState: '1',
                        deliverCity: '甘井子区',
                        signType: '0',
                        class: 'com.bbyb.fcp.dto.WorkCodeDto',
                        writeTime: null,
                        deliverTime: null,
                        receivePhone: '13898656250',
                        clientId: '219',
                        returnBIllNum: 1,
                        deliverPhone: '0411-86333700',
                        signTime: '2019-09-03 16:30:00',
                        receiveAddress: '大连市中山区鲁迅路50号',
                        receiveCom: 'S53450/XBKPN',
                        updateUserName: '黄燕',
                        signUser: '草签',
                        updateTime: '2019-09-01 12:00:07',
                        workId: '16',
                        totalNum: 2.0,
                        receiveCity: '中山区',
                        totalWeight: 0.0,
                        writeUserName: '黄燕',
                        receiveRemark: null,
                        craftRouteId: null,
                        returnBIllType: '3'
                    },
                    {
                        totalVolume: 0.0,
                        shipper: '大连骏航货运/XBK',
                        clientName: '苏州市品诺食品贸易有限公司',
                        deliverMan: '安华',
                        deliverAddress:
                            '大连市甘井子区新水泥路8号（赛楠木业院内）',
                        returnBillReplace: null,
                        clientOrderCode: '#S5757531#',
                        receiveMan: '李晖',
                        distributorName: null,
                        payType: '2',
                        workCode: 'CP190901000017',
                        workState: '1',
                        deliverCity: '甘井子区',
                        signType: '0',
                        class: 'com.bbyb.fcp.dto.WorkCodeDto',
                        writeTime: null,
                        deliverTime: null,
                        receivePhone: '18624269115',
                        clientId: '219',
                        returnBIllNum: 1,
                        deliverPhone: '0411-86333700',
                        signTime: '2019-09-03 16:30:00',
                        receiveAddress: '大连市沙河口区数码路南段13号',
                        receiveCom: 'S52471/XBKPN',
                        updateUserName: '黄燕',
                        signUser: '草签',
                        updateTime: '2019-09-01 12:00:07',
                        workId: '17',
                        totalNum: 2.0,
                        receiveCity: '沙河口区',
                        totalWeight: 0.0,
                        writeUserName: '黄燕',
                        receiveRemark: null,
                        craftRouteId: null,
                        returnBIllType: '3'
                    },
                    {
                        totalVolume: 0.0,
                        shipper: '哈尔滨腾立达/XBK',
                        clientName: '苏州市品诺食品贸易有限公司',
                        deliverMan: '郑淑连',
                        deliverAddress: '哈尔滨市道外区先锋路132-2 号',
                        returnBillReplace: null,
                        clientOrderCode: '#S5759431#',
                        receiveMan: '韩蕾',
                        distributorName: null,
                        payType: '2',
                        workCode: 'CP190901000018',
                        workState: '1',
                        deliverCity: '道外区',
                        signType: '0',
                        class: 'com.bbyb.fcp.dto.WorkCodeDto',
                        writeTime: null,
                        deliverTime: null,
                        receivePhone: '18645106812',
                        clientId: '219',
                        returnBIllNum: 1,
                        deliverPhone: '15545119675',
                        signTime: '2019-09-03 16:30:00',
                        receiveAddress:
                            '哈尔滨松北区世茂大道99号万达茂零售商业区一层1033B-1035',
                        receiveCom: 'S51624/XBKPN',
                        updateUserName: '黄燕',
                        signUser: '草签',
                        updateTime: '2019-09-01 12:00:07',
                        workId: '18',
                        totalNum: 2.0,
                        receiveCity: '松北区',
                        totalWeight: 0.0,
                        writeUserName: '黄燕',
                        receiveRemark: null,
                        craftRouteId: null,
                        returnBIllType: '3'
                    },
                    {
                        totalVolume: 0.0,
                        shipper: '哈尔滨腾立达/XBK',
                        clientName: '苏州市品诺食品贸易有限公司',
                        deliverMan: '郑淑连',
                        deliverAddress: '哈尔滨市道外区先锋路132-2 号',
                        returnBillReplace: null,
                        clientOrderCode: '#S5761271#',
                        receiveMan: '孟琳琳',
                        distributorName: null,
                        payType: '2',
                        workCode: 'CP190901000019',
                        workState: '1',
                        deliverCity: '道外区',
                        signType: '0',
                        class: 'com.bbyb.fcp.dto.WorkCodeDto',
                        writeTime: null,
                        deliverTime: null,
                        receivePhone: '0451-84567618',
                        clientId: '219',
                        returnBIllNum: 1,
                        deliverPhone: '15545119675',
                        signTime: '2019-09-03 16:30:00',
                        receiveAddress:
                            '哈尔滨市道里区中央大街69号金安购物广场',
                        receiveCom: 'S16560/XBKPN',
                        updateUserName: '黄燕',
                        signUser: '草签',
                        updateTime: '2019-09-01 12:00:07',
                        workId: '19',
                        totalNum: 4.0,
                        receiveCity: '道里区',
                        totalWeight: 0.0,
                        writeUserName: '黄燕',
                        receiveRemark: null,
                        craftRouteId: null,
                        returnBIllType: '3'
                    },
                    {
                        totalVolume: 0.0,
                        shipper: '哈尔滨腾立达/XBK',
                        clientName: '苏州市品诺食品贸易有限公司',
                        deliverMan: '郑淑连',
                        deliverAddress: '哈尔滨市道外区先锋路132-2 号',
                        returnBillReplace: null,
                        clientOrderCode: '#S5760522#',
                        receiveMan: '石阳',
                        distributorName: null,
                        payType: '2',
                        workCode: 'CP190901000020',
                        workState: '1',
                        deliverCity: '道外区',
                        signType: '0',
                        class: 'com.bbyb.fcp.dto.WorkCodeDto',
                        writeTime: null,
                        deliverTime: null,
                        receivePhone: '0451-85981224',
                        clientId: '219',
                        returnBIllNum: 1,
                        deliverPhone: '15545119675',
                        signTime: '2019-09-03 16:30:00',
                        receiveAddress: '哈尔滨市道里区友谊路167-217号百盛一层',
                        receiveCom: 'S17605/XBKPN',
                        updateUserName: '黄燕',
                        signUser: '草签',
                        updateTime: '2019-09-01 12:00:07',
                        workId: '20',
                        totalNum: 2.0,
                        receiveCity: '道里区',
                        totalWeight: 0.0,
                        writeUserName: '黄燕',
                        receiveRemark: null,
                        craftRouteId: null,
                        returnBIllType: '3'
                    },
                    {
                        totalVolume: 0.0,
                        shipper: '哈尔滨腾立达/XBK',
                        clientName: '苏州市品诺食品贸易有限公司',
                        deliverMan: '郑淑连',
                        deliverAddress: '哈尔滨市道外区先锋路132-2 号',
                        returnBillReplace: null,
                        clientOrderCode: '#S5758268#',
                        receiveMan: '王頔',
                        distributorName: null,
                        payType: '2',
                        workCode: 'CP190901000021',
                        workState: '1',
                        deliverCity: '道外区',
                        signType: '0',
                        class: 'com.bbyb.fcp.dto.WorkCodeDto',
                        writeTime: null,
                        deliverTime: null,
                        receivePhone: '0451-87718155',
                        clientId: '219',
                        returnBIllNum: 1,
                        deliverPhone: '15545119675',
                        signTime: '2019-09-03 16:30:00',
                        receiveAddress: '哈尔滨市南岗区赣水路68号',
                        receiveCom: 'S18601/XBKPN',
                        updateUserName: '黄燕',
                        signUser: '草签',
                        updateTime: '2019-09-01 12:00:07',
                        workId: '21',
                        totalNum: 2.0,
                        receiveCity: '南岗区',
                        totalWeight: 0.0,
                        writeUserName: '黄燕',
                        receiveRemark: null,
                        craftRouteId: null,
                        returnBIllType: '3'
                    }
                ],
                class: 'com.bbyb.core.db.relation.bean.pager.DataPager'
            }
        }

        this.tableData = result.result.rows

        // this.loading = true
        // this.Http(
        //     'fcp.SingleTrackingService.getWorkCodePagerList',
        //     this.queryCriteria()
        // )
        //     .then((res) => {
        //         this.tableData = res.rows
        //     })
        //     .finally(() => {
        //         this.loading = false
        //     })
    }

    /**
     * 删除
     */
    handleDelete(rows) {
        this.$confirm('您确定作废该条记录？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            delete rows.class
            rows.isValid = 1
        })
    }

    /**
     * 重置
     */
    reset() {
        this.form = {}
        this.handleFilter(true)
    }

    /**
     * 查看详情
     */
    showDetail(row) {
        this.detail.show = true
        this.detail.payload = {
            workId: row.workId,
            workCode: row.workCode
        }
    }

    /**
     * 复制
     */
    // eslint-disable-next-line class-methods-use-this
    copy(text) {
        // copy(text)
    }
}
</script>

<style scoped>
.app-container {
    height: 500px;
}
</style>
