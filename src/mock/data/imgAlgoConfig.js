//  图片实例列表
const imgAlgoConfigInstaceList = {
  "current_page": 1,
  "data": [
    {
      id: 83,
      install_record_id: 116,
      algo_id: 9610,
      ip: "192.168.1.71",
      port: 17491,
      sdk_version: "2.5.0",
      algo_config_path: "/usr/local/ev_sdk/model/algo_config.json",
      status: null,
      had_configure: 0,
      camera_number: 0,
      created_at: "2020-03-16 17:02:01",
      updated_at: "2020-03-16 17:02:48",
      template: {roi: [{name: "框", type: "polygon", max: 1, value: []}], input: []},
      cameras: [{id: 162, config_id: 72, cid: "666", type: "vas"}],
      is_activated: 1,
      expired: "2020-05-16",
      cids: ["666"],
      log_namespace: "9610_17491_vas_uc3k_data",
      enable_status: 1,
      heath_status: 2,
      advance: 1,
      algo: {id: 9610, name: "火焰检测", name_en: "fire video", version: "1.0.4"},
      vas: {id: 72, gpu_id: -1, begin_time: "00:00:00", end_time: "23:59:59", poll_sequential_frames: 1},
      license: {id: 57},
    }
  ],
  "first_page_url": "http://127.0.0.1:85/api/algo/image?page=1",
  "from": 1,
  "last_page": 1,
  "last_page_url": "http://127.0.0.1:85/api/algo/image?page=1",
  "next_page_url": null,
  "path": "http://127.0.0.1:85/api/algo/image",
  "per_page": "10",
  "prev_page_url": null,
  "to": 1,
  "total": 1
}

//  不用看
const imgAlgoConfig = {
  "id": 2,
  "status": 1,
  "algo_id": 9610,
  "algo_name": '安全帽',
  "analysis_frequency": 30,
  //  模板数据
  "template": {
    //  算法模板
    "roi": [
      {
        name: '点',
        type: 'point',
        max: 10,
        value: []
      },
      {
        name: '线',
        type: 'linestring',
        max: 10,
        value: []
      },
      {
        name: '框',
        type: 'polygon',
        max: 10,
        value: []
      }
    ],
    // "roi": {
    //   //  后面添加数据
    //   hasInitPlugin: false,     //  是否初始化点线框插件
    //   hasConfig: false,       //  点线框数据是否配置完成
    //   initDrawType: '',       //  点线初始化类型
    //   initBtns: [],           //  点线框需要按钮
    //   maxDrawNum: {},         //  点线框最大考可绘画数量
    //   drawedNum: {},          //  点线框绘画数量
    // },
    //  算法动态配置表单数据
    "input": [
      {
        "id": 3,
        "algo_id": 9610,
        "name": "摄像头ID",
        "field_name": "CID",
        "placeholder": "请输入摄像头ID",
        "field_required": 1,
        "post_name": "cid",
        "post_default": "",
        "field_type": "input",
        "validate_type": "string",
        "validate_rule": "",
        "select_name": "",
        "error_messages": "CID不能为空",
        "created_at": "2019-09-25 15:43:48",
        "updated_at": "2019-11-22 17:34:19"
      }
    ]
  },
  //  绑定的摄像头集合数据
  "cameras": [
    { 
      "cid": "cid1",
      "camera": {
        "stream": "0012",
        "algo_num": 0,
        "pic_path": "2222",
        "camera_type": '摄像头',
        "status": '',
        "status_name": '',
        "id": 2,
        "name": "0012",
      },
      "config": {
        "roi": [
          {
            "name": "框",
            "type": "polygon",
            "max": 1,
            "value": [
              "POLYGON((0.07878787878787878 0.1575,0.05757575757575758 0.8925,0.8484848484848485 0.9325,0.7742424242424243 0.0875,0.4257575757575758 0.0575))"
            ]
          },
          {
            "name": "线",
            "type": "line",
            "max": 1,
            "value": [
              'LINESTRING(0.16818181818181818 0.1125,0.7848484848484848 0.13)',
              'LINESTRING(0.05 0.36,0.04393939393939394 0.88)'
            ]
          },
          {
            "name": "点",
            "type": "point",
            "max": 10,
            "value": [
              'POINT(0.8075757575757576 0.3825)',
              'POINT(0.806060606060606 0.71)'
            ]
          }
        ],
        "input": {
          "cid": "0012"
        },
      }
    },
  ],
  //  选中的摄像头cid集合
  "cids": ["cid1", "cid2"]
}

//  图片绑定输入源 配置列表
const imgConfigList = {
  "id": 1,
  "config_id":222222,
  "algo_id": 9663,
  "ip":"192.168.1.11",
  "port": 11111,
  "remark": "",
  "analysis_frequency": 30,
  "created_at": null,
  "updated_at": null,
  "algo_name": "口罩识别",
  //  模板数据
  "template": {
    //  算法模板
    "roi": [
      {
        name: '点',
        type: 'point',
        max: 10,
        value: []
      },
      {
        name: '框',
        type: 'polygon',
        max: 10,
        value: []
      },
      {
        name: '线',
        type: 'linestring',
        max: 10,
        value: []
      },
    ],
    //  算法动态配置表单数据
    "input": [
      {
        "id": 3,
        "algo_id": 9610,
        "name": "摄像头ID",
        "field_name": "CID",
        "placeholder": "请输入摄像头ID",
        "field_required": 1,
        "post_name": "cid",
        "post_default": "",
        "field_type": "input",
        "validate_type": "string",
        "validate_rule": "",
        "select_name": "",
        "error_messages": "CID不能为空",
        "created_at": "2019-09-25 15:43:48",
        "updated_at": "2019-11-22 17:34:19",
        "component_type": "input"
      }
    ]
  },
  "cameras":[{
    "id": 27,
    "name": "666688",
    "cid": "666",
    "pic_path": "", 
    "status": -2,
    "status_name": "未配置服务",
    "camera_type_name": "POST",
    "camera_type": 2,
    "configuration":0,
    "configuration_name":"未配置"
  },]
}
//  图片绑定输入源 配置列表  配置按钮
const imgConfigDetail = {
  "roi": [
    {
      "name": "点",
      "type": "point",
      "max": 10,
      "value": [
        'POINT(0.8075757575757576 0.3825)',
        'POINT(0.806060606060606 0.71)'
      ]
    },
    {
      "name": "线",
      "type": "line",
      "max": 10,
      "value": [
        'LINESTRING(0.16818181818181818 0.1125,0.7848484848484848 0.13)',
        'LINESTRING(0.05 0.36,0.04393939393939394 0.88)'
      ]
    },
    {
      "name": "框",
      "type": "polygon",
      "max": 10,
      "value": [
        "POLYGON((0.07878787878787878 0.1575,0.05757575757575758 0.8925,0.8484848484848485 0.9325,0.7742424242424243 0.0875,0.4257575757575758 0.0575))"
      ]
    }
  ],
  "input": {
    "cid": "0012"
  }
}

export {
  imgAlgoConfigInstaceList,
  imgAlgoConfig,
  imgConfigList,
  imgConfigDetail
}



